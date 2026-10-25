import React, { useState, useEffect } from 'react';
import { JULIKRISE_SLIDES } from './data/julikriseData';
import { GameState } from './types/escapeGame';
import { Header } from './components/Header';
import { TeamNameSlide } from './components/TeamNameSlide';
import { AllianceMapTask } from './components/AllianceMapTask';
import { HistoricalDocument } from './components/HistoricalDocument';
import { AudioSection } from './components/AudioSection';
import { QuizCard } from './components/QuizCard';
import { CipherLock } from './components/CipherLock';
import { SubtleHintModal } from './components/SubtleHintModal';
import { HistoricalGlossaryModal } from './components/HistoricalGlossaryModal';
import { MemorialSlide } from './components/MemorialSlide';
import { SummaryDossier } from './components/SummaryDossier';
import { LeaderboardView } from './components/LeaderboardView';
import { soundEffects } from './utils/soundEffects';
import { speechController } from './utils/speechController';
import { orchestralMusic } from './utils/orchestralViolinMusic';
import { Shield, Play, HelpCircle, ArrowRight, Award, Compass, Sparkles, Globe, Trophy, X } from 'lucide-react';

const INITIAL_GAME_STATE: GameState = {
  currentPhase: 'team_registration',
  currentSlideIndex: 0,
  scores: {
    mapBonus: 0,
    quizPoints: [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ],
    codePoints: [0, 0, 0, 0, 0],
    speedBonus: [0, 0, 0, 0, 0],
    hintDeductions: [0, 0, 0, 0, 0],
  },
  slideStartTimes: [Date.now(), 0, 0, 0, 0],
  slideDurations: [0, 0, 0, 0, 0],
  solvedSlides: [false, false, false, false, false],
  quizAnswers: {
    0: { 0: { answered: false, attempts: 0, selectedOptionId: null }, 1: { answered: false, attempts: 0, selectedOptionId: null } },
    1: { 0: { answered: false, attempts: 0, selectedOptionId: null }, 1: { answered: false, attempts: 0, selectedOptionId: null } },
    2: { 0: { answered: false, attempts: 0, selectedOptionId: null }, 1: { answered: false, attempts: 0, selectedOptionId: null } },
    3: { 0: { answered: false, attempts: 0, selectedOptionId: null }, 1: { answered: false, attempts: 0, selectedOptionId: null } },
    4: { 0: { answered: false, attempts: 0, selectedOptionId: null }, 1: { answered: false, attempts: 0, selectedOptionId: null } },
  },
  codeAttempts: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 },
  hintsUsed: { 0: false, 1: false, 2: false, 3: false, 4: false },
  gameStartTime: Date.now(),
  gameEndTime: null,
  isGameFinished: false,
  playerName: typeof window !== 'undefined' ? localStorage.getItem('julikrise_player_name') || 'Diplomatische Sondergesandtschaft' : 'Diplomatische Sondergesandtschaft',
  playerInsignia: '🕊️',
};

