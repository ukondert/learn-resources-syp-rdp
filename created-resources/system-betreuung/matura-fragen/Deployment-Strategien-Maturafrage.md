# Maturafrage: Deployment-Strategien in der Systembetreuung

### Blue-Green und Canary Deployment — Risikoarme Software-Releases

**Situatives Umfeld / Szenario:**
Ein Fintech-Unternehmen betreibt eine Webanwendung für Online-Zahlungen mit mehreren tausend gleichzeitigen Nutzern rund um die Uhr. Das Team plant ein umfangreiches Release, das neben neuen Funktionen auch Änderungen am Datenbankschema enthält. Die Systembetreuung soll entscheiden, welche Deployment-Strategie eingesetzt wird, um das Risiko für den laufenden Betrieb zu minimieren und im Fehlerfall schnell reagieren zu können.

---

### AUFGABENSTELLUNG

**1. Reproduktion**
* Beschreiben Sie die grundlegenden Merkmale von Blue-Green Deployment und Canary Deployment. Nennen Sie jeweils mindestens zwei Vorteile sowie die wesentlichen Unterschiede bei Rollout-Geschwindigkeit, Risiko und Ressourcenbedarf.

**2. Transfer und Anwendung**
* Das Entwicklungsteam hat sich für ein Canary Deployment entschieden. Erklären Sie, wie ein Canary Deployment für das beschriebene Zahlungssystem konkret umgesetzt werden kann: Welche Schritte sind notwendig? Welche Metriken sollte die Systembetreuung während des graduellen Rollouts intensiv überwachen, und warum sind gerade diese Kennzahlen in einem Zahlungssystem besonders kritisch?

**3. Analyse und Reflexion**
* Beide Deployment-Strategien stoßen auf ein gemeinsames Problem, wenn das neue Release eine Änderung am Datenbankschema enthält. Analysieren Sie dieses Problem: Was kann konkret schiefgehen, wenn die alte und die neue Anwendungsversion gleichzeitig auf dieselbe Datenbank zugreifen? Welche Auswirkungen hätte das im Szenario des Fintech-Unternehmens, und wie kann die Systembetreuung dieses Risiko durch geeignete Maßnahmen beherrschen?

---

### MUSTERANTWORTEN (Für die Prüferhand)

**Musterantwort zu 1 (Reproduktion):**
* **Blue-Green Deployment:**
  * Zwei identische Produktionsumgebungen (*Blue* = aktuell live, *Green* = neue Version) laufen parallel.
  * Ein Router (Load Balancer) schaltet den gesamten Traffic in einem einzigen Schritt von Blue auf Green um.
  * *Blue* bleibt als Rollback-Option erhalten, bis die neue Version als stabil gilt.
  * **Vorteile:** Nahezu keine Downtime beim Wechsel; sofortiger Rollback durch einfaches Zurückschalten des Routers.
* **Canary Deployment:**
  * Die neue Version wird zunächst nur für einen kleinen Prozentsatz der Nutzer (z. B. 5%) ausgerollt.
  * Bei guten Messwerten wird der Anteil schrittweise erhöht; bei Problemen wird sofort zurückgezogen.
  * **Vorteile:** Sehr geringes Risiko, da zunächst nur eine kleine Nutzergruppe betroffen ist; frühzeitige Erkennung von Problemen unter realen Lastbedingungen.
* **Wesentliche Unterschiede:**

| Kriterium | Blue-Green | Canary |
|---|---|---|
| Rollout-Geschwindigkeit | Sofort (100%) | Graduell (z. B. 5 % → 25 % → 100 %) |
| Risiko | Mittel (alle Nutzer betroffen) | Niedrig (nur kleine Gruppe zuerst) |
| Ressourcenbedarf | Doppelte Infrastruktur nötig | Teilweise Parallelinfrastruktur |
| Ideal für | Klare, getestete Releases | Riskante Features, A/B-Tests |

**Musterantwort zu 2 (Transfer und Anwendung):**
* **Umsetzungsschritte eines Canary Deployments für das Zahlungssystem:**
  1. Die neue Anwendungsversion wird parallel zur bestehenden Version deployed.
  2. Der Load Balancer wird so konfiguriert, dass zunächst nur ca. 5 % des Traffics an die neue Version weitergeleitet wird.
  3. Metriken werden intensiv überwacht; bei guten Werten wird der Anteil schrittweise auf 25 %, 50 % und schließlich 100 % erhöht.
  4. Bei Problemen wird der Traffic sofort vollständig auf die alte Version zurückgeleitet.
* **Kritische Metriken im Zahlungssystem:**
  * **Fehlerrate (Errors):** Jede fehlgeschlagene Transaktion ist direkt finanziell relevant. Ein Anstieg der HTTP-500-Rate oder Timeout-Rate in der Canary-Gruppe zeigt unmittelbar kritische Probleme.
  * **Latenz (Latency):** Zahlungsanfragen haben strenge Zeitvorgaben (z. B. durch Zahlungsdienstleister). Eine erhöhte p95/p99-Latenz der Canary-Version deutet auf Performance-Probleme hin, die bei vollem Rollout den gesamten Betrieb treffen würden.
  * **Sättigung (Saturation):** Steigende CPU-, RAM- oder Datenbankverbindungsauslastung kann auf Memory-Leaks oder ineffiziente Datenbankabfragen im neuen Release hinweisen, bevor sie bei 100 % des Traffics kritisch werden.

**Musterantwort zu 3 (Analyse und Reflexion):**
* **Problematik:** Bei Blue-Green und Canary Deployment laufen für einen Zeitraum zwei Versionen der Anwendung gleichzeitig gegen dieselbe Datenbank. Wenn das neue Release eine inkompatible Schemaänderung enthält (z. B. eine Spalte wird umbenannt oder ein Pflichtfeld hinzugefügt), kann die alte Version diese geänderte Datenbankstruktur nicht mehr korrekt verarbeiten.
* **Auswirkung:** Im Fintech-Szenario würde das konkret bedeuten: Alte Anwendungsinstanzen schreiben Transaktionsdaten in das alte Schema, neue Instanzen erwarten das neue Schema. Datensätze könnten unvollständig gespeichert werden, Transaktionen könnten mit Datenbankfehlern abbrechen, und im schlimmsten Fall entstehen inkonsistente Zahlungsdaten — mit direkten rechtlichen und finanziellen Konsequenzen.
* **Lösung:** Die Systembetreuung muss Datenbankmigrationen schrittweise und rückwärtskompatibel gestalten. Ein bewährtes Muster ist das sogenannte **Expand/Contract-Muster**:
  1. **Expand (Erweiterung):** Die neue Spalte oder Struktur wird hinzugefügt, die alte bleibt erhalten. Beide Versionen können gleichzeitig funktionieren.
  2. **Deploy:** Die neue Anwendungsversion wird vollständig ausgerollt und schreibt in die neue Struktur.
  3. **Contract (Bereinigung):** Erst wenn alle alten Instanzen abgeschaltet sind, wird die alte Spalte/Struktur entfernt.
  Ergänzend sind Feature Flags sinnvoll, um datenbankabhängige Funktionen kontrolliert zu aktivieren, sowie intensives Monitoring der Datenbankschicht während des gesamten Migrationszeitraums.
