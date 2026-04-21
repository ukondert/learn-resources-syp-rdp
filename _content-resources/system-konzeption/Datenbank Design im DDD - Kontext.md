# Datenbankdesign im DDD - Kontext

Der Übergang vom **Domain-Driven Design (DDD)** zum **Datenbankdesign** ist ein entscheidender Schritt. Im DDD gilt das Prinzip der **Persistence Ignorance**: Das Domänenmodell sollte zunächst so entworfen werden, als gäbe es gar keine Datenbank. Erst wenn die Geschäftslogik steht, überlegen wir, wie wir sie "schlafen legen" (persistieren).

Hier ist der strukturierte Pfad, wie du deine fachlichen Modelle in ein technisches Datenbank-Schema übersetzt:

---

## 1. Schritt: Aggregates als Konsistenzgrenzen nutzen
Im DDD sind **Aggregates** die wichtigste Einheit für die Persistenz. Ein Aggregate ist eine Gruppe von Objekten, die gemeinsam als eine Einheit betrachtet werden.

* **Die goldene Regel:** Eine Transaktion sollte immer nur **ein** Aggregate-Root ändern.
* **Datenbank-Implikation:** Ein Aggregate definiert oft den Umfang eines Datenbank-Schreibvorgangs. Wenn du eine relationale DB (SQL) nutzt, entspricht ein Aggregate oft einer Haupttabelle mit mehreren verknüpften Detailtabellen.

## 2. Schritt: Tactical Design Mapping
Du musst entscheiden, wie die einzelnen DDD-Bausteine technisch abgebildet werden:

### **Entities**
* Haben eine eindeutige Identität (ID).
* **DB-Design:** Werden zu eigenen Tabellen mit einem **Primary Key**.

### **Value Objects**
* Haben keine eigene ID, sie definieren sich über ihre Werte (z. B. eine `Address` oder ein `Money`-Betrag).
* **DB-Design (SQL):** Werden entweder als **Inline-Spalten** in die Tabelle der Entity aufgenommen (z. B. `street`, `zip` direkt in der `User`-Tabelle) oder als **JSONB-Spalte** (in modernen DBs wie PostgreSQL) gespeichert.
* **DB-Design (NoSQL):** Werden einfach als eingebettetes Dokument gespeichert.

### **Identities (IDs)**
* Verwende im DDD vorzugsweise **UUIDs** statt fortlaufender Integer-IDs.
* **Warum?** So kann das Domänenmodell die ID bereits generieren, bevor die Daten in die DB geschrieben werden. Das entkoppelt die Logik von der Datenbank-Auto-Inkrement-Logik.

---

## 3. Schritt: Beziehungen auflösen
Im DDD unterscheiden wir strikt zwischen Beziehungen *innerhalb* und *außerhalb* eines Aggregates.

* **Innerhalb eines Aggregates:** Hier nutzt du klassische Fremdschlüssel (Foreign Keys) und Joins, da die Daten fachlich zusammengehören.
* **Zwischen Aggregates:** Referenziere andere Aggregates **nur über deren ID**, niemals über Objekt-Referenzen (Lazy Loading vermeiden!).
    * *DB-Sicht:* Du hast eine Spalte `customer_id` in deiner `Order`-Tabelle, verzichtest aber eventuell auf einen harten Datenbank-Constraint, um die Microservices oder Bounded Contexts entkoppelt zu halten.



---

## 4. Schritt: Wahl der Technologie nach Domäne
Je nachdem, in welcher Domäne du dich befindest, änderst du dein DB-Design:

* **Core Domain (Komplex):** Hier lohnt sich oft **Event Sourcing**. Statt den aktuellen Zustand zu speichern, speicherst du alle fachlichen Ereignisse (Events). Alternativ: Ein sehr sauberes relationales Modell mit einem mächtigen ORM (wie Hibernate oder Entity Framework).
* **Supporting/Generic Domain (Einfach):** Hier reicht oft ein klassisches **Table-per-Class** Design. Ein "Anemic Domain Model" (Datenklassen ohne viel Logik) ist hier völlig okay.

---

## 5. Das Problem des "Impedance Mismatch"
Objektorientierte Modelle (DDD) und relationale Modelle (SQL) "denken" unterschiedlich. Um diese Brücke zu schlagen, hast du drei Wege:

1.  **ORM (Object-Relational Mapper):** Nimmt dir die Arbeit ab, erzeugt aber oft komplexen SQL-Code.
2.  **Data Mapper Pattern:** Du schreibst manuell Mapper, die Domänenobjekte in flache Database-Transfer-Objects (DTOs) umwandeln.
3.  **Document Store:** In NoSQL-Datenbanken (wie MongoDB) lassen sich DDD-Aggregates oft 1:1 als ein Dokument speichern, was den Mapping-Aufwand minimiert.

---

## Profi-Tipp: Separation of Concerns
Baue deine Datenbank-Tabellen nicht so, wie es für das UI (CDD) am bequemsten ist, sondern so, wie es die Geschäftsregeln (DDD) erfordern. Für die UI-Optimierung nutzt du dann den **Read Model** Ansatz aus **CQRS**:

* **Write Model:** Optimiert für Konsistenz und DDD-Regeln.
* **Read Model:** Flache Tabellen oder Sichten, die genau so aufgebaut sind, wie deine Frontend-Komponenten sie brauchen (ideal für GraphQL).

Gehst du eher in Richtung einer klassischen relationalen Datenbank (PostgreSQL/MySQL) oder ziehst du für deine Domäne eine NoSQL-Lösung in Betracht?