export default function App() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isHintModalOpen, setIsHintModalOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

  const currentSlide = JULIKRISE_SLIDES[gameState.currentSlideIndex];

  // Global game stopwatch
  useEffect(() => {
    if (gameState.currentPhase === 'team_registration' || gameState.currentPhase === 'intro' || gameState.currentPhase === 'summary') return;

    const interval = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState.currentPhase]);

  // Total current score calculation
  const totalQuiz = gameState.scores.quizPoints.reduce(
    (slideSum, qArr) => slideSum + (Array.isArray(qArr) ? qArr.reduce((a, b) => a + b, 0) : 0),
    0
  );
  const totalScore = Math.max(
    0,
    (gameState.scores.mapBonus || 0) +
      totalQuiz +
      gameState.scores.codePoints.reduce((a, b) => a + b, 0) +
      gameState.scores.speedBonus.reduce((a, b) => a + b, 0) -
      gameState.scores.hintDeductions.reduce((a, b) => a + b, 0)
  );

  const handleConfirmTeamName = (name: string, insignia: string) => {
    soundEffects.playStamp();
    setGameState((prev) => ({
      ...prev,
      playerName: name,
      playerInsignia: insignia,
      currentPhase: 'map_task',
      gameStartTime: Date.now(),
    }));
    // Start lush orchestral violin music
    orchestralMusic.playOrchestral();
    setIsMusicPlaying(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteMapTask = (bonusPoints: number) => {
    soundEffects.playStamp();
    setGameState((prev) => ({
      ...prev,
      currentPhase: 'slides',
      currentSlideIndex: 0,
      scores: {
        ...prev.scores,
        mapBonus: bonusPoints,
      },
      slideStartTimes: [Date.now(), 0, 0, 0, 0],
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleMute = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    soundEffects.isMuted = nextState;
    orchestralMusic.setMuted(nextState);
    if (nextState) {
      speechController.stop();
    }
  };

  const handleToggleMusic = () => {
    if (isMusicPlaying) {
      orchestralMusic.stop();
      setIsMusicPlaying(false);
    } else {
      if (gameState.currentPhase === 'memorial') {
        orchestralMusic.playMemorial();
      } else {
        orchestralMusic.playOrchestral();
      }
      setIsMusicPlaying(true);
    }
  };

  const handleAnswerQuestion = (
    qIndex: number,
    points: number,
    selectedId: string,
    isCorrect: boolean
  ) => {
    const sIdx = gameState.currentSlideIndex;

    setGameState((prev) => {
      const updatedQuizPoints = [...prev.scores.quizPoints];
      const slideQPoints = [...(updatedQuizPoints[sIdx] || [0, 0])];
      slideQPoints[qIndex] = points;
      updatedQuizPoints[sIdx] = slideQPoints;

      const currentSlideAnswers = { ...(prev.quizAnswers[sIdx] || {}) };
      const currentQState = currentSlideAnswers[qIndex] || {
        answered: false,
        attempts: 0,
        selectedOptionId: null,
      };

      currentSlideAnswers[qIndex] = {
        answered: isCorrect,
        attempts: currentQState.attempts + (isCorrect ? 0 : 1),
        selectedOptionId: selectedId,
      };

      return {
        ...prev,
        scores: {
          ...prev.scores,
          quizPoints: updatedQuizPoints,
        },
        quizAnswers: {
          ...prev.quizAnswers,
          [sIdx]: currentSlideAnswers,
        },
      };
    });
  };

  const handleCodeSuccess = (codePoints: number, speedBonus: number) => {
    const idx = gameState.currentSlideIndex;
    setGameState((prev) => {
      const updatedCodePoints = [...prev.scores.codePoints];
      updatedCodePoints[idx] = codePoints;

      const updatedSpeedBonus = [...prev.scores.speedBonus];
      updatedSpeedBonus[idx] = speedBonus;

      const updatedSolved = [...prev.solvedSlides];
      updatedSolved[idx] = true;

      return {
        ...prev,
        scores: {
          ...prev.scores,
          codePoints: updatedCodePoints,
          speedBonus: updatedSpeedBonus,
        },
        solvedSlides: updatedSolved,
      };
    });
  };

  const handleCodeFailed = () => {
    const idx = gameState.currentSlideIndex;
    setGameState((prev) => ({
      ...prev,
      codeAttempts: {
        ...prev.codeAttempts,
        [idx]: (prev.codeAttempts[idx] || 0) + 1,
      },
    }));
  };

  const handleConfirmUseHint = () => {
    const idx = gameState.currentSlideIndex;
    setGameState((prev) => {
      const updatedDeductions = [...prev.scores.hintDeductions];
      updatedDeductions[idx] = 50;

      return {
        ...prev,
        scores: {
          ...prev.scores,
          hintDeductions: updatedDeductions,
        },
        hintsUsed: {
          ...prev.hintsUsed,
          [idx]: true,
        },
      };
    });
  };

  const handleNextSlide = () => {
    speechController.stop();
    const nextIdx = gameState.currentSlideIndex + 1;

    if (nextIdx < JULIKRISE_SLIDES.length) {
      setGameState((prev) => {
        const updatedSlideStartTimes = [...prev.slideStartTimes];
        updatedSlideStartTimes[nextIdx] = Date.now();
        return {
          ...prev,
          currentSlideIndex: nextIdx,
          slideStartTimes: updatedSlideStartTimes,
        };
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Reached the end of slides -> Transition to Memorial Slide with Orchestral Adagio!
      orchestralMusic.playMemorial();
      setGameState((prev) => ({
        ...prev,
        currentPhase: 'memorial',
        gameEndTime: Date.now(),
      }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleProceedToSummary = () => {
    soundEffects.playStamp();
    setGameState((prev) => ({
      ...prev,
      currentPhase: 'summary',
      isGameFinished: true,
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    speechController.stop();
    orchestralMusic.stop();
    soundEffects.playStamp();
    setGameState({
      ...INITIAL_GAME_STATE,
      gameStartTime: Date.now(),
      slideStartTimes: [Date.now(), 0, 0, 0, 0],
    });
    setTimeElapsed(0);
    setIsMusicPlaying(false);
  };

  // Determine current user rank title for leaderboard
  let currentRankTitle = 'Diplomatischer Attaché in Ausbildung';
  if (totalScore >= 4600) currentRankTitle = 'Großbotschafter des Friedens';
  else if (totalScore >= 3800) currentRankTitle = 'Bevollmächtigter Chefunterhändler';
  else if (totalScore >= 3000) currentRankTitle = 'Gesandter I. Klasse';

  // 1. TEAM REGISTRATION SLIDE (With beautiful Nano-Banana Generated Cover Art!)
  if (gameState.currentPhase === 'team_registration' || gameState.currentPhase === 'intro') {
    return (
      <div>
        <TeamNameSlide
          initialTeamName={gameState.playerName}
          onConfirmTeam={handleConfirmTeamName}
          onOpenGlossary={() => setIsGlossaryOpen(true)}
          onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
          isMusicPlaying={isMusicPlaying}
          onToggleMusic={handleToggleMusic}
        />
        {/* Glossary Modal */}
        <HistoricalGlossaryModal
          isOpen={isGlossaryOpen}
          onClose={() => setIsGlossaryOpen(false)}
        />
        {/* Leaderboard Modal */}
        {isLeaderboardOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={() => setIsLeaderboardOpen(false)}
                className="absolute top-4 right-4 z-10 text-[#dcd1be] hover:text-white p-1 rounded bg-[#2a221a] border border-[#52412e] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <LeaderboardView
                currentUserScore={totalScore}
                currentUserTimeSeconds={timeElapsed}
                currentUserRankTitle={currentRankTitle}
                defaultPlayerName={gameState.playerName}
                onUpdatePlayerName={(name) => {
                  setGameState((prev) => ({ ...prev, playerName: name }));
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. ALLIANCE MAP TASK SCREEN
  if (gameState.currentPhase === 'map_task') {
    return (
      <div className="min-h-screen bg-[#15120f] text-[#dcd1be] flex flex-col">
        <Header
          currentPhase="map_task"
          currentSlideIndex={0}
          totalSlides={5}
          currentSlideNation="Europakarte"
          totalScore={totalScore}
          timeElapsed={timeElapsed}
          isMuted={isMuted}
          isMusicPlaying={isMusicPlaying}
          teamName={gameState.playerName}
          teamInsignia={gameState.playerInsignia}
          onToggleMusic={handleToggleMusic}
          onToggleMute={handleToggleMute}
          onOpenGlossary={() => setIsGlossaryOpen(true)}
          onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        />
        <main className="flex-1 py-4">
          <AllianceMapTask onCompleteMapTask={handleCompleteMapTask} />
        </main>
        <HistoricalGlossaryModal
          isOpen={isGlossaryOpen}
          onClose={() => setIsGlossaryOpen(false)}
        />
        {isLeaderboardOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={() => setIsLeaderboardOpen(false)}
                className="absolute top-4 right-4 z-10 text-[#dcd1be] hover:text-white p-1 rounded bg-[#2a221a] border border-[#52412e] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <LeaderboardView
                currentUserScore={totalScore}
                currentUserTimeSeconds={timeElapsed}
                currentUserRankTitle={currentRankTitle}
                defaultPlayerName={gameState.playerName}
                onUpdatePlayerName={(name) => {
                  setGameState((prev) => ({ ...prev, playerName: name }));
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  // 3. MEMORIAL SLIDE (Sad Orchestral Violin Adagio & Grim Facts)
  if (gameState.currentPhase === 'memorial') {
    return (
      <div className="min-h-screen bg-[#120f0d] text-[#dcd1be] flex flex-col">
        <Header
          currentPhase="memorial"
          currentSlideIndex={5}
          totalSlides={5}
          currentSlideNation="Mahnmal 1914–1918"
          totalScore={totalScore}
          timeElapsed={timeElapsed}
          isMuted={isMuted}
          isMusicPlaying={isMusicPlaying}
          teamName={gameState.playerName}
          teamInsignia={gameState.playerInsignia}
          onToggleMusic={handleToggleMusic}
          onToggleMute={handleToggleMute}
          onOpenGlossary={() => setIsGlossaryOpen(true)}
          onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        />
        <main className="flex-1 py-4">
          <MemorialSlide
            onProceedToSummary={handleProceedToSummary}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
          />
        </main>
        <HistoricalGlossaryModal
          isOpen={isGlossaryOpen}
          onClose={() => setIsGlossaryOpen(false)}
        />
        {isLeaderboardOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={() => setIsLeaderboardOpen(false)}
                className="absolute top-4 right-4 z-10 text-[#dcd1be] hover:text-white p-1 rounded bg-[#2a221a] border border-[#52412e] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <LeaderboardView
                currentUserScore={totalScore}
                currentUserTimeSeconds={timeElapsed}
                currentUserRankTitle={currentRankTitle}
                defaultPlayerName={gameState.playerName}
                onUpdatePlayerName={(name) => {
                  setGameState((prev) => ({ ...prev, playerName: name }));
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  // 4. SUMMARY DOSSIER / CERTIFICATE SCREEN
  if (gameState.currentPhase === 'summary') {
    return (
      <div className="min-h-screen bg-[#15120f] text-[#dcd1be]">
        <Header
          currentPhase="summary"
          currentSlideIndex={5}
          totalSlides={5}
          currentSlideNation="Abschluss"
          totalScore={totalScore}
          timeElapsed={timeElapsed}
          isMuted={isMuted}
          isMusicPlaying={isMusicPlaying}
          teamName={gameState.playerName}
          teamInsignia={gameState.playerInsignia}
          onToggleMusic={handleToggleMusic}
          onToggleMute={handleToggleMute}
          onOpenGlossary={() => setIsGlossaryOpen(true)}
        />
        <main className="py-6">
          <SummaryDossier
            gameState={gameState}
            slides={JULIKRISE_SLIDES}
            onRestart={handleRestart}
            onViewMemorial={() => {
              orchestralMusic.playMemorial();
              setGameState((prev) => ({ ...prev, currentPhase: 'memorial' }));
            }}
          />
        </main>
        <HistoricalGlossaryModal
          isOpen={isGlossaryOpen}
          onClose={() => setIsGlossaryOpen(false)}
        />
      </div>
    );
  }

  // 5. MAIN ESCAPE SLIDE (Slides 1..5)
  const currentSlideAnswers = gameState.quizAnswers[gameState.currentSlideIndex] || {
    0: { answered: false, attempts: 0, selectedOptionId: null },
    1: { answered: false, attempts: 0, selectedOptionId: null },
  };
  const isCurrentSlideSolved = gameState.solvedSlides[gameState.currentSlideIndex];
  const isCurrentHintUsed = gameState.hintsUsed[gameState.currentSlideIndex];

  return (
    <div className="min-h-screen bg-[#15120f] text-[#dcd1be] flex flex-col">
      {/* Top Bar with score, timer, team name and progress */}
      <Header
        currentPhase="slides"
        currentSlideIndex={gameState.currentSlideIndex}
        totalSlides={JULIKRISE_SLIDES.length}
        currentSlideNation={currentSlide.nation}
        totalScore={totalScore}
        timeElapsed={timeElapsed}
        isMuted={isMuted}
        isMusicPlaying={isMusicPlaying}
        teamName={gameState.playerName}
        teamInsignia={gameState.playerInsignia}
        onToggleMusic={handleToggleMusic}
        onToggleMute={handleToggleMute}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
      />

      {/* Main Slide Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Slide Title Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#362d22]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-widest text-[#c9a86a] font-bold">
                Depesche {gameState.currentSlideIndex + 1} von {JULIKRISE_SLIDES.length}
              </span>
              <span className="text-[#554737]">·</span>
              <span className="font-sans-clean text-xs text-[#a39480]">
                {currentSlide.alliance}
              </span>
            </div>
            <h2 className="font-display text-lg sm:text-2xl font-bold text-[#ebdcc2] mt-0.5">
              {currentSlide.subTitle}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded text-xs font-sans-clean font-bold tracking-wide ${
                isCurrentSlideSolved
                  ? 'bg-[#29422f] text-[#75c68b] border border-[#3e6b48]'
                  : 'bg-[#2b241c] text-[#c9a86a] border border-[#483c2e]'
              }`}
            >
              {isCurrentSlideSolved ? '✓ Gelöst & Dechiffriert' : 'Status: Unter Verschluss'}
            </span>
          </div>
        </div>

        {/* 2-Column Responsive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (Historical Document & Monologue Audio): 7 Columns on lg */}
          <div className="lg:col-span-7 space-y-6">
            {/* The Historical Telegram Document */}
            <HistoricalDocument
              document={currentSlide.document}
              nation={currentSlide.nation}
              flagSymbol={currentSlide.flagSymbol}
              alliance={currentSlide.alliance}
              colorTheme={currentSlide.colorTheme}
            />

            {/* Audio Script & Monologue with Male Voice */}
            <AudioSection
              audioScript={currentSlide.audioScript}
              slideId={currentSlide.id}
            />
          </div>

          {/* Right Column (Diplomat Dechiffrierung Deck): 5 Columns on lg */}
          <div className="lg:col-span-5 space-y-6">
            {/* Comprehension Quiz with 2 Questions */}
            <QuizCard
              key={`quiz-${currentSlide.id}`}
              questions={currentSlide.quizQuestions}
              slideId={currentSlide.id}
              slideIndex={gameState.currentSlideIndex}
              answersState={currentSlideAnswers}
              onAnswerQuestion={handleAnswerQuestion}
            />

            {/* 4-Digit Cipher Lock Vault */}
            <CipherLock
              correctCode={currentSlide.code}
              codeExplanation={currentSlide.codeExplanation}
              isUnlocked={isCurrentSlideSolved}
              attempts={gameState.codeAttempts[gameState.currentSlideIndex] || 0}
              onCodeSuccess={handleCodeSuccess}
              onCodeFailed={handleCodeFailed}
              onOpenClueModal={() => setIsHintModalOpen(true)}
              slideStartTime={gameState.slideStartTimes[gameState.currentSlideIndex]}
              onNextSlide={handleNextSlide}
              isLastSlide={gameState.currentSlideIndex === JULIKRISE_SLIDES.length - 1}
            />
          </div>
        </div>
      </main>

      {/* Subtle Hint Clue Modal */}
      <SubtleHintModal
        isOpen={isHintModalOpen}
        onClose={() => setIsHintModalOpen(false)}
        hintTitle={currentSlide.subtleClue.hintTitle}
        hintText={currentSlide.subtleClue.hintText}
        visualClueDetail={currentSlide.subtleClue.visualClueDetail}
        alreadyUsed={isCurrentHintUsed}
        onConfirmUseHint={handleConfirmUseHint}
      />

      {/* Historical Glossary Modal */}
      <HistoricalGlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      {/* Global Leaderboard Modal (accessible from Header button) */}
      {isLeaderboardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setIsLeaderboardOpen(false)}
              className="absolute top-4 right-4 z-10 text-[#dcd1be] hover:text-white p-1 rounded bg-[#2a221a] border border-[#52412e] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <LeaderboardView
              currentUserScore={totalScore}
              currentUserTimeSeconds={timeElapsed}
              currentUserRankTitle={currentRankTitle}
              defaultPlayerName={gameState.playerName}
              onUpdatePlayerName={(name) => {
                setGameState((prev) => ({ ...prev, playerName: name }));
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
