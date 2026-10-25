import React, { useState } from 'react';
import { GameState, EscapeGameSlide } from '../types/escapeGame';
import { HISTORICAL_CHRONOLOGY } from '../data/julikriseData';
import { LeaderboardView } from './LeaderboardView';
import { Award, Printer, RotateCcw, Clock, CheckCircle2, ChevronRight, MessageSquare, BookMarked, ShieldCheck, Flame, Trophy } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface SummaryDossierProps {
  gameState: GameState;
  slides: EscapeGameSlide[];
  onRestart: () => void;
  onViewMemorial: () => void;
}

export const SummaryDossier: React.FC<SummaryDossierProps> = ({
  gameState,
  slides,
  onRestart,
  onViewMemorial,
}) => {
  const [activeTab, setActiveTab] = useState<'certificate' | 'leaderboard' | 'timeline' | 'reflection'>('certificate');

  // Calculate totals
  const mapBonus = gameState.scores.mapBonus || 0;
  const totalQuiz = gameState.scores.quizPoints.reduce(
    (slideSum, qArr) => slideSum + (Array.isArray(qArr) ? qArr.reduce((a, b) => a + b, 0) : 0),
    0
  );
  const totalCode = gameState.scores.codePoints.reduce((a, b) => a + b, 0);
  const totalSpeed = gameState.scores.speedBonus.reduce((a, b) => a + b, 0);
  const totalDeductions = gameState.scores.hintDeductions.reduce((a, b) => a + b, 0);
  const grandTotal = Math.max(0, mapBonus + totalQuiz + totalCode + totalSpeed - totalDeductions);

  const totalTimeSeconds = gameState.gameEndTime && gameState.gameStartTime
    ? Math.floor((gameState.gameEndTime - gameState.gameStartTime) / 1000)
    : 600;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  // Determine diplomatic title
  let rankTitle = 'Diplomatischer Attaché in Ausbildung';
  let rankGrade = 'Bronze';
  let rankDescription = 'Sie haben die Geheimakten gesichtet, doch die Zuspitzung der Krise forderte ihren Tribut.';

  if (grandTotal >= 4600) {
    rankTitle = 'Großbotschafter des Friedens (Exzellenz)';
    rankGrade = 'Platin';
    rankDescription = 'Hervorragende historische Schärfe! Mit blitzschneller Dechiffrierung, voller Bündnisübersicht und lückenlosem Urteilsvermögen haben Sie die verhängnisvolle Logik der Mächte durchschaut.';
  } else if (grandTotal >= 3800) {
    rankTitle = 'Bevollmächtigter Chefunterhändler';
    rankGrade = 'Gold';
    rankDescription = 'Starke Leistung! Sie haben die Interessenkonflikte und Mobilmachungsautomatismen präzise entschlüsselt.';
  } else if (grandTotal >= 3000) {
    rankTitle = 'Gesandter I. Klasse (Legationsrat)';
    rankGrade = 'Silber';
    rankDescription = 'Solide diplomatische Analyse. Sie kennen die Eckdaten der Julikrise und die Mechanismen der Bündnisverflechtung.';
  }

  const handlePrint = () => {
    soundEffects.playStamp();
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-6 text-[#dcd1be]">
      {/* Top Navigation Tabs */}
      <div className="no-print flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#3f3427] pb-3 gap-3">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#231d17] border border-[#3e3226] rounded-lg">
          <button
            onClick={() => setActiveTab('certificate')}
            className={`px-3 py-1.5 text-xs font-sans-clean font-semibold rounded transition-colors cursor-pointer ${
              activeTab === 'certificate'
                ? 'bg-[#c9a86a] text-[#1c1813] shadow'
                : 'text-[#9c8d7b] hover:text-[#dcd1be]'
            }`}
          >
            Diplomatenpass & Urkunde
          </button>
          <button
            onClick={() => {
              soundEffects.playTelegraph();
              setActiveTab('leaderboard');
            }}
            className={`px-3 py-1.5 text-xs font-sans-clean font-semibold rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'leaderboard'
                ? 'bg-[#c9a86a] text-[#1c1813] shadow'
                : 'text-[#9c8d7b] hover:text-[#dcd1be]'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Globale Bestenliste</span>
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-3 py-1.5 text-xs font-sans-clean font-semibold rounded transition-colors cursor-pointer ${
              activeTab === 'timeline'
                ? 'bg-[#c9a86a] text-[#1c1813] shadow'
                : 'text-[#9c8d7b] hover:text-[#dcd1be]'
            }`}
          >
            Historischer Zeitstrahl
          </button>
          <button
            onClick={() => setActiveTab('reflection')}
            className={`px-3 py-1.5 text-xs font-sans-clean font-semibold rounded transition-colors cursor-pointer ${
              activeTab === 'reflection'
                ? 'bg-[#c9a86a] text-[#1c1813] shadow'
                : 'text-[#9c8d7b] hover:text-[#dcd1be]'
            }`}
          >
            Didaktische Reflexion
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onViewMemorial}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#2e1d1d] hover:bg-[#3d2525] border border-[#5c3333] text-xs font-sans-clean text-[#f0cfcf] transition-colors cursor-pointer"
          >
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Mahnmal 1914–1918</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#2a231b] hover:bg-[#382f24] border border-[#483c2e] text-xs font-sans-clean transition-colors text-[#e6decb] cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#c9a86a]" />
            <span>Pass drucken</span>
          </button>
          <button
            onClick={onRestart}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#7a2c2c] hover:bg-[#913737] text-white text-xs font-sans-clean font-bold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Neustart</span>
          </button>
        </div>
      </div>

      {/* TAB 1: Certificate & Score Breakdown */}
      {activeTab === 'certificate' && (
        <div className="space-y-6">
          {/* Official Diploma Parchment Certificate */}
          <div className="paper-texture p-8 sm:p-12 rounded-lg border-4 border-[#bca788] text-[#2c2015] shadow-2xl relative overflow-hidden">
            {/* Watermark Seal */}
            <div className="absolute right-6 bottom-6 opacity-10 pointer-events-none text-9xl">
              🕊️
            </div>

            {/* Certificate Header */}
            <div className="text-center space-y-2 border-b-2 border-[#bca788] pb-6">
              <span className="font-typewriter text-xs uppercase tracking-widest text-[#7a6750]">
                Internationale Gesandtschaft · Konferenz zu Den Haag & Genf
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold uppercase tracking-wide text-[#1f170f]">
                Diplomaten-Urkunde
              </h2>
              <p className="font-serif italic text-sm text-[#5c4a37]">
                Verliehen für die Dechiffrierung der geheimen Depeschen der Julikrise 1914
              </p>
            </div>

            {/* Awardee & Diplomatic Rank */}
            <div className="my-8 text-center space-y-3">
              <span className="text-xs uppercase font-sans-clean tracking-widest text-[#695642]">
                Träger dieses Ehrentitels:
              </span>
              <div className="font-display text-2xl sm:text-3xl font-bold text-[#802525]">
                {rankTitle}
              </div>
              <p className="max-w-xl mx-auto font-serif text-sm leading-relaxed text-[#403324]">
                {rankDescription}
              </p>
            </div>

            {/* Score Grid on Certificate */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#ede2ca] border border-[#cfbe9f] rounded text-center my-6">
              <div>
                <span className="text-[10px] uppercase font-sans-clean text-[#7a6750] block">
                  Gesamtpunktzahl
                </span>
                <span className="font-typewriter text-2xl font-bold text-[#1f170f] tabular-nums">
                  {grandTotal} <span className="text-xs text-[#705e4a]">/ 5500</span>
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-sans-clean text-[#7a6750] block">
                  Benötigte Zeit
                </span>
                <span className="font-typewriter text-2xl font-bold text-[#1f170f] tabular-nums">
                  {formatTime(totalTimeSeconds)}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-sans-clean text-[#7a6750] block">
                  Erfolgsquote Quiz
                </span>
                <span className="font-typewriter text-2xl font-bold text-[#1f170f] tabular-nums">
                  {totalQuiz} <span className="text-xs text-[#705e4a]">Pkt</span>
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-sans-clean text-[#7a6750] block">
                  Rangstufe
                </span>
                <span className="font-typewriter text-2xl font-bold text-[#802525]">
                  {rankGrade}
                </span>
              </div>
            </div>

            {/* Link to Leaderboard button directly on certificate */}
            <div className="my-4 text-center">
              <button
                onClick={() => {
                  soundEffects.playTelegraph();
                  setActiveTab('leaderboard');
                }}
                className="px-4 py-2 bg-[#802525] hover:bg-[#962e2e] text-white rounded font-sans-clean text-xs font-bold tracking-wider uppercase transition-all shadow inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>Ihren Platz auf der globalen Bestenliste ansehen</span>
              </button>
            </div>

            {/* Signatures & Historical Stamp */}
            <div className="pt-6 border-t border-[#c5b293] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-serif italic text-[#594836]">
              <div>
                <span>Ausgestellt im Juli / August 1914</span>
                <br />
                <span className="font-sans-clean text-[10px] text-[#78644e]">
                  Auswärtiges Amt · Abteilung für Friedenswahrung
                </span>
              </div>
              <div className="stamp-effect rotate-[-4deg] border-2 border-[#802525] text-[#802525] px-4 py-1.5 font-typewriter text-center rounded">
                <span className="block font-bold text-[11px]">ARCHIV GEPRÜFT</span>
                <span className="text-[9px]">GESANDTSCHAFT 1914</span>
              </div>
            </div>
          </div>

          {/* Detailed Country-by-Country Point Breakdown Table */}
          <div className="bg-[#231d17] border border-[#44382c] rounded-lg p-6 shadow-xl space-y-4">
            <h3 className="font-display font-bold text-base text-[#ebdcc2] flex items-center gap-2">
              <Award className="w-4 h-4 text-[#d4af37]" />
              <span>Detaillierte Punkteaufschlüsselung aller Missionen</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans-clean border-collapse">
                <thead>
                  <tr className="border-b border-[#3d3226] text-[#9c8d7b] uppercase text-[10px] tracking-wider">
                    <th className="py-2.5 px-3">Mission / Nation</th>
                    <th className="py-2.5 px-3">Code</th>
                    <th className="py-2.5 px-3 text-right">Quiz (2 Fragen)</th>
                    <th className="py-2.5 px-3 text-right">Tresor (+500)</th>
                    <th className="py-2.5 px-3 text-right">Tempo (max +200)</th>
                    <th className="py-2.5 px-3 text-right">Hinweis (-50)</th>
                    <th className="py-2.5 px-3 text-right font-bold text-[#e6decb]">Summe</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#32271d]">
                  {/* Map task row */}
                  <tr className="hover:bg-[#2b221a]/50">
                    <td className="py-3 px-3 font-semibold text-[#f1eadc] flex items-center gap-2">
                      <span>🗺️</span>
                      <span>Europakarte 1914 (Bündniszuordnung)</span>
                    </td>
                    <td className="py-3 px-3 font-mono text-[#a89984]">—</td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-[#68b97d]">
                      +{mapBonus}
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-[#8a7966]">—</td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-[#8a7966]">—</td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-[#8a7966]">—</td>
                    <td className="py-3 px-3 text-right font-mono font-bold tabular-nums text-[#e6decb]">
                      +{mapBonus} Pkt
                    </td>
                  </tr>

                  {/* 5 slides rows */}
                  {slides.map((s, idx) => {
                    const slideQuizArr = gameState.scores.quizPoints[idx] || [0, 0];
                    const quizPt = slideQuizArr.reduce((a, b) => a + b, 0);
                    const codePt = gameState.scores.codePoints[idx] || 0;
                    const speedPt = gameState.scores.speedBonus[idx] || 0;
                    const hintDed = gameState.scores.hintDeductions[idx] || 0;
                    const slideTotal = quizPt + codePt + speedPt - hintDed;

                    return (
                      <tr key={s.id} className="hover:bg-[#2b221a]/50">
                        <td className="py-3 px-3 font-semibold text-[#f1eadc] flex items-center gap-2">
                          <span>{s.flagSymbol}</span>
                          <span>{s.nation}</span>
                        </td>
                        <td className="py-3 px-3 font-mono text-[#c9a86a]">{s.code}</td>
                        <td className="py-3 px-3 text-right font-mono tabular-nums text-[#68b97d]">
                          +{quizPt}
                        </td>
                        <td className="py-3 px-3 text-right font-mono tabular-nums text-[#68b97d]">
                          +{codePt}
                        </td>
                        <td className="py-3 px-3 text-right font-mono tabular-nums text-[#c9a86a]">
                          +{speedPt}
                        </td>
                        <td className="py-3 px-3 text-right font-mono tabular-nums text-[#e06c75]">
                          {hintDed > 0 ? `-${hintDed}` : '0'}
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-bold tabular-nums text-[#e6decb]">
                          {slideTotal} Pkt
                        </td>
                      </tr>
                    );
                  })}
                  <tr className="border-t-2 border-[#4d3e2d] font-bold text-[#f7eedc] bg-[#1d1712]">
                    <td className="py-3 px-3 uppercase text-[11px]">Gesamtergebnis</td>
                    <td className="py-3 px-3"></td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-[#68b97d]">
                      +{mapBonus + totalQuiz}
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-[#68b97d]">
                      +{totalCode}
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-[#c9a86a]">
                      +{totalSpeed}
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-[#e06c75]">
                      {totalDeductions > 0 ? `-${totalDeductions}` : '0'}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-sm tabular-nums text-[#d4af37]">
                      {grandTotal} Pkt
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Global Leaderboard (NEW!) */}
      {activeTab === 'leaderboard' && (
        <LeaderboardView
          currentUserScore={grandTotal}
          currentUserTimeSeconds={totalTimeSeconds}
          currentUserRankTitle={rankTitle}
          defaultPlayerName={gameState.playerName}
        />
      )}

      {/* TAB 3: Historical Timeline */}
      {activeTab === 'timeline' && (
        <div className="bg-[#231d17] border border-[#44382c] rounded-lg p-6 sm:p-8 shadow-xl space-y-6">
          <div className="border-b border-[#3d3226] pb-4">
            <h3 className="font-display font-bold text-xl text-[#ebdcc2] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#c9a86a]" />
              <span>Die Kettenreaktion 1914 – Chronologie des Scheiterns</span>
            </h3>
            <p className="text-xs text-[#a39480] font-sans-clean mt-1">
              Wie aus einem regionalen Attentat auf dem Balkan binnen 38 Tagen der Erste Weltkrieg entbrannte:
            </p>
          </div>

          <div className="relative border-l-2 border-[#4a3b2b] ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">
            {HISTORICAL_CHRONOLOGY.map((event, index) => (
              <div key={index} className="relative group">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#1c1611] border-2 border-[#c9a86a] group-hover:scale-125 transition-transform" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#c9a86a] uppercase tracking-wider">
                      {event.date}
                    </span>
                    <span className="text-[#5a4c3c]">·</span>
                    <h4 className="font-display font-bold text-base text-[#f1eadc]">
                      {event.title}
                    </h4>
                  </div>
                  <p className="font-book text-xs sm:text-sm text-[#bfb29f] leading-relaxed mt-1">
                    {event.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Reflection & Questions */}
      {activeTab === 'reflection' && (
        <div className="bg-[#231d17] border border-[#44382c] rounded-lg p-6 sm:p-8 shadow-xl space-y-6 font-sans-clean">
          <div className="border-b border-[#3d3226] pb-4">
            <h3 className="font-display font-bold text-xl text-[#ebdcc2] flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#c9a86a]" />
              <span>Didaktische Reflexion & Diskussionsfragen für den Unterricht</span>
            </h3>
            <p className="text-xs text-[#a39480] mt-1">
              Impulse für Schülerinnen und Schüler zur Vertiefung nach dem Escape-Game:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#1d1712] border border-[#3f3223] rounded-lg space-y-2">
              <span className="font-display font-bold text-sm text-[#c9a86a] block">
                1. Die Frage der Kriegsschuld (Fischer-Kontroverse vs. Schlafwandler)
              </span>
              <p className="text-xs font-book text-[#bfb29f] leading-relaxed">
                Trug das Deutsche Reich durch den „Blankoscheck“ die Hauptverantwortung, oder glitten alle europäischen Großmächte wie „Schlafwandler“ (Christopher Clark) gleichermaßen in die Katastrophe?
              </p>
            </div>

            <div className="p-4 bg-[#1d1712] border border-[#3f3223] rounded-lg space-y-2">
              <span className="font-display font-bold text-sm text-[#c9a86a] block">
                2. Bündnissysteme als Sicherheitsfalle
              </span>
              <p className="text-xs font-book text-[#bfb29f] leading-relaxed">
                Bündnisse sollten eigentlich abschrecken und Frieden sichern. Warum wirkten sie im Juli 1914 wie ein Brandbeschleuniger, der einen Lokalkonflikt zum Weltkrieg ausweitete?
              </p>
            </div>

            <div className="p-4 bg-[#1d1712] border border-[#3f3223] rounded-lg space-y-2">
              <span className="font-display font-bold text-sm text-[#c9a86a] block">
                3. Militärische Stechuhren vs. Politische Diplomatie
              </span>
              <p className="text-xs font-book text-[#bfb29f] leading-relaxed">
                Warum verlor die Politik in den letzten Julitagen die Kontrolle an die Generalstäbe (Stichwort: Schlieffen-Plan und russische Eisenbahn-Mobilmachung)?
              </p>
            </div>

            <div className="p-4 bg-[#1d1712] border border-[#3f3223] rounded-lg space-y-2">
              <span className="font-display font-bold text-sm text-[#c9a86a] block">
                4. Was hätte die Kettenreaktion stoppen können?
              </span>
              <p className="text-xs font-book text-[#bfb29f] leading-relaxed">
                An welchem der 5 Wendepunkte hätte ein besonnenes Einlenken den Weltkrieg noch verhindern können?
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
