# Systembetreuung von Software-Systemen

## 1. Cloud-Infrastruktur & Virtualisierung
*Theoretischer Fokus: Effizienz, Skalierbarkeit und Isolationsmechanismen.*

* **Virtualisierungs-Paradigmen:**
    * Hardware-Virtualisierung (VMM/Hypervisor) vs. OS-Level-Virtualisierung (Container).
* **Docker & Container-Management:**
* **Cloud-Services:**
    * Analyse des "Shared Responsibility Models" (Wer verantwortet Sicherheit bei IaaS vs. SaaS?).
    * Cloud-native Architektur: Microservices vs. Monolithen (Lose Kopplung).

## 2. Application Management: Strategien & Lebenszyklus
*Theoretischer Fokus: Reproduzierbarkeit und Automatisierung (DevOps-Philosophie).*

* **Deployment-Strategien im Vergleich:**
    * **Blue-Green:** Minimierung von Downtime.
    * **Canary Deployment:** Risikomanagement bei neuen Releases.
* **Infrastructure as Code (IaC) & Idempotenz:**
    * Das Konzept der Deklarativen vs. Imperativen Konfiguration.
    * Vorteile der "Single Source of Truth" durch Versionierung der Infrastruktur.
* **Middleware-Konzepte:**
    * Funktionsweise von Reverse Proxies und SSL-Termination.
    * Stateful vs. Stateless Applications (Warum ist der Zustand ein Problem für die Skalierung?).

## 3. Monitoring & Hochverfügbarkeit: Betriebssicherheit
*Theoretischer Fokus: Metriken, Verlässlichkeit und mathematische Verfügbarkeit.*

* **Monitoring-Theorie:**
    * Push- vs. Pull-basiertes Monitoring.
    * Die "Four Golden Signals" (Latency, Traffic, Errors, Saturation).
* **Hochverfügbarkeit (High Availability):**
    * Berechnung der Verfügbarkeit (Die "Neuner-Regel", z.B. 99,9%).
    * **Single Point of Failure (SPOF):** Identifikation und Eliminierung.

## 4. Security: Hardening & Compliance
*Theoretischer Fokus: Defense in Depth und Vertrauensmodelle.*

* **Netzwerksicherheit für Applikationen:**
    * Zonierung (DMZ) und das Prinzip des "Least Privilege".
    * Zero Trust Architecture: "Never trust, always verify".
* **Kryptographische Grundlagen im Web:**
    * Funktionsweise der PKI (Public Key Infrastructure) und TLS-Handshake.
    * Sichere Speicherung von Secrets (Vault-Konzepte statt Hardcoded Passwords).

---

