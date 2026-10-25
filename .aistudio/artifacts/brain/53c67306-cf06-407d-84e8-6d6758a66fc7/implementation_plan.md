# Escape-Game: Julikrise 1914 – Stoppt die Kettenreaktion!

Ein interaktives, geschichtsdidaktisches 5-Slide-Escape-Game für die Sekundarstufe I & II, in dem Schülerinnen und Schüler als Diplomaten im Juli 1914 historische Geheimtelegramme entschlüsseln, Interessenkonflikte der Großmächte analysieren und durch 4-stellige Codes die Kettenreaktion der Mobilmachungen aufhalten wollen.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> Alle Kernmechaniken wurden auf Basis Ihrer didaktischen Vorgaben und der Folgepräzisierungen strukturiert:
> - **Inhaltliche Abfolge & Codes**:
>   1. Österreich-Ungarn: Ultimatum an Serbien (Code: `2348` – 23. Juli, 48-Stunden-Frist)
>   2. Deutsches Reich: Blankoscheck & Willy-Telegramm (Code: `0507` – 5. Juli 1914)
>   3. Russland: Generalmobilmachung & Nicky-Telegramm (Code: `3007` – 30. Juli 1914)
>   4. Frankreich: Bündnistreue & Revanche (Code: `1871` – Friede von Frankfurt / Abtretung Elsass-Lothringens)
>   5. Großbritannien: Neutralität Belgiens & Ultimatum (Code: `1914` – Kriegseintritt / Bruch des Vertrags von 1839)
> - **Punktesystem & Auswertung**:
>   - Max. 1.000 Punkte pro Nation (Gesamt: 5.000 Punkte).
>   - Quiz-Erstversuch: +300 Pkt (Zweitversuch: +150 Pkt).
>   - Code-Entschlüsselung: +500 Pkt.
>   - Schnelligkeitsbonus: bis zu +200 Pkt je Nation.
>   - Optionaler Diplomaten-Hinweisabzug (-50 Pkt).
>   - Rang-Kategorisierung am Ende: *Großbotschafter des Friedens*, *Chefunterhändler*, *Legationsrat*, *Attaché*.
> - **Subtile Hinweise**:
>   - Im visuellen Design & Text eingearbeitete Hinweise (markierte Chiffren im Datumsstempel, hervorgehobene Zeilenverweise, Telegramm-Kopfdaten, optische Stempelmarkierungen).
> - **Audio & Monologe**:
>   - Vollständige Sprecheranweisungen (Regie, Tonfall, Tempo), integrierter Audio-Player mit Web Speech API (Vorlese-Simulation) und Ticker-/Schreibmaschineneffekten, umschaltbar auf reinen Lesemodus.

---

## 1. Overview & Core Concept

- **Ziel**: Schülerinnen und Schüler begreifen die Mechanismen der Bündnisverflechtungen, Mobilmachungsautomatismen, militaristischen Zwänge und Fehleinschätzungen im Vorfeld des Ersten Weltkriegs.
- **Rolle der Spielenden**: Als junge Sondergesandte der Friedenskonferenz im Auswärtigen Amt erhalten sie Zugriff auf geheime Telegramme der fünf europäischen Großmächte.
- **Lernziel**: Verstehen, warum kein Staat isoliert handelte und wie Diplomatie 1914 zwischen Beistandspflicht, nationalem Prestige und Präventivkriegslogik versagte.

---

## 2. User Experience & Visual Design

