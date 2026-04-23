---
description: "JUnit 5 Tests erstellen für eine Java-Klasse oder Methode. Use when: Unit-Tests generieren, Testfälle erstellen, JUnit, Java testen, AAA-Pattern, Mocking mit Mockito"
name: "JUnit Tests generieren"
argument-hint: "Klassenname oder Testfokus (optional)"
agent: "agent"
tools: ["search"]
---

Erstelle umfassende JUnit 5 Unit-Tests für den folgenden Java-Code:

```java
$SELECTION
```

## Anforderungen

### Teststruktur
- **Framework:** JUnit 5 (`@Test`, `@BeforeEach`, `@AfterEach`, `@ParameterizedTest`)
- **Mocking:** Mockito (`@Mock`, `@InjectMocks`, `@ExtendWith(MockitoExtension.class)`)
- **Pattern:** AAA (Arrange – Act – Assert) mit Kommentaren pro Block
- **Testklassenname:** `<KlassenName>Test` im gleichen Package

### Testabdeckung
- Happy Path: alle normalen Eingaben und erwarteten Ausgaben
- Edge Cases: Grenzwerte, leere Listen, Null-Werte, maximale/minimale Werte
- Fehlerfälle: erwartete Exceptions mit `assertThrows()`
- Parametrisierte Tests für mehrere Eingabevarianten (`@ParameterizedTest` + `@MethodSource`)

### Benennungskonvention
Verwende das Format:
```
methodName_scenarioDescription_expectedBehavior()
```
Beispiel: `calculateTotal_emptyList_returnsZero()`

### Qualitätskriterien
- Jeder Test prüft **genau eine** Sache
- Keine Logik in Tests (keine if/for-Blöcke)
- Aussagekräftige `assertThat`-Nachrichten (AssertJ bevorzugt)
- Mocks nur für externe Abhängigkeiten (DB, HTTP, Filesystem)

## Ausgabeformat

Gib zuerst eine kurze Übersicht der identifizierten Testfälle als Liste, dann die vollständige Testklasse als Codeblock.

Frage nach, falls die Abhängigkeiten der Klasse (z. B. verwendete Frameworks, Spring-Kontext, spezifische Test-Utilities) unklar sind.
