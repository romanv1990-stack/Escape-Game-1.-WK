import React, { useState } from 'react';
import { MAP_TERRITORIES_1914 } from '../data/julikriseData';
import { Shield, CheckCircle2, ArrowRight, Globe2, Sparkles, Eye, Palette } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface AllianceMapTaskProps {
  onCompleteMapTask: (bonusPoints: number) => void;
  onSkip?: () => void;
}

export const AllianceMapTask: React.FC<AllianceMapTaskProps> = ({
  onCompleteMapTask,
}) => {
  const [assignments, setAssignments] = useState<Record<string, 'Mittelmächte' | 'Entente' | 'Neutral' | null>>({
    ger: null,
    auh: null,
    rus: null,
    fra: null,
    gbr: null,
    bel: null,
    srb: null,
  });

  const [selectedTerritoryId, setSelectedTerritoryId] = useState<string>('ger');
  const [isCompleted, setIsCompleted] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [previewAllColors, setPreviewAllColors] = useState(false);

  const selectedTerritory =
    MAP_TERRITORIES_1914.find((t) => t.id === selectedTerritoryId) || MAP_TERRITORIES_1914[0];

  const handleAssign = (alliance: 'Mittelmächte' | 'Entente' | 'Neutral') => {
    soundEffects.playStamp();
    const updated = {
      ...assignments,
      [selectedTerritoryId]: alliance,
    };
    setAssignments(updated);

    if (alliance === selectedTerritory.alliance) {
      setFeedback(`Korrekt! ${selectedTerritory.name} gehörte 1914 zum Lager der ${alliance === 'Neutral' ? 'neutralen Staaten' : alliance}.`);
    } else {
      setFeedback(`Achtung: ${selectedTerritory.name} gehörte historisch zur Allianz der ${selectedTerritory.alliance === 'Neutral' ? 'neutralen Staaten' : selectedTerritory.alliance}!`);
    }

    const allCorrect = MAP_TERRITORIES_1914.every(
      (t) => updated[t.id] === t.alliance
    );

    if (allCorrect) {
      soundEffects.playSuccess();
      setIsCompleted(true);
      setFeedback('Hervorragend! Alle europäischen Großmächte sind ihren historischen Bündnissen von 1914 korrekt zugeordnet.');
    }
  };

  const correctCount = MAP_TERRITORIES_1914.filter(
    (t) => assignments[t.id] === t.alliance
  ).length;

  // Helper to get fill color based on assignment status (Uncolored by default, colors only when assigned!)
  const getCountryFill = (id: string, alliance: 'Mittelmächte' | 'Entente' | 'Neutral') => {
    const assigned = previewAllColors ? alliance : assignments[id];
    if (!assigned) {
      // Uncolored Historical Atlas Style (like uncolored Wikipedia 1914 map)
      return selectedTerritoryId === id ? '#f0e8d6' : '#ede3cf';
    }
    if (assigned === 'Mittelmächte') return '#8c2d2d'; // Historic Central Powers Red/Copper
    if (assigned === 'Entente') return '#2b5239'; // Historic Triple Entente Green
    if (assigned === 'Neutral') return '#8a7247'; // Historic Neutral Ochre
    return '#ede3cf';
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-6 text-[#dcd1be]">
      {/* Header */}
      <div className="paper-texture p-6 rounded-lg border-2 border-[#cfbe9f] text-[#281f15] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-typewriter text-[#7a654e] uppercase tracking-wider mb-1">
            <Globe2 className="w-4 h-4 text-[#916b3f]" />
            <span>Missions-Auftakt · Vorstufe zur Dechiffrierung</span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-black uppercase text-[#1e160e]">
            Europakarte 1914: Die Allianzen vor dem Ersten Weltkrieg
          </h2>
          <p className="font-serif italic text-xs sm:text-sm text-[#544331] mt-0.5">
            Historische Blanko-Karte im Stil des Atlas von 1914. Ordne den Staaten ihre Bündniszugehörigkeit zu, um die Karte schrittweise zu kolorieren.
          </p>
        </div>

        {/* Bonus Points Badge */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[#e8dcbf] border border-[#cfbe9f] rounded-lg shrink-0 font-sans-clean">
          <Sparkles className="w-5 h-5 text-[#b28235]" />
          <div>
            <span className="text-[10px] uppercase text-[#69553f] block font-bold">Missions-Bonus</span>
            <span className="font-mono font-bold text-sm text-[#1e160e]">+500 Punkte</span>
          </div>
        </div>
      </div>

      {/* Main Map & Interactive Classification Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Visual Map Area: 7 cols */}
        <div className="lg:col-span-7 bg-[#211b15] border-2 border-[#483a2b] rounded-lg p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between text-xs font-sans-clean border-b border-[#3d3023] pb-2 text-[#9e8f7c]">
            <span>Klicke auf ein Land auf der Karte:</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPreviewAllColors(!previewAllColors)}
                className="text-[11px] text-[#c9a86a] hover:text-[#ebdcc2] flex items-center gap-1 cursor-pointer"
              >
                <Palette className="w-3.5 h-3.5" />
                <span>{previewAllColors ? 'Zurück zur Blanko-Karte' : 'Vollfarbe vorschauen'}</span>
              </button>
              <span className="font-mono font-bold text-[#c9a86a]">
                {correctCount} / {MAP_TERRITORIES_1914.length} koloriert
              </span>
            </div>
          </div>

          {/* Historical SVG Europe Map 1914 */}
          <div className="relative w-full aspect-[4/3] bg-[#d9cfbb] rounded-lg border-2 border-[#544331] overflow-hidden p-2 flex flex-col justify-between shadow-inner">
            {/* Watermark Compass & Ocean Labels */}
            <div className="absolute top-2 left-2 text-2xl opacity-30 pointer-events-none select-none">
              🧭
            </div>

            <svg
              viewBox="0 0 900 680"
              className="w-full h-full filter drop-shadow-sm select-none"
            >
              {/* Sea background with vintage contour texture */}
              <rect width="900" height="680" fill="#d4c8b2" />

              {/* Waterway Labels (Classic Wikipedia 1914 font) */}
              <text x="80" y="280" fill="#6a5d4d" fontSize="16" fontFamily="serif" fontStyle="italic" opacity="0.6">
                ATLANTISCHER OZEAN
              </text>
              <text x="240" y="160" fill="#6a5d4d" fontSize="14" fontFamily="serif" fontStyle="italic" opacity="0.6">
                NORDSEE
              </text>
              <text x="470" y="150" fill="#6a5d4d" fontSize="14" fontFamily="serif" fontStyle="italic" opacity="0.6">
                OSTSEE
              </text>
              <text x="410" y="620" fill="#6a5d4d" fontSize="16" fontFamily="serif" fontStyle="italic" opacity="0.6">
                MITTELMEER
              </text>
              <text x="690" y="520" fill="#6a5d4d" fontSize="14" fontFamily="serif" fontStyle="italic" opacity="0.6">
                SCHWARZES MEER
              </text>

              {/* Unclickable Non-Target Nations (Context Cartography matching 1914 borders) */}
              {/* Scandinavia (Norway & Sweden) */}
              <path
                d="M340,60 L440,50 L480,120 L450,210 L380,210 L350,150 Z"
                fill="#ded5c0"
                stroke="#4a3a2d"
                strokeWidth="1.2"
              />
              <text x="390" y="130" fill="#665645" fontSize="12" fontFamily="serif" fontStyle="italic">
                Schweden
              </text>

              {/* Spain & Portugal */}
              <path
                d="M130,420 L240,420 L230,550 L120,550 Z"
                fill="#ded5c0"
                stroke="#4a3a2d"
                strokeWidth="1.2"
              />
              <text x="160" y="480" fill="#665645" fontSize="13" fontFamily="serif" fontStyle="italic">
                Spanien (Neutral)
              </text>

              {/* Italy (Kingdom of Italy 1914) */}
              <path
                d="M330,440 L380,430 L450,540 L410,570 L360,490 Z"
                fill="#ded5c0"
                stroke="#4a3a2d"
                strokeWidth="1.2"
              />
              <text x="365" y="490" fill="#665645" fontSize="12" fontFamily="serif" fontStyle="italic">
                Italien
              </text>

              {/* Switzerland */}
              <path
                d="M315,405 L355,400 L350,425 L320,425 Z"
                fill="#ded5c0"
                stroke="#4a3a2d"
                strokeWidth="1"
              />
              <text x="323" y="418" fill="#544332" fontSize="9" fontFamily="serif">
                CH
              </text>

              {/* Netherlands */}
              <path
                d="M295,290 L325,285 L320,310 L295,310 Z"
                fill="#ded5c0"
                stroke="#4a3a2d"
                strokeWidth="1"
              />
              <text x="300" y="302" fill="#544332" fontSize="9" fontFamily="serif">
                NL
              </text>

              {/* Romania */}
              <path
                d="M560,420 L660,420 L650,470 L570,470 Z"
                fill="#ded5c0"
                stroke="#4a3a2d"
                strokeWidth="1.2"
              />
              <text x="590" y="450" fill="#665645" fontSize="11" fontFamily="serif" fontStyle="italic">
                Rumänien
              </text>

              {/* Bulgaria */}
              <path
                d="M580,480 L660,480 L650,530 L590,530 Z"
                fill="#ded5c0"
                stroke="#4a3a2d"
                strokeWidth="1.2"
              />
              <text x="600" y="510" fill="#665645" fontSize="11" fontFamily="serif" fontStyle="italic">
                Bulgarien
              </text>

              {/* Ottoman Empire */}
              <path
                d="M660,520 L780,510 L790,620 L650,620 Z"
                fill="#ded5c0"
                stroke="#4a3a2d"
                strokeWidth="1.2"
              />
              <text x="680" y="560" fill="#665645" fontSize="12" fontFamily="serif" fontStyle="italic">
                Osmanisches Reich
              </text>

              {/* TARGET INTERACTIVE 1914 NATIONS */}
              {/* 1. United Kingdom (Großbritannien & ganz Irland 1914) */}
              <g
                onClick={() => {
                  soundEffects.playTelegraph();
                  setSelectedTerritoryId('gbr');
                }}
                className="cursor-pointer transition-all hover:opacity-90"
              >
                <path
                  d="M170,180 L235,160 L245,260 L195,330 L160,280 L145,240 Z"
                  fill={getCountryFill('gbr', 'Entente')}
                  stroke={selectedTerritoryId === 'gbr' ? '#c9a86a' : '#3d2e21'}
                  strokeWidth={selectedTerritoryId === 'gbr' ? '3.5' : '1.5'}
                />
                <circle cx="215" cy="275" r="3.5" fill="#802525" />
                <text
                  x="185"
                  y="265"
                  fill={assignments.gbr || previewAllColors ? '#f5ede0' : '#2c2117'}
                  fontSize="12"
                  fontWeight="bold"
                  fontFamily="sans-serif"
                >
                  Großbritannien
                </text>
                <text x="222" y="278" fill="#554433" fontSize="9" fontFamily="serif">
                  London
                </text>
              </g>

              {/* 2. France (Französische Republik) */}
              <g
                onClick={() => {
                  soundEffects.playTelegraph();
                  setSelectedTerritoryId('fra');
                }}
                className="cursor-pointer transition-all hover:opacity-90"
              >
                <path
                  d="M210,330 L300,315 L320,400 L305,435 L225,445 L190,390 Z"
                  fill={getCountryFill('fra', 'Entente')}
                  stroke={selectedTerritoryId === 'fra' ? '#c9a86a' : '#3d2e21'}
                  strokeWidth={selectedTerritoryId === 'fra' ? '3.5' : '1.5'}
                />
                <circle cx="260" cy="360" r="3.5" fill="#802525" />
                <text
                  x="235"
                  y="395"
                  fill={assignments.fra || previewAllColors ? '#f5ede0' : '#2c2117'}
                  fontSize="13"
                  fontWeight="bold"
                  fontFamily="sans-serif"
                >
                  Frankreich
                </text>
                <text x="268" y="363" fill="#554433" fontSize="9" fontFamily="serif">
                  Paris
                </text>
              </g>

              {/* 3. Belgium (Königreich Belgien - Neutral) */}
              <g
                onClick={() => {
                  soundEffects.playTelegraph();
                  setSelectedTerritoryId('bel');
                }}
                className="cursor-pointer transition-all hover:opacity-90"
              >
                <path
                  d="M285,295 L315,290 L320,320 L290,325 Z"
                  fill={getCountryFill('bel', 'Neutral')}
                  stroke={selectedTerritoryId === 'bel' ? '#c9a86a' : '#3d2e21'}
                  strokeWidth={selectedTerritoryId === 'bel' ? '3' : '1.5'}
                />
                <circle cx="298" cy="308" r="3" fill="#802525" />
                <text
                  x="292"
                  y="318"
                  fill={assignments.bel || previewAllColors ? '#f5ede0' : '#2c2117'}
                  fontSize="8"
                  fontWeight="bold"
                  fontFamily="sans-serif"
                >
                  BEL
                </text>
              </g>

              {/* 4. German Empire (Deutsches Kaiserreich 1914 mit Ostpreußen & Elsass-Lothringen) */}
              <g
                onClick={() => {
                  soundEffects.playTelegraph();
                  setSelectedTerritoryId('ger');
                }}
                className="cursor-pointer transition-all hover:opacity-90"
              >
                {/* Main German Empire + East Prussia */}
                <path
                  d="M320,240 L440,230 L480,270 L510,245 L540,250 L530,280 L495,295 L445,340 L340,345 L320,320 L325,285 Z"
                  fill={getCountryFill('ger', 'Mittelmächte')}
                  stroke={selectedTerritoryId === 'ger' ? '#c9a86a' : '#3d2e21'}
                  strokeWidth={selectedTerritoryId === 'ger' ? '3.5' : '1.5'}
                />
                <circle cx="395" cy="285" r="3.5" fill="#802525" />
                <text
                  x="355"
                  y="295"
                  fill={assignments.ger || previewAllColors ? '#f5ede0' : '#2c2117'}
                  fontSize="13"
                  fontWeight="bold"
                  fontFamily="sans-serif"
                >
                  Deutsches Reich
                </text>
                <text x="403" y="288" fill="#554433" fontSize="9" fontFamily="serif">
                  Berlin
                </text>
              </g>

              {/* 5. Austro-Hungarian Dual Monarchy (Österreich-Ungarn mit Sarajevo/Bosnien) */}
              <g
                onClick={() => {
                  soundEffects.playTelegraph();
                  setSelectedTerritoryId('auh');
                }}
                className="cursor-pointer transition-all hover:opacity-90"
              >
                <path
                  d="M350,355 L440,350 L550,320 L570,390 L550,450 L470,470 L430,460 L380,430 L360,400 Z"
                  fill={getCountryFill('auh', 'Mittelmächte')}
                  stroke={selectedTerritoryId === 'auh' ? '#c9a86a' : '#3d2e21'}
                  strokeWidth={selectedTerritoryId === 'auh' ? '3.5' : '1.5'}
                />
                <circle cx="430" cy="385" r="3.5" fill="#802525" />
                <text
                  x="400"
                  y="405"
                  fill={assignments.auh || previewAllColors ? '#f5ede0' : '#2c2117'}
                  fontSize="13"
                  fontWeight="bold"
                  fontFamily="sans-serif"
                >
                  Österreich-Ungarn
                </text>
                <text x="438" y="388" fill="#554433" fontSize="9" fontFamily="serif">
                  Wien
                </text>

                {/* Sarajevo Attentat Marker */}
                <circle cx="475" cy="455" r="3.5" fill="#e06c75" stroke="#fff" strokeWidth="1" />
                <text x="483" y="458" fill="#802525" fontSize="8" fontWeight="bold">
                  ★ Sarajevo
                </text>
              </g>

              {/* 6. Russian Empire (Russisches Kaiserreich) */}
              <g
                onClick={() => {
                  soundEffects.playTelegraph();
                  setSelectedTerritoryId('rus');
                }}
                className="cursor-pointer transition-all hover:opacity-90"
              >
                <path
                  d="M485,150 L870,120 L880,480 L670,460 L570,320 L530,280 L495,295 L480,240 Z"
                  fill={getCountryFill('rus', 'Entente')}
                  stroke={selectedTerritoryId === 'rus' ? '#c9a86a' : '#3d2e21'}
                  strokeWidth={selectedTerritoryId === 'rus' ? '3.5' : '1.5'}
                />
                <circle cx="610" cy="180" r="3.5" fill="#802525" />
                <text
                  x="630"
                  y="280"
                  fill={assignments.rus || previewAllColors ? '#f5ede0' : '#2c2117'}
                  fontSize="16"
                  fontWeight="bold"
                  fontFamily="sans-serif"
                >
                  Russisches Reich
                </text>
                <text x="618" y="183" fill="#554433" fontSize="9" fontFamily="serif">
                  St. Petersburg
                </text>
              </g>

              {/* 7. Kingdom of Serbia (Serbien) */}
              <g
                onClick={() => {
                  soundEffects.playTelegraph();
                  setSelectedTerritoryId('srb');
                }}
                className="cursor-pointer transition-all hover:opacity-90"
              >
                <path
                  d="M495,455 L550,450 L560,505 L510,515 Z"
                  fill={getCountryFill('srb', 'Entente')}
                  stroke={selectedTerritoryId === 'srb' ? '#c9a86a' : '#3d2e21'}
                  strokeWidth={selectedTerritoryId === 'srb' ? '3' : '1.5'}
                />
                <circle cx="515" cy="465" r="3" fill="#802525" />
                <text
                  x="508"
                  y="488"
                  fill={assignments.srb || previewAllColors ? '#f5ede0' : '#2c2117'}
                  fontSize="9"
                  fontWeight="bold"
                  fontFamily="sans-serif"
                >
                  Serbien
                </text>
                <text x="522" y="468" fill="#554433" fontSize="8" fontFamily="serif">
                  Belgrad
                </text>
              </g>
            </svg>

            {/* Cartographic Legend */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-sans-clean bg-[#1e1813]/95 p-2 rounded border border-[#3e3226]">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-[#8c2d2d] border border-[#b84242]" />
                  <span className="text-[#e2d5c3]">Mittelmächte</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-[#2b5239] border border-[#3e7550]" />
                  <span className="text-[#e2d5c3]">Triple Entente</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-[#8a7247] border border-[#b39763]" />
                  <span className="text-[#e2d5c3]">Neutraler Puffer</span>
                </div>
              </div>
              <span className="text-[10px] text-[#a49680] italic">
                {previewAllColors ? 'Vollfarbmodus aktiv' : 'Blanko-Atlas: Koloriert bei Zuordnung'}
              </span>
            </div>
          </div>
        </div>

        {/* Classification Deck / Control: 5 cols */}
        <div className="lg:col-span-5 bg-[#211b15] border-2 border-[#483a2b] rounded-lg p-5 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#3b2e21]">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#c9a86a]" />
              <h3 className="font-sans-clean font-bold text-sm text-[#ebdcc2] uppercase tracking-wider">
                Diplomatische Zuordnung
              </h3>
            </div>
            <span className="text-[11px] font-mono text-[#a89984]">
              Hauptstadt: {selectedTerritory.capital}
            </span>
          </div>

          {/* Active selected territory details */}
          <div className="bg-[#18130f] p-4 rounded border border-[#382b1d] space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-display font-bold text-base text-[#f5ede0]">
                {selectedTerritory.name}
              </h4>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded font-sans-clean ${
                  assignments[selectedTerritory.id] === selectedTerritory.alliance
                    ? 'bg-[#29422f] text-[#75c68b] border border-[#3e6b48]'
                    : assignments[selectedTerritory.id]
                    ? 'bg-[#3d1c1c] text-[#e06c75] border border-[#6b2c2c]'
                    : 'bg-[#2a221a] text-[#8f806e]'
                }`}
              >
                {assignments[selectedTerritory.id]
                  ? `Zugewiesen: ${assignments[selectedTerritory.id]}`
                  : 'Auf der Karte unkoloriert'}
              </span>
            </div>
            <p className="font-book text-xs text-[#b8a994] leading-relaxed">
              {selectedTerritory.role1914}
            </p>
          </div>

          {/* Three Choice Assignment Buttons */}
          <div className="space-y-2 pt-2">
            <span className="text-[11px] font-sans-clean text-[#9c8d7b] block uppercase tracking-wider">
              Bündnisblock für {selectedTerritory.name} festlegen:
            </span>

            <button
              onClick={() => handleAssign('Mittelmächte')}
              className={`w-full p-2.5 rounded border text-xs font-sans-clean font-semibold tracking-wide transition-all flex items-center justify-between cursor-pointer ${
                assignments[selectedTerritory.id] === 'Mittelmächte'
                  ? 'bg-[#8c2d2d] border-[#b84242] text-white shadow-md'
                  : 'bg-[#2c221a] hover:bg-[#382b20] border-[#483827] text-[#d6c7b2]'
              }`}
            >
              <span>🔴 Mittelmächte (Zweibund: Dtl. & Österr.-Ungarn)</span>
              {assignments[selectedTerritory.id] === 'Mittelmächte' && <CheckCircle2 className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => handleAssign('Entente')}
              className={`w-full p-2.5 rounded border text-xs font-sans-clean font-semibold tracking-wide transition-all flex items-center justify-between cursor-pointer ${
                assignments[selectedTerritory.id] === 'Entente'
                  ? 'bg-[#2b5239] border-[#3e7550] text-white shadow-md'
                  : 'bg-[#2c221a] hover:bg-[#382b20] border-[#483827] text-[#d6c7b2]'
              }`}
            >
              <span>🟢 Triple Entente (GB, Frankreich, Russland, Serbien)</span>
              {assignments[selectedTerritory.id] === 'Entente' && <CheckCircle2 className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => handleAssign('Neutral')}
              className={`w-full p-2.5 rounded border text-xs font-sans-clean font-semibold tracking-wide transition-all flex items-center justify-between cursor-pointer ${
                assignments[selectedTerritory.id] === 'Neutral'
                  ? 'bg-[#8a7247] border-[#b39763] text-white shadow-md'
                  : 'bg-[#2c221a] hover:bg-[#382b20] border-[#483827] text-[#d6c7b2]'
              }`}
            >
              <span>⚪ Neutraler Pufferstaat (Belgien)</span>
              {assignments[selectedTerritory.id] === 'Neutral' && <CheckCircle2 className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Quick Selector Pills */}
          <div className="pt-2">
            <span className="text-[10px] uppercase tracking-wider text-[#827361] block mb-1">
              Weitere Staaten auswählen:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {MAP_TERRITORIES_1914.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    soundEffects.playTelegraph();
                    setSelectedTerritoryId(t.id);
                  }}
                  className={`px-2 py-1 rounded text-[11px] font-sans-clean transition-all cursor-pointer ${
                    selectedTerritoryId === t.id
                      ? 'bg-[#c9a86a] text-[#1c1813] font-bold ring-2 ring-[#c9a86a]/30'
                      : assignments[t.id] === t.alliance
                      ? 'bg-[#28382b] text-[#86bf92] border border-[#3b593f]'
                      : 'bg-[#2a2119] text-[#a49682] border border-[#3f3123]'
                  }`}
                >
                  {t.name.split(' ')[0]} {assignments[t.id] === t.alliance ? '✓' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Banner */}
          {feedback && (
            <div className="p-3 bg-[#191410] border border-[#3f3223] rounded text-xs text-[#ebd8bf] font-book leading-relaxed animate-in fade-in duration-200">
              <span className="font-sans-clean font-bold block mb-0.5 text-[#c9a86a]">
                Diplomatisches Lage-Feedback:
              </span>
              <p>{feedback}</p>
            </div>
          )}

          {/* Progression Forward Button */}
          <div className="pt-3 border-t border-[#382c1e]">
            {isCompleted ? (
              <button
                onClick={() => onCompleteMapTask(500)}
                className="w-full py-3 bg-[#3b6e4c] hover:bg-[#4a8a5f] text-white rounded font-sans-clean text-xs sm:text-sm font-bold tracking-wide transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer ring-2 ring-emerald-500/30"
              >
                <span>Bündnisse vollständig koloriert (+500 Pkt) → Zu den Depeschen</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => onCompleteMapTask(200)}
                className="w-full py-2 bg-[#2a2219] hover:bg-[#382d22] text-[#9c8d7b] hover:text-[#dcd1be] border border-[#3f3223] rounded font-sans-clean text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Missionskarte überspringen & direkt zu Slide 1</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
