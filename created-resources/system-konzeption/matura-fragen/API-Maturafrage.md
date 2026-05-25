# Maturafragen – APIs als Bindeglied zwischen Frontend und Backend

---

### API-STRATEGIE FÜR EINE SCHÜLER-BIBLIOTHEKSAPP

**Situatives Umfeld / Szenario:**
Eine Schule entwickelt eine digitale Bibliotheksverwaltung. Das Backend-Team arbeitet mit Domain-Driven Design und liefert komplexe Domänenobjekte (`Ausleiher`-Aggregat, `Ausleihexemplar`-Aggregat). Das Frontend-Team baut eine Flutter-App nach dem Component-Driven-Design-Prinzip. Die Projektleiterin beauftragt den Entwickler Max, die API-Strategie für den zentralen Use Case „Reserviere Buch" zu entwerfen und zu dokumentieren.

---

### AUFGABENSTELLUNG

**1. Reproduktion**
* Beschreibe die drei API-Typen REST (OpenAPI), GraphQL und Event-basiert (AsyncAPI) und nenne jeweils ihre Stärken und den idealen Einsatzbereich im Kontext der Schulbibliothek.

**2. Transfer und Anwendung**
* Max soll den Ansatz „API-First" für den Endpunkt `POST /reservierungen` umsetzen. Erkläre die drei Schritte des API-First-Workflows (Design → Mocking → Parallelentwicklung) und beschreibe, wie das Frontend-Team und das Backend-Team dadurch gleichzeitig mit der Entwicklung beginnen können – ohne aufeinander warten zu müssen.

**3. Analyse und Reflexion**
* Die Flutter-App ruft für die Anzeige der Reservierungsliste drei separate REST-Endpunkte auf (`GET /ausleiher/:id/reservierungen`, `GET /ausleihexemplare/:id`, `GET /ausleiher/:id`), kombiniert die Antworten im Frontend und übersetzt Domain-Exceptions selbst in Fehlermeldungen. Analysiere, welches Architekturproblem vorliegt, welche Auswirkungen das hat, und entwickle einen Lösungsvorschlag auf Basis des BFF-Patterns.

---

### MUSTERANTWORTEN (Für die Prüferhand)

**Musterantwort zu 1 (Reproduktion):**

| API-Typ | Stärken | Idealer Einsatz in der Schulbibliothek |
|---|---|---|
| **REST (OpenAPI)** | Standardisiert, einfach zu cachen, zustandslos | Supporting / Generic Domain: Benutzerverwaltung, Buchkatalog-Einträge (stabile CRUD-Operationen) |
| **GraphQL** | Kein Over-/Underfetching, Client bestimmt die Struktur, stark typisiert | Core Domain: komplexe UIs mit tief verschachtelten Daten (z. B. `ReservierungsDetail` braucht alle Felder, `ReservierungsKarte` nur Titel und Abholfrist) |
| **Event-basiert (AsyncAPI)** | Echtzeit, lose Kopplung, hohe Skalierbarkeit | Benachrichtigungen und Live-Updates: Nach einer Reservierung soll die Verfügbarkeitsanzeige sofort aktualisiert werden – ohne Seitenreload |

* **Merksatz:** Wähle den API-Typ nach dem Bedürfnis des Consumers: REST für stabile CRUD-Ressourcen, GraphQL für flexible UI-Abfragen in der Core Domain, Events für Echtzeit-Reaktionen.

**Musterantwort zu 2 (Transfer und Anwendung):**

* **Kernidee von API-First:** Die API-Spezifikation wird *vor* der Implementierung erstellt und von beiden Teams als verbindlicher Vertrag akzeptiert. Kein Code wird geschrieben, bevor der Vertrag steht.

* **Schritt 1 – Design:** Der Endpunkt `POST /reservierungen` wird in einer OpenAPI-`.yaml`-Datei spezifiziert: Request-Body (`ausleiherId`, `ausleihexemplarId`), Responses (`201 Created` mit `reservierungsId` und `abholfrist`, `422 Unprocessable Entity` bei überschrittenem Limit).

* **Schritt 2 – Mocking:** Das Frontend-Team entwickelt die `ReservierungsFormular`-Komponente gegen eine Fake-API (z. B. Prism oder Apollo Mocks), die den definierten Endpunkt simuliert – das echte Backend existiert noch nicht.

* **Schritt 3 – Parallelentwicklung:** Das Backend-Team implementiert die Domänenlogik (Invarianten, Aggregate) unabhängig. Das Frontend-Team baut die CDD-Komponenten gleichzeitig. Beide treffen sich erst zur Integration – der gemeinsame Vertrag stellt sicher, dass alles passt.

**Musterantwort zu 3 (Analyse und Reflexion):**

* **Problematik:** Die Flutter-App führt für eine einzige Ansicht drei separate API-Aufrufe durch, kombiniert die Daten selbst im Frontend und übersetzt fachliche Domain-Exceptions in Fehlermeldungen. Das verletzt das Prinzip der Aufgabentrennung: Das Frontend übernimmt Aufgaben (Aggregation, Transformation, Fehlerübersetzung), die nicht in seine Zuständigkeit fallen. Das DDD-Domänenmodell (Aggregate, verschachtelte Entities) stimmt nicht mit dem UI-Modell (flache ViewModels) überein – ein klassisches **Impedance-Mismatch**.

* **Auswirkung:** Die `ReservierungsListe`-Komponente ist langsamer (drei sequenzielle oder parallele Requests statt einem), fehleranfälliger (jeder der drei Calls kann scheitern) und schwerer wartbar (Änderungen am Backend-Modell brechen die Aggregationslogik im Frontend).

* **Lösung:** Einführung eines **BFF (Backend for Frontend)** als schlanker Adapter-Service zwischen DDD-Backend und Flutter-App:
  * Das BFF ruft intern alle drei Backend-Services auf und fasst die Antworten zu einem einzigen `ReservierungsKartenViewModel` zusammen (Datenaggregation).
  * Es übersetzt DDD-Domänenobjekte in frontend-freundliche ViewModels mit nur den für die UI relevanten Feldern (Transformation).
  * Es übersetzt `DomainException("Reservierungslimit erreicht")` in die Fehlermeldung „Sie haben bereits 3 aktive Reservierungen." (Fehlerübersetzung).
  * Die Flutter-App stellt nur noch **eine einzige GraphQL-Query** an das BFF – die gesamte Orchestrierung liegt im BFF.
  * **Merksatz:** Das BFF ist der Übersetzer zwischen zwei Welten: Es spricht mit dem DDD-Backend in der Sprache der Domäne und mit dem CDD-Frontend in der Sprache der Komponenten.
