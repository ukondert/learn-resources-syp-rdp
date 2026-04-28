# Modul: Systemdokumentation & Moderne Dokumentationsprozesse

## 1. Einleitung

> <span style="font-size: 1.5em">:bulb:</span> **Sinn und Zweck:** Dieses Lernskript führt in die Welt der Systemdokumentation ein und beleuchtet moderne Ansätze wie "Docs-as-Code". Ziel ist es, ein tiefes Verständnis für die Notwendigkeit, Erstellung und Pflege qualitativ hochwertiger Dokumentation zu vermitteln, die sowohl technischen als auch nicht-technischen Stakeholdern dient. Besonderer Fokus liegt auf der Integration von Dokumentationsprozessen in agile Entwicklungsumgebungen.

### Aufbau des Dokuments

Dieses Dokument ist in mehrere Hauptkapitel unterteilt, die systematisch aufeinander aufbauen:

1.  **Einleitung:** Kurze Einführung in das Thema und den Aufbau des Skripts.
2.  **Dokumentation in der Planungs- & Requirementsphase:** Beleuchtet die Bedeutung der Dokumentation in den frühen Phasen der Softwareentwicklung, von Vision & Scope bis hin zu User Stories und dem Glossar.
3.  **Architektur-Dokumentation (Struktur & Entscheidungen):** Fokussiert auf die technischen Aspekte der Dokumentation, inklusive `arc42`-Template, `Architecture Decision Records (ADR)` und Visualisierung mit `Mermaid`/`PlantUML` und dem `C4-Modell`.
4.  **API-Spezifikationen (Die Verträge):** Behandelt die Dokumentation von Schnittstellen, wie `OpenAPI` für `REST`, `AsyncAPI` für `Event-driven` Architekturen und `GraphQL`-Introspektion.
5.  **DevOps- & Infrastruktur-Dokumentation:** Erklärt die Dokumentation von Build-, Deploy- und Infrastrukturprozessen mit `Infrastructure-as-Code (IaC)` und `Pipeline-Dokumentation`.
6.  **Das Betriebshandbuch (Operations Manual):** Beschreibt die Dokumentation für den Betrieb der Software, einschließlich Installationsanleitungen, Monitoring und `Runbooks`.
7.  **Der "Docs-as-Code" Ansatz:** Stellt die Philosophie vor, Dokumentation wie Quellcode zu behandeln und die dafür verwendeten Technologien und Tools.
8.  **Grenzen von Docs-as-Code & Compliance:** Diskutiert die Herausforderungen und Grenzen des "Docs-as-Code"-Ansatzes, insbesondere im Hinblick auf nicht-technische Stakeholder und rechtliche Compliance-Anforderungen.

Jedes Kapitel enthält Definitionen, Anwendungszwecke, Komponenten, Beispiele und Anwendungsfälle, um ein umfassendes Verständnis zu gewährleisten. Zudem werden Info-Boxen (`:bulb:`, `:warning:`, `:mag:`) verwendet, um wichtige Merksätze, Warnungen und Vertiefungsthemen hervorzuheben.


## 2. Dokumentation in der Planungs- & Requirementsphase
*Auch wenn die Techniken des Requirements Engineering bekannt sind, müssen die Ergebnisse revisionssicher und kollaborativ festgehalten werden.*
* **Vision & Scope Document:** Das „Warum“ des Projekts kurz und knapp.
* **Product Backlog & User Stories:** Dokumentation von funktionalen Anforderungen im Ticket-System (Jira, GitHub Issues).
* **System-Kontext-Diagramm:** (Häufig der Einstieg in arc42) – Wer sind die Nachbarsysteme und Nutzer?
* **Glossar (Domain Language):** Festhalten der Begriffe aus dem DDD (Ubiquitous Language), um Missverständnisse zwischen Devs und Business zu vermeiden.

## 3. Architektur-Dokumentation (Struktur & Entscheidungen)
*Hier geht es darum, das „Wie“ und „Warum“ der technischen Lösung festzuhalten.*
* **arc42 Template:** Die Strukturierungshilfe. Fokus auf:
    * **Laufzeitsicht:** Wie interagieren Komponenten (z. B. via Events oder REST)?
    * **Bausteinsicht:** Statische Hierarchie der Software.
