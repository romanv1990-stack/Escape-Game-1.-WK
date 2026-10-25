import React, { useState } from 'react';
import { Shield, ArrowRight, BookOpen, Trophy, Sparkles, Check, Users, Music } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface TeamNameSlideProps {
  initialTeamName: string;
  onConfirmTeam: (teamName: string, insignia: string) => void;
  onOpenGlossary: () => void;
  onOpenLeaderboard: () => void;
  isMusicPlaying?: boolean;
  onToggleMusic?: () => void;
}

export const TeamNameSlide: React.FC<TeamNameSlideProps> = ({
  initialTeamName,
  onConfirmTeam,
  onOpenGlossary,
  onOpenLeaderboard,
  isMusicPlaying = false,
  onToggleMusic,
}) => {
  const [teamName, setTeamName] = useState<string>(initialTeamName || 'Diplomatische Sondergesandtschaft');
  const [selectedInsignia, setSelectedInsignia] = useState<string>('🕊️');
  const [selectedRole, setSelectedRole] = useState<string>('Neutrale Friedenskonferenz');

  const INSIGNIA_OPTIONS = [
    { icon: '🕊️', name: 'Friedenstaube' },
    { icon: '⚖️', name: 'Justitia / Völkerrecht' },
    { icon: '📜', name: 'Vertragswerk 1914' },
    { icon: '🦅', name: 'Adler der Weisheit' },
    { icon: '🦁', name: 'Löwe der Vermittlung' },
  ];

  const ROLE_OPTIONS = [
    'Neutrale Friedenskonferenz (Den Haag)',
    'Gemeinsamer europäischer Botschaftsrat',
    'Sonderabteilung für Krisendiplomatie',
    'Schiedsgerichtliche Gesandtschaft Bern',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.playStamp();
    const finalName = teamName.trim() || 'Diplomatische Sondergesandtschaft';
    localStorage.setItem('julikrise_player_name', finalName);
    onConfirmTeam(finalName, selectedInsignia);
  };

  return (
    <div className="min-h-screen bg-[#15120f] text-[#dcd1be] flex flex-col justify-center items-center p-4 sm:p-6 selection:bg-[#c9a86a]/30">
      <div className="max-w-4xl w-full paper-texture rounded-lg shadow-2xl border-4 border-[#b8a483] overflow-hidden text-[#2a2016]">
        {/* Cover Image Marquee (Historical Oil Painting generated with Nano Banana) */}
        <div className="relative w-full aspect-[21/9] sm:aspect-[16/7] overflow-hidden border-b-2 border-[#b8a483] bg-[#211a13]">
          <img
            src="/src/assets/images/cover_julikrise_1914_1792930117527.jpg"
            alt="Historisches Ölgemälde der europäischen Diplomaten im Juli 1914 am Kartentisch"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-95 contrast-105 transition-transform duration-1000 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1b150f]/90 via-[#1b150f]/30 to-transparent flex items-end justify-between p-6">
            <div className="text-white space-y-1">
              <span className="font-typewriter text-xs uppercase tracking-widest text-[#d8c39e] block">
                Geheimes Kabinett · Juli 1914
              </span>
              <h1 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-wider text-[#f5ede0] drop-shadow-md">
                Julikrise 1914
              </h1>
              <p className="font-serif italic text-xs sm:text-sm text-[#e0d4c1]">
                Stoppt die Kettenreaktion! · Geheime Depeschen im Auswärtigen Amt
              </p>
            </div>
            {onToggleMusic && (
              <button
                type="button"
                onClick={onToggleMusic}
                title={isMusicPlaying ? 'Hintergrundmusik pausieren' : 'Hintergrundmusik abspielen'}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1b150f]/80 hover:bg-[#2b2118] text-[#e0d4c1] border border-[#7a6448] text-xs font-sans-clean transition-colors cursor-pointer shadow-lg backdrop-blur-sm"
              >
                <Music className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{isMusicPlaying ? 'Musik: Läuft' : 'Musik: Abspielen'}</span>
                {isMusicPlaying && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping ml-0.5" />}
              </button>
            )}
          </div>
        </div>

        {/* Team Registration Body */}
        <div className="p-6 sm:p-10 space-y-6">
          <div className="border-b border-[#cfbe9f] pb-4">
            <div className="flex items-center gap-2 text-xs font-typewriter text-[#7a654e] uppercase tracking-wider mb-1">
              <Users className="w-4 h-4 text-[#8a6838]" />
              <span>Akkreditierung · Schritt 1 von 6</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-[#1e160e]">
              Eintragung Ihrer diplomatischen Delegation
            </h2>
            <p className="font-serif italic text-xs sm:text-sm text-[#544331] mt-0.5">
              Geben Sie den Namen Ihres Teams oder Ihrer Schülergruppe ein. Dieser Name wird auf Ihrer Diplomaten-Urkunde und in der globalen Bestenliste eingetragen.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 font-sans-clean">
            {/* Team Name Input */}
            <div className="space-y-2">
              <label htmlFor="team-name-input" className="block text-xs font-bold uppercase tracking-wider text-[#3d2f21]">
                Name der Delegation / des Schüler-Teams:
              </label>
              <div className="relative">
                <input
                  id="team-name-input"
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="z. B. Delegation Klasse 11b, Botschaftsrat Sophie & Felix, Die Friedensstifter..."
                  required
                  className="w-full bg-[#fbf9f4] border-2 border-[#bfae8f] focus:border-[#802525] rounded-md px-4 py-3 text-sm sm:text-base font-serif text-[#1e150d] placeholder-[#8c7b68] shadow-inner focus:outline-none transition-colors"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="text-[#6b5844] text-[11px]">Schnell-Vorlagen:</span>
                {['Team Friedensstifter', 'Delegation Gruppe 1', 'Botschaftsrat 11a', 'Gesandtschaft Europa'].map(
                  (preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setTeamName(preset)}
                      className="px-2 py-0.5 rounded bg-[#ebdcc0] hover:bg-[#ded0b0] text-[#3d2e20] text-[11px] border border-[#cfbe9f] transition-colors cursor-pointer"
                    >
                      {preset}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Insignia Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3d2f21]">
                Wählen Sie das diplomatische Siegel Ihrer Gesandtschaft:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {INSIGNIA_OPTIONS.map((item) => {
                  const isSelected = selectedInsignia === item.icon;
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => {
                        soundEffects.playTelegraph();
                        setSelectedInsignia(item.icon);
                      }}
                      className={`p-3 rounded-lg border-2 text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                        isSelected
                          ? 'bg-[#e4d2b2] border-[#802525] text-[#1c150d] shadow-md scale-105'
                          : 'bg-[#f4ecdc] hover:bg-[#ebdcc0] border-[#cfbe9f] text-[#554331]'
                      }`}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-[10px] font-bold uppercase tracking-tighter block mt-0.5">
                        {item.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Delegation Focus */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3d2f21]">
                Heimatstation / Diplomatische Beauftragung:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ROLE_OPTIONS.map((role) => {
                  const isSelected = selectedRole === role;
                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => {
                        soundEffects.playTelegraph();
                        setSelectedRole(role);
                      }}
                      className={`p-2.5 text-left rounded border transition-all text-xs font-medium flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-[#29422f] border-[#3e6b48] text-white shadow'
                          : 'bg-[#f4ecdc] hover:bg-[#ebdcc0] border-[#cfbe9f] text-[#3f3122]'
                      }`}
                    >
                      <span>{role}</span>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit & Secondary Controls */}
            <div className="pt-4 border-t-2 border-[#b8a483] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playRustle();
                    onOpenGlossary();
                  }}
                  className="text-[#6e5842] hover:text-[#2d2013] underline underline-offset-2 flex items-center gap-1 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Glossar öffnen</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playTelegraph();
                    onOpenLeaderboard();
                  }}
                  className="text-[#6e5842] hover:text-[#2d2013] underline underline-offset-2 flex items-center gap-1 cursor-pointer"
                >
                  <Trophy className="w-3.5 h-3.5 text-[#b28235]" />
                  <span>Bestenliste ansehen</span>
                </button>
                {onToggleMusic && (
                  <button
                    type="button"
                    onClick={onToggleMusic}
                    className="text-[#6e5842] hover:text-[#2d2013] underline underline-offset-2 flex items-center gap-1 cursor-pointer sm:hidden"
                  >
                    <Music className="w-3.5 h-3.5 text-[#b28235]" />
                    <span>{isMusicPlaying ? 'Musik: Pause' : 'Musik: Start'}</span>
                  </button>
                )}
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#802525] hover:bg-[#962e2e] text-white font-sans-clean text-sm font-bold tracking-wider uppercase rounded shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 cursor-pointer ring-2 ring-red-900/30"
              >
                <span>Team beglaubigen & Mission starten</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
