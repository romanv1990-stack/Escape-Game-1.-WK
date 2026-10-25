import React, { useState, useEffect } from 'react';
import { Lock, Unlock, KeyRound, AlertCircle, CheckCircle, ArrowRight, Lightbulb } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface CipherLockProps {
  correctCode: string;
  codeExplanation: string;
  isUnlocked: boolean;
  attempts: number;
  onCodeSuccess: (pointsAwarded: number, speedBonus: number) => void;
  onCodeFailed: () => void;
  onOpenClueModal: () => void;
  slideStartTime: number;
  onNextSlide: () => void;
  isLastSlide: boolean;
}

export const CipherLock: React.FC<CipherLockProps> = ({
  correctCode,
  codeExplanation,
  isUnlocked,
  attempts,
  onCodeSuccess,
  onCodeFailed,
  onOpenClueModal,
  slideStartTime,
  onNextSlide,
  isLastSlide,
}) => {
  const [digits, setDigits] = useState<string[]>(['', '', '', '']);
  const [errorShake, setErrorShake] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Focus and keyboard input listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isUnlocked) return;
      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        handleDigitInput(e.key);
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleVerifyCode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [digits, isUnlocked]);

  // Reset digits when lock changes
  useEffect(() => {
    if (!isUnlocked) {
      setDigits(['', '', '', '']);
      setErrorMessage(null);
    } else {
      setDigits(correctCode.split(''));
    }
  }, [correctCode, isUnlocked]);

  const handleDigitInput = (num: string) => {
    soundEffects.playTypewriter();
    setErrorMessage(null);
    const nextEmptyIndex = digits.findIndex((d) => d === '');
    if (nextEmptyIndex !== -1) {
      const updated = [...digits];
      updated[nextEmptyIndex] = num;
      setDigits(updated);

      // Auto-trigger verify when 4th digit entered
      if (nextEmptyIndex === 3) {
        verifyCodeArray(updated);
      }
    }
  };

  const handleBackspace = () => {
    soundEffects.playTypewriter();
    setErrorMessage(null);
    const lastFilledIndex = digits.map((d) => d !== '').lastIndexOf(true);
    if (lastFilledIndex !== -1) {
      const updated = [...digits];
      updated[lastFilledIndex] = '';
      setDigits(updated);
    }
  };

  const handleClear = () => {
    soundEffects.playRustle();
    setDigits(['', '', '', '']);
    setErrorMessage(null);
  };

  const verifyCodeArray = (arr: string[]) => {
    const entered = arr.join('');
    if (entered.length < 4) {
      setErrorMessage('Bitte alle 4 Ziffern des Geheimcodes eingeben.');
      return;
    }

    if (entered === correctCode) {
      soundEffects.playStamp();
      soundEffects.playSuccess();
      // Calculate speed bonus: max 200 points if solved under 60 seconds, scaling down to 50
      const secondsSpent = Math.max(1, Math.floor((Date.now() - slideStartTime) / 1000));
      let speedBonus = 200;
      if (secondsSpent > 120) {
        speedBonus = 50;
      } else if (secondsSpent > 60) {
        speedBonus = Math.max(50, Math.floor(200 - (secondsSpent - 60) * 2.5));
      }
      onCodeSuccess(500, speedBonus);
    } else {
      soundEffects.playError();
      setErrorShake(true);
      setErrorMessage('Code falsch dechiffriert! Prüfe Daten, Telegrammnummern oder Fristen im Dokument.');
      onCodeFailed();
      setTimeout(() => {
        setErrorShake(false);
      }, 600);
    }
  };

  const handleVerifyCode = () => {
    verifyCodeArray(digits);
  };

  return (
    <div className="bg-[#241e18] border border-[#44382c] rounded-lg p-5 text-[#dcd1be] shadow-lg space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#3d3226]">
        <div className="flex items-center gap-2">
          {isUnlocked ? (
            <Unlock className="w-4 h-4 text-[#75c68b]" />
          ) : (
            <Lock className="w-4 h-4 text-[#c9a86a]" />
          )}
          <h3 className="font-sans-clean font-bold text-sm text-[#ebdcc2] uppercase tracking-wider">
            {isUnlocked ? 'Dechiffrierung bestätigt' : '4-Stelliger Chiffrier-Tresor'}
          </h3>
        </div>
        {!isUnlocked && (
          <button
            onClick={() => {
              soundEffects.playRustle();
              onOpenClueModal();
            }}
            className="flex items-center gap-1.5 text-xs text-[#c9a86a] hover:text-[#e4c995] font-sans-clean transition-colors px-2 py-0.5 rounded bg-[#33281c] border border-[#52412e]"
          >
            <Lightbulb className="w-3.5 h-3.5 text-[#e5be70]" />
            <span>Subtiler Archiv-Hinweis</span>
          </button>
        )}
      </div>

      {/* Code Display Chamber */}
      <div
        className={`p-4 bg-[#191410] border-2 rounded-lg flex flex-col items-center justify-center transition-all ${
          isUnlocked
            ? 'border-[#437a54] bg-[#1a2b1e]'
            : errorShake
            ? 'border-red-600 animate-bounce'
            : 'border-[#3f3427]'
        }`}
      >
        <div className="text-[11px] font-typewriter text-[#8f806e] uppercase tracking-widest mb-2 flex items-center gap-1.5">
          <KeyRound className="w-3 h-3 text-[#c9a86a]" />
          <span>{isUnlocked ? 'Depesche freigegeben' : 'Chiffre-Eingabe (4 Ziffern)'}</span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 my-2">
          {digits.map((digit, index) => (
            <div
              key={index}
              className={`w-12 h-14 sm:w-14 sm:h-16 rounded border-2 flex items-center justify-center font-typewriter text-2xl sm:text-3xl font-bold shadow-inner transition-all ${
                isUnlocked
                  ? 'bg-[#29422f] border-[#5cb874] text-[#d6ecd7]'
                  : digit !== ''
                  ? 'bg-[#2f271e] border-[#c9a86a] text-[#f7eedc] scale-105'
                  : 'bg-[#1e1913] border-[#44382c] text-[#7a6b57]'
              }`}
            >
              {digit !== '' ? digit : '·'}
            </div>
          ))}
        </div>

        {/* Error or Success feedback message */}
        {errorMessage && !isUnlocked && (
          <div className="mt-2 text-xs text-[#e06c75] font-sans-clean flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {isUnlocked && (
          <div className="mt-3 p-3 bg-[#1e3323] border border-[#3e6b48] rounded text-xs text-[#c9e7ce] font-sans-clean space-y-1 text-center w-full">
            <div className="font-bold flex items-center justify-center gap-1.5 text-sm text-[#75c68b]">
              <CheckCircle className="w-4 h-4" />
              <span>Erfolgreich entschlüsselt (+500 Punkte)</span>
            </div>
            <p className="font-book text-[11px] text-[#e0f2e3] pt-1">
              {codeExplanation}
            </p>
          </div>
        )}
      </div>

      {/* Keypad Buttons (Visible when locked) */}
      {!isUnlocked ? (
        <div className="space-y-2 pt-1">
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleDigitInput(num.toString())}
                className="py-3 bg-[#2a231b] hover:bg-[#382f24] active:bg-[#4a3f31] border border-[#483c2e] hover:border-[#c9a86a] rounded font-typewriter text-base sm:text-lg font-bold text-[#f2e9dc] shadow transition-colors flex items-center justify-center cursor-pointer"
              >
                {num}
              </button>
            ))}
            <button
              onClick={handleClear}
              className="py-3 bg-[#251e18] hover:bg-[#30271f] border border-[#3f3325] rounded font-sans-clean text-xs text-[#a89985] uppercase tracking-wider transition-colors"
            >
              Löschen
            </button>
            <button
              onClick={() => handleDigitInput('0')}
              className="py-3 bg-[#2a231b] hover:bg-[#382f24] active:bg-[#4a3f31] border border-[#483c2e] hover:border-[#c9a86a] rounded font-typewriter text-base sm:text-lg font-bold text-[#f2e9dc] shadow transition-colors"
            >
              0
            </button>
            <button
              onClick={handleBackspace}
              className="py-3 bg-[#251e18] hover:bg-[#30271f] border border-[#3f3325] rounded font-sans-clean text-xs text-[#a89985] transition-colors"
            >
              ⌫ Zurück
            </button>
          </div>

          <button
            onClick={handleVerifyCode}
            disabled={digits.includes('')}
            className={`w-full py-2.5 rounded font-sans-clean text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              digits.includes('')
                ? 'bg-[#2a2219] text-[#6b5d4c] cursor-not-allowed border border-[#382e22]'
                : 'bg-[#c9a86a] hover:bg-[#dbbd82] text-[#1c1813] cursor-pointer shadow-md'
            }`}
          >
            <span>Code prüfen & Siegel brechen</span>
          </button>
        </div>
      ) : (
        /* Next slide forward button once unlocked */
        <div className="pt-2">
          <button
            onClick={() => {
              soundEffects.playRustle();
              onNextSlide();
            }}
            className="w-full py-3 bg-[#3b6e4c] hover:bg-[#4a8a5f] text-white rounded font-sans-clean text-sm font-bold tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isLastSlide ? 'Zur Abschluss-Auswertung & Diplomatenpass' : 'Nächste Großmacht dechiffrieren'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