### A. Visuelle Ästhetik (Archival Document & Telegramm-Design)
- **Hintergrund & Textur**: Vergilbtes Diplomatenpapier (warme Elfenbein- und Pergamenttöne: `#F7F4EE`, `#EFE8D8`, verwaschene Faltungslinien, feine Randrisse).
- **Stilelemente pro Großmacht**:
  - Authentischer Dienststempel (z.B. *K.u.K. Ministerium des Äußern*, *Auswärtiges Amt Berlin*, *Ministerium des kaiserlichen Hauses St. Petersburg*, *Quai d'Orsay Paris*, *Foreign Office London*).
  - Amtliches Telegramm-Formular mit Kopfdaten (Depeschennummer, Übertragungszeit, Telegrafenstation).
- **Typografie**:
  - Überschriften & Staatsakte: Klassische Serifenschrift (*Cinzel* / *Playfair Display* / *Fraunces*).
  - Telegrammtexte & Chiffren: Schreibmaschinen-/Fernschreiber-Schrift (*Courier Prime* / *IBM Plex Mono*).
  - Begleitende Erläuterungen: Hochlesbare Antiqua (*Source Serif 4* / *Plus Jakarta Sans*).

### B. Slide-Architektur (Die 5 Stationen)
Jeder der 5 Slides besitzt ein konsistentes 2-Spalten-Layout:
1. **Linke Spalte (Historisches Archiv)**:
   - Staatsflagge / Wappen und Länderkopf.
   - Interaktives **Original-Telegramm**: Vergilbtes Dokument mit offiziellem Stempel, Zitat und eingebetteten kryptischen Randnotizen.
   - **Audio-Sprechskript-Sektion**: Bildnis des Monarchen/Staatschefs, Audio-Player (Play/Pause, Sprecheranweisung als aufklappbare Regiekarte, Web-Speech-Stimme mit Morse-/Schreibmaschinenbegleitung).
2. **Rechte Spalte (Diplomaten-Pult & Dechiffrierung)**:
   - **Verständnis-Quiz**: Multiple-Choice-Frage zum wahren Interesse der Nation mit direktem didaktischem Feedback.
   - **Subtiler Hinweis (Archiv-Tipp)**: Lupe / Dechiffrier-Hinweis auf Klick verfügbar.
   - **4-stelliger Code-Tresor / Chiffrierwalze**: Interaktives Zifferneingabefeld (Keypad oder Walzen) mit visueller Bestätigung (grüner Wachsstempel bei Erfolg, Erschütterung bei Fehlversuch).
   - **Punkte- & Zeitanzeige**: Ruhige Zeiterfassung und aktueller Punktestand.

### C. Subtile Hinweise in den 5 Slides
1. **Slide 1 (Österreich-Ungarn - Code: 2348)**:
   - *Dokument*: Ultimatum an die königlich serbische Regierung.
   - *Subtiler Hinweis*: Im Telegrammkopf steht handschriftlich vermerkt: *"Depesche übergeben am 23. d.M., Beantwortung gefordert binnen 48 Stunden!"* Der offizielle Stempel trägt die Chiffre `D-23/48`.
2. **Slide 2 (Deutsches Reich - Code: 0507)**:
   - *Dokument*: Der Blankoscheck von Kaiser Wilhelm II. an Kaiser Franz Joseph.
   - *Subtiler Hinweis*: Das Audienz-Datum in Potsdam ist im Telegrammkopf als `05. JULI` mit Kreisstempel fixiert, in der Randnotiz steht: *"Gegeben am fünften Tag des siebten Monats"*.
3. **Slide 3 (Russland - Code: 3007)**:
   - *Dokument*: Ukas Zar Nikolaus II. zur Gesamtmobilmachung & Zar-Telegramm an "Willy".
   - *Subtiler Hinweis*: Die Telegrafen-Registriernummer am Rand lautet `PETROGRAD-30-VII`, die Unterschrift ist auf den `30. Juli` datiert.
4. **Slide 4 (Frankreich - Code: 1871)**:
   - *Dokument*: Präsident Raymond Poincaré & Ministerrat zur unverbrüchlichen russischen Allianz und Revanche.
   - *Subtiler Hinweis*: Am Fuß der Depesche ist ein verblasstes Siegel angebracht mit der Inschrift: *"Gedenket des schmachvollen Friedens von Frankfurt – Vor 43 Jahren (1914 - 43)"*, markiert mit der Jahreszahl `1871`.
5. **Slide 5 (Großbritannien - Code: 1914)**:
   - *Dokument*: Außenminister Sir Edward Grey: *"Die Lampen gehen in ganz Europa aus..."* & Ultimatum wegen der belgischen Neutralität.
   - *Subtiler Hinweis*: Der Mastercode zur Schließung der Akte ist das Schicksalsjahr selbst, eingeprägt in die goldene Abschlussmünze des Foreign Office: `ANNO DOMINI 1914`.

---

## 3. Key Product Decisions & Trade-Offs

- **Punktesystem & Gamification**:
  - Ermutigt Schüler zur sorgfältigen Lektüre der historischen Zitate statt reinem Durchklicken.
  - Fehlerhafte Quiz-Antworten sperren nicht das Weiterkommen, reduzieren aber den Punktegewinn und geben didaktische Hilfestellungen.
- **Audio-Umsetzung**:
  - Synthese via Web Speech API (deutschsprachige Monologe mit passender Stimmlage) kombiniert mit stimmigen Soundeffekten (Schreibmaschine / Telegrafenklicken / Stempelschlag via Web Audio API ohne externe Sounddateien).
  - Volle Regieanweisungen im Interface einsehbar für Unterrichtszwecke (z.B. wenn Schüler die Rollen im Unterricht selbst vorlesen möchten).
- **Abschluss-Dossier & Druckansicht**:
  - Nach Lösen von Slide 5 erscheint eine historische Auswertung: Chronologischer Zeitstrahl ("Wie die Kettenreaktion ablief"), erzielte Gesamtpunktzahl, persönlicher Diplomaten-Titel und ein druckbarer "Diplomatenpass".

---

## 4. Technical Architecture & Component Structure

```
┌─────────────────────────────────────────────────────────────┐
│                 App (State & Progress Store)                │
│  - Current Slide (1..5)       - Timer / Time Elapsed        │
│  - Score (Quiz + Time + Hints)- Unlocked States & Answers   │
│  - Sound Synthesis & Audio Player Controller                │
└──────────────────────────────┬──────────────────────────────┘
                               │
       ┌───────────────────────┴───────────────────────┐
       ▼                                               ▼
┌───────────────────────────────┐     ┌───────────────────────────────┐
│        Top Bar / Header       │     │     End Screen / Summary      │
│ - Fortschrittsbalken (5 Mächte│     │ - Diplomaten-Dossier & Rang   │
│ - Punktestand (tabular-nums)  │     │ - Zeitanalyse & Feedback      │
│ - Missionsuhr / Zeiterfassung │     │ - Historischer Zeitstrahl     │
│ - Notizbuch & Glossar-Modal   │     │ - Druck- & Neustart-Funktion  │
└───────────────────────────────┘     └───────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                   Slide Container (Active Step)              │
│ ┌─────────────────────────────┬───────────────────────────┐ │
│ │   Historisches Dokument     │   Diplomaten-Pult         │ │
│ │ - Vergilbtes Telegramm      │ - Quizfrage (Didaktik)    │ │
│ │ - Dienststempel & Wappen    │ - Subtiler Hinweis-Kanal  │ │
│ │ - Originalzitat             │ - 4-Stelliger Code-Tresor │ │
│ │ - Audio-Sprechskript & Monolog (Keypad & Feedback)     │ │
│ └─────────────────────────────┴───────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Next Steps nach Freigabe
Nach Ihrer Bestätigung dieses Plans erstelle ich die vollständige Anwendung mit allen 5 ausgearbeiteten Slides, authentischen historischen Dokumententexten, Monologen mit Regieanweisungen, Sound-Synthese und dem interaktiven Dechiffrier-Pult.
