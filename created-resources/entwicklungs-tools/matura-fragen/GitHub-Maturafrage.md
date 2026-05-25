# Maturafragen – GitHub im agilen Projekt

---

### GITHUB-SETUP FÜR EIN AGILES SCHULPROJEKT

**Situatives Umfeld / Szenario:**
Eine Schülergruppe startet das SYP-Projekt „Schulbibliotheks-System". Das fünfköpfige Team arbeitet agil nach Scrumban. Entwicklerin Anna wird beauftragt, das GitHub-Repository einzurichten, den Entwicklungsworkflow zu definieren und sicherzustellen, dass kein ungeprüfter Code auf den `main`-Branch gelangt. Nach zwei Wochen stellt die Projektleiterin fest, dass ein Teammitglied direkt auf `main` gepusht hat und dabei fehlerhafte Änderungen das lauffähige System zerstört haben.

---

### AUFGABENSTELLUNG

**1. Reproduktion**
* Nenne die drei grundlegenden Dateien, die in jedem professionellen GitHub-Repository vorhanden sein sollten, und beschreibe den Zweck jeder einzelnen Datei. Erkläre zusätzlich, warum Secrets (Passwörter, API-Keys) niemals in ein Repository gelangen dürfen und wie man dies technisch verhindert.

**2. Transfer und Anwendung**
* Anna soll das GitHub Project Board für den Scrumban-Workflow der Schulbibliothek einrichten. Erkläre, welche Spalten (Status-Felder) das Board haben soll, welche Custom Fields sinnvoll sind und wie mindestens zwei Board-Automationen das Team bei der täglichen Arbeit entlasten können.

**3. Analyse und Reflexion**
* Analysiere, durch welche GitHub-Konfiguration ein direkter Push auf `main` verhindert werden kann. Was kann durch eine solche Konfiguration verhindert werden. Beschreibe, wie sich der korrekte Entwicklungsworkflow dadurch ändert und erkläre die Auswirkungen, die eine solche fehlende Konfiguration auf die Codequalität hat.

---

### MUSTERANTWORTEN (Für die Prüferhand)

**Musterantwort zu 1 (Reproduktion):**

| Datei | Zweck |
|---|---|
| **README.md** | Das „Türschild" des Projekts – wird auf der Repository-Startseite angezeigt; enthält Projektbeschreibung, Technologie-Stack, Voraussetzungen, Schnellstart-Anleitung und Teamübersicht. Neue Mitglieder können das Projekt eigenständig aufsetzen, ohne jemanden fragen zu müssen. |
| **.gitignore** | Legt fest, welche Dateien und Verzeichnisse Git **nicht** verwalten soll (Build-Ausgaben wie `target/`, IDE-Konfigurationen wie `.idea/`, Betriebssystemdateien wie `.DS_Store`). Ohne sie würden kompilierte Klassen oder sensible Konfigurationen versehentlich ins Repository gelangen. |
| **CONTRIBUTING.md** | Die „Hausregeln" des Teams – beschreibt den Entwicklungsworkflow, die Branch-Namenskonvention, die Commit-Konvention (Conventional Commits) und Codequalitätsregeln. Stellt sicher, dass alle Teammitglieder nach denselben Regeln arbeiten. |

* **Secrets-Schutz:**
  * Secrets (Passwörter, API-Keys, Zugangsdaten) dürfen **niemals** in ein Repository gelangen – auch nicht in ein privates, da einmal committete Secrets aus der gesamten Git-Historie aufwändig entfernt werden müssen.
  * Technische Maßnahme: Lokale Konfigurationsdateien mit Passwörtern (z. B. `application-local.yml`, `*.env`) werden in der `.gitignore` eingetragen. Für CI/CD-Pipelines werden **GitHub Secrets** verwendet.

**Musterantwort zu 2 (Transfer und Anwendung):**

* **Spalten (Status-Felder) für Scrumban:**

