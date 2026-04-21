Die **Vertical Slice Architektur** bricht das klassische Schichtenmodell (Horizontal Layers) auf und organisiert den Code stattdessen nach **Geschäftsfunktionen (Features)**. Im Kontext von agiler Entwicklung, DDD und CDD führt das zu einer hocheffizienten "End-to-End"-Pipeline.

Anstatt ein Projekt in "Datenbank-Team", "Backend-Team" und "Frontend-Team" zu unterteilen, arbeitet man an einem vollständigen Durchstich (Slice) eines Features.

---

## 1. Das Konzept: Weg von Schichten, hin zu Features
In einer klassischen Architektur implementierst du erst die Datenbank, dann das Backend-Repository, dann den Service und zuletzt das UI. Bei Vertical Slices schneidest du quer durch alle Ebenen.



* **Ein Slice = Ein Use Case:** Ein Slice umfasst alles, was für ein Feature nötig ist (z.B. "Produkt in den Warenkorb legen").
* **Minimale Kopplung:** Slices sind weitestgehend unabhängig voneinander. Code-Änderungen an Feature A beeinflussen Feature B nicht.

---

## 2. Synergie mit DDD (Domain-Driven Design) im Backend
Im Backend sorgt DDD für die fachliche Tiefe innerhalb des Slices:

* **Bounded Contexts:** Ein Vertical Slice lebt idealerweise innerhalb eines Bounded Contexts. Das verhindert, dass die Logik für "Rechnungsstellung" mit der Logik für "Lagerverwaltung" verschmilzt.
* **Tactical Design:** Innerhalb eines Slices nutzt du **Aggregates** und **Value Objects**, um die Geschäftsregeln präzise abzubilden. Da der Slice klein ist, bleibt das Domain-Modell fokussiert und wird nicht zu einem "God Object".
* **API-First:** Jeder Slice definiert seinen eigenen Vertrag (z. B. via OpenAPI). Das Backend liefert genau das, was dieser spezifische Slice benötigt.

---

## 3. Synergie mit CDD (Component-Driven Development) im Frontend
CDD ist das perfekte Gegenstück für die Benutzeroberfläche des Slices:

* **Atomare Entwicklung:** Während das Backend den Slice logisch aufbaut, entwickelt das Frontend die nötigen Komponenten (Buttons, Formulare, Listen) isoliert in Tools wie Storybook.
* **BFF (Backend-for-Frontend):** Der Vertical Slice wird im Frontend oft durch ein BFF oder einen spezifischen API-Endpunkt bedient, der die Daten exakt so transformiert, dass die UI-Komponenten sie ohne komplexe Logik konsumieren können.
* **Integration:** Die isoliert entwickelten Komponenten werden am Ende des Slices zur Feature-View zusammengefügt.

---

## 4. Rolle in der agilen Entwicklung
Der Vertical Slice ist das Herzstück agiler Auslieferung (Scrum/Kanban):

* **Definition of Done (DoD):** Ein Ticket ist erst fertig, wenn der Slice "live-fähig" ist – vom UI bis zur Datenbank. Es gibt keine "halben" technischen Tasks mehr.
* **Schnelles Feedback:** Stakeholder können echte Funktionalität testen, anstatt nur API-Antworten oder statische Mockups zu sehen.
* **KI-Unterstützung:** Da ein Slice eine in sich geschlossene Einheit bildet, kann eine KI (wie GitHub Copilot) den gesamten Kontext eines Features erfassen und hochrelevante Code-Vorschläge generieren, ohne durch die gesamte Applikationsstruktur navigieren zu müssen.

---

## Zusammenfassung der Struktur eines Slices

| Ebene | Umsetzung |
| :--- | :--- |
| **Frontend (CDD)** | Isolierte UI-Komponenten & Feature-View. |
| **Vermittlung** | API-Endpunkt / BFF-Mapping (spezifisch für diesen Use-Case). |
| **Logik (DDD)** | Domain Services & Aggregates innerhalb des Bounded Contexts. |
| **Infrastruktur** | Spezifische Datenbank-Migrationen & Repositories für das Feature. |

**Der größte Vorteil:** Wenn sich ein Business-Requirement ändert, musst du nicht das ganze System umbauen, sondern nur den betroffenen Slice anpassen oder austauschen.