* **ADR (Architecture Decision Records):**
    * **Konzept:** Jede wichtige Entscheidung (z. B. „Wir nutzen GraphQL statt REST“) bekommt ein kurzes Textfile.
    * **Struktur:** Status, Kontext, Entscheidung, Konsequenzen.
* **Visualisierung (Diagrams-as-Code):**
    * Einsatz von **Mermaid** oder **PlantUML** für Sequenz- und Klassendiagramme.
    * **C4-Modell:** Abstraktionsebenen vom System-Kontext bis zum Code.

## 4. API-Spezifikationen (Die Verträge)
*Dokumentation, die gleichzeitig als Code-Grundlage dient.*
* **REST:** OpenAPI (Swagger) – YAML/JSON Definitionen.
* **Event-driven:** AsyncAPI für Message-Broker-Strukturen.
* **GraphQL:** Introspektion und Schema-Definitionen als lebende Dokumentation.

## 5. DevOps- & Infrastruktur-Dokumentation
*Wie wird die Software gebaut und verteilt?*
* **Infrastructure-as-Code (IaC) Docs:** Dokumentation von Docker-Build-Prozessen (READMEs in den Docker-Ordnern).
* **Pipeline-Dokumentation:** Visualisierung der GitHub Workflows (CI/CD-Stages: Linting -> Test -> Build -> Deploy).
* **Environment-Matrix:** Dokumentation der Umgebungen (Dev, Staging, Prod) und deren Konfiguration (Environment Variables).

## 6. Das Betriebshandbuch (Operations Manual)
*Was passiert, wenn die Software läuft? Zielgruppe: Systemadministratoren / SRE.*
* **Installationsanleitung:** Voraussetzungen (Ports, DB-Versionen).
* **Monitoring & Alerting:** Was bedeuten bestimmte Fehlermeldungen in den Logs? Wann muss jemand nachts aufstehen?
* **Backup & Recovery:** Wie werden Daten gesichert und im Ernstfall wiederhergestellt?
* **Runbooks / Playbooks:** Schritt-für-Schritt-Anleitungen für bekannte Standardprobleme.

## 7. Der "Docs-as-Code" Ansatz
* **Grundidee:** Dokumentation wird wie Source Code behandelt (Git, Pull Requests, Reviews).
* **Technologie-Stack:**
    * **Sprachen:** Markdown (Einfachheit), AsciiDoc (Komplexität/Bücher), Typst (Modernes PDF-Layout).
    * **Generatoren:** Sphinx (für Python/Allgemein), MkDocs (Material Design), Doxygen (Code-Level).

## 8. Grenzen von Docs-as-Code & Compliance
*Wann stößt der "Developer-Way" an seine Grenzen?*

| Merkmal | Docs-as-Code (Technik) | Management / Legal / Compliance |
| :--- | :--- | :--- |
| **Zielgruppe** | Entwickler, DevOps, Architekten | Auditoren, Juristen, Kunden, Management |
| **Tools** | IDE, Git, Markdown, CLI | Word, Excel, SharePoint, ERP-Systeme |
| **Revision** | Git-Historie (Commits) | Rechtssichere Archivierung, digitale Signaturen |
| **Inhalt** | Wie funktioniert es technisch? | Werden Gesetze (DSGVO) & Verträge eingehalten? |

* **Warum Docs-as-Code hier oft scheitert:**
    * **Kollaboration:** Nicht-Techniker können/wollen keine Pull Requests stellen.
    * **Rechtssicherheit:** Ein Git-Commit gilt vor Gericht oft weniger als ein freigegebenes, versioniertes PDF mit Zeitstempel.
    * **DSGVO/Compliance:** Dokumente wie das *Verzeichnis von Verarbeitungstätigkeiten (VVT)* erfordern oft Eingaben aus Fachabteilungen, die kein Markdown sprechen.

