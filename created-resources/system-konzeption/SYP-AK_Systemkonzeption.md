# 📘 Moderne Systemkonzeption & Architektur

## Inhaltsverzeichnis

- [📘 Moderne Systemkonzeption \& Architektur](#-moderne-systemkonzeption--architektur)
  - [Inhaltsverzeichnis](#inhaltsverzeichnis)
- [1. Grundlagen der Systemkonzeption](#1-grundlagen-der-systemkonzeption)
  - [1.1 Systemarchitektur im Überblick](#11-systemarchitektur-im-überblick)
  - [1.2 Qualitätsanforderungen \& nicht-funktionale Eigenschaften](#12-qualitätsanforderungen--nicht-funktionale-eigenschaften)
  - [1.3 Technologiewahl \& Betrieb](#13-technologiewahl--betrieb)
- [2. Domain-Driven Design (DDD) – Backend-Architektur](#2-domain-driven-design-ddd--backend-architektur)
  - [2.1 Kernkonzepte des DDD](#21-kernkonzepte-des-ddd)
  - [2.2 Strategisches Design – Bounded Contexts \& Ubiquitous Language](#22-strategisches-design--bounded-contexts--ubiquitous-language)
  - [2.3 Taktisches Design – Bausteine des DDD](#23-taktisches-design--bausteine-des-ddd)
- [3. Datenbank-Design im DDD-Kontext](#3-datenbank-design-im-ddd-kontext)
  - [3.1 Persistence Ignorance \& Aggregate-Grenzen](#31-persistence-ignorance--aggregate-grenzen)
  - [3.2 Mapping von DDD-Bausteinen auf Datenbanktabellen](#32-mapping-von-ddd-bausteinen-auf-datenbanktabellen)
  - [3.3 CQRS – Trennung von Schreib- und Lesedaten](#33-cqrs--trennung-von-schreib--und-lesedaten)
- [4. Component Driven Design (CDD) – Frontend-Architektur](#4-component-driven-design-cdd--frontend-architektur)
  - [4.1 Kernprinzipien des CDD](#41-kernprinzipien-des-cdd)
  - [4.2 Atomic Design – Die Komponentenhierarchie](#42-atomic-design--die-komponentenhierarchie)
  - [4.3 Smart vs. Dumb Components](#43-smart-vs-dumb-components)
- [5. APIs als Bindeglied zwischen Frontend und Backend](#5-apis-als-bindeglied-zwischen-frontend-und-backend)
  - [5.1 API-Arten und ihre Einsatzbereiche](#51-api-arten-und-ihre-einsatzbereiche)
  - [5.2 API-First \& Consumer-Driven Contracts](#52-api-first--consumer-driven-contracts)
  - [5.3 Das BFF-Pattern (Backend for Frontend)](#53-das-bff-pattern-backend-for-frontend)
- [6. Vertical Slice Architektur – Alles zusammenführen](#6-vertical-slice-architektur--alles-zusammenführen)
  - [6.1 Das Problem klassischer Schichtenarchitektur](#61-das-problem-klassischer-schichtenarchitektur)
  - [6.2 Feature-basierte Code-Organisation mit Vertical Slices](#62-feature-basierte-code-organisation-mit-vertical-slices)
  - [6.3 Architekturwahl nach Domänen-Typ](#63-architekturwahl-nach-domänen-typ)
  - [6.4 Vertical Slices \& AI-Assisted Development](#64-vertical-slices--ai-assisted-development)

<div style="page-break-after: always;"></div>

<div style="width: 100%;">
    <div style="margin-left:1cm; margin-right:1.5cm; text-align: center;">
    <h2>Version History</h2>
    <table style="border solid 1px;width: 100%;">
    <th style="text-align:left">Version</th>
    <th>Änderungen</th>
    <th style="text-align:right">Autor</th>
    <tr>
    <td style="text-align:left">2026-04-19</td>
    <td style="text-align:left">Offizielle Erstversion – überarbeitete Struktur mit logischem Lesefluss</td>
    <td style="text-align:right">UK</td>
    </tr>
    </table>
    </div>
</div>

<div style="page-break-after: always;"></div>

---

# 1. Grundlagen der Systemkonzeption

*Bevor man mit dem eigentlichen Entwurf beginnt, braucht es ein gemeinsames Verständnis: Was ist überhaupt Systemkonzeption, und welche Fragen muss eine gute Architektur beantworten?*

Stellen Sie sich vor, Sie planen ein Gebäude: Ohne Grundriss, ohne Statik und ohne Plan für Strom und Wasser würde der Bau früher oder später scheitern – egal wie gut die Handwerker sind. Genauso braucht jede Software eine **Systemkonzeption**, die die wichtigsten Entscheidungen vor dem ersten Code-Commit festhält.

## 1.1 Systemarchitektur im Überblick

*Die Systemarchitektur beschreibt die grundlegende Struktur: Welche großen Bausteine gibt es, wie hängen sie zusammen und wie kommunizieren sie miteinander?*

- **Grundstruktur:** Welche Hauptkomponenten (Backend, Frontend, Datenbank, externe Dienste) hat das System?
- **Modulaufteilung:** Welche Zuständigkeiten hat jedes Modul? Klare Grenzen verhindern ein „Big Ball of Mud".
- **Kommunikationswege:** Wie tauschen Module Daten aus? (REST, Ereignisse/Events, direkte Datenbankzugriffe)
- **Deployment-Strategie:** Wo und wie wird das System betrieben? (Cloud, Container, On-Premises)

## 1.2 Qualitätsanforderungen & nicht-funktionale Eigenschaften

*Neben den eigentlichen Funktionen bestimmen nicht-funktionale Anforderungen maßgeblich, ob ein System langfristig erfolgreich ist.*

- **Performance:** Welche Antwortzeiten sind akzeptabel? Wo entstehen Engpässe?
- **Skalierbarkeit:** Wie verhält sich das System bei steigender Last oder wachsenden Datenmengen?
- **Sicherheit:** Wie werden Daten und Zugänge geschützt? (Authentifizierung, Autorisierung, Verschlüsselung)
- **Wartbarkeit:** Wie einfach lassen sich Änderungen einbauen, ohne Bestehende Teile zu beschädigen?
- **Verfügbarkeit:** Welche Ausfallzeiten sind tolerierbar? Welche Redundanzen sind notwendig?

## 1.3 Technologiewahl & Betrieb

*Die Wahl der Technologien ist eine Konsequenz der Architekturentscheidungen – nicht umgekehrt.*

- **Programmiersprachen & Frameworks:** Zum Beispiel Dart/Flutter für das Frontend, Java/Spring oder Node.js für das Backend.
- **Datenbanken:** Relationale (PostgreSQL) oder dokumentenorientierte Speicher (MongoDB) je nach Anforderung.
- **DevOps-Werkzeuge:** CI/CD-Pipelines, Docker/Container, Monitoring und Logging.
- **Betrieb:** Wie wird das System ausgeliefert, überwacht und bei Problemen wiederhergestellt?

> <span style="font-size: 1.5em">:bulb:</span> **Merksatz:** Gute Systemkonzeption beantwortet **zuerst** das *Was* und *Warum* – erst dann das *Wie* und *Womit*.

*Mit diesen Grundlagen im Gepäck betrachten wir nun den modernen Ansatz für das Backend: das **Domain-Driven Design (DDD)**. Es stellt die fachliche Domäne in den Mittelpunkt – und damit die Sprache der Auftraggeber in den Code.*

<div style="page-break-after: always;"></div>

---

# 2. Domain-Driven Design (DDD) – Backend-Architektur

*Komplexe Software scheitert oft nicht an der Technologie, sondern daran, dass der Code die fachliche Wirklichkeit nicht mehr widerspiegelt. DDD löst genau dieses Problem.*

Stellen Sie sich vor, die Fachleute sagen „Bestellung", die Entwickler sprechen aber intern von einem `OrderRecord` – und meinen dabei manchmal dasselbe, manchmal aber auch nicht. Dieses Missverständnis wächst mit der Zeit und wird zur Hauptquelle von Bugs und Fehlentscheidungen. DDD begegnet dem, indem Fachsprache und Code zur selben Sprache werden.

## 2.1 Kernkonzepte des DDD

*DDD ist mehr als ein technisches Muster – es ist ein Ansatz, der Softwareentwicklung als gemeinsame Disziplin von Fach- und Technikseite versteht.*

- **Fokus auf die Domäne:** Die Fachlogik (das „Geschäft") steht im Mittelpunkt – nicht die Datenbank, nicht das Framework.
- **Ubiquitous Language:** Eine gemeinsame, eindeutige Fachsprache, die sowohl in Gesprächen als auch im Code gilt.
- **Enge Zusammenarbeit:** Entwickler und Fachexperten (Domain Experts) erarbeiten das Modell gemeinsam.
- **Modell als Kern:** Das Domänenmodell ist das Herzstück des Systems – alle anderen Teile dienen ihm.

## 2.2 Strategisches Design – Bounded Contexts & Ubiquitous Language

*Im großen Maßstab teilt DDD komplexe Systeme in klar abgegrenzte Fachbereiche auf.*

- **Bounded Context:** Eine klar definierte Grenze, innerhalb derer ein Domänenmodell eindeutig und konsistent gilt.
- **Context Map:** Eine Übersicht, wie verschiedene Bounded Contexts miteinander in Beziehung stehen.
- **Subdomänen:** Einteilung in *Core Domain* (einzigartiger Kern, größter Aufwand), *Supporting Domain* und *Generic Domain*.
- **Warum es wichtig ist:** Verhindert, dass ein einziges, überwachsendes Modell das gesamte System lähmt.

## 2.3 Taktisches Design – Bausteine des DDD

*Innerhalb eines Bounded Context beschreibt das taktische Design die konkreten Bausteine des Codes.*

- **Entity:** Ein Objekt mit eindeutiger Identität, das sich über die Zeit verändern kann (z. B. eine `Bestellung`).
- **Value Object:** Ein unveränderliches Objekt ohne eigene Identität, das durch seine Werte definiert wird (z. B. eine `Adresse`).
- **Aggregate:** Eine Gruppe zusammengehöriger Entities und Value Objects mit einer klaren Außengrenze und einer *Aggregate Root* als Zugangspunkt.
- **Repository:** Abstrahiert den Datenbankzugriff – der Code spricht mit dem Repository, nicht direkt mit der Datenbank.
- **Domain Service:** Logik, die nicht natürlich zu einer Entity gehört, aber dennoch fachlich ist.
- **Domain Events:** Signalisieren, dass etwas Wichtiges in der Domäne passiert ist (z. B. `BestellungAufgegeben`).

> <span style="font-size: 1.5em">:bulb:</span> **Merksatz:** DDD bedeutet: Schreibe Code, der die Fachsprache spricht – so versteht jeder im Team, was eine Klasse tut, ohne die Implementierung zu kennen.

*Das Domänenmodell lebt auch in der Datenbank. Wie man DDD-Konzepte auf Tabellen und Schemas überträgt, ohne die Fachlogik zu kompromittieren, zeigt das nächste Kapitel.*

<div style="page-break-after: always;"></div>

---

# 3. Datenbank-Design im DDD-Kontext

*Die Datenbank ist ein Implementierungsdetail – das Domänenmodell sollte unabhängig davon entstehen. Doch irgendwann müssen Daten persistiert werden: Wie macht man das richtig?*

Im DDD gilt der Grundsatz: Entwirf zuerst das Modell, als gäbe es gar keine Datenbank. Erst danach wird überlegt, wie dieses Modell dauerhaft gespeichert wird. Dieser Ansatz nennt sich **Persistence Ignorance** und schützt die Fachlogik vor technischen Kompromissen.

## 3.1 Persistence Ignorance & Aggregate-Grenzen

*Die Grenzen des Domänenmodells bestimmen die Grenzen der Datenbankoperationen.*

- **Persistence Ignorance:** Die Domänenklassen enthalten keinen Datenbankcode – das Speichern übernimmt das Repository.
- **Aggregates als Transaktionsgrenzen:** Eine Datenbank-Transaktion sollte idealerweise immer genau *ein* Aggregate ändern.
- **Konsistenz innerhalb eines Aggregates:** Alle Regeln und Invarianten gelten innerhalb der Aggregategrenze.
- **Warum keine Fremdschlüssel-Joins über Aggregat-Grenzen:** Um lose Kopplung zu erhalten, referenzieren Aggregates einander nur per ID.

## 3.2 Mapping von DDD-Bausteinen auf Datenbanktabellen

*Wie werden die abstrakten DDD-Konzepte in konkrete Tabellen und Felder übersetzt?*

- **Entities → eigene Tabellen:** Jede Entity erhält eine eigene Tabelle mit einer eindeutigen ID (bevorzugt UUID statt Auto-Increment).
- **Value Objects → Inline-Felder oder JSON:** Werden meist als Spalten in der Tabelle der übergeordneten Entity gespeichert oder als JSON-Feld.
- **Aggregates → Tabellengruppe:** Alle Tabellen eines Aggregates werden gemeinsam transaktional behandelt.
- **Domain Events → Event-Tabelle oder Message Broker:** Ermöglichen asynchrone Reaktionen auf Zustandsänderungen.

## 3.3 CQRS – Trennung von Schreib- und Lesedaten

*Lesen und Schreiben haben oft sehr unterschiedliche Anforderungen – CQRS trägt dem Rechnung.*

- **CQRS (Command Query Responsibility Segregation):** Trennung von Schreib-Operationen (Commands) und Lese-Operationen (Queries).
- **Schreib-Seite:** Komplex, validierend, transaktional – optimiert für Korrektheit der Geschäftslogik.
- **Lese-Seite:** Oft denormalisiert, flach, schnell – optimiert für Darstellung im Frontend.
- **Read Models / Projektionen:** Separate Datenbankviews oder Tabellen, die auf die Bedürfnisse der UI zugeschnitten sind.
- **Vorteil:** Komplexe Domänenlogik und performante Lesezugriffe können unabhängig optimiert werden.

> <span style="font-size: 1.5em">:bulb:</span> **Merksatz:** CQRS bedeutet nicht zwingend zwei Datenbanken – oft genügt eine andere Tabellenstruktur für Lesedaten, um erhebliche Vorteile zu erzielen.

*Wir haben nun das Backend (DDD) und seine Datenhaltung verstanden. Zeit, auf die andere Seite zu schauen: das Frontend. Mit **Component Driven Design (CDD)** bauen wir Benutzeroberflächen genauso modular und wartbar wie das Backend.*

<div style="page-break-after: always;"></div>

---

# 4. Component Driven Design (CDD) – Frontend-Architektur

*Im Frontend gilt dieselbe Grundidee wie im Backend: Teile und herrsche. CDD überträgt den Modulgedanken auf die Benutzeroberfläche.*

Klassische Frontend-Entwicklung baute Seiten – und dann mehr Seiten. Jede Seite war ein Monolith: Button-Stile wurden kopiert, Formulare neu gebaut, Logik dreifach implementiert. CDD dreht das um: Zuerst entstehen wiederverwendbare **Komponenten**, aus denen dann Seiten *zusammengesetzt* werden.

## 4.1 Kernprinzipien des CDD

*CDD definiert, wie Komponenten entstehen und miteinander interagieren.*

- **Isolation:** Jede Komponente ist in sich abgeschlossen – sie funktioniert unabhängig von ihrer Umgebung.
- **Komposition:** Komplexe UI-Elemente entstehen durch das Zusammensetzen einfacherer Komponenten.
- **Wiederverwendbarkeit:** Eine einmal entwickelte Komponente kann in verschiedenen Kontexten eingesetzt werden.
- **Vergleich mit Page-based Development:** Im klassischen Ansatz denkt man in Seiten; im CDD denkt man in wiederverwendbaren Bausteinen.

## 4.2 Atomic Design – Die Komponentenhierarchie

*Atomic Design gibt dem CDD eine klare, hierarchische Struktur – von kleinsten Bauteilen bis zu fertigen Seiten.*

- **Atoms:** Kleinste, nicht weiter teilbare UI-Elemente (z. B. Button, Input-Feld, Icon).
- **Molecules:** Sinnvolle Kombinationen von Atoms (z. B. ein Suchfeld = Input + Button).
- **Organisms:** Komplexe, eigenständige UI-Abschnitte aus mehreren Molecules (z. B. Navigationsleiste, Produktkarte).
- **Templates:** Layout-Gerüste, die zeigen, wie Organisms auf einer Seite angeordnet sind – ohne echte Inhalte.
- **Pages:** Das fertige Resultat – Templates, befüllt mit echten Inhalten und Daten.

## 4.3 Smart vs. Dumb Components

*Die wichtigste Trennung im CDD: Wer holt Daten, und wer zeigt Daten an?*

- **Dumb Components (Presentational):** Reine Anzeige-Komponenten – erhalten Daten via Properties, kümmern sich nicht um deren Herkunft.
- **Smart Components (Container):** Wissen, woher Daten kommen – rufen APIs auf, verwalten den State und reichen Daten an Dumb Components weiter.
- **Warum die Trennung wichtig ist:** Dumb Components sind leicht testbar, wiederverwendbar und einfach zu verstehen; Smart Components kapseln die Komplexität.
- **Faustregel:** So wenige Smart Components wie möglich, so viele Dumb Components wie möglich.

> <span style="font-size: 1.5em">:bulb:</span> **Merksatz:** Eine Dumb Component ist wie ein Formular-Vordruck – sie weiß nicht, wer sie ausfüllt, aber sie sieht immer gleich aus.

*Backend und Frontend sind nun konzeptionell ausgearbeitet. Doch wie kommunizieren diese beiden Welten miteinander, ohne sich gegenseitig zu blockieren? Die Antwort liegt in einer durchdachten **API-Strategie**.*

<div style="page-break-after: always;"></div>

---

# 5. APIs als Bindeglied zwischen Frontend und Backend

*DDD und CDD entstehen oft in getrennten Teams – damit sie trotzdem reibungslos zusammenarbeiten, braucht es klare, stabile Verträge: die APIs.*

Eine API (Application Programming Interface) ist der Vertrag zwischen zwei Systemen. Sie definiert, was angeboten wird, in welchem Format und unter welchen Bedingungen. Je klarer dieser Vertrag, desto unabhängiger können Frontend- und Backend-Team arbeiten.

## 5.1 API-Arten und ihre Einsatzbereiche

*Je nach Anwendungsfall eignen sich unterschiedliche API-Stile – die richtige Wahl hängt von den Anforderungen der Konsumenten ab.*

- **REST (OpenAPI):** Ressourcenorientiert, weit verbreitet, gut für Standard-CRUD-Operationen und einfachere Domänen.
- **GraphQL:** Anfrage-flexibel – der Client bestimmt exakt, welche Felder er benötigt; ideal bei komplexen Frontend-Komponenten (kein Over-Fetching).
- **Event-basiert (AsyncAPI):** Für Echtzeit-Szenarien und asynchrone Kommunikation, z. B. Benachrichtigungen oder Live-Updates.
- **gRPC:** Binärprotokoll für hochperformante Service-zu-Service-Kommunikation im Backend.

## 5.2 API-First & Consumer-Driven Contracts

*Wer zuerst die API definiert, ermöglicht parallele Entwicklung – wer zuletzt definiert, bremst das gesamte Team.*

- **API-First:** Die API-Spezifikation wird *vor* der Implementierung erstellt und dient als Vertrag für beide Seiten.
- **OpenAPI / Swagger:** Standardformat zur maschinenlesbaren Beschreibung von REST-APIs; ermöglicht automatische Code-Generierung und Dokumentation.
- **AsyncAPI:** Äquivalent zu OpenAPI für ereignisbasierte APIs (Message Broker, WebSockets).
- **Consumer-Driven Contracts:** Das Frontend (Consumer) definiert, welche Daten es benötigt – das Backend (Provider) verpflichtet sich, diese zu liefern.
- **Vorteil:** Frontend- und Backend-Team können gleichzeitig entwickeln, sobald der Vertrag steht.

## 5.3 Das BFF-Pattern (Backend for Frontend)

*Manchmal passt das Backend-Modell nicht direkt zur Darstellung im Frontend – das BFF löst dieses Impedance-Mismatch.*

- **Was ist das BFF?** Ein schlanker, frontend-spezifischer Adapter-Service zwischen dem DDD-Backend und dem CDD-Frontend.
- **Aufgaben des BFF:** Aggregiert Daten aus mehreren Backend-Services, transformiert DDD-Domänenobjekte in frontend-freundliche ViewModels, implementiert Authentifizierungslogik.
- **Vorteil:** Das Domänen-Backend bleibt sauber und domänenzentriert; das Frontend bekommt genau das, was es braucht.
- **BFF pro Frontend-Typ:** In der Praxis gibt es oft ein BFF für die Web-App und ein separates für die Mobile-App.
- **Verhältnis zu GraphQL:** GraphQL kann als BFF dienen, da der Client flexibel Daten zusammenstellen kann.

> <span style="font-size: 1.5em">:bulb:</span> **Merksatz:** API-First bedeutet: Die Schnittstelle ist der Vertrag – Code auf beiden Seiten ist lediglich die Erfüllung dieses Vertrags.

*Wir haben nun alle Einzelteile kennengelernt: DDD für das Backend, Datenbankdesign, CDD für das Frontend und APIs als Verbindungsschicht. Im letzten Kapitel fügen wir alles zu einer modernen, agilen Gesamtarchitektur zusammen – der **Vertical Slice Architektur**.*

<div style="page-break-after: always;"></div>

---

# 6. Vertical Slice Architektur – Alles zusammenführen

*Eine modulare Architektur ist nur dann wirklich agil, wenn auch die Code-Organisation Änderungen an einem Feature ermöglicht, ohne dabei andere Features zu berühren. Genau hier setzt die Vertical Slice Architektur an.*

Stellen Sie sich ein Hochhaus vor, bei dem alle Elektro-Leitungen auf einem Stockwerk liegen, alle Wasserleitungen auf einem anderen und alle tragenden Wände auf einem dritten. Eine Renovierung eines einzelnen Apartments erfordert dann Arbeiten auf allen drei Etagen. Die Vertical Slice Architektur dreht das um: Alles, was zu einem Feature gehört, liegt an einem Ort – von der Datenbank bis zur UI.

## 6.1 Das Problem klassischer Schichtenarchitektur

*Horizontale Schichten (Lagen) fördern technische Trennung – aber behindern fachliche Unabhängigkeit.*

- **Typische Schichten:** Präsentation → Anwendungslogik → Domänenlogik → Datenzugriff → Datenbank.
- **Das Problem:** Eine neue Funktion erfordert Änderungen in *jeder* Schicht, oft in separaten Modulen oder Repositories.
- **Kopplung über Schichtgrenzen:** Teams werden nach Technologie (Frontend-Team, Backend-Team, DBA-Team) organisiert – statt nach Fachfunktionen.
- **Feature-Envy:** Änderungen an einem Feature berühren Klassen, die konzeptionell zu anderen Features gehören.

## 6.2 Feature-basierte Code-Organisation mit Vertical Slices

*Vertical Slices organisieren Code nach Geschäftsfunktionen – jedes Feature ist ein in sich geschlossener Schnitt durch alle Schichten.*

- **Ein Slice = ein Feature:** Z. B. „Warenkorb hinzufügen" enthält API-Endpunkt, Anwendungslogik, Domänenzugriff und Datenbankabfrage an einem Ort.
- **Unabhängigkeit:** Ein Feature kann entwickelt, getestet und deployt werden, ohne andere Features zu berühren.
- **Klare Grenzen:** Slices kommunizieren miteinander nur über definierte Schnittstellen (APIs, Domain Events).
- **Bezug zu DDD:** Bounded Contexts definieren die großen Grenzen; Vertical Slices strukturieren den Code innerhalb eines Contexts.
- **Bezug zu APIs:** Jeder Slice exponiert seine Funktionalität über die vereinbarten API-Verträge (OpenAPI, AsyncAPI).

## 6.3 Architekturwahl nach Domänen-Typ

*Nicht jeder Teil eines Systems ist gleich komplex – die Architektur sollte dem Rechnung tragen.*

- **Core Domain → Clean Architecture / Hexagonale Architektur:** Höchster Aufwand, stärkste Isolation der Domänenlogik, klare Ports & Adapters.
- **Supporting Domain → Einfachere Schichtenarchitektur:** Weniger komplex, CRUD-nah, schneller umsetzbar.
- **Generic Domain → Standard-Lösungen oder externe Services:** Z. B. Authentifizierung über Keycloak, E-Mail über SendGrid.
- **Konsequenz:** Verschiedene Slices können unterschiedliche interne Architekturen haben – solange die äußeren Grenzen (APIs) sauber sind.

## 6.4 Vertical Slices & AI-Assisted Development

*Die Kombination aus Vertical Slices, DDD und CDD ist besonders leistungsstark, wenn KI-Werkzeuge wie GitHub Copilot in die Entwicklung eingebunden werden.*

- **Klarer Kontext für die KI:** Wenn ein Feature an einem Ort liegt, kann die KI den gesamten Kontext eines Slices auf einmal erfassen.
- **Feste API-Verträge:** Die KI kann Code generieren, der den definierten Schnittstellen entspricht, ohne das Gesamtsystem zu kennen.
- **Weniger Halluzinationen:** Klare Grenzen und Ubiquitous Language helfen der KI, relevanten Code zu erzeugen statt generischer Muster.
- **Iterative Entwicklung:** Slices können Sprint für Sprint hinzugefügt werden – jeder Slice ist ein abgeschlossener, lieferbarer Beitrag zum System.

> <span style="font-size: 1.5em">:bulb:</span> **Merksatz:** Vertical Slices + DDD + CDD + API-First = ein System, das sowohl für Menschen als auch für KIs verständlich, erweiterbar und testbar ist.

---

> <span style="font-size: 1.5em">:mag:</span> **Vertiefung:** Die in diesem Skript beschriebene Architektur ist kein starres Regelwerk, sondern ein Werkzeugkasten. In realen Projekten werden diese Muster kombiniert, angepasst und pragmatisch eingesetzt – immer mit dem Ziel, ein System zu schaffen, das die fachlichen Anforderungen optimal erfüllt und langfristig wartbar bleibt.
