# Maturafrage: API-Dokumentation und DevOps & Infrastrukturdokumentation

### API-Verträge und DevOps-Dokumentation im Softwareprojekt

**Situatives Umfeld / Szenario:**
Das Entwicklungsteam der digitalen Schulbibliothek hat das System in Betrieb genommen. Nun stößt ein neues Teammitglied dazu, das die Backend-APIs in ein mobiles Frontend integrieren soll. Gleichzeitig beschwert sich das Betriebsteam, dass Deployments in die Produktivumgebung immer wieder scheitern, weil niemand weiß, welche Umgebungsvariablen gesetzt sein müssen und in welcher Reihenfolge die Dienste gestartet werden. Der Projektleiter beauftragt Sie, die fehlende API-Dokumentation sowie die DevOps- und Infrastrukturdokumentation strukturiert aufzubauen.

---

### AUFGABENSTELLUNG

**1. Reproduktion**
* Nennen und beschreiben Sie die drei API-Dokumentationsstandards **OpenAPI**, **AsyncAPI** und **GraphQL-Introspection**. Erläutern Sie jeweils den Zweck, die typischen Inhalte und den Unterschied hinsichtlich des Kommunikationsmusters (synchron/asynchron/flexibel). Nennen Sie außerdem die wesentlichen Ziele der **DevOps- und Infrastrukturdokumentation** und beschreiben Sie, was eine **Environment-Matrix** enthält und wozu sie dient.

**2. Transfer und Anwendung**
* Im Schulbibliotheks-System existieren drei Kommunikationsszenarien: (a) das Frontend ruft über REST überfällige Medien ab, (b) nach einer Ausleihe wird ein Mahnungs-Event über Kafka (= Message-Broker) ausgelöst, (c) eine mobile App fragt Benutzerdaten mit wählbaren Feldern ab. Ordnen Sie jedem Szenario den passenden API-Dokumentationsstandard zu und begründen Sie Ihre Wahl. Beschreiben Sie außerdem, welche **vier Artefakte** eine vollständige DevOps-Delivery-Dokumentation für dieses System enthalten sollte.

**3. Analyse und Reflexion**
* Beim letzten Produktiv-Deployment ist das Backend nicht gestartet, weil die Datenbankverbindung fehlschlug. Außerdem soll das `docker-compose.yml` auf sicherheitsrelevante Schwachstellen hin untersucht werden. Analysieren Sie die Ursachen des Probleme und potentielle Sicherheitsrisken im bereitgestellten `docker-compose.yaml`. Entwickeln Sie konkrete Lösungsmaßnahmen für ein stabiles und sicheres Deployment.

---

### MUSTERANTWORTEN (Für die Prüferhand)

**Musterantwort zu 1 (Reproduktion):**

* **API-Dokumentationsstandards im Vergleich:**

| Standard | Kommunikationsmuster | Zweck | Typische Inhalte |
|----------|---------------------|-------|-----------------|
| **OpenAPI (Swagger)** | Synchron (Request/Response) | Standardisierte Beschreibung von REST APIs | Pfade (Endpoints), HTTP-Methoden, Parameter, Responses, Schemas (JSON) |
| **AsyncAPI** | Asynchron (Event/Message) | Beschreibung nachrichtenbasierter Systeme (Kafka, RabbitMQ) | Channels (Topics/Queues), Operations (publish/subscribe), Message-Schemas, Server-Details |
| **GraphQL-Introspection** | Flexibel (Client wählt Felder) | Selbstdokumentierendes API durch eingebautes Typsystem | Typen, Queries, Mutations — abrufbar direkt vom Server zur Laufzeit |

  > **Merksatz:** API-Dokumentation ist kein „nett zu haben", sondern ein geschäftskritisches Artefakt.

* **Ziele der DevOps- und Infrastrukturdokumentation:**
  1. **Reproduzierbarkeit:** Builds und Deployments sind jederzeit nachvollziehbar und wiederholbar.
  2. **Transparenz:** Teams verstehen, welche Schritte in CI/CD-Pipelines passieren.
  3. **Betriebssicherheit:** Konfigurationen und Abhängigkeiten sind klar dokumentiert.
  4. **Schnelleres Onboarding:** Neue Teammitglieder finden sich ohne mündliche Sonderregeln zurecht.

* **Environment-Matrix:** Tabelle, die Unterschiede zwischen `dev`, `staging` und `production` explizit sichtbar macht. Enthält pro Umgebung: Ziel, Datentyp (Testdaten/Echtdaten), Deployment-Frequenz, Secret-Quelle und Monitoring-Umfang.

