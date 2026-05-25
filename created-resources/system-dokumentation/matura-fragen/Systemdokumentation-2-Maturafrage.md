# Maturafrage: Docs-as-Code in der Systemdokumentation

### Docs-as-Code: Prinzipien, Werkzeuge und KI-gestützter Einsatz

**Situatives Umfeld / Szenario:**
Ein Schülerteam hat im Rahmen seines Abschlussprojekts eine digitale Schulbibliothek entwickelt. Der Lehrer stellt bei der Abnahme fest, dass die gesamte Dokumentation in einem geteilten Word-Dokument liegt — ohne Versionierung, ohne Review-Prozess und mit mehreren widersprüchlichen Versionen im Umlauf. Sie fordert das Team auf, die Dokumentation auf den **Docs-as-Code**-Ansatz umzustellen und dabei auch moderne KI-Unterstützung verantwortungsvoll einzusetzen.

---

### AUFGABENSTELLUNG

**1. Reproduktion**
* Beschreiben Sie die **Grundidee und die Kernprinzipien** des Docs-as-Code-Ansatzes und nennen Sie seine Vorteile gegenüber klassischer Dokumentation in Office-Tools. Erläutern Sie außerdem, was **Diagram-as-Code** bedeutet, und vergleichen Sie die drei Werkzeuge **Mermaid**, **PlantUML** und **Graphviz** hinsichtlich ihrer Stärken, typischen Einsatzbereiche und ihrer Unterschiede bei der Integration.

**2. Transfer und Anwendung**
* Das Team möchte seinen Docs-as-Code-Workflow in die bestehende GitHub-Pipeline integrieren. Beschreiben Sie den **typischen Workflow** von der Dokumentationsaufgabe bis zur automatischen Veröffentlichung Schritt für Schritt. Erläutern Sie außerdem, welche **automatisierten Qualitätsprüfungen** in der CI-Pipeline sinnvoll sind und welche Teamregeln sicherstellen, dass die Dokumentation dauerhaft aktuell bleibt.

**3. Analyse und Reflexion**
* Das Team beginnt, KI-Tools zur Erstellung von Diagrammcode (Mermaid, PlantUML) und ADR-Entwürfen einzusetzen. Nach einigen Wochen stellt die Lehrerin fest, dass mehrere Kapitel im Betriebshandbuch inhaltlich falsch sind — die KI hat plausibel klingende, aber falsche Aussagen zu Sicherheitskonfigurationen generiert, die ohne fachliche Prüfung gemergt wurden. Analysieren Sie die Ursachen und Risiken dieses Problems und entwickeln Sie einen konkreten Regelkatalog für den sicheren KI-Einsatz im Docs-as-Code-Prozess.

---

### MUSTERANTWORTEN (Für die Prüferhand)

**Musterantwort zu 1 (Reproduktion):**

* **Kernaussage:** Beim Docs-as-Code-Ansatz wird Dokumentation wie Software behandelt — sie liegt im Repository, wird versioniert, getestet und per Review verbessert.

* **Kernprinzipien:**
  1. Dokumentation liegt als Textdateien (z. B. `Markdown`) im Git-Repository.
  2. Änderungen laufen über Branches, Pull Requests und Reviews.
  3. Qualität wird automatisiert geprüft (z. B. Link-Checks, Style-Regeln).
  4. Veröffentlichung erfolgt reproduzierbar über CI/CD.

* **Vorteile gegenüber Office-Tools:**
  - Volle Nachvollziehbarkeit jeder Änderung (Git-History)
  - Bessere Zusammenarbeit zwischen Entwicklung und Betrieb
  - Weniger veraltete Dokumentation durch direkte Nähe zum Code
  - Einheitlicher Qualitätsstandard im gesamten Team

  > **Merksatz:** Docs-as-Code bedeutet nicht „mehr Dokumentation", sondern „bessere und wartbare Dokumentation".

* **Diagram-as-Code:** Diagramme werden nicht als Bilddateien (PNG/SVG) abgelegt, sondern als textueller Quellcode beschrieben, versioniert, gereviewt und automatisch in Grafiken umgewandelt — genauso wie Dokumentationstext oder Programmcode.

* **Werkzeugvergleich:**

