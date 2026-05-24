---
name: learnscript-reviewer
description: "Prueft ein mit dem Lernskript-Ersteller erzeugtes Lernskript auf Grammatik, Rechtschreibung, fachliche Aussagen und Fehler in Grafiken und speichert die gesammelten Befunde als Review-Datei. Use when: Lernskript reviewen, Learnscript pruefen, Rechtschreibung pruefen, Grammatik pruefen, fachliche Fehler finden, Mermaid pruefen, Diagrammfehler pruefen, Review-Ergebnis speichern."
argument-hint: "Pfad zur Lernskript-Markdown-Datei oder zum Ordner des Lernskripts"
---

# Learnscript Reviewer

## Was diese Skill leistet

Diese Skill analysiert ein bestehendes Lernskript, das nach dem Muster des Lernskript-Erstellers aufgebaut wurde, und erstellt einen strukturierten Review-Bericht. Geprueft werden:

- **Grammatik**
- **Rechtschreibung**
- **fachliche Aussagen und Plausibilitaet**
- **Grafiken und Diagramme** wie `mermaid`, `plantuml`, SVG-Verweise und Bildreferenzen

Die Skill korrigiert das Lernskript nicht direkt. Stattdessen sammelt sie alle Befunde in einer separaten Datei mit dem Namen `review-results/[learnscript-name]_review-result.md` im Ordner des Lernskripts.

## Wann verwenden

- Ein mit dem Lernskript-Ersteller erzeugtes Lernskript soll vor Freigabe geprueft werden
- Grammatik-, Rechtschreib- oder Formulierungsfehler sollen gesammelt werden
- Fachliche Aussagen sollen auf Widersprueche, Unklarheiten oder offensichtliche Fehler geprueft werden
- Mermaid-, PlantUML- oder Bildreferenzen sollen auf Fehler, Unklarheiten oder inkonsistente Beschriftungen geprueft werden
- Es wird ein nachvollziehbarer Review-Bericht benoetigt, ohne das Originaldokument sofort zu aendern

## Vorgehensweise

### Schritt 1: Eingabe aufloesen

1. Wenn ein Dateipfad uebergeben wurde, arbeite mit dieser Markdown-Datei.
2. Wenn ein Ordnerpfad uebergeben wurde, identifiziere darin die zu pruefende Hauptdatei des Lernskripts.
3. Bestimme den **Lernskript-Ordner** und den **Lernskript-Namen** aus dem Dateinamen ohne Endung.
4. Lege den Zielordner `review-results` im Lernskript-Ordner an, falls er noch nicht existiert.

**Erwartete Ausgabe-Datei:**

```text
review-results/[learnscript-name]_review-result.md
```

### Schritt 2: Struktur gegen das Lernskript-Muster pruefen

Pruefe, ob das Dokument dem erwarteten Aufbau des Lernskript-Erstellers folgt. Achte insbesondere auf:

- Titel und grundlegende Dokumentstruktur
- Inhaltsverzeichnis mit internen Links
- Version-History
- logisch nummerierte Kapitel und Unterkapitel
- Quellenabschnitte
- sinnvolle Verwendung von Info-Boxen
- Seitenumbrueche fuer Drucklayout

Notiere Abweichungen als Struktur-Befunde. Ein fehlendes Element ist nur dann ein Fehler, wenn es laut Dokumenttyp oder vorhandener Struktur erwartet werden kann.

### Schritt 3: Sprache pruefen

Pruefe den Text abschnittsweise auf:

- Grammatikfehler
- Rechtschreibfehler
- Tippfehler in Ueberschriften, Fliesstext, Tabellen und Bildbeschriftungen
- unklare, doppelte oder holprige Formulierungen
- inkonsistente Schreibweisen von Fachbegriffen

Erfasse zu jedem Befund:

- betroffenen Abschnitt oder Ueberschrift
- kurze Problem-Beschreibung
- konkrete Empfehlung oder korrigierte Formulierung

### Schritt 4: Fachliche Aussagen pruefen

Lagere die fachliche Pruefung wenn moeglich in **Subagents** aus. Diese sollen die relevanten Abschnitte gezielt pruefen und die Aussagen mit **Quellen aus dem Internet** gegenpruefen. Verwende dafuer bevorzugt offizielle Dokumentationen, technische Referenzen, etablierte Fachquellen oder primaere Herstellerquellen. Uebernimm aus den Subagent-Ergebnissen nur nachvollziehbare und belegbare Befunde.

Pruefe fachliche Aussagen auf:

- sachliche Fehler
- unpraezise oder irrefuehrende Aussagen
- unbegruendete Verallgemeinerungen
- Widersprueche innerhalb des Dokuments
- Begriffsverwechslungen
- unvollstaendige Erklaerungen an kritischen Stellen

