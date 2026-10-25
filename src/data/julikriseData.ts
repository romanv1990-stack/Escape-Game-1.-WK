import { EscapeGameSlide, MemorialStat, MapTerritory } from '../types/escapeGame';

export const MAP_TERRITORIES_1914: MapTerritory[] = [
  {
    id: 'ger',
    name: 'Deutsches Kaiserreich',
    alliance: 'Mittelmächte',
    capital: 'Berlin',
    role1914: 'Stärkste Landmacht Mitteleuropas; gebunden an Österreich-Ungarn; fürchtete den Zweifrontenkrieg.',
    coords: { x: 50, y: 44 },
  },
  {
    id: 'auh',
    name: 'Österreich-Ungarn',
    alliance: 'Mittelmächte',
    capital: 'Wien',
    role1914: 'Vielvölkerreich der Habsburger; bedroht durch südslawischen Nationalismus; stellte das Ultimatum an Serbien.',
    coords: { x: 58, y: 56 },
  },
  {
    id: 'rus',
    name: 'Russisches Kaiserreich',
    alliance: 'Entente',
    capital: 'St. Petersburg',
    role1914: 'Größte Landmasse Europas; Schutzmacht Serbiens; rief am 30. Juli die Generalmobilmachung aus.',
    coords: { x: 78, y: 34 },
  },
  {
    id: 'fra',
    name: 'Französische Republik',
    alliance: 'Entente',
    capital: 'Paris',
    role1914: 'Enger Bündnispartner Russlands; unversöhnt seit dem Verlust Elsass-Lothringens 1871.',
    coords: { x: 34, y: 54 },
  },
  {
    id: 'gbr',
    name: 'Britisches Empire',
    alliance: 'Entente',
    capital: 'London',
    role1914: 'Führende Seemacht; trat nach der deutschen Verletzung der belgischen Neutralität in den Krieg ein.',
    coords: { x: 28, y: 36 },
  },
  {
    id: 'bel',
    name: 'Königreich Belgien',
    alliance: 'Neutral',
    capital: 'Brüssel',
    role1914: 'Völkerrechtlich neutraler Pufferstaat; am 3./4. August 1914 von deutschen Truppen völkerrechtswidrig überrannt.',
    coords: { x: 37, y: 43 },
  },
  {
    id: 'srb',
    name: 'Königreich Serbien',
    alliance: 'Entente',
    capital: 'Belgrad',
    role1914: 'Balkanstaat unter russischem Schutz; Schauplatz der Julikrise nach dem Attentat von Sarajevo.',
    coords: { x: 67, y: 68 },
  },
];

export const MEMORIAL_CASUALTIES: MemorialStat[] = [
  {
    country: 'Russisches Kaiserreich',
    flag: '☦️',
    alliance: 'Entente',
    fallenSoldiers: '1.800.000 Gefallene',
    civilianLosses: 'ca. 1.500.000 Zivilopfer & Hunger',
    keyConsequence: 'Militärischer Kollaps, Revolution 1917, Ermordung der Zarenfamilie, Entstehung der Sowjetunion.',
  },
  {
    country: 'Deutsches Kaiserreich',
    flag: '⚔️',
    alliance: 'Mittelmächte',
    fallenSoldiers: '2.050.000 Gefallene',
    civilianLosses: 'ca. 760.000 Hungertote der Seeblockade',
    keyConsequence: 'Ende der Monarchie, Abdankung Wilhelms II., Ausrufung der Weimarer Republik, Versailler Vertrag.',
  },
  {
    country: 'Französische Republik',
    flag: '⚜️',
    alliance: 'Entente',
    fallenSoldiers: '1.400.000 Gefallene',
    civilianLosses: 'ca. 300.000 Zivilopfer',
    keyConsequence: 'Ein Viertel aller Männer zwischen 18 und 27 Jahren getötet; verwüstete Schlachtfelder im Norden (Verdun).',
  },
  {
    country: 'Österreich-Ungarn',
    flag: '🦅',
    alliance: 'Mittelmächte',
    fallenSoldiers: '1.500.000 Gefallene',
    civilianLosses: 'ca. 450.000 Zivilopfer',
    keyConsequence: 'Vollständiger Zerfall des 600 Jahre alten Habsburgerreiches in Nationalstaaten (Österreich, Ungarn, Tschechoslowakei etc.).',
  },
  {
    country: 'Britisches Empire',
    flag: '🦁',
    alliance: 'Entente',
    fallenSoldiers: '1.000.000 Gefallene',
    civilianLosses: 'ca. 110.000 Zivilopfer (U-Boot-Krieg)',
    keyConsequence: 'Verlust einer ganzen Generation; gigantische Kriegsschulden; Beginn des Niedergangs des Weltreichs.',
  },
  {
    country: 'Königreich Serbien',
    flag: '🇷🇸',
    alliance: 'Entente',
    fallenSoldiers: '400.000 Gefallene',
    civilianLosses: 'ca. 800.000 Zivilopfer (Seuchen & Hunger)',
    keyConsequence: 'Serbien verlor fast ein Drittel seiner gesamten Vorkriegsbevölkerung und über 60% aller Männer.',
  },
];

