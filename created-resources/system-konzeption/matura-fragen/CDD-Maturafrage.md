# Maturafragen – Component Driven Design (CDD)

---

### KOMPONENTENARCHITEKTUR IM FRONTEND EINES STARTUP-PORTALS

**Situatives Umfeld / Szenario:**
Ein junges Softwareunternehmen entwickelt ein B2B-Portal zur Verwaltung von Kundenprojekten. Das Frontend-Team stellt fest, dass Button-Stile dreifach kopiert wurden, Formularlogik in jeder Seite neu implementiert ist und jede Änderung an der UI einen Eingriff in zahlreichen Dateien erfordert. Die Teamleiterin entscheidet sich für eine Umstellung auf **Component Driven Design (CDD)** und beauftragt die Entwicklerin Lisa, das neue Frontend-Konzept vorzustellen.

---

### AUFGABENSTELLUNG

**1. Reproduktion**
* Erkläre die drei Kernprinzipien des Component Driven Design (Isolation, Komposition, Wiederverwendbarkeit) und grenzte den Ansatz vom klassischen Page-based Development ab.

**2. Transfer und Anwendung**
* Lisa soll das bestehende Anmeldeformular des Portals mithilfe von Atomic Design neu strukturieren. Beschreibe, wie das Anmeldeformular entlang der fünf Ebenen des Atomic Design (Atoms → Molecules → Organisms → Templates → Pages) aufgebaut werden kann. Nenne für jede Ebene ein konkretes Element aus diesem Szenario.

**3. Analyse und Reflexion**
* Analysiere die bereitgestellte [`Login.jsx`](resourcen/Login.jsx). Welches Architekturproblem liegt hier vor, welche Auswirkungen hat dies auf Wartbarkeit und Testbarkeit. Entwickle einen Lösungsvorschlag (*Code muss nicht lauffähig sein, es muss nur das Ziel der Neustrukturierng erkennbar sein*).

---

### MUSTERANTWORTEN (Für die Prüferhand)

**Musterantwort zu 1 (Reproduktion):**
* **Kernaussage:** CDD ist eine Methodik, um Benutzeroberflächen modular, wiederverwendbar und konsistent aufzubauen – beginnend bei den kleinsten Elementen bis hin zu vollständigen Seiten (Bottom-Up).
* **Kernprinzipien:**
  * **Isolation:** Jede Komponente ist in sich abgeschlossen und funktioniert unabhängig von ihrer Umgebung.
  * **Komposition:** Komplexe UI-Elemente entstehen durch das Zusammensetzen einfacherer Komponenten.
  * **Wiederverwendbarkeit:** Eine einmal entwickelte Komponente kann in verschiedenen Kontexten eingesetzt werden – auch über Projektgrenzen hinweg in einer Component Library (DRY-Prinzip).
* **Abgrenzung zu Page-based Development:**
  * Klassisch (Top-Down): Man entwirft eine Seite und schreibt HTML/CSS/JS am Stück; Code wird kopiert und dreifach implementiert.
  * CDD (Bottom-Up): Zuerst entstehen wiederverwendbare Komponenten, aus denen Seiten zusammengesetzt werden.

**Musterantwort zu 2 (Transfer und Anwendung):**

| Ebene | Kategorie | Konkrete Elemente im Szenario |
|---|---|---|
| **Atoms** | Kleinste, nicht weiter teilbare UI-Elemente ohne eigene Logik | `InputFeld` (Benutzername/Passwort), `Button` (Anmelden), `Label` (Beschriftungen) |
| **Molecules** | Sinnvolle Kombination von Atoms mit einfacher Aufgabe | `Label` + `InputFeld` = `FormField` (beschriftetes Eingabefeld als eigenständige Einheit) |
| **Organisms** | Komplexe, eigenständige UI-Abschnitte aus mehreren Molecules/Atoms | `FormField` (Benutzername) + `FormField` (Passwort) + `Button` (Anmelden) = vollständiges `LoginFormular` |
| **Templates** | Layout-Gerüst (Wireframe) ohne echte Inhalte | Zentrierte Karte mit Header oben und `LoginFormular` in der Mitte – Platzhalter statt Echtdaten |
| **Pages** | Fertiges Template befüllt mit echten Inhalten und Daten | Firmenlogo im Header, ausgefülltes Formular, Fehlermeldungen bei falschen Zugangsdaten |

* **Referenz:** [anmeldung-online-bibliothek.html](resourcen/anmeldung-online-bibliothek.html) – zeigt alle fünf Ebenen mit CSS-Kommentaren annotiert.

**Musterantwort zu 3 (Analyse und Reflexion):**
* **Problematik:** Die Komponente [`Login.jsx`](resourcen/Login.jsx) verletzt das **Smart/Dumb-Components-Prinzip**. In derselben Datei werden der REST-API-Aufruf (`POST /auth/login`) abgefeuert, der gesamte Anwendungsstatus (`email`, `password`, `loading`, `error`) verwaltet und gleichzeitig die vollständige UI-Darstellung (Views, TextInputs, Styles) definiert. Laut dem Architekturprinzip gilt: Wenn in derselben Datei sowohl komplexe API-Aufrufe als auch umfangreiche UI-Strukturen stehen, wurde das Smart/Dumb-Prinzip verletzt.
* **Auswirkung:** Die Komponente ist schwer testbar (Logik und UI nicht isolierbar), nicht wiederverwendbar (die Darstellung ist fest an den API-Aufruf gekoppelt) und bei Änderungen fehleranfällig, da mehrere Zuständigkeiten vermischt sind.
* **Lösung:** Aufteilung in zwei separate Komponenten:
  * **`LoginContainer` (Smart Component):** Verwaltet `useState` für email, password, loading und error; führt `POST /auth/login` durch und leitet die aufbereiteten Daten sowie Callback-Funktionen als Props weiter.
  * **`LoginView` (Dumb Component):** Erhält alle Daten von außen über Props (`email`, `password`, `loading`, `error`, `onEmailChange`, `onPasswordChange`, `onLoginPress`), kümmert sich ausschließlich um die Darstellung und löst bei Nutzerinteraktionen Events aus.
  * **Faustregel:** So wenige Smart Components wie möglich, so viele Dumb Components wie möglich.
