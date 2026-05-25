# Matura-Aufgaben: Domain-Driven Design

---

### Aufgabe 1: Domain-Driven Design – Strategisches Design & Taktische Bausteine

**Situatives Umfeld / Szenario:**

Ein Entwicklungsteam – bestehend aus zwei Backend-Entwicklern, einer Frontend-Entwicklerin und der Schulbibliothekarin als Domänenexpertin – entwickelt ein neues digitales Bibliotheksverwaltungssystem für eine berufsbildende höhere Schule. Das Team hat sich für einen DDD-Ansatz entschieden und arbeitet gemeinsam an der Systemkonzeption. In einem Workshop werden Fachbegriffe, Kontextgrenzen und die technische Umsetzung des zentralen Use Case „Buch reservieren" festgelegt.

Im Verlauf der Implementierung stellt eine Code-Review fest, dass ein Entwickler die Klasse `InventarAusleihexemplar` (eine Entity innerhalb des `Ausleihexemplar`-Aggregats) direkt über das Repository geladen und deren Status ohne Beteiligung der Aggregate Root auf `RESERVED` gesetzt hat.

---

### AUFGABENSTELLUNG

**1. Reproduktion**
* Erläutere das Konzept der **Ubiquitous Language** im Domain-Driven Design. Beschreibe ihre Merkmale, ihren Zweck und nenne mindestens drei konkrete Attribute, die ein guter Ubiquitous-Language-Eintrag besitzen sollte.

**2. Transfer und Anwendung**
* Das Entwicklungsteam hat drei **Bounded Contexts** identifiziert: den *Ausleih-Kontext*, den *Anschaffungs-Kontext* und den *Nutzerprofil-Kontext*. Erkläre, warum das reale Objekt „Buch" in jedem dieser Kontexte ein **unterschiedliches Domänenmodell** erfordert, bzw. ob es in jedem der genannten Kontexte eine Rolle spielt. Beschreibe außerdem, über welchen Mechanismus die Kontexte miteinander verknüpft werden, und zeichne eine vereinfachte **Context Map**, die die Beziehung der drei Kontexte darstellt.

**3. Analyse und Reflexion**
* In dem Code-Review wurde festgestellt, dass ein Entwickler die Entity `InventarAusleihexemplar` direkt geladen und ihren Status eigenständig gesetzt hat – an der Aggregate Root `Ausleihexemplar` vorbei. Analysiere dieses Vorgehen: Welches DDD-Grundprinzip wurde verletzt? Welche konkreten Auswirkungen kann dies auf die Datenkonsistenz des Systems haben? Erarbeite einen Lösungsvorschlag, der zeigt, wie der korrekte Ablauf aussehen sollte.

---

### MUSTERANTWORTEN (Für die Prüferhand)

**Musterantwort zu 1 (Reproduktion):**

* **Kernaussage/Klassifizierung:** Die Ubiquitous Language ist eine gemeinsame, einheitliche Fachsprache, die von allen Projektbeteiligten – Fachexperten, Entwicklern und Testern – in Gesprächen, Dokumenten und im Code gleichermaßen verwendet wird.
* **Merkmale:**
  * Einheitliche Begriffe: Alle Projektbeteiligten sprechen dieselbe Sprache.
  * Im Code sichtbar: Klassen, Methoden und Variablen verwenden Fachbegriffe direkt (z.B. `class Ausleihe`, `method sendeMahnung()`).
  * Enge Zusammenarbeit: Entwickler und Domänenexperten erarbeiten das Modell gemeinsam.
  * Wirkung: Reduzierte Missverständnisse und bessere, selbsterklärende Dokumentation.
* **Attribute eines guten Ubiquitous-Language-Eintrags (mind. 3 nennen):**
  1. **Fachbegriff (Term):** Das präzise Wort in der Sprache der Domäne.
  2. **Bounded Context (Geltungsbereich):** Macht den Begriff eindeutig (ein Wort kann in verschiedenen Kontexten unterschiedliche Bedeutungen haben).
  3. **Fachliche Definition:** Klare Erklärung in der Sprache der Experten, ohne technische Details.
  4. **Invarianten & Geschäftsregeln:** Welche Regeln müssen immer gelten?
  5. **Klassifizierung (DDD-Rolle):** Aggregat, Entität, ValueObject, DomainService usw.
  6. **Synonyme & Anti-Begriffe:** Welche Begriffe sollen explizit nicht verwendet werden?