export const JULIKRISE_SLIDES: EscapeGameSlide[] = [
  {
    id: 1,
    nation: 'Österreich-Ungarn',
    alliance: 'Mittelmächte',
    colorTheme: {
      primary: '#851e1e',
      border: '#a33333',
      stamp: '#781d1d',
      badgeBg: 'rgba(133, 30, 30, 0.12)',
    },
    flagSymbol: '🦅',
    subTitle: 'Das Ultimatum an Serbien – Gerechtigkeit für Sarajevo & Hegemonialanspruch',
    code: '2348',
    codeExplanation: '2348 setzt sich zusammen aus dem 23. Juli 1914 (Übergabe des Ultimatums in Belgrad) und der ultimativen 48-Stunden-Frist.',
    subtleClue: {
      hintTitle: 'Aktenvermerk des k.u.k. Botschafters',
      hintText: 'Achte auf den Tag der Überbringung der Note in Belgrad im Juli und die gnadenlos knapp bemessene Frist in Stunden, die Serbien gewährt wurde.',
      visualClueDetail: 'Im Dokumentenkopf oben rechts steht der Depeschencode D-23/48 eingeprägt.',
    },
    document: {
      type: 'Diplomatische Note & Ultimatum',
      dispatchNumber: 'K.u.K. RES-1914-723/BEL',
      sender: 'K.u.K. Ministerium des Äußern (Wien)',
      recipient: 'Königlich Serbische Regierung (Belgrad)',
      dateLocation: 'Wien / Belgrad, 23. Juli 1914, 18:00 Uhr',
      originalExcerpt: 
        '„Die k. und k. Regierung sieht sich gezwungen, von der serbischen Regierung die offizielle Verurteilung der gegen die Monarchie gerichteten Propaganda zu verlangen... Serbien verpflichtet sich, jedes Organ der Presse zu unterdrücken, welches zum Hass gegen Österreich-Ungarn aufstachelt... Serbien muss einwilligen, dass Organe der k. und k. Regierung an der Unterdrückung der subversiven Bewegung und gerichtlichen Untersuchung auf serbischem Boden mitwirken... Die k. und k. Regierung erwartet die zustimmende Antwort bis spätestens Samstag, den 25. Juli, um 6 Uhr abends – die Frist beläuft sich somit auf genau achtundvierzig Stunden!“',
      historicalContext:
        'Nach dem Attentat auf Erzherzog Franz Ferdinand in Sarajevo am 28. Juni 1914 verfasste Wien absichtlich ein unannehmbares Ultimatum, um Serbiens Souveränität zu verletzen und einen Vorwand für einen begrenzten militärischen Schlag zu schaffen.',
      clueSnippet: 'Übergabe: 23. JULI 1914 // BEANTWORTUNGSFRIST: 48 STUNDEN',
      visualStampTitle: 'K.U.K. MINISTERIUM DES ÄUSSERN',
      visualStampLocation: 'WIEN - BALLHAUSPLATZ',
      visualStampCode: 'REG: 23-VII / 48H-ULT',
    },
    audioScript: {
      speakerName: 'Kaiser Franz Joseph I.',
      speakerRole: 'Kaiser von Österreich und König von Ungarn (83 Jahre alt)',
      avatarIcon: '👑',
      directionNotes: {
        tone: 'Alt, brüchig, aber erfüllt von dynastischer Kälte und unerbittlicher Härte',
        pace: 'Gemessen, schleppend mit markanten Zäsuren vor Zahlen und Fristen',
        emotion: 'Tief gekränkt durch den Meuchelmord; getrieben von der Angst vor dem Zerfall des Vielvölkerstaates',
        historicalIntent: 'Will keine Diplomatie mehr, sondern die militärische Demütigung Serbiens als Existenznachweis der Habsburgermonarchie demonstrieren.',
      },
      speechText:
        'Mein Neffe Franz Ferdinand und seine Gemahlin Sophie liegen im Grabe von Sarajevo, ermordet von serbischen Meuchelmördern! Zu lange haben wir die serbischen Provokationen an unserer südlichen Reichsgrenze geduldet. Wenn wir jetzt nicht mit eiserner Entschlossenheit zuschlagen, zerfällt dieses altehrwürdige Reich in Trümmer. Ich habe mein Ultimatum unterzeichnen lassen. Die serbische Regierung hat genau achtundvierzig Stunden ab der Übergabe am dreiundzwanzigsten Juli, um alle Bedingungen restlos zu erfüllen – oder unsere Kanonen werden Belgrad in Schutt und Asche legen. Gott schütze Österreich!',
      durationEstimate: 'ca. 35 Sekunden',
    },
    quizQuestions: [
      {
        id: 1,
        question: 'Welches strategische Hauptziel verfolgte die Führung in Wien mit der bewussten Schärfe des Ultimatums?',
        options: [
          {
            id: 'A',
            text: 'Einen diplomatischen Kompromiss auf einer Schiedsgerichtskonferenz herbeiführen.',
            isCorrect: false,
            feedback: 'Falsch. Wien lehnte internationale Vermittlungsvorschläge bewusst ab.',
          },
          {
            id: 'B',
            text: 'Bedingungen zu stellen, die Serbiens Souveränität so verletzen, dass ein Krieg unausweichlich wird.',
            isCorrect: true,
            feedback: 'Richtig! Die Forderung nach österreichischen Polizei- und Justizorganen auf serbischem Staatsgebiet war unannehmbar.',
          },
          {
            id: 'C',
            text: 'Russland zu bewegen, Galizien freiwillig abzutreten.',
            isCorrect: false,
            feedback: 'Falsch. Galizien gehörte bereits zu Österreich-Ungarn.',
          },
          {
            id: 'D',
            text: 'Großbritannien als neuen Flottenpartner im Mittelmeer zu gewinnen.',
            isCorrect: false,
            feedback: 'Falsch. London stand den Wiener Absichten ablehnend gegenüber.',
          },
        ],
        explanation:
          'Österreich-Ungarn wollte die Krise nutzen, um Serbien als regionale Bedrohung und Symbol des Panslawismus auf dem Balkan mit Waffengewalt auszuschalten.',
      },
      {
        id: 2,
        question: 'Welche europäische Großmacht fürchtete man in Wien bei einem Angriff auf Serbien am meisten?',
        options: [
          {
            id: 'A',
            text: 'Russland, das sich als Schutzmacht aller slawischen und orthodoxen Völker verstand.',
            isCorrect: true,
            feedback: 'Richtig! Wien wusste, dass ein Angriff auf Serbien ohne deutsche Rückendeckung die russische Intervention provozieren musste.',
          },
          {
            id: 'B',
            text: 'Das Osmanische Reich, das Belgrad sofort wieder erobern wollte.',
            isCorrect: false,
            feedback: 'Falsch. Die Osmanen waren durch die Balkankriege 1912/13 geschwächt und kein Bündnispartner Serbiens.',
          },
          {
            id: 'C',
            text: 'Spanien, das mit einer Entsendung der Armada drohte.',
            isCorrect: false,
            feedback: 'Falsch. Spanien war neutral und an der Balkankrise nicht beteiligt.',
          },
          {
            id: 'D',
            text: 'Schweden, das Serbiens Grenze mit Truppen sicherte.',
            isCorrect: false,
            feedback: 'Falsch. Schweden war neutral und geographisch völlig unbeteiligt.',
          },
        ],
        explanation:
          'Das zaristische Russland sah Serbien als engsten Verbündeten und Vorposten auf dem Balkan an. Ein österreichischer Schlag gegen Serbien bedrohte das russische Ansehen fundamental.',
      },
    ],
  },
  {
    id: 2,
    nation: 'Deutsches Reich',
    alliance: 'Mittelmächte',
    colorTheme: {
      primary: '#1c3d5a',
      border: '#2c5282',
      stamp: '#1a365d',
      badgeBg: 'rgba(28, 61, 90, 0.12)',
    },
    flagSymbol: '⚔️',
    subTitle: 'Der „Blankoscheck“ & Potsdamer Kronrat – Nibelungentreue & Risikostrategie',
    code: '0507',
    codeExplanation: '0507 steht für den 5. Juli 1914 – das Datum, an dem Kaiser Wilhelm II. dem österreichischen Gesandten die unbedingte Bündnistreue („Blankoscheck“) zusicherte.',
    subtleClue: {
      hintTitle: 'Audienz-Protokoll des Kaiserlichen Schlosses',
      hintText: 'Welcher Tag des siebten Monats besiegelte die deutsche Zusage bedingungsloser militärischer Unterstützung für Wien?',
      visualClueDetail: 'Der kaiserliche Dienststempel ist auf den fünften Tag des siebten Monats (05/07) datiert.',
    },
    document: {
      type: 'Geheimer Missionsbericht',
      dispatchNumber: 'AUSW-AMT-BERLIN-GEH-0507',
      sender: 'Kaiser Wilhelm II. / Reichskanzler Theobald von Bethmann Hollweg',
      recipient: 'Kaiser Franz Joseph I. / Graf Berchtold (Wien)',
      dateLocation: 'Neues Palais, Potsdam, 5. Juli 1914',
      originalExcerpt: 
        '„Kaiser Franz Joseph könne sich darauf verlassen, dass Seine Majestät der Kaiser treu an der Seite Österreich-Ungarns stehen werde, wie es die Bündnispflichten und die alte Freundschaft erheischen. Auch bezüglich eines Vorgehens gegen Serbien halte der Kaiser ein Zaudern für verfehlt. Sollte es zwischen Österreich-Ungarn und Russland zum Kriege kommen, könne Wien gewiss sein, dass Deutschland in gewohnter Bundesgenossentreue an seiner Seite stehen werde. Gegeben am 5. Juli im kaiserlichen Residenzschloss.“',
      historicalContext:
        'Mit dieser Zusage ("Blankoscheck") ermunterte Berlin die Wiener Führung zu einem harten militärischen Vorgehen gegen Serbien. Die deutsche Führung hoffte, der Konflikt bliebe lokal – nahm aber einen Weltkrieg bewusst in Kauf, da ein Krieg gegen Russland 1914 militärisch günstiger erschien als in späteren Jahren.',
      clueSnippet: 'AUDIENZ POTSDAM // DATUM DER ZUSAGE: 05. JULI 1914',
      visualStampTitle: 'KAISERLICHES KABINETT DER REICHSLEITUNG',
      visualStampLocation: 'POTSDAM - NEUES PALAIS',
      visualStampCode: 'DATUM: 05-07-1914',
    },
    audioScript: {
      speakerName: 'Kaiser Wilhelm II.',
      speakerRole: 'Deutscher Kaiser und König von Preußen',
      avatarIcon: '🎖️',
      directionNotes: {
        tone: 'Schneidig, forsch, getrieben von Pathos und fataler militärischer Selbstüberschätzung',
        pace: 'Rasches Stakkato, wechselnd mit lautstarker Entschlossenheit',
        emotion: 'Überzeugt von der eigenen Waffenstärke, nervös vor der russischen Aufrüstung, berauscht von Nibelungentreue',
        historicalIntent: 'Will Wien den Rücken stärken und glaubt naiv, der Zar werde wegen des Attentats nicht eingreifen.',
      },
      speechText:
        'Wir dürfen unseren treuesten Bundesgenossen an der Donau in dieser Schicksalsstunde nicht im Stich lassen! Russland rüstet mit französischen Milliarden gigantisch auf; in wenigen Jahren wären wir chancenlos erdrückt. Wenn Wien abrechnen will, dann jetzt oder nie! Am fünften Juli habe ich dem Gesandten Franz Josephs mein kaiserliches Ehrenwort verpfändet: Deutschland steht treu zu seinem Bündnis. Sie haben freie Hand – einen Blankoscheck für unsere gemeinsame Ehre!',
      durationEstimate: 'ca. 32 Sekunden',
    },
    quizQuestions: [
      {
        id: 1,
        question: 'Was bedeutete der deutsche „Blankoscheck“ vom 5. Juli 1914 in der Praxis?',
        options: [
          {
            id: 'A',
            text: 'Deutschland übernahm die gesamten Staatsschulden Österreich-Ungarns.',
            isCorrect: false,
            feedback: 'Falsch. Es handelte sich um keine finanzielle, sondern eine militärpolitische Garantie.',
          },
          {
            id: 'B',
            text: 'Deutschland sicherte Österreich-Ungarn bedingungslose militärische Rückendeckung zu, selbst bei einem Krieg mit Russland.',
            isCorrect: true,
            feedback: 'Richtig! Wien erhielt freie Hand für den Angriff auf Serbien mit der Garantie, dass Deutschland im Notfall gegen Russland mitkämpft.',
          },
          {
            id: 'C',
            text: 'Deutschland verpflichtete sich, Serbien vor österreichischen Übergriffen zu schützen.',
            isCorrect: false,
            feedback: 'Falsch. Deutschland forderte Wien sogar zu schnellem militärischen Handeln auf.',
          },
          {
            id: 'D',
            text: 'Kaiser Wilhelm trat zugunsten des Kronprinzen von allen Ämtern zurück.',
            isCorrect: false,
            feedback: 'Falsch. Wilhelm II. regierte bis zum November 1918.',
          },
        ],
        explanation:
          'Der Blankoscheck entband Österreich-Ungarn von diplomatischer Mäßigung und signalisierte den Generälen in Wien, dass Berlin selbst das Risiko eines Weltkriegs voll mittrug.',
      },
      {
        id: 2,
        question: 'Welcher deutsche Aufmarschplan zwang die Militärführung zu sofortigem Handeln gegen Frankreich?',
        options: [
          {
            id: 'A',
            text: 'Der Schlieffen-Plan, der einen Blitzsieg gegen Frankreich verlangte, bevor Russland voll mobilisiert war.',
            isCorrect: true,
            feedback: 'Richtig! Der Schlieffen-Plan kalkulierte, dass Frankreich in maximal 6 Wochen besiegt werden müsse.',
          },
          {
            id: 'B',
            text: 'Der Bismarck-Friedensplan zur Demilitarisierung des Rheinlandes.',
            isCorrect: false,
            feedback: 'Falsch. Bismarck war 1898 gestorben; die wilhelminische Führung setzte auf Offensive.',
          },
          {
            id: 'C',
            text: 'Der Tirpitz-Plan zur sofortigen Landung deutscher Truppen in Schottland.',
            isCorrect: false,
            feedback: 'Falsch. Der Tirpitz-Plan betraf die Flottenrüstung in der Nordsee, war aber kein Landungsplan.',
          },
          {
            id: 'D',
            text: 'Der Potsdamer Schutzwallplan zur Errichtung einer Grenzmauer nach Polen.',
            isCorrect: false,
            feedback: 'Falsch. Polen existierte 1914 noch nicht als souveräner Staat.',
          },
        ],
        explanation:
          'Der Schlieffen-Plan basierte auf einer starren Zeitrechnung. Sobald Russland mobilisierte, glaubte die deutsche Heeresleitung, Frankreich sofort überfallen zu müssen, um dem Zweifrontenkrieg zu entgehen.',
      },
    ],
  },
  {
    id: 3,
    nation: 'Russisches Reich',
    alliance: 'Entente',
    colorTheme: {
      primary: '#2b5138',
      border: '#3b7550',
      stamp: '#23442e',
      badgeBg: 'rgba(43, 81, 56, 0.12)',
    },
    flagSymbol: '☦️',
    subTitle: 'Die Generalmobilmachung – Schutzmacht der Slawen & die Willy-Nicky-Depeschen',
    code: '3007',
    codeExplanation: '3007 steht für den 30. Juli 1914 – an diesem Tag unterzeichnete Zar Nikolaus II. unter dem Druck des Generalstabs den Befehl zur russischen Gesamtmobilmachung.',
    subtleClue: {
      hintTitle: 'Telegrafen-Register des Zarenpalastes',
      hintText: 'An welchem Tag Ende Juli (Tag + Monat) besiegelte der Zar die Generalmobilmachung, die die Kettenreaktion unumkehrbar machte?',
      visualClueDetail: 'Im Randvermerk des Zaren-Ukas prangt die Registriernummer UKAS-ST-PETERSBURG-30-07.',
    },
    document: {
      type: 'Allerhöchster kaiserlicher Ukas & Telegrafendepesche',
      dispatchNumber: 'PETROGRAD-UKAS-3007-GENSTAB',
      sender: 'Zar Nikolaus II. (St. Petersburg / Peterhof)',
      recipient: 'Kaiser Wilhelm II. (Berlin) / Ministerrat des Russischen Reiches',
      dateLocation: 'St. Petersburg, 30. Juli 1914, 17:00 Uhr',
      originalExcerpt: 
        '„An Kaiser Wilhelm: Ein schimpflicher Krieg ist einem schwachen slawischen Brudervolk erklärt worden. Das Entsetzen darüber in ganz Russland wird vollkommen von Mir geteilt. Ich sehe voraus, dass Ich Mich dem Druck nicht mehr lange werde widersetzen können und gezwungen sein werde, Maßnahmen zu ergreifen, die zu einem Kriege führen. Um das Unglück eines europäischen Krieges zu verhüten, bitte Ich Dich im Namen unserer alten Freundschaft, Dein Möglichstes zu tun... Da Österreich jedoch bereits Belgrad beschießt, befehle Ich hiermit am heutigen 30. Juli die allgemeine Mobilmachung Unserer gesamten Streitkräfte zu Lande und zu Wasser!“',
      historicalContext:
        'Russland sah sich als traditionelle Schutzmacht Serbiens und der orthodoxen Christen auf dem Balkan. Die russische Militärführung drängte auf Gesamtmobilmachung, da eine bloße Teilmobilmachung logistisch nicht vorbereitet war und Russland im Ernstfall wehrlos gelassen hätte.',
      clueSnippet: 'BEFEHL ZUR GESAMTMOBILMACHUNG // DATUM: 30. JULI (30.07.)',
      visualStampTitle: 'MINISTERIUM DES KAISERLICHEN HAUSES',
      visualStampLocation: 'SANKT PETERSBURG',
      visualStampCode: 'UKAS NR. 30/07-MIL',
    },
    audioScript: {
      speakerName: 'Zar Nikolaus II.',
      speakerRole: 'Selbstherrscher aller Reußen (Zar von Russland)',
      avatarIcon: '📿',
      directionNotes: {
        tone: 'Schwermütig, gequält, leiser Tonfall voller tragischer Vorahnung und familiärer Zerrissenheit',
        pace: 'Zögerlich, nachdenklich, mit stockenden Atempausen bei der Erwähnung der Generäle',
        emotion: 'Zerrissen zwischen dem Wunsch nach Frieden mit Vetter Willy und der Schmach des Prestigeverlusts auf dem Balkan',
        historicalIntent: 'Rechtfertigt die Generalmobilmachung als rein defensive Schutzmaßnahme für die slawischen Brüder.',
      },
      speechText:
        'Willy, mein lieber Vetter... höre mein Flehen an! Ich will diesen Bruderkrieg nicht. Doch das russische Volk verlangt den Schutz unserer serbischen Glaubensbrüder. Meine Generäle drängen mich stündlich: Wien bombardiert bereits Belgrad! Eine Teilmobilmachung ist technisch unmöglich – sie würde unser gesamtes Heer ins heillose Chaos stürzen. Mit schwerstem Herzen habe ich heute, an diesem verhängnisvollen dreißigsten Juli, den Ukas zur Gesamtmobilmachung unterzeichnet. Möge Gott uns allen vergeben!',
      durationEstimate: 'ca. 36 Sekunden',
    },
    quizQuestions: [
      {
        id: 1,
        question: 'Warum löste die russische Gesamtmobilmachung in Berlin sofortige Panik aus?',
        options: [
          {
            id: 'A',
            text: 'Weil Deutschland überhaupt keine eigene Armee besaß.',
            isCorrect: false,
            feedback: 'Falsch. Das Deutsche Reich besaß eine der modernsten Armeen Europas.',
          },
          {
            id: 'B',
            text: 'Weil der deutsche Aufmarschplan (Schlieffen-Plan) zwingend verlangte, Frankreich rasch zu schlagen, bevor das Riesenheer Russlands aufmarschieren konnte.',
            isCorrect: true,
            feedback: 'Richtig! Die Mobilmachung startete die unerbittliche Stechuhr der Generalstäbe.',
          },
          {
            id: 'C',
            text: 'Weil Russland sofort 10 Millionen Fallschirmjäger nach Hamburg schickte.',
            isCorrect: false,
            feedback: 'Falsch. Dies war technisch 1914 unmöglich.',
          },
          {
            id: 'D',
            text: 'Weil Zar Nikolaus II. ankündigte, zum Protestantismus überzutreten.',
            isCorrect: false,
            feedback: 'Falsch. Religiöse Konversionen spielten keine Rolle.',
          },
        ],
        explanation:
          'Mobilmachungen bedeuteten damals den Transport von Millionen Soldaten per Bahn. Wegen des Zeitvorteils galt für die Militärs: Wer zuerst mobilisiert, gewinnt den Krieg.',
      },
      {
        id: 2,
        question: 'Warum lehnte der russische Generalstab eine bloße „Teilmobilmachung“ nur gegen Österreich ab?',
        options: [
          {
            id: 'A',
            text: 'Weil die logistischen Eisenbahnaufmarschpläne nur auf eine Gesamtmobilmachung ausgelegt waren und eine Teilmobilmachung die Westgrenze gegen Deutschland entblößt hätte.',
            isCorrect: true,
            feedback: 'Richtig! Generalstabschef Januschkewitsch überzeugte den Zaren, dass eine Teilmobilmachung die Landesverteidigung ruinieren würde.',
          },
          {
            id: 'B',
            text: 'Weil Russland überhaupt keine Grenzen zu Österreich-Ungarn hatte.',
            isCorrect: false,
            feedback: 'Falsch. Russland grenzte in Galizien direkt an Österreich-Ungarn.',
          },
          {
            id: 'C',
            text: 'Weil Großbritannien den Zaren dazu zwang, sofort Berlin anzugreifen.',
            isCorrect: false,
            feedback: 'Falsch. London forderte bis zuletzt Mäßigung und eine Vermittlungskonferenz.',
          },
          {
            id: 'D',
            text: 'Weil Zar Nikolaus II. heimlich mit Österreich verbündet war.',
            isCorrect: false,
            feedback: 'Falsch. Russland und Österreich-Ungarn waren erbitterte Rivalen auf dem Balkan.',
          },
        ],
        explanation:
          'Die militärische Bürokratie und die starren Eisenbahnfahrpläne ließen keine halben Schritte zu: Die Technik diktierte der Diplomatie die Eskalation.',
      },
    ],
  },
  {
    id: 4,
    nation: 'Frankreich',
    alliance: 'Entente',
    colorTheme: {
      primary: '#6b3074',
      border: '#854291',
      stamp: '#582460',
      badgeBg: 'rgba(107, 48, 116, 0.12)',
    },
    flagSymbol: '⚜️',
    subTitle: 'Die Bündnistreue zu Russland & Das Trauma von 1871 – Revanche & Zweifrontendruck',
    code: '1871',
    codeExplanation: '1871 markiert den Frieden von Frankfurt nach dem Deutsch-Französischen Krieg, bei dem Frankreich Elsass-Lothringen abtreten musste – die offene Wunde der Republik.',
    subtleClue: {
      hintTitle: 'Historisches Siegel des Quai d\'Orsay',
      hintText: 'In welchem schicksalhaften Jahr verlor Frankreich im Friedensschluss von Frankfurt seine Provinzen Elsass und Lothringen an das Deutsche Kaiserreich?',
      visualClueDetail: 'Am unteren Rand des Telegramms befindet sich das Siegel zur Erinnerung an die nationale Schmach von 1871.',
    },
    document: {
      type: 'Ministerrats-Beschluss & Bündnisdepesche',
      dispatchNumber: 'QUAI-DORSAY-PARIS-SEC-1871',
      sender: 'Präsident Raymond Poincaré / Premierminister René Viviani',
      recipient: 'Französische Botschaft in St. Petersburg (Botschafter Paléologue)',
      dateLocation: 'Paris, Palais de l’Élysée, 1. August 1914',
      originalExcerpt: 
        '„Frankreich wird seine Bündnisverpflichtungen gegenüber Russland unter allen Umständen gewissenhaft und rückhaltlos erfüllen... Um jedoch vor der Welt und insbesondere vor England unzweideutig darzutun, dass Frankreich nicht der Angreifer ist, befiehlt die Regierung den Truppen, einen Streifen von zehn Kilometern hinter der Reichsgrenze freizulassen... Die Republik vergisst niemals die tiefe Wunde, die ihr 1871 geschlagen wurde. Wenn Deutschland uns den Krieg erklärt, wird Frankreich geeint zur Verteidigung seiner Erde und der Freiheit Europas antreten!“',
      historicalContext:
        'Seit dem verlorenen Krieg von 1870/71 und dem Verlust von Elsass-Lothringen lebte in Frankreich der Revanche-Gedanke fort. Um sich gegen das mächtige Deutsche Reich zu behaupten, war das Bündnis mit Russland das unverzichtbare Fundament der französischen Sicherheitspolitik.',
      clueSnippet: 'TRAUMA VON FRANKFURT // VERLUST ELSASS-LOTHRINGENS: ANNO 1871',
      visualStampTitle: 'RÉPUBLIQUE FRANÇAISE - MINISTÈRE DES AFFAIRES ÉTRANGÈRES',
      visualStampLocation: 'PARIS - QUAI D\'ORSAY',
      visualStampCode: 'SOUVENIR DE 1871',
    },
    audioScript: {
      speakerName: 'Raymond Poincaré',
      speakerRole: 'Präsident der Französischen Republik',
      avatarIcon: '🏛️',
      directionNotes: {
        tone: 'Fest, pathetisch, getragen von republikanischem Stolz und unnachgiebiger Entschlossenheit',
        pace: 'Klar artikuliert, feierlich gesteigert bis zum Schlussappell',
        emotion: 'Ehrbewusst, wachsam vor deutscher Provokation, unverbrüchlich an das Schicksal Russlands gekoppelt',
        historicalIntent: 'Will England demonstrieren, dass Frankreich unschuldig angegriffen wird, während man fest zum russischen Verbündeten steht.',
      },
      speechText:
        'Bürger Frankreichs! Seit über vierzig Jahren brennt die schmerzhafte Schmach von achtzehnhunderteinundsiebzig in unserem Herzen, als preußische Truppen uns Elsass und Lothringen entrissen. Wir haben den Frieden bewahrt, doch wir werden unsere russischen Brüder nicht verraten. Sollte das Deutsche Reich St. Petersburg angreifen, schlägt die Stunde unserer Bündnispflicht. Unsere Truppen weichen zehn Kilometer hinter die Grenze zurück, damit die freie Welt sieht: Frankreich ist nicht der Aggressor. Doch wir werden kein zweites Sedan dulden!',
      durationEstimate: 'ca. 34 Sekunden',
    },
    quizQuestions: [
      {
        id: 1,
        question: 'Warum befahl die französische Regierung ihren Truppen den 10-Kilometer-Rückzug von der Grenze?',
        options: [
          {
            id: 'A',
            text: 'Aus Feigheit und Verzweiflung vor der deutschen Übermacht.',
            isCorrect: false,
            feedback: 'Falsch. Die französische Armee war voll gerüstet und angriffsbereit.',
          },
          {
            id: 'B',
            text: 'Um Grenzzwischenfälle zu vermeiden und Großbritannien zu beweisen, dass Frankreich das unschuldige Opfer deutscher Aggression war.',
            isCorrect: true,
            feedback: 'Richtig! Frankreich brauchte zwingend den militärischen Beistand Großbritanniens.',
          },
          {
            id: 'C',
            text: 'Weil die französischen Soldaten ihre Uniformen in Paris vergessen hatten.',
            isCorrect: false,
            feedback: 'Falsch. Dies entbehrt jeder historischen Realität.',
          },
          {
            id: 'D',
            text: 'Um einen geheimen Friedensvertrag mit Kaiser Wilhelm II. zu unterzeichnen.',
            isCorrect: false,
            feedback: 'Falsch. Poincaré lehnte bilaterale Verhandlungen mit Berlin kategorisch ab.',
          },
        ],
        explanation:
          'Der 10-km-Rückzug verhinderte zufällige Scharmützel und stellte sicher, dass deutsche Truppen als Angreifer französisches Staatsgebiet betreten mussten.',
      },
      {
        id: 2,
        question: 'Welches historische Trauma von 1871 prägte das französische Nationalbewusstsein?',
        options: [
          {
            id: 'A',
            text: 'Die Abtretung von Elsass-Lothringen an das Deutsche Kaiserreich und die Kaiserproklamation in Versailles.',
            isCorrect: true,
            feedback: 'Richtig! Der Verlust der beiden Provinzen galt generationenlang als offene Wunde der Republik.',
          },
          {
            id: 'B',
            text: 'Der Verlust aller Kolonien in Nordafrika an Italien.',
            isCorrect: false,
            feedback: 'Falsch. Frankreich baute in Nordafrika gerade ein riesiges Kolonialreich auf.',
          },
          {
            id: 'C',
            text: 'Die Zerstörung des Eiffelturms durch britische Kanonenboote.',
            isCorrect: false,
            feedback: 'Falsch. Der Eiffelturm wurde erst 1889 zur Weltausstellung erbaut.',
          },
          {
            id: 'D',
            text: 'Die erzwungene Einführung des russischen Rubels in Paris.',
            isCorrect: false,
            feedback: 'Falsch. Frankreichs Währung blieb der Franc.',
          },
        ],
        explanation:
          'Der Revanchegedanke für 1870/71 führte dazu, dass Frankreich die Allianz mit Russland um jeden Preis festigte, um Deutschland in die Zange nehmen zu können.',
      },
    ],
  },
  {
    id: 5,
    nation: 'Großbritannien',
    alliance: 'Entente',
    colorTheme: {
      primary: '#744210',
      border: '#975a16',
      stamp: '#5f370e',
      badgeBg: 'rgba(116, 66, 16, 0.12)',
    },
    flagSymbol: '🦁',
    subTitle: 'Die Neutralität Belgiens & Das Finale – Das Scheitern der Diplomatie',
    code: '1914',
    codeExplanation: '1914 – das Schicksalsjahr des Kriegsausbruchs und der Untergang des alten Europa, besiegelt durch den britischen Kriegseintritt am 4. August 1914.',
    subtleClue: {
      hintTitle: 'Foreign Office Dechiffrier-Chiffre',
      hintText: 'Welche vierstellige Jahreszahl markiert den Ausbruch des Weltenbrandes und den Ablauf des britischen Ultimatums an Berlin?',
      visualClueDetail: 'Das goldene Siegel des britischen Foreign Office trägt die Inschrift ANNO DOMINI 1914.',
    },
    document: {
      type: 'Britisches Ultimatum & Unterhaus-Protokoll',
      dispatchNumber: 'FO-LONDON-ULT-1914-MIDNIGHT',
      sender: 'Sir Edward Grey (Außenminister) / Herbert Henry Asquith (Premierminister)',
      recipient: 'Reichskanzler von Bethmann Hollweg (Berlin)',
      dateLocation: 'London, Foreign Office, 4. August 1914',
      originalExcerpt: 
        '„Seine Majestät Regierung sieht sich gezwungen, von der kaiserlich deutschen Regierung die unverzügliche Zusicherung zu fordern, dass die belgische Neutralität respektiert wird. Deutschland hat Belgien ein Ultimatum gestellt und ist mit Truppen in das Hoheitsgebiet eines neutralen Staates eingedrungen, dessen Unverletzlichkeit durch den Vertrag von 1839 garantiert ist... Der Reichskanzler mag diesen Vertrag als bloßen \'Fetzen Papier\' verhöhnen – Großbritannien wird für das Völkerrecht und das Mächtegleichgewicht einstehen. Wenn bis Mitternacht keine befriedigende Antwort vorliegt, befindet sich das Vereinigte Königreich im Kriegszustand mit Deutschland!“',
      historicalContext:
        'Der deutsche Schlieffen-Plan sah vor, Frankreich durch einen schnellen Marsch durch das neutrale Belgien zu überrumpeln. Dies zwang die britische Regierung zum Eingreifen: London konnte weder die Beherrschung der Kanalküste durch Deutschland noch den Bruch des Völkerrechts hinnehmen.',
      clueSnippet: 'WELTENBRAND BESIEGELT // DIE LAMPEN ERLÖSCHEN: ANNO 1914',
      visualStampTitle: 'FOREIGN OFFICE - BRITISH EMPIRE',
      visualStampLocation: 'WHITEHALL - LONDON',
      visualStampCode: 'ULTIMATUM: ANNO DOMINI 1914',
    },
    audioScript: {
      speakerName: 'Sir Edward Grey',
      speakerRole: 'Britisches Außenministerium (Foreign Secretary)',
      avatarIcon: '🎩',
      directionNotes: {
        tone: 'Kühl, distinguiert, elegisch und von historischer Schwere gezeichnet',
        pace: 'Gemessen, leise Melancholie, die in kompromisslose Entschlossenheit übergeht',
        emotion: 'Tiefe Trauer über das Versagen der Diplomatie, gepaart mit nüchterner imperialer Härte',
        historicalIntent: 'Erklärt dem Parlament und der Welt, warum das Empire wegen des Völkerrechts und Belgiens in den Krieg zieht.',
      },
      speechText:
        'Die Lampen gehen in ganz Europa aus; wir werden sie in unserem Leben nicht mehr brennen sehen. Bis zur letzten Minute haben wir für eine europäische Botschafterkonferenz gerungen. Doch der völkerrechtswidrige deutsche Einmarsch in das neutrale Belgien lässt uns keine Wahl. England kann nicht dulden, dass Verträge als bloße Fetzen Papier zerrissen werden und die Kanalküste in die Hände einer feindlichen Hegemonialmacht fällt. Dies ist der vierte August neunzehnhundertvierzehn. Wenn Berlin bis Mitternacht nicht einlenkt, spricht das Empire!',
      durationEstimate: 'ca. 37 Sekunden',
    },
    quizQuestions: [
      {
        id: 1,
        question: 'Welches völkerrechtliche Ereignis gab den Ausschlag für den britischen Kriegseintritt am 4. August 1914?',
        options: [
          {
            id: 'A',
            text: 'Der deutsche Einmarsch in das völkerrechtlich neutrale Belgien zur Umgehung der französischen Grenzfestungen.',
            isCorrect: true,
            feedback: 'Richtig! Die Verletzung der belgischen Neutralität (Londoner Vertrag von 1839) einte Parlament und Bevölkerung.',
          },
          {
            id: 'B',
            text: 'Ein Angriff deutscher U-Boote auf den Hafen von Dover.',
            isCorrect: false,
            feedback: 'Falsch. Der organisierte Handelskrieg per U-Boot begann erst später.',
          },
          {
            id: 'C',
            text: 'Ein britisches Bündnisversprechen an das Osmanische Reich.',
            isCorrect: false,
            feedback: 'Falsch. Die Osmanen traten auf Seiten der Mittelmächte ein.',
          },
          {
            id: 'D',
            text: 'Der Wunsch, die belgischen Kolonien im Kongo gewaltsam zu annektieren.',
            isCorrect: false,
            feedback: 'Falsch. Großbritannien trat ausdrücklich als Schutzmacht Belgiens auf.',
          },
        ],
        explanation:
          'Großbritannien hatte 1839 die belgische Unabhängigkeit garantiert. Zudem durfte die gegenüberliegende Kanalküste keinesfalls von einer feindlichen Großmacht beherrscht werden.',
      },
      {
        id: 2,
        question: 'Welche außenpolitische Doktrin („Balance of Power“) leitete Großbritannien seit Jahrhunderten?',
        options: [
          {
            id: 'A',
            text: 'Die Vorherrschaft einer einzelnen europäischen Großmacht auf dem Kontinent unter allen Umständen zu verhindern.',
            isCorrect: true,
            feedback: 'Richtig! Ein von Deutschland beherrschtes Gesamteuropa hätte die britische Weltmachtstellung und Seewege bedroht.',
          },
          {
            id: 'B',
            text: 'Ganz Westeuropa gewaltsam in das Britische Empire einzugliedern.',
            isCorrect: false,
            feedback: 'Falsch. England strebte keine kontinentalen Landgewinne in Europa an.',
          },
          {
            id: 'C',
            text: 'Sich vollständig aus allen Weltmeeren zurückzuziehen.',
            isCorrect: false,
            feedback: 'Falsch. Die Royal Navy war das Rückgrat des Empires.',
          },
          {
            id: 'D',
            text: 'Sämtliche Verträge mit anderen Staaten alle 5 Jahre aufzukündigen.',
            isCorrect: false,
            feedback: 'Falsch. Völkervertragsbindung war zentraler Bestandteil des britischen Selbstverständnisses.',
          },
        ],
        explanation:
          'Das europäische Gleichgewicht war für Großbritannien existentiell: Ein deutscher Sieg über Frankreich und Russland hätte eine deutsche Kontinentalhegemonie geschaffen.',
      },
    ],
  },
];

