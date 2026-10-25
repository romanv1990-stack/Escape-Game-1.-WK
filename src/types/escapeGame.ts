export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
  explanation: string;
}

export interface AudioScriptData {
  speakerName: string;
  speakerRole: string;
  avatarIcon: string;
  directionNotes: {
    tone: string;
    pace: string;
    emotion: string;
    historicalIntent: string;
  };
  speechText: string;
  durationEstimate: string;
}

export interface HistoricalDocumentData {
  type: string;
  dispatchNumber: string;
  sender: string;
  recipient: string;
  dateLocation: string;
  originalExcerpt: string;
  historicalContext: string;
  clueSnippet: string;
  visualStampTitle: string;
  visualStampLocation: string;
  visualStampCode: string;
}

export interface EscapeGameSlide {
  id: number;
  nation: string;
  alliance: 'Mittelmächte' | 'Entente' | 'Neutral/Vermittler';
  colorTheme: {
    primary: string;
    border: string;
    stamp: string;
    badgeBg: string;
  };
  flagSymbol: string;
  subTitle: string;
  code: string;
  codeExplanation: string;
  subtleClue: {
    hintTitle: string;
    hintText: string;
    visualClueDetail: string;
  };
  document: HistoricalDocumentData;
  audioScript: AudioScriptData;
  quizQuestions: QuizQuestion[]; // 2 questions per slide
}

export interface MemorialStat {
  country: string;
  flag: string;
  alliance: 'Mittelmächte' | 'Entente';
  fallenSoldiers: string;
  civilianLosses: string;
  keyConsequence: string;
}

export interface MapTerritory {
  id: string;
  name: string;
  alliance: 'Mittelmächte' | 'Entente' | 'Neutral';
  capital: string;
  role1914: string;
  coords: { x: number; y: number };
}

export interface GameState {
  currentPhase: 'intro' | 'team_registration' | 'map_task' | 'slides' | 'memorial' | 'summary';
  currentSlideIndex: number; // 0 to 4
  scores: {
    mapBonus: number;
    quizPoints: number[][]; // [slideIndex][questionIndex]
    codePoints: number[];
    speedBonus: number[];
    hintDeductions: number[];
  };
  slideStartTimes: number[];
  slideDurations: number[];
  solvedSlides: boolean[];
  // Map of slideIndex -> questionIndex -> answer state
  quizAnswers: {
    [slideIndex: number]: {
      [questionIndex: number]: {
        answered: boolean;
        attempts: number;
        selectedOptionId: string | null;
      };
    };
  };
  codeAttempts: { [slideIndex: number]: number };
  hintsUsed: { [slideIndex: number]: boolean };
  gameStartTime: number;
  gameEndTime: number | null;
  isGameFinished: boolean;
  playerName: string;
  playerInsignia?: string;
}