---

**Musterantwort zu 2 (Transfer und Anwendung):**

* **Warum unterschiedliche Modelle nötig sind:**
  Ein reales Objekt wie „Buch" wird in jedem Kontext aus einer anderen fachlichen Perspektive betrachtet und hat dort andere relevante Eigenschaften und Verhaltensweisen:
  * **Ausleih-Kontext:** Ein Buch ist ein `Ausleihexemplar` mit physischen `InventarAusleihexemplaren`, einem Status (verfügbar, reserviert, ausgeliehen) und einer Signatur. Relevante Prozesse: Ausleihe, Rückgabe, Vormerkung.
  * **Anschaffungs-Kontext:** Ein Buch ist ein `BuchkatalogEintrag` mit Verlag, Preis und Lieferant. Relevante Prozesse: Bestellung, Rechnung, Lieferantenauswahl.
  * **Nutzerprofil-Kontext:** Ein Buch spielt hier keine direkte Rolle; der Fokus liegt auf `Benutzerkonto`, `Rolle` und `Klasse`.

* **Verknüpfungsmechanismus:** Die Kontexte bleiben intern getrennt, werden aber über gemeinsame, neutrale Identifier verbunden – z.B. die `ISBN` als übergreifende Referenz zwischen Ausleih- und Anschaffungs-Kontext, oder die `Benutzer-ID` zwischen Ausleih- und Nutzerprofil-Kontext.

* **Context Map (vereinfacht, z.B. als Mermaid-Skizze):**
  ```
  [Ausleih-Kontext] ---(ISBN)---> [Anschaffungs-Kontext]
  [Ausleih-Kontext] ---(Benutzer-ID)---> [Nutzerprofil-Kontext]
  ```

---

**Musterantwort zu 3 (Analyse und Reflexion):**

* **Problematik:** Der Entwickler hat das DDD-Grundprinzip der **Aggregat-Grenze (Aggregate Boundary)** verletzt. Die Regel lautet: Zugriffe auf Objekte innerhalb eines Aggregats dürfen ausschließlich über die **Aggregate Root** erfolgen. Durch das direkte Laden und Modifizieren von `InventarAusleihexemplar` über ein eigenes Repository wurde diese Grenze umgangen.

* **Auswirkung:**
  * Die Aggregate Root `Ausleihexemplar` kann die **Invarianten** (Konsistenzregeln) nicht mehr durchsetzen – z.B. die Regel, dass ein `InventarAusleihexemplar` nur dann auf `RESERVED` gesetzt werden darf, wenn kein anderer Ausleiher es bereits reserviert hat.
  * Es entsteht ein **inkonsistenter Datenbankzustand**: Mehrere Ausleiher könnten dasselbe physische Exemplar gleichzeitig reservieren.
  * **Domain Events** (z.B. `BuchWurdeReserviert`) werden nicht ausgelöst, da die Statusänderung an der Domänenlogik vorbei direkt in der Datenbank landet. Nachgelagerte Prozesse (z.B. Benachrichtigungen) werden nie angestoßen.

* **Lösung:** Der korrekte Ablauf muss über die Aggregate Root laufen:
  1. Der `ReservierungsApplicationService` lädt das **Aggregate** `Ausleihexemplar` über das `AusleihexemplarRepository` (nicht `InventarAusleihexemplar` direkt).
  2. Auf der Aggregate Root `Ausleihexemplar` wird die Methode `reserviere(ausleiherId)` aufgerufen.
  3. Die Aggregate Root prüft intern alle Invarianten (Verfügbarkeit, Limits) und setzt – bei Erfolg – den Status des entsprechenden `InventarAusleihexemplar` auf `RESERVED`.
  4. Die Aggregate Root erzeugt das Domain Event `BuchWurdeReserviert`.
  5. Der `ApplicationService` speichert das gesamte Aggregat über das Repository (in einem konsistenten Zustand).
