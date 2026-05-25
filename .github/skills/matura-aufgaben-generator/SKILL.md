---
name: matura-aufgaben-generator
description: 'Erstellt kompetenzorientierte Prüfungsaufgaben für die mündliche Matura (Reifeprüfung) mit drei Kompetenzstufen (Reproduktion, Transfer, Analyse) und Musterantworten. Use when: Maturafrage erstellen, Prüfungsfrage generieren, mündliche Prüfung vorbereiten, Reifeprüfungsaufgabe, Maturaaufgabe, situatives Umfeld, Kompetenzorientierung, dreiteilige Aufgabe.'
argument-hint: 'Themenbereich und Stichwörter angeben, z.B. "Datenbankdesign, Normalisierung, Anomalien"'
---

# Matura-Aufgaben-Generator

## Ziel
Erzeugt strukturierte, lehrplankonforme Prüfungsaufgaben für die mündliche Matura mit drei aufbauenden Kompetenzstufen und vollständigen Musterantworten für die Prüferhand.

## Wann verwenden
- Mündliche Maturaprüfung vorbereiten
- Kompetenzorientierte Prüfungsfragen generieren
- Aufgaben mit situativem Umfeld / Fallbeispiel erstellen
- Dreiteilige Prüfungsstruktur (Reproduktion → Transfer → Analyse)

## Grundlegende Anforderungen

- **Situatives Umfeld:** Jede Aufgabe wird in ein konkretes, praxisnahes Szenario eingebettet.
- **Strikte Quellenbindung:** Nur vom Nutzer bereitgestellte Dokumente/Inhalte verwenden — keine externen Fakten halluzinieren.
- **Kompetenzorientierung:** Eigenständige Leistung gefordert, nicht bloße Reproduktion.

## Workflow

### Schritt 1 — Eingaben sammeln

Falls nicht über den Aufruf-Argument oder hochgeladene Dokumente bereits angegeben, den Nutzer fragen nach:
1. **Themenbereich** (z.B. „Datenbankdesign", „API-Architektur", „Agiles Projektmanagement")
2. **Einschränkende Stichwörter** (z.B. „Normalisierung, Anomalien, 3NF")
3. **Fachinhalt / Quelldokument** — entweder als Datei-Upload oder als Texteingabe

### Schritt 2 — Validierung

Sicherstellen, dass genügend Inhalt vorhanden ist, um alle drei Kompetenzstufen sauber abzubilden:
- Reproduktion: Gibt es definierbare Begriffe, Merkmale oder Klassifizierungen?
- Transfer: Gibt es einen anwendbaren Ablauf oder eine implementierbare Teilaufgabe?
- Analyse: Gibt es ein identifizierbares Problem, einen Fehler oder einen Sonderfall?

Falls eine Stufe nicht abdeckbar ist → Nutzer um zusätzlichen Fachinhalt bitten.

### Schritt 3 — Aufgabe generieren

Ausgabe exakt im vorgegebenen [Ausgabeformat](#ausgabeformat) erstellen.

### Schritt 4 — Iteration

Nach der Ausgabe anbieten:
- Variante mit anderem Szenario generieren
- Schwierigkeitsgrad anpassen
- Weitere Aufgabe zu einem neuen Thema erstellen

---

## Ausgabeformat

```markdown
### [TITEL DER AUFGABENSTELLUNG]

**Situatives Umfeld / Szenario:**
[Kurzes, realistisches Praxisszenario als Kontext für die Fragen]

---

### AUFGABENSTELLUNG

**1. Reproduktion**
* [Rein reproduktive Frage zu Merkmalen/Grundlagen des Themas]

**2. Transfer und Anwendung**
* [Anwendungsbezogene Aufgabe im Kontext des Szenarios]

**3. Analyse und Reflexion**
* [Analytische Frage zu einer Problemstellung/Gefahr im Szenario mit Lösungsauftrag]

---

### MUSTERANTWORTEN (Für die Prüferhand)

**Musterantwort zu 1 (Reproduktion):**
* **Kernaussage/Klassifizierung:** [Direkte Antwort]
* **Merkmale:** [Auflistung laut Quelldokumenten]
* **Vorteile / Nachteile:** [Auflistung laut Quelldokumenten]

**Musterantwort zu 2 (Transfer und Anwendung):**
* [Erwartete Erklärung der Umsetzung / Beschreibung der praktischen Lösung]

**Musterantwort zu 3 (Analyse und Reflexion):**
* **Problematik:** [Präzise Beschreibung des Problems im Szenario]
* **Auswirkung:** [Was passiert dadurch?]
* **Lösung:** [Konkreter Lösungsvorschlag zur Behebung des Problems]
```

---

## Kompetenzstufen — Kurzreferenz

| Stufe | Fokus | Typische Verben |
|-------|-------|-----------------|
| 1 – Reproduktion | Basiswissen, Definitionen, Klassifizierungen, Vor-/Nachteile | nennen, beschreiben, aufzählen, definieren |
| 2 – Transfer & Anwendung | Wissen auf Szenario anwenden, Implementierung erklären | anwenden, erklären, durchführen, umsetzen |
| 3 – Analyse & Reflexion | Problem/Fehler im Szenario analysieren und Lösung erarbeiten | analysieren, beurteilen, begründen, entwickeln |