| Spalte | Bedeutung |
|---|---|
| **Backlog** | Aufgaben, die noch nicht für den Sprint geplant sind |
| **To Do** | Im aktuellen Sprint geplant, noch nicht begonnen |
| **In Progress** | Aktiv in Entwicklung |
| **Code Review** | Pull Request offen, wartet auf Review |
| **Testing** | Feature fertig, wird getestet |
| **Done** | Abgeschlossen und gemergt |

* **Sinnvolle Custom Fields:**
  * **Priority** (Single Select): `High` 🔴, `Medium` 🟡, `Low` 🟢 – zur Priorisierung im Backlog
  * **Story Points** (Single Select): Fibonacci-Reihe `1, 2, 3, 5, 8, 13` – zur Aufwandsschätzung
  * **Bounded Context** (Single Select): `Ausleih`, `Anschaffung`, `Nutzerprofil` – zur fachlichen Zuordnung

* **Board-Automationen:**
  * **Neues Item hinzugefügt → Status: Backlog** – neue Issues landen automatisch im Backlog, ohne manuellen Eingriff.
  * **Issue geschlossen → Status: Done** – abgeschlossene Issues werden automatisch in die Done-Spalte verschoben.
  * **Pull Request geöffnet → Status: Code Review** – der Entwickler muss die Karte nicht manuell verschieben.

**Musterantwort zu 3 (Analyse und Reflexion):**

* **Konfiguration – Branch Protection Rules für `main`:**  
  Über **Settings → Rules → Rulesets** wird ein Ruleset für den `main`-Branch angelegt. Folgende Regeln verhindern direkte Pushes und erzwingen einen kontrollierten Entwicklungsworkflow:

| Regel | Wirkung |
|---|---|
| **Require a pull request before merging** | Kein direkter Push auf `main` möglich – Änderungen nur über Pull Request |
| **Required approvals (mind. 1)** | Mindestens ein Teammitglied muss den PR reviewen und approven |
| **Dismiss stale pull request approvals** | Ein Approval verfällt, wenn nach dem Review neue Commits gepusht werden |
| **Require status checks to pass** | CI-Tests müssen grün sein, bevor der Merge erlaubt wird |
| **Block force pushes** | `git push --force` auf `main` wird verhindert |

* **Was dadurch verhindert wird:**
  * Fehlerhafter Code gelangt nicht auf `main`, da CI-Checks vor dem Merge grün sein müssen.
  * Ungeprüfte Änderungen werden blockiert, da mindestens ein Approval erforderlich ist.
  * Verlust der Commit-Historie durch `force push` wird unterbunden.
  * Ohne diese Regeln sind alle CI-Status-Checks nur informativ – ein Merge ist auch bei roten Tests möglich.

* **Geänderter Entwicklungsworkflow durch Branch Protection:**
  1. Issue aus dem Backlog auswählen
  2. Feature-Branch nach Namenskonvention erstellen (z. B. `feature/42-mahnwesen-automation`)
  3. Entwicklung mit aussagekräftigen Commits nach Conventional Commits (`feat(domain): Add Mahnung entity`)
  4. Pull Request öffnen mit ausgefülltem PR-Template
  5. Code Review durch mindestens 1 Teammitglied – erst dann ist der Merge freigeschaltet
  6. Merge erst nach Approval **und** grünen CI-Checks

* **Auswirkungen fehlender Konfiguration auf die Codequalität:**
  * Direktpushes umgehen Code Reviews – Fehler und schlechte Designentscheidungen werden nicht erkannt.
  * `main` kann in einen nicht lauffähigen Zustand geraten, was das gesamte Team blockiert.
  * Die Nachvollziehbarkeit von Änderungen leidet, da kein Review-Trail existiert.
  * Code-Reviews als Lernmöglichkeit im Team entfallen vollständig.

* **Merksatz:** Branch Protection Rules sind kein Misstrauen gegenüber dem Team, sondern ein Sicherheitsnetz. Sie verhindern unbeabsichtigte Fehler und stellen sicher, dass `main` immer in einem lauffähigen Zustand ist.
