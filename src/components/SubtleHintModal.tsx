import React from 'react';
import { X, Lightbulb, AlertTriangle, Eye } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface SubtleHintModalProps {
  isOpen: boolean;
  onClose: () => void;
  hintTitle: string;
  hintText: string;
  visualClueDetail: string;
  alreadyUsed: boolean;
  onConfirmUseHint: () => void;
}

export const SubtleHintModal: React.FC<SubtleHintModalProps> = ({
  isOpen,
  onClose,
  hintTitle,
  hintText,
  visualClueDetail,
  alreadyUsed,
  onConfirmUseHint,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#1f1a14] border-2 border-[#52412e] rounded-lg max-w-md w-full p-6 text-[#dcd1be] shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#3e3224]">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-[#d4af37]" />
            <h3 className="font-display font-bold text-base text-[#e6decb]">
              Subtiler Archiv-Hinweis
            </h3>
          </div>
          <button
            onClick={() => {
              soundEffects.playRustle();
              onClose();
            }}
            className="text-[#968673] hover:text-[#dcd1be] p-1 rounded hover:bg-[#2d241a] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {!alreadyUsed ? (
          <div className="space-y-4 font-sans-clean text-xs">
            <div className="p-3 bg-[#2d2218] border border-[#543f29] rounded flex items-start gap-2 text-[#edd6b6]">
              <AlertTriangle className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-0.5">Strategischer Hinweis-Einsatz:</span>
                <p>
                  Das Entsiegeln des Geheimarchiv-Hinweises kostet <strong>50 Diplomaten-Punkte</strong>. 
                  Er gibt dir einen subtilen Leitfaden zur Dechiffrierung, ohne die Lösung direkt zu verraten.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={onClose}
                className="px-3.5 py-1.5 rounded border border-[#443729] hover:bg-[#2b2218] text-[#a49680] text-xs transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={() => {
                  soundEffects.playRustle();
                  onConfirmUseHint();
                }}
                className="px-4 py-1.5 rounded bg-[#c9a86a] hover:bg-[#dbbd82] text-[#1c1813] font-bold text-xs transition-colors shadow"
              >
                Hinweis für -50 Pkt aufdecken
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3 font-sans-clean text-xs text-[#cfc4b2] animate-in fade-in duration-200">
            <div className="p-3 bg-[#292219] border border-[#4a3a29] rounded space-y-2">
              <span className="font-bold text-[#c9a86a] block font-display text-sm">
                {hintTitle}
              </span>
              <p className="leading-relaxed font-book text-sm text-[#e4dac8]">
                {hintText}
              </p>
            </div>

            <div className="p-2.5 bg-[#17130f] border border-[#382b1d] rounded flex items-start gap-2 text-[#b09e86]">
              <Eye className="w-4 h-4 text-[#c9a86a] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#c9a86a] block text-[11px]">
                  Optischer Anker im Dokument:
                </span>
                <p className="text-[11px] font-mono">{visualClueDetail}</p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded bg-[#33281c] hover:bg-[#423424] text-[#e6decb] font-medium text-xs transition-colors border border-[#52412e]"
              >
                Verstanden & Schließen
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