Dokumentiere bei fachlichen Befunden nach Moeglichkeit die verwendete Quelle oder kennzeichne, dass die Aussage durch externe Recherche validiert wurde.

Bewerte konservativ: Wenn eine Aussage nur moeglicherweise falsch ist, markiere sie als **Pruefhinweis** statt als gesicherten Fehler.

### Schritt 5: Grafiken und Diagramme pruefen

Pruefe alle visuellen Elemente:

- `mermaid`-Diagramme auf offensichtliche Syntaxprobleme, unklare Labels, defekte Zeilenumbrueche und inhaltliche Inkonsistenzen
- `plantuml`-Diagramme auf Plausibilitaet, Rollenbezeichnungen und offensichtliche Syntax- oder Modellierungsfehler
- Bildreferenzen auf vorhandene relative Pfade, passende Alt-Texte und sinnvolle Beschriftungen
- SVG- oder andere Grafikdatei-Verweise auf Konsistenz mit dem beschriebenen Inhalt

Pruefe bei Diagrammen ausserdem, ob Text und Diagramm dieselbe Aussage transportieren. Wenn Diagramm und Beschreibung voneinander abweichen, ist das ein fachlicher Befund.

### Schritt 6: Befunde klassifizieren

Ordne jeden Befund genau einer Kategorie zu:

- `Grammatik`
- `Rechtschreibung`
- `Stil/Verstaendlichkeit`
- `Fachinhalt`
- `Grafik/Diagramm`
- `Struktur`
- `Pruefhinweis`

Verwende ausserdem eine Prioritaet:

- `Hoch`: fachlich falsch, stark missverstaendlich, defekte Grafik oder gravierende Strukturprobleme
- `Mittel`: klarer sprachlicher oder inhaltlicher Mangel ohne Totalauswirkung
- `Niedrig`: kleine sprachliche, formale oder stilistische Verbesserung

### Schritt 7: Review-Datei erzeugen

Speichere den Bericht in der Datei `review-results/[learnscript-name]_review-result.md`.

Verwende dieses Format:

```markdown
# Review-Ergebnis: [Lernskript-Name]

Gepruefte Datei: [relativer oder eindeutiger Pfad]

## Zusammenfassung

- Anzahl Befunde gesamt: X
- Hoch: X
- Mittel: X
- Niedrig: X
- Schwerpunkt: z. B. Fachinhalt und Diagramme

## Befunde

| Nr. | Prioritaet | Kategorie | Abschnitt | Problem | Empfehlung |
|---|---|---|---|---|---|
| 1 | Hoch | Fachinhalt | 2.3 Cloud-Services | Aussage ist fachlich zu pauschal | Praezisieren: ... |

## Positiv aufgefallen

- Kurze Liste gut gelungener Stellen

## Offene Pruefpunkte

- Punkte, die ohne externe Quelle oder Fachexperten nicht abschliessend bestaetigt werden koennen
```

Wenn keine Befunde gefunden werden, erstelle trotzdem die Review-Datei und dokumentiere explizit, dass keine relevanten Fehler identifiziert wurden.

## Qualitaetskriterien

- [ ] Die richtige Lernskript-Datei wurde geprueft
- [ ] Der Bericht wurde im Unterordner `review-results` gespeichert
- [ ] Der Dateiname folgt dem Muster `[learnscript-name]_review-result.md`
- [ ] Jeder Befund ist nachvollziehbar, konkret und einer Kategorie zugeordnet
- [ ] Vermutungen sind als `Pruefhinweis` gekennzeichnet
- [ ] Diagramm- und Bildbefunde sind getrennt von rein sprachlichen Befunden dokumentiert
- [ ] Es wurden keine stillen Aenderungen am Originalskript vorgenommen

## Entscheidungsregeln

- Bevorzuge **konkrete Befunde** statt allgemeiner Qualitaetsurteile.
- Nenne nur Probleme, die sich am Text, an der Struktur oder an den Diagrammen belegen lassen.
- Wenn eine Formulierung mehrere Fehler enthaelt, darf sie in einem Befund gebuendelt werden, solange die Empfehlung klar bleibt.
- Wenn ein Problem mehrere Abschnitte betrifft, fuehre entweder getrennte Befunde oder einen zusammenfassenden Struktur-Befund mit klaren Beispielen auf.
- Wenn die Grafikdatei selbst nicht direkt lesbar ist, pruefe mindestens Referenz, Einbettung, Alt-Text, Dateiname und Konsistenz mit dem Begleittext.

## Hinweise zur Zusammenarbeit mit dem Lernskript-Ersteller

Diese Skill ist fuer den Review-Schritt **nach** der Erstellung gedacht. Sie ergaenzt den Lernskript-Ersteller, ersetzt ihn aber nicht. Nach dem Review kann auf Basis der Review-Datei gezielt ueberarbeitet werden.