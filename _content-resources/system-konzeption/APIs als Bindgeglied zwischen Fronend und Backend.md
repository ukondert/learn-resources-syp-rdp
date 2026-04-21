## 1. Vergleich der API-Arten

Jede Technologie hat ihre Stärken, abhängig davon, wie „hungrig“ deine Frontend-Komponenten nach Daten sind.

| API-Typ | Fokus | Stärken | Ideal für... |
| :--- | :--- | :--- | :--- |
| **REST (OpenAPI)** | Ressourcen | Standardisiert, einfach zu cachen, zustandslos. | **Supporting/Generic Domains**, CRUD-Operationen, öffentliche Schnittstellen. |
| **GraphQL** | Graphen / Bedarf | Keine Over-/Underfetching, Client bestimmt die Struktur, stark typisiert. | **Core Domain**, komplexe UIs mit tief verschachtelten Daten (CDD-Organismen). |
| **Events (AsyncAPI)** | Nachrichten | Echtzeit, lose Kopplung, hohe Skalierbarkeit. | Benachrichtigungen, Live-Updates, langlaufende Prozesse im Backend. |

---

## 2. Wann setzt man was ein? (Mapping zu DDD/CDD)

### **REST (OpenAPI) für die Stabilität**
In der **Supporting** oder **Generic Domain** ändern sich die Datenmodelle seltener. Hier bietet REST eine stabile Basis. Da CDD-Komponenten oft standardisierte Daten (z. B. eine Liste von Adressen) benötigen, passt das simple Ressourcen-Modell von REST perfekt.

### **GraphQL (SDL -Schema Definition Language) für die Flexibilität (Der CDD-Enabler)**
In der **Core Domain** ist die Logik komplex. Ein CDD-Frontend besteht aus vielen kleinen Atomen und Molekülen, die jeweils unterschiedliche Teilmengen eines großen DDD-Aggregats benötigen.
* **Vorteil:** Das Frontend-Team kann sich genau die Felder „picken“, die für eine spezifische Komponente nötig sind, ohne dass das Backend-Team für jedes UI-Update den Endpunkt anpassen muss.

### **Events (AsyncAPI) für die Reaktivität**
Wenn dein DDD-Backend auf **Domain Events** basiert, sollte das Frontend davon erfahren (z. B. „Bestellung abgeschlossen“). AsyncAPI definiert hier, wie WebSockets oder Server-Sent Events (SSE) die UI-Komponenten in Echtzeit aktualisieren, ohne dass der User die Seite neu laden muss.

---

## 3. Reibungslose Zusammenführung (Teams & Prozesse)

Wenn Frontend- und Backend-Teams getrennt arbeiten, ist die Gefahr von „Integration Hell“ groß. So verhinderst du sie:

### **Der API-First Workflow**
Bevor eine einzige Zeile Code geschrieben wird, definieren beide Teams gemeinsam den Kontrakt.
1.  **Design:** Definition der API in Swagger (OpenAPI) oder einem GraphQL Schema.
2.  **Mocking:** Das Frontend-Team nutzt Tools (z. B. Prism für REST oder Apollo Mocks), um gegen eine Fake-API zu entwickeln.
3.  **Parallelentwicklung:** Während das Backend die Logik implementiert, baut das Frontend bereits die CDD-Komponenten basierend auf den Mock-Daten.

### **Backend for Frontend (BFF) als Übersetzer**
Das BFF ist ein „Mini-Backend“, das dem Frontend-Team gehört.
* **Aufgabe:** Es aggregiert Daten aus verschiedenen DDD-Microservices (die vielleicht hässliche REST-APIs haben) und bereitet sie als sauberes, performantes GraphQL oder REST für die UI-Komponenten auf.
* **Vorteil:** Das Frontend-Team ist unabhängig von den Release-Zyklen der Kern-Backend-Teams.



### **Consumer-Driven Contracts (CDC)**
Um sicherzustellen, dass das Backend-Team die API nicht versehentlich bricht, werden CDC-Tests (z. B. mit **Pact**) eingesetzt.
* Das Frontend-Team definiert Tests, die beschreiben, welche Daten sie *erwarten*.
* Diese Tests laufen in der Pipeline des Backend-Teams. Schlägt ein Test fehl, darf das Backend nicht deployt werden.

---

## 4. Technisches Bindeglied: Shared Types

Um die Typsicherheit über Teamgrenzen hinweg zu garantieren, ist **Codegen** essenziell:
* **Für OpenAPI:** Generiere aus der `.yaml`-Datei automatisch TypeScript-Interfaces für das Frontend.
* **Für GraphQL:** Nutze Tools wie `graphql-codegen`, um Hooks und Typen direkt aus dem Schema zu erzeugen.

> **Tipp für die Praxis:** Nutze ein **Monorepo** (z. B. mit Nx oder Turborepo), in dem die API-Definitionen in einem Shared-Package liegen. So merken beide Teams sofort, wenn sich der „Vertrag“ ändert.