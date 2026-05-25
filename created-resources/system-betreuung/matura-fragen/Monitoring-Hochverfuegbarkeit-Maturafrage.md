# Maturafrage: Monitoring & Hochverfügbarkeit in der Systembetreuung

### Four Golden Signals und Single Point of Failure — Betriebssicherheit eines kritischen Dienstes

**Situatives Umfeld / Szenario:**
Ein mittelgroßes E-Commerce-Unternehmen betreibt einen Online-Shop, der in der Vorweihnachtszeit täglich mehrere hunderttausend Besucher verzeichnet. Der Shop läuft auf einer Infrastruktur mit einem einzigen Load Balancer, der den Traffic auf drei App-Server verteilt, sowie einer zentralen Datenbankinstanz. Bisher gab es kein strukturiertes Monitoring. Das System-Betreungs-Team soll nun ein Monitoring-Konzept einführen und die Architektur auf mögliche Schwachstellen prüfen, bevor die umsatzstärkste Saison beginnt.

---

### AUFGABENSTELLUNG

**1. Reproduktion**
* Beschreiben Sie die **Four Golden Signals** des Site Reliability Engineering. Nennen Sie für jedes Signal seine Bedeutung und ein typisches Beispiel aus einem Web-Dienst. Erläutern Sie außerdem, was unter **Hochverfügbarkeit** zu verstehen ist und wie sie als Prozentwert berechnet wird.

**2. Transfer und Anwendung**
* Das Team muss entscheiden, ob für die App-Server ein **Pull-basiertes** oder ein **Push-basiertes** Monitoring eingesetzt wird. Erklären Sie beide Ansätze und begründen Sie, welcher Ansatz für die dauerhaft laufenden App-Server im Szenario besser geeignet ist. Nennen Sie konkret, welche der Four Golden Signals in einem Online-Shop während einer Lastspitze die höchste Priorität haben und warum.

**3. Analyse und Reflexion**
* Analysieren Sie die beschriebene Infrastruktur auf **Single Points of Failure (SPOF)**. Benennen Sie die kritischen Schwachstellen, erläutern Sie jeweils, welche Auswirkung ihr Ausfall in der Weihnachtssaison hätte, und entwickeln Sie konkrete Maßnahmen, um diese SPOFs zu beseitigen. Berücksichtigen Sie dabei auch, wie Monitoring und Hochverfügbarkeit zusammenwirken müssen.

---

### MUSTERANTWORTEN (Für die Prüferhand)

**Musterantwort zu 1 (Reproduktion):**
* **Die Four Golden Signals:**

| Signal | Bedeutung | Beispiel im Web-Dienst |
|---|---|---|
| **Latency** | Wie lange eine Anfrage bis zur Antwort benötigt | Antwortzeit in ms, p95/p99-Latenz der Produktseite |
| **Traffic** | Wie viel Last auf dem System liegt | Requests pro Sekunde auf den App-Servern |
| **Errors** | Wie viele Anfragen fehlschlagen | HTTP-500-Rate, Checkout-Timeout-Rate |
| **Saturation** | Wie nah das System an seiner Kapazitätsgrenze arbeitet | CPU-Auslastung, RAM-Verbrauch, Datenbankverbindungen |

* **Hochverfügbarkeit:** Bezeichnet die Fähigkeit eines Systems, trotz einzelner Störungen oder Ausfälle weiterhin nutzbar zu bleiben. Ziel ist nicht absolute Fehlerfreiheit, sondern eine Architektur, die Ausfälle abfedert, erkennt und kompensiert.
* **Berechnung:**

$$\text{Verfügbarkeit} = \frac{\text{Betriebszeit}}{\text{Gesamtzeit}} \times 100$$

  Beispiel: 8,76 Stunden Ausfall pro Jahr bei 8760 Stunden Gesamtzeit → 99,9 % Verfügbarkeit (ca. 8,76 h Ausfall/Jahr).

**Musterantwort zu 2 (Transfer und Anwendung):**
* **Pull-basiertes Monitoring:** Ein zentrales Monitoring-System (z. B. Prometheus) fragt die Ziele in festen Intervallen aktiv ab. Die App-Server stellen ihre Metriken über einen HTTP-Endpunkt (`/metrics`) bereit. Das Monitoring-System erkennt auch selbst, wenn ein Ziel gar nicht mehr antwortet.
* **Push-basiertes Monitoring:** Das Zielsystem sendet seine Metriken aktiv an einen zentralen Endpunkt. Typisch für kurzlebige Prozesse (Batch-Jobs) oder Systeme hinter Firewalls.
* **Empfehlung für die App-Server:** Pull-basiertes Monitoring ist hier besser geeignet, da die App-Server dauerhaft laufen, über das interne Netzwerk erreichbar sind und das zentrale System selbst steuern kann, wann und wie oft abgefragt wird. Außerdem erkennt Pull-Monitoring automatisch, wenn ein Server gar nicht mehr antwortet.
* **Prioritäre Signale während einer Lastspitze:**
  * **Saturation** hat höchste Priorität: Steigende CPU-, RAM- oder Datenbankverbindungsauslastung kündigt eine drohende Überlast an, bevor Nutzer Ausfälle bemerken. So kann das Team proaktiv skalieren.
  * **Errors** ist gleichwertig kritisch: Ein Anstieg der HTTP-500-Rate oder Checkout-Fehler wirkt sich direkt auf Umsatz und Kundenzufriedenheit aus und muss sofort alarmieren.
  * **Latency** zeigt Engpässe (z. B. langsame Datenbankabfragen), die sich unter Last potenzieren.

**Musterantwort zu 3 (Analyse und Reflexion):**
* **Identifizierte Single Points of Failure:**

  1. **Load Balancer (einzige Instanz):**
     * *Auswirkung:* Fällt der Load Balancer aus, ist der gesamte Shop nicht mehr erreichbar – kein Nutzer erreicht mehr einen der App-Server. In der Weihnachtssaison bedeutet das vollständigen Umsatzausfall.
     * *Maßnahme:* Zweiten Load Balancer als aktive oder passive Redundanz einrichten; automatisches Failover über ein Virtual-IP-Konzept (z. B. Keepalived) oder einen Cloud-eigenen Load-Balancing-Dienst nutzen.

  2. **Einzelne Datenbankinstanz:**
     * *Auswirkung:* Ein Datenbankausfall macht alle drei App-Server funktionslos, da keine Produkt-, Bestell- oder Kundendaten mehr abrufbar sind. Datenverlust bei laufenden Transaktionen ist möglich.
     * *Maßnahme:* Datenbankreplikation einrichten (Primary/Replica). Im Fehlerfall automatisches Failover auf das Replica. Backups und regelmäßige Wiederherstellungstests sicherstellen.

* **Zusammenwirken von Monitoring und Hochverfügbarkeit:**
  Hochverfügbarkeit allein reicht nicht: Ohne Monitoring erkennt das Team einen SPOF-Ausfall oder eine drohende Überlast zu spät. Erst das Zusammenspiel macht den Betrieb wirklich sicher:
  * Monitoring erkennt früh, dass z. B. die Datenbankverbindungen sich der Kapazitätsgrenze nähern (Saturation-Signal) → Das Team kann proaktiv skalieren, bevor der Ausfall eintritt.
  * Health Checks am Load Balancer erkennen automatisch, wenn ein App-Server nicht mehr antwortet, und leiten Traffic nur an gesunde Instanzen weiter.
  * Alerting muss so konfiguriert sein, dass Alarme nur dann ausgelöst werden, wenn das Problem wirklich relevant und für das Team konkret bearbeitbar ist.
