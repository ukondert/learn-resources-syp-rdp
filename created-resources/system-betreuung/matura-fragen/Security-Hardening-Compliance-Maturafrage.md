# Maturafrage: Security — Hardening & Compliance in der Systembetreuung

### Zero Trust, DMZ und Secret-Management — Absicherung einer Webanwendung

**Situatives Umfeld / Szenario:**
Ein Softwareunternehmen betreibt eine webbasierte Personalverwaltungsanwendung mit sensiblen Mitarbeiterdaten. Die Architektur besteht aus einem öffentlich erreichbaren Web-Frontend, einem internen API-Backend und einer Datenbank. Bisher sind alle Komponenten im selben Netzwerksegment ohne klare Zonierung. Datenbankpasswörter und API-Keys sind direkt in den `docker-compose.yml`-Dateien hinterlegt und versioniert im Git-Repository gespeichert. Die IT-Abteilung soll die Sicherheitsarchitektur grundlegend überarbeiten, um Compliance-Anforderungen zu erfüllen und Angriffsflächen systematisch zu reduzieren.

---

### AUFGABENSTELLUNG

**1. Reproduktion**
* Beschreiben Sie das Konzept der **DMZ (Demilitarized Zone)** und erläutern Sie, welche typischen Sicherheitszonen in einer modernen Webanwendungs-Architektur unterschieden werden. Erklären Sie zusätzlich das **Least-Privilege-Prinzip** und nennen Sie drei konkrete Beispiele aus dem Betrieb einer Webanwendung.

**2. Transfer und Anwendung**
* Das Team entscheidet sich, die Infrastruktur nach dem **Zero-Trust-Prinzip** umzugestalten. Erklären Sie die vier zentralen Prinzipien von Zero Trust Architecture und beschreiben Sie, welche konkreten Maßnahmen für die Personalverwaltungsanwendung daraus folgen — insbesondere für Admin-Zugänge, die Service-zu-Service-Kommunikation zwischen Backend und Datenbank sowie die Protokollierung von Zugriffen.

**3. Analyse und Reflexion**
* Analysieren Sie die im Szenario beschriebene Praxis der Secret-Verwaltung (Passwörter in `docker-compose.yml`, im Git-Repository versioniert). Benennen Sie die konkreten Risiken dieser Vorgehensweise, erläutern Sie die möglichen Auswirkungen für das Unternehmen und entwickeln Sie ein verbessertes Secret-Management-Konzept, das Compliance- und Audit-Anforderungen erfüllt.

---

### MUSTERANTWORTEN (Für die Prüferhand)

**Musterantwort zu 1 (Reproduktion):**
* **DMZ — Demilitarized Zone:**
  Die DMZ ist ein separates Netzwerksegment, das zwischen dem Internet und dem internen Netzwerk liegt. Öffentlich erreichbare Systeme (z. B. Reverse Proxy, Web-Server, API-Gateway) stehen in der DMZ und fungieren als Puffer: Externe Nutzer erreichen nur die DMZ-Systeme, diese leiten nur freigegebene Anfragen an interne Dienste weiter. Datenbanken und Administrations-Schnittstellen bleiben von außen unsichtbar.

* **Typische Sicherheitszonen:**

| Zone | Inhalt | Vertrauensniveau |
|---|---|---|
| **Internet-Zone** | Unkontrollierter externer Bereich | Kein Vertrauen |
| **DMZ** | Reverse Proxy, Web-Server, API-Gateway | Eingeschränktes Vertrauen |
| **Applikations-Zone** | Interne Fachanwendungen und Services | Mittleres Vertrauen |
| **Daten-Zone** | Datenbanken, Dateispeicher, Backup-Systeme | Höchster Schutzbedarf |

* **Least Privilege — Minimalrechte-Prinzip:**
  Jede Komponente, jeder Benutzer und jedes technische Konto erhält nur die Rechte, die zur Aufgabenerfüllung wirklich nötig sind.
  * *Beispiel 1:* Ein Web-Frontend darf nur mit dem API-Gateway kommunizieren, nicht direkt mit der Datenbank.
  * *Beispiel 2:* Ein Datenbank-User für die Anwendung bekommt nur Zugriff auf sein Schema, nicht auf administrative Systemtabellen.
  * *Beispiel 3:* Ein Deployment-Account darf Anwendungen neu ausrollen, aber keine Produktionsdaten lesen.