---

**Musterantwort zu 2 (Transfer und Anwendung):**

* **Zuordnung der API-Standards zu den Szenarien:**

| Szenario | Passender Standard | Begründung |
|----------|-------------------|------------|
| **(a)** Frontend ruft REST ab: `GET /api/mediums/overdue` | **OpenAPI** | Synchrones Request/Response-Muster über HTTP — OpenAPI beschreibt Endpoints, Parameter und Responses präzise |
| **(b)** Mahnungs-Event über Kafka: `mahn/created` | **AsyncAPI** | Asynchrones, nachrichtenbasiertes Muster über Message-Broker — AsyncAPI beschreibt Channels, publish/subscribe-Operationen und Event-Schemas |
| **(c)** Mobile App fragt Benutzerdaten mit wählbaren Feldern ab | **GraphQL** | Clients fordern nur die benötigten Felder an — das flexible Abfragemuster und die Introspection machen GraphQL ideal für mobile Use-Cases mit variablen Datenanforderungen |

* **Vier Artefakte einer vollständigen DevOps-Delivery-Dokumentation:**
  1. **Pipeline-Übersicht:** Mermaid-Diagramm und tabellarische Stage-Beschreibung (Lint → Tests → Build → Security → Deploy).
  2. **Container-READMEs:** Build- und Startanleitung mit benötigten Variablen und Startreihenfolge für Frontend, Backend und PostgreSQL.
  3. **Environment-Matrix:** Unterschiede zwischen Development-, Staging- und Produktivumgebung (Ziel, Daten, Secrets, Monitoring).
  4. **Release-Checkliste:** Kriterien vor dem Go-Live (Tests grün, Migration geprüft, Monitoring aktiv).

---

**Musterantwort zu 3 (Analyse und Reflexion):**

* **Teil A — Ursache des Deployment-Fehlers:**

  Das Backend ist nicht gestartet, weil **keine Startreihenfolge mit Health-Check** konfiguriert ist. Docker startet alle Dienste nahezu gleichzeitig — das Backend versucht sofort eine Datenbankverbindung, obwohl PostgreSQL noch nicht bereit ist. In der fehlerhaften `docker-compose.yml` fehlt beim `backend`-Dienst sowohl ein `depends_on` als auch eine `condition: service_healthy`-Bedingung. Der Fehler ist schwer zu diagnostizieren, weil keine Dokumentation der Abhängigkeiten existiert.

* **Teil B — Sicherheitsrisiken im `docker-compose.yml`:**

  | Schwachstelle | Fundstelle | Risiko |
  |---------------|-----------|--------|
  | **Hartcodiertes Passwort** im `postgres`-Dienst | `POSTGRES_PASSWORD: SuperGeheim123!` | Zugangsdaten im Repository (auch in der Git-History) → Angreifer können die Datenbank kompromittieren |
  | **Passwort-Wiederholung** im `backend`-Dienst | `SPRING_DATASOURCE_PASSWORD: SuperGeheim123!` | Gleiches Risiko; bei einem Leak müssen beide Stellen geändert werden — Fehleranfälligkeit steigt |

  > Klassifizierung nach OWASP: „Sensitive Data Exposure" (Hartcodierte Secrets in Versionskontrolle).

* **Teil C — Lösungsmaßnahmen für ein stabiles und sicheres Deployment:**

  1. **Startreihenfolge absichern:** `depends_on` mit `condition: service_healthy` beim `backend`-Dienst; `healthcheck` (`pg_isready`) beim `postgres`-Dienst definieren — Backend startet erst, wenn die DB tatsächlich bereit ist.
  2. **Secrets aus dem Repository entfernen:** Passwörter in eine `.env`-Datei auslagern (`env_file: - .env`); `.env` in `.gitignore` aufnehmen. In `staging` und `production` einen zentralen Secret-Store (z. B. HashiCorp Vault, Kubernetes Secrets) verwenden.
  3. **Sofortmaßnahme:** Zugangsdaten rotieren und Git-History bereinigen (z. B. BFG Repo Cleaner), da Secrets auch nach einem Commit-Delete in der History lesbar bleiben.
  4. **Präventiv in der CI/CD-Pipeline:** Automatisierten **Secret-Scan** (z. B. `git-secrets`, `trufflehog`) ergänzen, der Commits mit hartcodierten Credentials blockiert.
  5. **Dokumentation:** Startreihenfolge und Secret-Handling in der Environment-Matrix sowie in Container-READMEs festhalten.
