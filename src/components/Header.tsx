import React from 'react';
import { Volume2, VolumeX, BookOpen, Clock, Award, Music, Shield, Trophy } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface HeaderProps {
  currentPhase: 'intro' | 'team_registration' | 'map_task' | 'slides' | 'memorial' | 'summary';
  currentSlideIndex: number;
  totalSlides: number;
  currentSlideNation: string;
  totalScore: number;
  timeElapsed: number;
  isMuted: boolean;
  isMusicPlaying: boolean;
  teamName?: string;
  teamInsignia?: string;
  onToggleMusic: () => void;
  onToggleMute: () => void;
  onOpenGlossary: () => void;
  onOpenLeaderboard?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPhase,
  currentSlideIndex,
  totalSlides,
  currentSlideNation,
  totalScore,
  timeElapsed,
  isMuted,
  isMusicPlaying,
  teamName,
  teamInsignia = '🕊️',
  onToggleMusic,
  onToggleMute,
  onOpenGlossary,
  onOpenLeaderboard,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const nationLabels = ['Wien', 'Berlin', 'St. Petersburg', 'Paris', 'London'];

  return (
    <header className="sticky top-0 z-30 border-b border-[#3e3428] bg-[#1a1714]/95 backdrop-blur-md px-4 sm:px-8 py-3 text-[#dcd1be]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Zone 1: Brand title and active team name */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xl sm:text-2xl text-[#d4af37]">{teamInsignia}</span>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-base sm:text-lg font-bold tracking-wider text-[#e6decb] uppercase whitespace-nowrap">
                Julikrise 1914
              </h1>
              {teamName && (
                <span className="hidden xl:inline text-[11px] font-sans-clean font-semibold px-2 py-0.5 rounded bg-[#2e2419] border border-[#483928] text-[#c9a86a] max-w-[200px] truncate">
                  {teamName}
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#a49680] font-sans-clean -mt-1 hidden sm:block">
              Geheimakten des Auswärtigen Amtes · Stoppt die Kettenreaktion
            </p>
          </div>
        </div>

        {/* Zone 2: Progress track & active status */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto py-1 max-w-full">
          {/* Map task step indicator */}
          <div className="flex items-center gap-1.5 text-xs font-sans-clean whitespace-nowrap shrink-0">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                currentPhase === 'map_task'
                  ? 'bg-[#c9a86a] text-[#1a1714] font-extrabold ring-2 ring-[#c9a86a]/40 scale-105'
                  : currentPhase !== 'intro' && currentPhase !== 'team_registration'
                  ? 'bg-[#3b6e4c] text-white border border-[#529469]'
                  : 'bg-[#2a241d] text-[#6b6051] border border-[#3e3228]'
              }`}
            >
              <Shield className="w-3 h-3" />
            </div>
            <span
              className={`text-xs ${
                currentPhase === 'map_task'
                  ? 'font-semibold text-[#f1eadc]'
                  : currentPhase !== 'intro' && currentPhase !== 'team_registration'
                  ? 'text-[#8b9c8a]'
                  : 'text-[#645a4d]'
              }`}
            >
              Europakarte
            </span>
            <span className="text-[#453a2d] text-xs select-none">→</span>
          </div>

          {/* 5 Countries steps */}
          {nationLabels.map((city, idx) => {
            const isCompleted =
              currentPhase === 'memorial' ||
              currentPhase === 'summary' ||
              (currentPhase === 'slides' && idx < currentSlideIndex);
            const isCurrent = currentPhase === 'slides' && idx === currentSlideIndex;

            return (
              <div
                key={city}
                className="flex items-center gap-1.5 text-xs font-sans-clean whitespace-nowrap shrink-0"
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                    isCompleted
                      ? 'bg-[#3b6e4c] text-white border border-[#529469]'
                      : isCurrent
                      ? 'bg-[#c9a86a] text-[#1a1714] font-extrabold ring-2 ring-[#c9a86a]/40 scale-105'
                      : 'bg-[#2a241d] text-[#6b6051] border border-[#3e3228]'
                  }`}
                >
                  {isCompleted ? '✓' : idx + 1}
                </div>
                <span
                  className={`hidden lg:inline text-xs ${
                    isCurrent
                      ? 'font-semibold text-[#f1eadc]'
                      : isCompleted
                      ? 'text-[#8b9c8a]'
                      : 'text-[#645a4d]'
                  }`}
                >
                  {city}
                </span>
                {idx < totalSlides - 1 && (
                  <span className="text-[#453a2d] text-xs select-none">→</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Zone 3: Score, Timer & Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 font-sans-clean">
          {/* Score display */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#25201a] border border-[#3f3529] rounded text-xs">
            <Award className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="text-[#a49680]">Pkt:</span>
            <span className="font-mono font-bold text-[#e6decb] tabular-nums tracking-wide">
              {totalScore}
            </span>
          </div>

          {/* Timer display */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#25201a] border border-[#3f3529] rounded text-xs">
            <Clock className="w-3.5 h-3.5 text-[#88a090]" />
            <span className="font-mono font-bold text-[#e6decb] tabular-nums tracking-wide">
              {formatTime(timeElapsed)}
            </span>
          </div>

          {/* Background Music Toggle (Triumphant Cadence Orchestral) */}
          <button
            onClick={onToggleMusic}
            title={isMusicPlaying ? 'Hintergrundmusik (Triumphant Cadence) pausieren' : 'Hintergrundmusik (Triumphant Cadence) abspielen'}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs border rounded transition-all cursor-pointer ${
              isMusicPlaying && !isMuted
                ? 'bg-[#3b2a1a] text-[#e8c88c] border-[#7a5830]'
                : 'bg-[#25201a] text-[#8c7d6c] border-[#3f3529] hover:text-[#dcd1be]'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Hintergrundmusik</span>
            {isMusicPlaying && !isMuted && (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping ml-0.5" />
            )}
          </button>

          {/* Leaderboard button */}
          {onOpenLeaderboard && (
            <button
              onClick={() => {
                soundEffects.playTelegraph();
                onOpenLeaderboard();
              }}
              title="Globale Bestenliste einsehen"
              className="flex items-center gap-1 px-2.5 py-1 text-xs text-[#dcd1be] bg-[#2a241d] hover:bg-[#383026] border border-[#483d2f] rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Trophy className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="hidden sm:inline">Rangliste</span>
            </button>
          )}

          {/* Glossary button */}
          <button
            onClick={() => {
              soundEffects.playRustle();
              onOpenGlossary();
            }}
            title="Historisches Glossar & Leitfaden"
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-[#dcd1be] bg-[#2a241d] hover:bg-[#383026] border border-[#483d2f] rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#c9a86a]" />
            <span className="hidden sm:inline">Glossar</span>
          </button>

          {/* Sound mute toggle */}
          <button
            onClick={onToggleMute}
            title={isMuted ? 'Ton einschalten' : 'Ton stummschalten'}
            className="p-1.5 text-[#a49680] hover:text-[#e6decb] bg-[#25201a] hover:bg-[#322a22] border border-[#3f3529] rounded transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-[#bf616a]" /> : <Volume2 className="w-4 h-4 text-[#a3be8c]" />}
          </button>
        </div>
      </div>
    </header>
  );
};
