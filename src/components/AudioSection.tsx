import React, { useState, useEffect } from 'react';
import { AudioScriptData } from '../types/escapeGame';
import { Play, Square, Sliders, ChevronDown, ChevronUp, Sparkles, UserCheck } from 'lucide-react';
import { speechController, MALE_VOICE_PROFILES } from '../utils/speechController';
import { soundEffects } from '../utils/soundEffects';

interface AudioSectionProps {
  audioScript: AudioScriptData;
  slideId: number;
}

export const AudioSection: React.FC<AudioSectionProps> = ({ audioScript, slideId }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDirections, setShowDirections] = useState(false);

  const voiceProfile = MALE_VOICE_PROFILES[slideId] || MALE_VOICE_PROFILES[1];

  // Stop speech when slide changes
  useEffect(() => {
    speechController.stop();
    setIsPlaying(false);
  }, [slideId, audioScript.speechText]);

  const togglePlayback = () => {
    if (isPlaying) {
      speechController.stop();
      setIsPlaying(false);
    } else {
      soundEffects.playTelegraph();
      // Speak using character's distinct male voice profile
      speechController.speak(
        audioScript.speechText,
        slideId,
        {
          onStart: () => setIsPlaying(true),
          onEnd: () => setIsPlaying(false),
          onError: () => setIsPlaying(false),
        }
      );
    }
  };

  return (
    <div className="bg-[#231d17] border border-[#44382c] rounded-lg p-4 sm:p-5 text-[#dcd1be] shadow-lg space-y-4">
      {/* Speaker Header with Avatar & Control */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-[#332b21] border border-[#524434] flex items-center justify-center text-2xl shadow-inner select-none">
            {audioScript.avatarIcon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-sans-clean font-bold tracking-widest uppercase text-[#c9a86a] bg-[#3a2f22] px-2 py-0.5 rounded">
                Sprechskript (Ich-Form)
              </span>
              <span className="text-xs text-[#8c7e6c] font-mono">
                {audioScript.durationEstimate}
              </span>
            </div>
            <h3 className="font-display font-bold text-base sm:text-lg text-[#ebdcc2] mt-0.5">
              {audioScript.speakerName}
            </h3>
            <div className="text-xs text-[#a39480] font-serif italic">
              <span>{audioScript.speakerRole}</span>
            </div>
          </div>
        </div>

        {/* Audio Player Action Button */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={togglePlayback}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded font-sans-clean text-xs font-semibold tracking-wide transition-all shadow-md cursor-pointer ${
              isPlaying
                ? 'bg-[#852c2c] hover:bg-[#9c3838] text-white ring-2 ring-red-500/40'
                : 'bg-[#c9a86a] hover:bg-[#dbbd82] text-[#1c1813] hover:shadow-lg'
            }`}
          >
            {isPlaying ? (
              <>
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Monolog anhalten</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Monolog anhören</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Visual audio wave effect when speaking */}
      {isPlaying && (
        <div className="flex items-center justify-center gap-1.5 py-2 bg-[#1a1511] rounded border border-[#3e3226]">
          {[12, 24, 38, 20, 48, 16, 32, 44, 22, 50, 18, 30].map((height, i) => (
            <div
              key={i}
              className="w-1 bg-[#c9a86a] rounded-full animate-pulse"
              style={{
                height: `${height}px`,
                animationDelay: `${(i * 0.08).toFixed(2)}s`,
                animationDuration: '0.6s',
              }}
            />
          ))}
          <span className="text-[11px] font-mono text-[#c9a86a] ml-3 uppercase tracking-wider">
            Audio-Wiedergabe aktiv ({voiceProfile.name})...
          </span>
        </div>
      )}

      {/* Spoken monologue text */}
      <div className="bg-[#1c1712] border border-[#382d22] rounded p-3.5 text-xs sm:text-sm font-book leading-relaxed text-[#dfd6c6]">
        <span className="text-[#a49680] italic block mb-1 text-[11px]">
          Transkript des vertraulichen Monologs:
        </span>
        <p className="italic">{audioScript.speechText}</p>
      </div>

      {/* Director Notes / Sprecheranweisung (Pedagogical stage directions) */}
      <div className="border-t border-[#3a2f23] pt-2">
        <button
          onClick={() => {
            soundEffects.playRustle();
            setShowDirections(!showDirections);
          }}
          className="w-full flex items-center justify-between text-xs font-sans-clean text-[#c9a86a] hover:text-[#e4c995] py-1 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-1.5 font-medium">
            <Sliders className="w-3.5 h-3.5" />
            <span>Genaue Sprecher- & Regieanweisung (Für Rollenspiel im Unterricht)</span>
          </div>
          {showDirections ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showDirections && (
          <div className="mt-2.5 p-3.5 bg-[#181410] border border-[#3d3226] rounded text-xs space-y-2 text-[#b5a794] font-sans-clean animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <span className="font-bold text-[#e1d5c2] block text-[11px]">Tonfall & Haltung:</span>
                <p className="text-[11px]">{audioScript.directionNotes.tone}</p>
              </div>
              <div>
                <span className="font-bold text-[#e1d5c2] block text-[11px]">Sprechtempo & Rhythmus:</span>
                <p className="text-[11px]">{audioScript.directionNotes.pace}</p>
              </div>
              <div>
                <span className="font-bold text-[#e1d5c2] block text-[11px]">Emotionale Grundstimmung:</span>
                <p className="text-[11px]">{audioScript.directionNotes.emotion}</p>
              </div>
              <div>
                <span className="font-bold text-[#e1d5c2] block text-[11px]">Historische Absicht:</span>
                <p className="text-[11px]">{audioScript.directionNotes.historicalIntent}</p>
              </div>
            </div>
            <div className="pt-2 border-t border-[#2e251b] text-[10px] text-[#857766] italic flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#c9a86a]" />
              <span>Didaktischer Tipp: Schülerinnen und Schüler können den Monolog mit diesen Regieanweisungen vor der Klasse rezitieren.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