| Werkzeug | Stärken | Typischer Einsatz | Integration |
|----------|---------|-------------------|-------------|
| **Mermaid** | Direkte Markdown-Integration, kein separates Tool nötig | Flowcharts, Sequenz- und Ablaufdiagramme in README und Lernskripten | Native GitHub/GitLab-Unterstützung, JavaScript im Browser |
| **PlantUML** | Sehr breite UML-Abdeckung (alle Typen), IDE-Integration | UML-Klassendiagramme, C4-Architektur, formale Spezifikationen | Java-Server oder lokal, IDE-Plugins |
| **Graphviz** | Exzellent für automatisch layoutete Graphen | Abhängigkeitsgraphen, Deployment-Diagramme, CI-Visualisierungen | Kommandozeilenwerkzeug, CI-Pipelines |

  > **Merksatz:** Diagram-as-Code ermöglicht, dass Diagramme denselben Review- und Versionierungsprozess durchlaufen wie Code und Text — das erhöht Qualität und Aktualität der Dokumentation erheblich.

---

**Musterantwort zu 2 (Transfer und Anwendung):**

* **Typischer Docs-as-Code-Workflow (Schritt für Schritt):**

  1. Aufgabe im Ticket-System anlegen (z. B. „Runbook für Backup-Restore ergänzen").
  2. Branch erstellen und Dokument ändern.
  3. Pull Request mit klarer Beschreibung und Review-Checklist öffnen.
  4. Fachliches und sprachliches Review durchführen.
  5. Nach Merge: automatische Veröffentlichung der Dokumentation über CI/CD (z. B. MkDocs-Build und Publish).

* **Sinnvolle automatisierte Qualitätsprüfungen in der CI-Pipeline:**

  | Check | Zweck |
  |-------|-------|
  | **Link-Check** | Kaputte interne und externe Links erkennen |
  | **Style-Check** | Einheitliche Schreibweisen und Glossarbegriffe prüfen |
  | **Struktur-Check** | Überschriftenhierarchie und Inhaltsverzeichnis-Konsistenz |
  | **Build-Check** | Dokumentation muss fehlerfrei generierbar sein |

* **Teamregeln für dauerhaft aktuelle Dokumentation:**
  1. Jede relevante Codeänderung enthält, wenn nötig, ein Doku-Update.
  2. Pull Requests gelten erst als „fertig", wenn alle Doku-Checks grün sind.
  3. Veraltete Abschnitte werden aktiv markiert oder entfernt.
  4. Jede Feature-Story enthält ein Doku-Akzeptanzkriterium.

  > **Merksatz:** Der größte Vorteil von Docs-as-Code ist nicht das Tool, sondern der verbindliche Teamprozess.

---

**Musterantwort zu 3 (Analyse und Reflexion):**

* **Problematik:** KI-Tools wurden ohne ausreichende Leitplanken in den Docs-as-Code-Prozess eingebunden. KI-generierte Entwürfe wurden ohne fachliche Prüfung direkt gemergt. Das Problem hat zwei Ursachen: **Halluzinationen** (plausibel klingende, aber faktisch falsche Aussagen) und das Fehlen eines verbindlichen Review-Prozesses für KI-Beiträge.

* **Auswirkung:** Falsche Sicherheitskonfigurationen im Betriebshandbuch können im Ernstfall zu Sicherheitslücken führen. Darüber hinaus entsteht **Scheingenauigkeit** — sehr flüssige KI-Texte wirken korrekt, obwohl Quellen fehlen oder Aussagen veraltet sind. Das Vertrauen in die gesamte Dokumentation wird untergraben.

* **Lösung — Regelkatalog für sicheren KI-Einsatz im Docs-as-Code:**

  | Regel | Beschreibung |
  |-------|-------------|
  | **Kein Blind-Merge** | KI-generierte Dokumentation wird immer von Menschen fachlich geprüft |
  | **Quellenpflicht** | Kritische Aussagen (Sicherheit, Compliance, Betrieb) brauchen nachvollziehbare Primärquellen |
  | **Datenklassifikation** | Keine Secrets, Zugangsdaten oder personenbezogenen Daten in Prompts |
  | **Prompt-Härtung** | Externe Inputs (z. B. fremde Tickets, Dokumente) als potenziell gefährlich behandeln |
  | **Nachvollziehbarkeit** | KI-Beiträge im PR transparent kennzeichnen (z. B. „AI-assisted draft") |
  | **Risikobasierte Freigabe** | Für sensible Kapitel (Security, Betrieb) strengere Review-Regeln anwenden |

  > **Merksatz:** KI darf den Review-Prozess nicht ersetzen. Bei sicherheits- oder betriebsrelevanten Inhalten ist menschliche Freigabe verpflichtend.
