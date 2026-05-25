# Maturafrage: Systemdokumentation

### Systemdokumentation im Softwareprojekt: Überblick, Rolle von arc42 und ARD's

**Situatives Umfeld / Szenario:**
Ein Entwicklungsteam arbeitet seit einem Jahr an einem digitalen Bibliotheksverwaltungssystem. Kurz vor dem Go-Live stellt der neue Systemadministrator fest, dass er sich nicht zurechtfindet: Es gibt zwar Code und ein paar Notizen im Wiki, aber keine strukturierte Systemdokumentation. Weder die Architekturentscheidungen noch die API-Verträge oder die Betriebsabläufe sind nachvollziehbar dokumentiert. Das Projektmanagement beauftragt Sie, die fehlende Dokumentation aufzubauen und dabei einen modernen, wartbaren Ansatz zu wählen.

---

### AUFGABENSTELLUNG

**1. Reproduktion**
* Nennen und beschreiben Sie die wesentlichen Dokumentationsarten, die zu einer vollständigen Systemdokumentation gehören. Ordnen Sie diese den Phasen des Softwarelebenszyklus zu (Planung, Architektur, API, Betrieb). 

**2. Transfer und Anwendung**
* Das Team möchte die Architekturdokumentation mit `arc42` und `ADR`s aufbauen. Erklären Sie, welche Kernbereiche `arc42` abdeckt, wozu `ADR`s dienen und wie beide Artefakte im Projektalltag zusammenspielen. 

**3. Analyse und Reflexion**
* Nach dem Go-Live zeigt sich ein neues Problem: Die Architekturdokumentation (arc42) wurde zu Projektbeginn sorgfältig erstellt, wurde aber während der Sprints nicht aktualisiert. Mehrere Architekturentscheidungen wurden mündlich getroffen und sind nirgends festgehalten. Außerdem fehlen aktuelle Informationen zu den Umgebungsunterschieden zwischen Dev, Staging und Production. Analysieren Sie die Ursachen und Auswirkungen dieser Situation und entwickeln Sie einen konkreten Maßnahmenplan zur Behebung.

---

### MUSTERANTWORTEN (Für die Prüferhand)

**Musterantwort zu 1 (Reproduktion):**

* **Kernaussage:** Systemdokumentation begleitet den gesamten Lebenszyklus eines Softwaresystems — von der ersten Anforderung bis zum stabilen Betrieb.

* **Dokumentationsarten nach Projektphase:**

| Phase | Dokumentationsart | Beispiele |
|-------|-------------------|-----------|
| **Planung & Requirements** | Vision & Scope, Backlog, Kontext, Glossar | User Stories, Akzeptanzkriterien, Kontextdiagramm, Ubiquitous Language |
| **Architektur** | arc42, ADR, Diagramme | Bausteinsicht, Laufzeitsicht, Verteilungssicht, Entscheidungslog |
| **API** | OpenAPI, AsyncAPI, GraphQL-Schema | REST-Endpunkte, Event-Channels, selbstdokumentierendes Typensystem |
| **DevOps & Infrastruktur** | IaC-Dokumentation, Pipeline-Doku, Environment-Matrix | Container-READMEs, CI/CD-Stage-Beschreibungen, Konfigurationsregeln |
| **Betrieb** | Betriebshandbuch, Runbooks, Backup/Recovery | Installationsanleitung, Monitoring-Schwellenwerte, RTO/RPO-Definition |

---

**Musterantwort zu 2 (Transfer und Anwendung):**

* **Kernbereiche von arc42:**

| Bereich | Beschreibung |
|---------|--------------|
| **Kontextabgrenzung** | Welche externen Systeme und Rollen wirken auf das System? |
| **Bausteinsicht** | Welche Komponenten gibt es und welche Verantwortung haben sie? |
| **Laufzeitsicht** | Wie interagieren Bausteine in konkreten Szenarien? |
| **Verteilungssicht** | Wie sind Komponenten auf Infrastruktur und Umgebungen verteilt? |

* **ADRs (Architecture Decision Records):** Dokumentieren einzelne, wichtige Architekturentscheidungen in Kurzform. Typische Struktur: Status (Proposed/Accepted/Deprecated), Kontext (Ausgangslage), Entscheidung (gewählte Option), Konsequenzen (positive und negative Folgen).

* **Zusammenspiel im Projektalltag:**
  1. **Sprint 0 / Projektstart:** arc42 wird als Rohgerüst aufgestellt — Kontextabgrenzung, Lösungsstrategie, erste Bausteinübersicht.
  2. **Während der Sprints:** Entwickler treffen Architekturentscheidungen und dokumentieren diese laufend als ADRs (z. B. „Auth über BFF statt direkter Frontend-Keycloak-Integration").
  3. **Regelmäßige Konsolidierung:** arc42 wird nach jedem Release aktualisiert, ADRs werden darin referenziert.

  > **Merksatz:** arc42 ist das Haus-Handbuch — ADRs sind die Handwerkerlisten, die erklären, wie einzelne Räume entstanden.

---

**Musterantwort zu 3 (Analyse und Reflexion):**

* **Problematik:** Das Team hat arc42 als einmaligen Projektstart-Artefakt behandelt, statt es als lebendes Dokument zu pflegen. Architekturentscheidungen wurden mündlich getroffen und nicht als ADRs festgehalten. Die Environment-Matrix wurde nie erstellt, weshalb Unterschiede zwischen Dev, Staging und Production nur implizit bekannt sind.

* **Auswirkung:**
  - Neue Teammitglieder und der Systemadministrator können Entscheidungen nicht nachvollziehen — das Wissen steckt nur in den Köpfen einzelner Personen.
  - Ohne ADRs werden Architekturentscheidungen bei Teamwechseln verloren; es entstehen widersprüchliche Erwartungen und ungewollte Doppelentscheidungen.
  - Fehlende Environment-Matrix führt zu Konfigurationsfehlern beim Deployment, da Unterschiede zwischen Umgebungen (Secrets, Datenbankverbindungen, Deployment-Frequenz) nicht transparent sind.

* **Lösung — konkreter Maßnahmenplan:**
  1. **Rückwirkende ADR-Erstellung:** Wichtige mündlich getroffene Entscheidungen identifizieren (z. B. Auth-Flow, Framework-Wahl) und nachträglich als ADRs mit Status `Accepted` dokumentieren.
  2. **arc42-Review einplanen:** arc42 in regelmäßigen Abständen (z. B. quartalsweise oder nach jedem Release) konsolidieren und mit den neu erstellten ADRs verknüpfen.
  3. **Environment-Matrix anlegen:** Die Unterschiede zwischen Dev, Staging und Production in einer strukturierten Tabelle festhalten — Ziel, Daten, Deployment-Frequenz, Secrets, Monitoring.
  4. **Docs-as-Code-Prozess etablieren:** Alle Dokumentationsartefakte (arc42, ADRs, Environment-Matrix) im Repository als Markdown-Dateien ablegen, sodass Änderungen über Pull Requests reviewed und versioniert werden — Dokumentation wird damit zum Pflichtbestandteil jedes Sprints.
