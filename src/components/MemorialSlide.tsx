import React, { useEffect } from 'react';
import { MEMORIAL_CASUALTIES } from '../data/julikriseData';
import { ambientMusic } from '../utils/ambientMusic';
import { InteractiveTimeline } from './InteractiveTimeline';
import { ArrowRight, Volume2, VolumeX, Flame, Skull, Clock } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface MemorialSlideProps {
  onProceedToSummary: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const MemorialSlide: React.FC<MemorialSlideProps> = ({
  onProceedToSummary,
  isMuted,
  onToggleMute,
}) => {
  useEffect(() => {
    // Start somber memorial soundtrack
    ambientMusic.playMemorial();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-8 text-[#dcd1be] animate-in fade-in duration-700">
      {/* Memorial Banner */}
      <div className="bg-[#14110e] border-2 border-[#3d2f22] rounded-lg p-6 sm:p-10 text-center space-y-4 shadow-2xl relative overflow-hidden">
        {/* Subtle Candle Flame Motif */}
        <div className="flex items-center justify-center gap-2 text-2xl text-[#d4af37] animate-pulse">
          <Flame className="w-6 h-6 fill-amber-500 text-amber-600" />
          <Flame className="w-8 h-8 fill-amber-400 text-amber-500" />
          <Flame className="w-6 h-6 fill-amber-500 text-amber-600" />
        </div>

        <div className="space-y-1">
          <span className="font-typewriter text-xs uppercase tracking-widest text-[#a89078] block">
            Mahnmal der Geschichte · 1914 – 1918
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold uppercase tracking-wide text-[#efe5d5]">
            Der Weltenbrand – Das bittere Ende der Illusion
          </h2>
          <p className="font-serif italic text-sm sm:text-base text-[#a39380] max-w-2xl mx-auto pt-1">
            „Die Lampen gingen in ganz Europa aus – und vier Jahre lang herrschte die Finsternis.“
          </p>
        </div>

        {/* Grim Milestones Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 font-sans-clean">
          <div className="bg-[#1c1611] p-3.5 rounded border border-[#3b2e21]">
            <span className="text-[10px] uppercase text-[#8a7a69] block font-bold">Kriegsbeginn</span>
            <span className="font-mono text-sm sm:text-base font-bold text-[#e8decb]">28. Juli 1914</span>
            <span className="text-[10px] text-[#736353] block mt-0.5">Erklärung an Serbien</span>
          </div>

          <div className="bg-[#1c1611] p-3.5 rounded border border-[#3b2e21]">
            <span className="text-[10px] uppercase text-[#8a7a69] block font-bold">Waffenstillstand</span>
            <span className="font-mono text-sm sm:text-base font-bold text-[#e8decb]">11. Nov. 1918</span>
            <span className="text-[10px] text-[#736353] block mt-0.5">Compiègne (11:00 Uhr)</span>
          </div>

          <div className="bg-[#241717] p-3.5 rounded border border-[#522929]">
            <span className="text-[10px] uppercase text-[#c27c7c] block font-bold">Todesopfer Gesamt</span>
            <span className="font-mono text-base sm:text-lg font-black text-[#e85a5a] tabular-nums">~ 17.000.000</span>
            <span className="text-[10px] text-[#9c5959] block mt-0.5">Soldaten & Zivilisten</span>
          </div>

          <div className="bg-[#1c1611] p-3.5 rounded border border-[#3b2e21]">
            <span className="text-[10px] uppercase text-[#8a7a69] block font-bold">Kriegsdauer</span>
            <span className="font-mono text-sm sm:text-base font-bold text-[#e8decb]">1.568 Tage</span>
            <span className="text-[10px] text-[#736353] block mt-0.5">Materialschlacht</span>
          </div>
        </div>

        {/* Music Status Bar */}
        <div className="flex items-center justify-center gap-2 pt-2 text-xs font-sans-clean text-[#9c8b78]">
          <span className="italic">Hintergrundmusik: Triumphant Cadence (Gedämpftes Orchester)</span>
          <button
            onClick={onToggleMute}
            className="p-1 rounded bg-[#251e18] hover:bg-[#322820] text-[#c9a86a] border border-[#3f3224] transition-colors ml-2 cursor-pointer"
            title="Musik umschalten"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* NEW: Interactive Timeline Component for MemorialSlide */}
      <InteractiveTimeline />

      {/* Country Casualties Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-[#3b2e21] pb-2">
          <Skull className="w-5 h-5 text-[#8f4747]" />
          <h3 className="font-display font-bold text-lg text-[#ebdcc2]">
            Der Blutzoll der beteiligten Nationen
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-sans-clean">
          {MEMORIAL_CASUALTIES.map((stat) => (
            <div
              key={stat.country}
              className="bg-[#1a1410] border border-[#382b1d] rounded-lg p-4 space-y-3 shadow-md hover:border-[#5a4632] transition-colors"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#2d2217]">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{stat.flag}</span>
                  <h4 className="font-display font-bold text-sm text-[#f1eadc]">
                    {stat.country}
                  </h4>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded uppercase font-bold text-[#8f7e6c] bg-[#271e16]">
                  {stat.alliance}
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#968472]">Gefallene Soldaten:</span>
                  <span className="font-mono font-bold text-[#e06c75]">{stat.fallenSoldiers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#968472]">Zivilverluste & Hunger:</span>
                  <span className="font-mono font-semibold text-[#c9a86a]">{stat.civilianLosses}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#2d2217] text-[11px] font-book text-[#a99c8b] leading-relaxed">
                <span className="font-bold text-[#c4b5a2] block text-[10px] uppercase tracking-wider mb-0.5">
                  Historische Folge:
                </span>
                {stat.keyConsequence}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Quote Box */}
      <div className="paper-texture p-6 rounded-lg border-2 border-[#b8a483] text-[#2c2014] shadow-xl space-y-2">
        <blockquote className="font-serif italic text-sm sm:text-base leading-relaxed text-[#2c2015] border-l-4 border-[#852c2c] pl-4">
          „Wir waren achtzehn Jahre alt und begannen die Welt und das Dasein zu lieben; und wir mussten darauf schießen. Die erste Granate, die einschlug, traf in unser Herz. Wir sind vom Schaffen, vom Streben, vom Fortschritt abgeschnitten. Wir glauben an nichts mehr; wir glauben an den Krieg.“
        </blockquote>
        <div className="text-right text-xs font-typewriter text-[#6b5844]">
          — Erich Maria Remarque, <cite>Im Westen nichts Neues</cite>
        </div>
      </div>

      {/* Button to proceed to the Diplomat Certificate */}
      <div className="pt-4 flex justify-center">
        <button
          onClick={() => {
            soundEffects.playStamp();
            onProceedToSummary();
          }}
          className="px-8 py-3.5 bg-[#852c2c] hover:bg-[#9c3838] text-white rounded font-sans-clean text-sm font-bold tracking-wider uppercase transition-all shadow-xl flex items-center gap-2 cursor-pointer ring-2 ring-red-900/40 hover:scale-105"
        >
          <span>Zur Abschluss-Auswertung & Diplomatenpass</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
