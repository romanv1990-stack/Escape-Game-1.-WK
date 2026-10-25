import React, { useState } from 'react';
import { HistoricalDocumentData } from '../types/escapeGame';
import { Eye, Info, Stamp, FileText } from 'lucide-react';

interface HistoricalDocumentProps {
  document: HistoricalDocumentData;
  nation: string;
  flagSymbol: string;
  alliance: string;
  colorTheme: {
    primary: string;
    border: string;
    stamp: string;
    badgeBg: string;
  };
}

export const HistoricalDocument: React.FC<HistoricalDocumentProps> = ({
  document,
  nation,
  flagSymbol,
  alliance,
  colorTheme,
}) => {
  const [showAnnotation, setShowAnnotation] = useState(false);

  return (
    <div className="relative paper-texture rounded-lg shadow-xl border-2 border-[#d3c4a8] overflow-hidden text-[#2d241c] flex flex-col justify-between transition-all">
      {/* Top Telegram Paper Header Ribbon */}
      <div className="bg-[#e4d8c0] border-b border-[#c8b79b] px-4 py-2.5 flex flex-wrap items-center justify-between text-xs font-typewriter text-[#554637]">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#735d46]" />
          <span className="font-bold tracking-wider uppercase text-[#3f3326]">
            {document.type}
          </span>
          <span className="text-[#8c7862]">·</span>
          <span className="font-mono text-[11px] text-[#695641]">
            {document.dispatchNumber}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span className="px-2 py-0.5 rounded text-[10px] font-sans-clean font-bold tracking-wide uppercase bg-[#d5c3a3] text-[#423525]">
            {alliance}
          </span>
          <span className="text-red-900 font-bold uppercase tracking-widest text-[10px] border border-red-800/40 px-1.5 py-0.5 bg-red-100/50">
            STRENG GEHEIM
          </span>
        </div>
      </div>

      {/* Main Document Content */}
      <div className="p-5 sm:p-7 space-y-5">
        {/* State Seal & Origin Block */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#d8c8af]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{flagSymbol}</span>
              <h2 className="font-display text-xl sm:text-2xl font-bold tracking-wide text-[#2c2015]">
                {nation}
              </h2>
            </div>
            <p className="text-xs font-serif italic text-[#6a5946] mt-0.5">
              Depeschenstelle: {document.dateLocation}
            </p>
          </div>

          {/* Official Imperial Rubber Stamp (Contains subtle visual clue) */}
          <div
            className="stamp-effect rotate-[-3deg] border-2 px-3 py-1.5 text-center font-typewriter rounded select-none shadow-sm transition-transform hover:rotate-0"
            style={{ borderColor: colorTheme.stamp, color: colorTheme.stamp }}
            title="Offizieller Dienststempel der Gesandtschaft"
          >
            <div className="flex items-center justify-center gap-1 text-[10px] font-bold tracking-wider uppercase">
              <Stamp className="w-3 h-3" />
              <span>{document.visualStampTitle}</span>
            </div>
            <div className="text-[11px] font-extrabold tracking-widest mt-0.5 border-t border-b py-0.5" style={{ borderColor: `${colorTheme.stamp}66` }}>
              {document.visualStampCode}
            </div>
            <div className="text-[9px] uppercase tracking-tighter opacity-80 mt-0.5">
              {document.visualStampLocation}
            </div>
          </div>
        </div>

        {/* Telegram Route Meta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-typewriter bg-[#efe5cf] p-2.5 rounded border border-[#dacbb1]">
          <div>
            <span className="text-[#8c7862] uppercase text-[10px] block">Absender:</span>
            <span className="font-semibold text-[#2f251c]">{document.sender}</span>
          </div>
          <div>
            <span className="text-[#8c7862] uppercase text-[10px] block">Empfänger:</span>
            <span className="font-semibold text-[#2f251c]">{document.recipient}</span>
          </div>
        </div>

        {/* Historical Document Original Text */}
        <div className="relative telegram-grid py-2">
          <div className="text-xs uppercase font-typewriter tracking-widest text-[#7c6953] mb-2 flex items-center justify-between">
            <span>// Wortlaut der Dechiffrierten Depesche //</span>
            <button
              onClick={() => setShowAnnotation(!showAnnotation)}
              className="text-[11px] normal-case font-sans-clean text-[#785b3b] hover:text-[#42311d] flex items-center gap-1 underline underline-offset-2"
            >
              <Info className="w-3.5 h-3.5" />
              <span>{showAnnotation ? 'Kontext schließen' : 'Historischer Kontext'}</span>
            </button>
          </div>

          <blockquote className="font-typewriter text-sm sm:text-base leading-relaxed text-[#211a13] bg-[#fdfbf6]/80 p-4 rounded border-l-2 border-[#b59e7e] shadow-inner select-text">
            {document.originalExcerpt}
          </blockquote>
        </div>

        {/* Historical Context Collapsible Note */}
        {showAnnotation && (
          <div className="p-3.5 bg-[#ebdcc2] border border-[#cfbe9f] rounded text-xs text-[#3a2f23] font-book leading-relaxed animate-in fade-in duration-200">
            <span className="font-bold font-sans-clean block mb-1 text-[#261f17]">
              Historische Einordnung (Auswärtiges Amt):
            </span>
            {document.historicalContext}
          </div>
        )}

        {/* Document Footer with Watermark and Clue Notice */}
        <div className="pt-2 border-t border-[#dfcfb7] flex flex-wrap items-center justify-between text-[11px] font-typewriter text-[#76634e]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#8c7355]/60" />
            <span>Chiffre-Sicherheit: Stufe IV (Dechiffriert)</span>
          </div>
          <div className="flex items-center gap-1 text-[#544331]">
            <Eye className="w-3.5 h-3.5 text-[#916a3a]" />
            <span className="italic">Hinweis: Zahlen und Fristen im Dokument genau prüfen</span>
          </div>
        </div>
      </div>
    </div>
  );
};