export const HISTORICAL_CHRONOLOGY = [
  {
    date: '28. Juni 1914',
    title: 'Attentat von Sarajevo',
    desc: 'Erzherzog Franz Ferdinand und seine Gemahlin Sophie werden vom serbischen Nationalisten Gavrilo Princip erschossen.',
  },
  {
    date: '05. Juli 1914',
    title: 'Der deutsche „Blankoscheck“',
    desc: 'Kaiser Wilhelm II. verspricht Österreich-Ungarn in Potsdam bedingungslose militärische Bündnistreue.',
  },
  {
    date: '23. Juli 1914',
    title: 'Ultimatum an Serbien',
    desc: 'Wien überreicht in Belgrad ein unannehmbares 48-Stunden-Ultimatum, das Serbiens Souveränität untergräbt.',
  },
  {
    date: '28. Juli 1914',
    title: 'Kriegserklärung an Serbien',
    desc: 'Trotz weitgehender serbischer Zugeständnisse erklärt Österreich-Ungarn den Krieg und beschießt Belgrad.',
  },
  {
    date: '30. Juli 1914',
    title: 'Russische Generalmobilmachung',
    desc: 'Zar Nikolaus II. unterzeichnet den Mobilmachungsbefehl zum Schutz der slawischen Balkanvölker.',
  },
  {
    date: '01. August 1914',
    title: 'Deutsche Kriegserklärung an Russland',
    desc: 'Deutschland mobilisiert und erklärt Russland den Krieg; Frankreich ordnet zeitgleich die Generalmobilmachung an.',
  },
  {
    date: '03. August 1914',
    title: 'Kriegserklärung an Frankreich & Einmarsch in Belgien',
    desc: 'Deutsche Truppen marschieren völkerrechtswidrig in das neutrale Belgien ein, um Frankreich rasch niederzuwerfen.',
  },
  {
    date: '04. August 1914',
    title: 'Britisches Ultimatum & Weltkrieg',
    desc: 'Nach Ablauf des Ultimatums tritt Großbritannien in den Krieg ein. Die Kettenreaktion der Bündnisse ist vollendet.',
  },
];
