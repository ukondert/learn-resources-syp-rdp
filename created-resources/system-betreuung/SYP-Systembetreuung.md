<h1> SYP Ausgewählte Kapitel - Systembetreuung</h1>

<h2> Inhaltsverzeichnis</h2>

- [1. Einleitung in die Systembetreuung](#1-einleitung-in-die-systembetreuung)
  - [1.1. Grundkonzepte](#11-grundkonzepte)
- [2. Cloud-Infrastruktur \& Virtualisierung](#2-cloud-infrastruktur--virtualisierung)
  - [2.1. Virtualisierungs-Paradigmen](#21-virtualisierungs-paradigmen)
  - [2.2. Docker \& Container-Management](#22-docker--container-management)
    - [Docker-Compose für eine Testinstanz](#docker-compose-für-eine-testinstanz)
  - [2.3. Cloud-Services](#23-cloud-services)

<div style="page-break-after: always;"></div>

<div style="width: 100%;"> 	
    <div style="margin-left:1cm; margin-right:1.5cm; text-align: center;">
    <h2>Version History</h2>
    <table style="border solid 1px;width: 100%;">
    <th style="text-align:left">Version</th>
    <th>Änderungen</th>
    <th style="text-align:right">Autor</th>
    <tr>
    <td style="text-align:left">2026-04-09</td>
    <td style="text-align:left">Offizielle Erstversion</td>
    <td style="text-align:right">UK</td>
    </tr>
    </table>
</div>

<div style="page-break-after: always"></div>

# 1. Einleitung in die Systembetreuung

*Systembetreuung ist wie die Wartung einer komplexen Maschine: Nur wer regelmäßig prüft, optimiert und absichert, sorgt dafür, dass sie zuverlässig läuft.*

In der IT bedeutet Systembetreuung, dass man Software-Systeme, Infrastruktur und Dienste in Betrieb hält. Dazu gehören Planung, Überwachung, Updates, Sicherheit und Fehlerbehebung. 

## 1.1. Grundkonzepte

Systembetreuung baut auf folgenden zentralen Konzepten auf:

1.  **`Verfügbarkeit`**: Die Fähigkeit eines Systems, zuverlässig und ohne Unterbrechung zu funktionieren. In der Praxis bedeutet das, Ausfälle früh zu erkennen und zu verhindern.
2.  **`Skalierbarkeit`**: Die Möglichkeit, ein System bei Bedarf zu vergrößern oder zu verkleinern. Skalierbarkeit hilft, mehr Nutzer oder mehr Last zu bewältigen, ohne das System neu zu erfinden.
3.  **`Sicherheit`**: Schutz vor unautorisiertem Zugriff, Datenverlust und Angriffen. Sicherheit umfasst Firewalls, Verschlüsselung, Zugangskontrollen und regelmäßige Updates.
4.  **`Reproduzierbarkeit`**: Die Fähigkeit, dieselbe Umgebung mehrfach gleich aufzubauen. Das ist wichtig für Tests, Deployments und das schnelle Wiederherstellen nach Fehlern.
5.  **`Monitoring`**: Laufende Überwachung von Systemzustand und Leistung. Monitoring liefert wichtige Daten zu Latenz, Auslastung, Fehlerraten und hilft, Probleme früh zu erkennen.

> <span style="font-size: 1.5em">:bulb:</span> **Merksatz:** Gute Systembetreuung macht Software nicht nur funktionsfähig, sondern auch zuverlässig, sicher und skalierbar.

---

# 2. Cloud-Infrastruktur & Virtualisierung

*In modernen IT-Landschaften ist die Cloud-Infrastruktur die Basis für skalierbare und agile Systeme. Virtualisierung sorgt dabei für die effiziente Nutzung von Hardware und isoliert Anwendungen sauber voneinander.*

In diesem Kapitel lernen Sie, wie virtuelle Maschinen, Container und Cloud-Dienste zusammenwirken, um flexible, sichere und wartbare Systeme bereitzustellen.

## 2.1. Virtualisierungs-Paradigmen

Virtualisierung trennt die physische Hardware von der Software, die darauf läuft. Dadurch können mehrere Systeme oder Anwendungen auf derselben Hardware betrieben werden.

- **Hardware-Virtualisierung**: Ein Hypervisor erstellt virtuelle Maschinen (VMs) mit eigenem Betriebssystem. Jede VM bekommt virtuelle CPU, RAM und Festplatte.
- **OS-Level-Virtualisierung**: Container nutzen denselben Kernel wie der Host, aber isolieren Prozesse und Dateisysteme. Das macht sie leichter und schneller als VMs.

Wichtige Unterschiede:
- VMs sind schwergewichtiger und eignen sich für verschiedene Betriebssysteme.
- Container sind leichtgewichtig und ideal für verteilte Anwendungen, die schnell starten und skalieren sollen.

## 2.2. Docker & Container-Management

Docker ist eine weit verbreitete Plattform für Container. Entwickler verpacken Anwendungen inklusive Bibliotheken und Konfiguration in ein Image.

- **Image**: Eine schreibgeschützte Vorlage mit allem, was die Anwendung benötigt.
- **Container**: Eine laufende Instanz eines Images.
- **Registry**: Ein zentraler Speicherort für Images, z. B. Docker Hub oder eine private Registry.

Container-Management umfasst:
- Erstellen und Versionieren von Images.
- Starten, Stoppen und Überwachen von Containern.
- Koordination von Netzwerken und persistenten Daten.

### Docker-Compose für eine Testinstanz

`docker-compose` erleichtert das Definieren und Starten mehrerer zusammenhängender Container als einen einzigen Dienst. Für eine Fullstack-Testumgebung können folgende Dienste zusammengehören:

- **Web Client**: Frontend-Anwendung, zum Beispiel React oder Angular.
- **Spring Backend**: API-Server mit Java/Spring Boot.
- **Datenbank**: z. B. PostgreSQL für persistente Daten.
- **Mail Server**: z. B. MailHog als Test-Mailserver.

Dabei ist es wichtig, Umgebungsvariablen, Volumes und Netzwerke sauber zu definieren und Services in der richtigen Reihenfolge zu starten.

#### Beispiel `docker-compose.yml`
```yaml
version: '3.9'
services:
  web:
    image: myorg/web-client:latest
    build:
      context: ./web
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://backend:8080
    depends_on:
      - backend
    networks:
      - app-network

  backend:
    image: myorg/spring-backend:latest
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/appdb
      - SPRING_DATASOURCE_USERNAME=appuser
      - SPRING_DATASOURCE_PASSWORD=secret
      - SPRING_MAIL_HOST=mailhog
      - SPRING_MAIL_PORT=1025
    depends_on:
      - db
      - mailhog
    networks:
      - app-network

  db:
    image: postgres:15
    restart: always
    environment:
      POSTGRES_DB: appdb
      POSTGRES_USER: appuser
      POSTGRES_PASSWORD: secret
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - app-network

  mailhog:
    image: mailhog/mailhog
    ports:
      - "8025:8025"
      - "1025:1025"
    networks:
      - app-network

volumes:
  db-data:

networks:
  app-network:
    driver: bridge
```

#### Was das Beispiel zeigt

- `depends_on` stellt sicher, dass `backend` erst startet, wenn `db` und `mailhog` eingerichtet sind.
- `volumes` sichern die Datenbankdaten, damit sie beim Neustart erhalten bleiben.
- `networks` erlauben die Kommunikation der Container untereinander mit sicheren Service-Namen.

#### Wichtige Praxisregeln

- Nutze `env_file` oder Umgebungsvariablen, um Passwörter nicht direkt in `docker-compose.yml` zu speichern.
- Verwende für Testinstanzen oft `restart: always` nur für Datenbank- oder Infrastrukturservices, nicht unbedingt für Entwicklungssysteme.
- Sammle Logs zentral, z. B. mit `docker logs` oder einer Logging-Lösung wie ELK/EFK.
- Prüfe Cleanup-Befehle wie `docker-compose down -v`, um Testdaten und Volumes sauber zu entfernen.

Für die Systembetreuung ist wichtig:
- Container sollten klein und spezialisiert sein.
- Der Zugriff auf sensible Daten muss sicher erfolgen.
- Logs und Metriken müssen zentral erfasst werden.

## 2.3. Cloud-Services

Cloud-Services bieten Infrastruktur und Dienste über das Internet. Die wichtigsten Modelle sind:

- **IaaS (Infrastructure as a Service)**: Virtuelle Server, Speicher und Netzwerk als Bausteine.
- **PaaS (Platform as a Service)**: Laufzeitumgebungen, Datenbanken und Entwicklerplattformen.
- **SaaS (Software as a Service)**: Fertige Anwendungen, die direkt genutzt werden.

Das **Shared Responsibility Model** beschreibt, wer für welche Ebene zuständig ist:
- Der Anbieter kümmert sich um Infrastruktur, Hardware und oft auch Plattform-Sicherheit.
- Der Anwender ist verantwortlich für Anwendungen, Daten und Zugriffsrechte.

**Cloud-native Architektur** unterscheidet häufig zwischen:
- **Monolithen**: Eine große, zusammenhängende Anwendung.
- **Microservices**: Kleine, unabhängige Dienste, die über APIs kommunizieren.

Für Systembetreuer ist das wichtig, weil Microservices bessere Skalierung und schnellere Updates erlauben, aber auch mehr Überwachung und Netzwerk-Management erfordern.