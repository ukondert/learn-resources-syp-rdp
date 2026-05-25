# Maturafragen: KI-gestützte Entwicklungsumgebungen

## Aufgabe 1: IDE-Vergleich, Skills und MCP-Server

### KI-gestützte Entwicklungsumgebungen: VSCode + GitHub Copilot vs. Google Antigravity

**Situatives Umfeld / Szenario:**
Ein Softwareentwicklungsteam eines mittelgroßen Unternehmens plant, KI-Coding-Assistenten in ihren Entwicklungsprozess zu integrieren. Das Team arbeitet mit VSCode und überlegt nun, ob es bei **VSCode + GitHub Copilot** bleibt oder auf **Google Antigravity** umsteigt. Zusätzlich möchte das Team die KI-Umgebung durch **Skills** und **MCP-Server** erweitern, um auf externe Datenquellen und Unternehmenssysteme zuzugreifen. Der Teamleiter bittet Sie, die technischen Unterschiede der beiden Plattformen zu erläutern und eine fundierte Empfehlung zu geben.

---

### AUFGABENSTELLUNG

**1. Reproduktion**
* Beschreiben Sie die grundlegenden Unterschiede zwischen **VSCode + GitHub Copilot** und **Google Antigravity** anhand der Kriterien Ansatz, Modi, Konfiguration und Stärken. Erläutern Sie außerdem, was **Skills** sind, wie sie in das Kontextfenster injiziert werden, und welche Funktion **MCP-Server** in der Agenten-Konfiguration erfüllen.

**2. Transfer und Anwendung**
* Das Team möchte einen spezialisierten **SW-Architekten-Agent** in VSCode + GitHub Copilot einrichten, der über einen internen MCP-Server auf das Unternehmens-Wiki zugreifen kann. Erläutern Sie, wie eine entsprechende `.agent.md`-Datei aufgebaut sein muss, und zeigen Sie anhand einer konkreten YAML-Konfiguration, wie MCP-Server und Tools eingebunden werden.

**3. Analyse und Reflexion**
* Im laufenden Betrieb stellt das Team fest, dass ihr SW-Architekten-Agent inkonsistente und widersprüchliche Antworten liefert — manchmal ignoriert er die definierten Clean-Architecture-Vorgaben aus den projektweiten Custom Instructions. Analysieren Sie die mögliche Ursache dieses Problems, beschreiben Sie die Auswirkungen und erarbeiten Sie eine konkrete Lösung.

---

### MUSTERANTWORTEN (Für die Prüferhand)

**Musterantwort zu 1 (Reproduktion):**

* **Vergleich der Plattformen:**

| Kriterium | VSCode + Copilot | Google Antigravity |
|-----------|------------------|--------------------|
| **Ansatz** | IDE-Erweiterung mit Chat | Vollständig agentenbasiert |
| **Modi** | Konfigurierbar via `.agent.md` | Strukturiert: Planning / Execution / Verification |
| **Konfiguration** | `.instructions.md`, `.agent.md` | `.gemini/`, `.agent/workflows/` |
| **Stärke** | VSCode-Ökosystem, MCP-Integration | Automatische Artifacts, parallele Tools |
| **Einstieg** | Niedrig (bekannte IDE) | Mittel (neues Konzept) |

* **Skills:** Wiederverwendbare Expertenbausteine mit eigenen Eingabe-/Ausgabe-Templates und Validierungslogik. Sie werden **on-demand** geladen, sobald Kontext und Anfrage darauf hindeuten, und erscheinen als **ergänzender Kontext im User Prompt** — gezielt und kontextsparend.

* **MCP-Server:** Model Context Protocol-Server erweitern die Fähigkeiten eines Agents auf externe Systeme und Datenquellen. In der `.agent.md`-Datei werden sie über `mcp-servers:` explizit aktiviert und über `tools: ['my-mcp-server/*']` für den Agent freigegeben.

---

**Musterantwort zu 2 (Transfer und Anwendung):**

Eine korrekte `.agent.md`-Konfiguration für den SW-Architekten-Agent mit MCP-Server-Anbindung:

```yaml
---
description: Erstellt Software-Architektur und Domain-Modelle
name: SW-Architekt
tools: ['search', 'usages', 'githubRepo', 'company-wiki/*']
model: Claude Sonnet 4
mcp-servers:
  - company-wiki
handoffs:
  - label: "→ Implementierung starten"
---

## Software Architecture Instructions

Du bist ein Software-Architekt. Folge Clean Architecture Prinzipien ...
```

Erklärung der relevanten Elemente:
- `mcp-servers: - company-wiki` aktiviert den MCP-Server explizit für diesen Agent.
- `tools: ['company-wiki/*']` gibt dem Agent Zugriff auf alle Tools des MCP-Servers.
- `handoffs` ermöglicht die sequentielle Übergabe an den nächsten Agent in der Entwicklungskette.

---

**Musterantwort zu 3 (Analyse und Reflexion):**

* **Problematik:** Die Agent-Anweisungen in der `.agent.md`-Datei des SW-Architekten konterkarieren oder ignorieren die in `copilot-instructions.md` definierten projektweiten Clean-Architecture-Vorgaben. Da Custom Agents im System Prompt **nach** den Custom Instructions eingefügt werden und damit die höchste Priorität besitzen, können widersprüchliche Agent-Anweisungen die globalen Standards überschreiben.

* **Auswirkung:** Der Agent liefert inkonsistente Architekturvorschläge, die nicht den Projektstandards entsprechen. Im schlimmsten Fall entstehen Implementierungen, die gegen die definierten Schichtengrenzen verstoßen und technische Schulden erzeugen.

* **Lösung:** Die Agent-Anweisungen müssen die globalen Custom Instructions **ergänzen**, nicht ersetzen. Konkret: In der `.agent.md` explizit auf die bestehenden Instructions referenzieren (z. B. `Wende die allgemeinen Coding-Standards aus den Projekt-Instructions an.`) und sicherstellen, dass keine widersprüchlichen Regeln definiert werden. Zusätzlich können spezifische `.instructions.md`-Dateien mit `applyTo: "src/domain/**"` für die Domain-Schicht erstellt werden, um die Clean-Architecture-Regeln schichtenspezifisch zu verstärken.
