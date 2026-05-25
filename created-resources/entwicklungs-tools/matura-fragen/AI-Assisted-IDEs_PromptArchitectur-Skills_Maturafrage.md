# Maturafragen: KI-gestützte Entwicklungsumgebungen

## Aufgabe 2: Prompt-Architektur und Skills

### Prompt-Architektur und Skills in KI-Coding-Assistenten

**Situatives Umfeld / Szenario:**
Eine Schülerin bereitet sich auf die Abschlussprüfung ihres IT-Projekts vor und möchte GitHub Copilot optimal für die Entwicklung einsetzen. Ihr Projektbetreuer erklärt ihr, dass sie durch das Verständnis der internen Prompt-Architektur und den gezielten Einsatz von **Skills** die Qualität der KI-Antworten deutlich steigern kann. Sie soll nun die technischen Grundlagen erläutern und zeigen, wie Skills praktisch eingesetzt werden.

---

### AUFGABENSTELLUNG

**1. Reproduktion**
* Erläutern Sie den Unterschied zwischen **System Prompt** und **User Prompt** in der Kommunikation mit einem KI-Coding-Assistenten. Nennen Sie jeweils alle Bestandteile der beiden Prompt-Teile und beschreiben Sie, was ein **Skill** ist, wie er aufgebaut ist und an welcher Stelle er in das Kontextfenster injiziert wird.

**2. Transfer und Anwendung**
* Die Schülerin möchte einen wiederverwendbaren **Skill** für Code-Reviews in ihrem Projekt einsetzen. Erklären Sie, wann und wie ein Skill vom KI-Assistenten geladen wird, und beschreiben Sie, welche Vorteile diese Art der Kontextbereitstellung gegenüber dem dauerhaften Einbinden über Custom Instructions bietet.

**3. Analyse und Reflexion**
* Im Projektverlauf stellt die Schülerin fest, dass ihre Custom Instructions immer länger werden — sie hat projektweite Coding-Standards, Framework-Guidelines und Testing-Regeln allesamt in einer einzigen `copilot-instructions.md` zusammengefasst. Die KI-Antworten werden zunehmend inkonsistent und ignorieren einzelne Regeln. Analysieren Sie die Ursache dieses Problems, benennen Sie den Fachbegriff dafür und entwickeln Sie eine strukturierte Lösung.

---

### MUSTERANTWORTEN (Für die Prüferhand)

**Musterantwort zu 1 (Reproduktion):**

* **Kernaussage:** System Prompt = *Wie soll die KI sein?* — User Prompt = *Was soll die KI jetzt tun?*

* **Bestandteile des System Prompts:**

| # | Abschnitt | Beschreibung |
|---|-----------|--------------|
| 1 | **Kernidentität & Globale Regeln** | Definiert die allgemeine Rolle des Agenten |
| 2 | **Modellspezifische Anweisungen** | Regeln, die spezifische Eigenschaften des LLM korrigieren |
| 3 | **Anweisungen zur Werkzeugnutzung** | Erklärt die Verwendung interner Tools |
| 4 | **Anweisungen zum Ausgabeformat** | Legt fest, wie die Antwort formatiert sein muss |

* **Bestandteile des User Prompts:**

| # | Teil | Inhalt |
|---|------|--------|
| 1 | **Kontextinformationen** | Zeitstempel, offene Terminals oder Dateien |
| 2 | **Editor-Kontext** | Inhalt manuell hinzugefügter Dateien (`#file:`, `#selection`) |
| 3 | **Benutzeranfrage** | Die eigentliche Nachricht des Nutzers |

* **Skills:** Wiederverwendbare Expertenbausteine mit eigenen Eingabe-/Ausgabe-Templates und Validierungslogik. Sie bringen spezifisches Expertenwissen als ladbare Bausteine und erscheinen als **ergänzender Kontext im User Prompt** — gezielt und kontextsparend. Sie werden **on-demand** geladen, sobald Kontext und Anfrage darauf hindeuten.

---

**Musterantwort zu 2 (Transfer und Anwendung):**

* Ein Skill wird **on-demand** geladen — nicht bei jeder Anfrage, sondern nur dann, wenn der aktuelle Kontext und die Benutzeranfrage darauf hindeuten, dass das Expertenwissen des Skills benötigt wird.

* **Injektionspunkt:** Der Skill erscheint als ergänzender Kontext im **User Prompt**, nicht im System Prompt. Damit wird er nur dann zum Kontextfenster hinzugefügt, wenn er tatsächlich relevant ist.

* **Vorteile gegenüber Custom Instructions:**
  - Custom Instructions werden bei **jeder** Anfrage mitgesendet und verbrauchen dauerhaft Platz im Kontextfenster.
  - Skills werden nur **bei Bedarf** geladen → das Kontextfenster bleibt für relevante Inhalte frei.
  - Skills verhindern *Context Rot* (schleichende Kontextverschmutzung), die entsteht, wenn zu viel irrelevanter Kontext das Kontextfenster füllt und die Wirkung einzelner Regeln verwässert.

---

**Musterantwort zu 3 (Analyse und Reflexion):**

* **Problematik:** Das Zusammenfassen aller Regeln in einer einzigen, sehr langen `copilot-instructions.md` führt zu **Context Rot** — schleichender Kontextverschmutzung. Je mehr Inhalt im Kontextfenster steht, desto mehr wird die Wirkung einzelner Regeln durch irrelevante Inhalte verdünnt.

* **Auswirkung:** Das LLM gewichtet alle Teile des Kontextfensters. Bei sehr langen Instructions verliert die KI den Fokus auf einzelne Regeln — manche werden ignoriert oder inkonsistent angewendet. Die Antwortqualität sinkt trotz korrekt definierter Standards.

* **Lösung:** Die Instructions modular aufteilen:
  1. **Globale `copilot-instructions.md`** auf ein Minimum reduzieren — nur projektübergreifende Kernregeln.
  2. **Sprachspezifische `.instructions.md`-Dateien** mit gezieltem `applyTo`-Glob-Pattern anlegen (z. B. `**/*.ts` für TypeScript-Regeln, `tests/**` für Testing-Regeln).
  3. **Umfangreiches Expertenwissen** (z. B. Framework-spezifische Guidelines) als **Skills** auslagern, die nur on-demand geladen werden.
  
  Damit gilt: Kleine, fokussierte Instructions-Dateien pro Thema sind leichter zu pflegen, und das Kontextfenster wird nur mit dem jeweils relevanten Kontext befüllt.

---

<br>

---