**Musterantwort zu 2 (Transfer und Anwendung):**
* **Die vier zentralen Prinzipien von Zero Trust Architecture:**
  1. **Explizite Verifikation:** Identität, Gerätestatus, Standort, Risiko und Kontext jeder Anfrage werden aktiv geprüft — nie allein aufgrund des Netzwerkstandorts vertraut.
  2. **Least Privilege Access:** Zugriffe werden so fein wie möglich eingeschränkt, zeitlich begrenzt und nur für konkrete Aufgaben vergeben.
  3. **Kontinuierliche Bewertung:** Vertrauen wird nicht einmalig vergeben, sondern bei jeder Anfrage neu bewertet.
  4. **Mikrosegmentierung:** Kleine, getrennte Sicherheitsbereiche verhindern seitliche Bewegungen im Netzwerk — ein kompromittierter Dienst kann nicht einfach auf andere Systeme zugreifen.

* **Konkrete Maßnahmen für die Personalverwaltungsanwendung:**
  * **Admin-Zugänge:** Zugänge durch MFA (Multi-Faktor-Authentifizierung) und einen Identity-Aware Proxy absichern. Kein direkter SSH-Zugriff aus dem Internet — stattdessen VPN oder Bastion Host.
  * **Service-zu-Service-Kommunikation:** Das Backend authentifiziert sich gegenüber der Datenbank nicht mit einem statischen Passwort, sondern über kurzlebige Credentials (z. B. dynamisch erzeugte Datenbank-Zugänge aus einem Vault-System) oder mTLS (mutual TLS), sodass beide Seiten ihre Identität beweisen müssen.
  * **Protokollierung:** Alle Zugriffe auf sensible Ressourcen (Datenbank, Admin-Oberflächen, Secrets) werden in einem Audit-Log erfasst und zentral ausgewertet (z. B. SIEM), um Auffälligkeiten frühzeitig zu erkennen.

**Musterantwort zu 3 (Analyse und Reflexion):**
* **Problematik — Hartcodierte Secrets im Git-Repository:**
  Datenbankpasswörter und API-Keys direkt in `docker-compose.yml` zu hinterlegen und diese Dateien im Git-Repository zu versionieren, ist eine kritische Sicherheitslücke.

* **Konkrete Risiken:**
  * Secrets landen dauerhaft in der Git-Historie — auch nach Löschen der Datei bleiben sie in alten Commits erhalten und sind für jeden mit Repository-Zugriff abrufbar.
  * Wenn das Repository kompromittiert wird oder versehentlich öffentlich zugänglich ist (z. B. durch eine Fehlkonfiguration), sind alle Zugangsdaten sofort exponiert.
  * Alle Umgebungen (Dev, Test, Prod) nutzen möglicherweise dieselben Credentials — ein Angreifer, der Dev-Zugangsdaten erbeutet, kann damit direkt auf Produktionsdaten zugreifen.
  * Zugriffe und Verwendung der Secrets lassen sich nicht auditieren — unklar, wer wann welche Credentials genutzt hat.

* **Auswirkungen für das Unternehmen:**
  Da es sich um eine Personalverwaltungsanwendung mit sensiblen Mitarbeiterdaten handelt, stellt ein Datenleck nicht nur einen Reputationsschaden dar, sondern auch eine Verletzung datenschutzrechtlicher Vorschriften (z. B. DSGVO), was empfindliche Bußgelder und Meldepflichten nach sich zieht.

* **Verbessertes Secret-Management-Konzept:**
  1. **Sofortmaßnahme:** Alle exponierten Secrets unverzüglich rotieren (neue Passwörter, neue API-Keys generieren) und aus der Git-Historie entfernen (z. B. `git filter-repo`).
  2. **Zentraler Secret Store:** Einen Vault-Dienst (z. B. HashiCorp Vault, AWS Secrets Manager) einführen. Die Anwendung authentifiziert sich gegenüber dem Vault und erhält nur die benötigten Credentials zur Laufzeit.
  3. **Kurzlebige Credentials:** Dynamisch erzeugte Datenbank-Zugänge mit kurzer Lebensdauer bevorzugen — ein kompromittiertes Secret ist nach kurzer Zeit wertlos.
  4. **Umgebungstrennung:** Strikte Trennung von Dev-, Test- und Prod-Secrets sicherstellen.
  5. **Rotation automatisieren:** Regelmäßige, automatische Secret-Rotation ohne manuelle Eingriffe.
  6. **Audit-Log:** Jeden Secret-Zugriff protokollieren — wer hat wann welches Secret angefordert? Das erfüllt Compliance- und Audit-Anforderungen nachweisbar.
