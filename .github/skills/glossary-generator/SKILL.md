---
name: glossary-generator
description: "Erstellt ein Glossar aller Fachbegriffe aus einem gegebenen Dokument und fügt es als neues Kapitel am Ende ein. Use when: Glossar erstellen, Fachbegriffe extrahieren, Glossar anhängen, Fachwörter dokumentieren, alphabetisches Glossar, Fachausdrücke."
argument-hint: "Pfad zur Markdown-Datei, für die ein Glossar erstellt werden soll"
---

# Glossary Generator

## Was diese Skill leistet

Aus einem gegebenen Markdown-Dokument werden alle relevanten Fachbegriffe, Fremdwörter, Abkürzungen und Konzepte extrahiert und als alphabetisch sortiertes Glossar-Kapitel ans Ende des Dokuments angefügt.

## Wann verwenden

- Ein Lernskript oder Fachdokument soll ein Glossar erhalten
- Fachbegriffe aus einem Dokument sollen nachvollziehbar erklärt werden
- Alphabetisch geordnete Begriffsdefinitionen sollen einem Dokument hinzugefügt werden

## Vorgehensweise

### Schritt 1: Dokument analysieren

Lies das vollständige Dokument und identifiziere alle relevanten Begriffe:

- **Fachbegriffe** aus der Softwareentwicklung, Architektur, DevOps, etc.
- **Abkürzungen und Akronyme** (z. B. `ADR`, `IaC`, `CI/CD`, `RTO`, `RPO`)
- **Fremdsprachliche Konzepte** (z. B. englische Fachausdrücke im deutschen Text)
- **Methoden, Frameworks und Standards** (z. B. `arc42`, `OpenAPI`, `C4-Modell`)
- **Domänenspezifische Begriffe** (z. B. projektspezifisches Vokabular)

Ignoriere allgemeine Wörter wie "System", "Team", "Dokument" – außer sie haben eine spezifische, abweichende Bedeutung im Kontext.

### Schritt 2: Definitionen formulieren

Für jeden identifizierten Begriff:

1. Formuliere eine **präzise, kontextbezogene** Definition (1–4 Sätze)
2. Beziehe dich auf den Einsatzkontext im Dokument
3. Ergänze bei Bedarf einen Verweis auf das zugehörige Kapitel (z. B. `→ Kapitel 3.3`)
4. Bei Abkürzungen: Nenne zuerst die ausgeschriebene Form

### Schritt 3: Alphabetisch sortieren und strukturieren

Ordne alle Begriffe alphabetisch (A–Z). Gruppiere sie nach Anfangsbuchstaben mit folgendem Format:

```markdown
## X. Glossar

### A

**Begriff** 
Definition des Begriffs im Kontext des Dokuments.

---

### B

**Begriff**
Definition des Begriffs.

---
```

**Formatregeln:**
- Jeder Buchstabe wird als `### Buchstabe` Überschrift eingeführt
- Nach jedem Buchstabenblock folgt eine horizontale Trennlinie (`---`)
- Der letzte Buchstabenblock endet **ohne** abschließende `---`
- Begriffe innerhalb eines Buchstabens werden alphabetisch sortiert
- Begriff in **Fettschrift**, Definition in der Folgezeile (kein Abstand dazwischen)
- Zwischen zwei Begriffen desselben Buchstabens eine Leerzeile

### Schritt 4: Kapitelnummer bestimmen

Lies das bestehende Inhaltsverzeichnis oder die vorhandenen Kapitelüberschriften des Dokuments. Vergib die nächste freie Kapitelnummer für das Glossar.

Beispiel: Wenn das letzte Kapitel `## 9. ...` ist, dann wird das Glossar zu `## 10. Glossar`.

### Schritt 5: Glossar ans Dokument anfügen

Füge das Glossar am **Ende der Datei** an, getrennt durch:

```markdown
<div style="page-break-after: always;"></div>

## X. Glossar
```

### Schritt 6: Inhaltsverzeichnis aktualisieren

Falls das Dokument ein Inhaltsverzeichnis enthält, ergänze dort den Glossar-Eintrag:

```markdown
- [X. Glossar](#x-glossar)
```

## Qualitätskriterien

- [ ] Alle wesentlichen Fachbegriffe des Dokuments sind erfasst
- [ ] Definitionen sind kontextbezogen, nicht nur aus dem Wörterbuch
- [ ] Alphabetische Sortierung ist korrekt (auch Umlaute: Ä→A, Ö→O, Ü→U)
- [ ] Jeder Buchstabenblock ist durch `---` getrennt (außer dem letzten)
- [ ] Kapitelnummer ist korrekt fortlaufend
- [ ] Inhaltsverzeichnis wurde aktualisiert (falls vorhanden)
