import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Search, UserCheck, Clock, Award, Star, RefreshCw, Check } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

export interface LeaderboardEntry {
  id: string;
  name: string;
  schoolOrDelegation: string;
  score: number;
  timeSeconds: number;
  rankTitle: string;
  badge: 'platin' | 'gold' | 'silber' | 'bronze';
  date: string;
  isCurrentUser?: boolean;
}

const DEFAULT_GLOBAL_ENTRIES: LeaderboardEntry[] = [
  {
    id: 'sim-1',
    name: 'Botschafterin Clara & Jonas',
    schoolOrDelegation: 'Gymnasium Leopoldinum (Wien)',
    score: 5450,
    timeSeconds: 520, // 8m 40s
    rankTitle: 'Großbotschafter des Friedens',
    badge: 'platin',
    date: '24. Okt. 1914',
  },
  {
    id: 'sim-2',
    name: 'Sondergesandter Moritz',
    schoolOrDelegation: 'Friedrich-Wilhelm-Gymnasium (Berlin)',
    score: 5200,
    timeSeconds: 615, // 10m 15s
    rankTitle: 'Großbotschafter des Friedens',
    badge: 'platin',
    date: '22. Okt. 1914',
  },
  {
    id: 'sim-3',
    name: 'Delegation Genf (Klasse 11b)',
    schoolOrDelegation: 'École Internationale de Genève',
    score: 4950,
    timeSeconds: 690, // 11m 30s
    rankTitle: 'Bevollmächtigter Chefunterhändler',
    badge: 'gold',
    date: '19. Okt. 1914',
  },
  {
    id: 'sim-4',
    name: 'Legationsrätin Sophie',
    schoolOrDelegation: 'Lycée Français (Strasbourg)',
    score: 4700,
    timeSeconds: 740, // 12m 20s
    rankTitle: 'Bevollmächtigter Chefunterhändler',
    badge: 'gold',
    date: '18. Okt. 1914',
  },
  {
    id: 'sim-5',
    name: 'Friedensrat Maximilian',
    schoolOrDelegation: 'Kaiserin-Elisabeth-Gymnasium',
    score: 4350,
    timeSeconds: 820, // 13m 40s
    rankTitle: 'Bevollmächtigter Chefunterhändler',
    badge: 'gold',
    date: '15. Okt. 1914',
  },
  {
    id: 'sim-6',
    name: 'Attaché David & Lukas',
    schoolOrDelegation: 'Schadow-Gymnasium (Berlin-Zehlendorf)',
    score: 3950,
    timeSeconds: 890, // 14m 50s
    rankTitle: 'Gesandter I. Klasse',
    badge: 'silber',
    date: '12. Okt. 1914',
  },
  {
    id: 'sim-7',
    name: 'Sonderreferentin Leonie',
    schoolOrDelegation: 'Akademisches Gymnasium (Salzburg)',
    score: 3600,
    timeSeconds: 960, // 16m 00s
    rankTitle: 'Gesandter I. Klasse',
    badge: 'silber',
    date: '10. Okt. 1914',
  },
  {
    id: 'sim-8',
    name: 'Delegation Whitehall',
    schoolOrDelegation: 'Foreign Office Trainee Class (London)',
    score: 3200,
    timeSeconds: 1040, // 17m 20s
    rankTitle: 'Gesandter I. Klasse',
    badge: 'silber',
    date: '08. Okt. 1914',
  },
  {
    id: 'sim-9',
    name: 'Diplomatischer Nachwuchs Bern',
    schoolOrDelegation: 'Kantonsschule Zürich',
    score: 2750,
    timeSeconds: 1120, // 18m 40s
    rankTitle: 'Attaché in Ausbildung',
    badge: 'bronze',
    date: '05. Okt. 1914',
  },
];

interface LeaderboardViewProps {
  currentUserScore: number;
  currentUserTimeSeconds: number;
  currentUserRankTitle: string;
  defaultPlayerName?: string;
  onUpdatePlayerName?: (name: string) => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  currentUserScore,
  currentUserTimeSeconds,
  currentUserRankTitle,
  defaultPlayerName = 'Ihre Diplomaten-Delegation',
  onUpdatePlayerName,
}) => {
  const [playerName, setPlayerName] = useState<string>(() => {
    return localStorage.getItem('julikrise_player_name') || defaultPlayerName;
  });
  const [isEditingName, setIsEditingName] = useState(false);
  const [filterQuery, setFilterQuery] = useState('');

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s.toString().padStart(2, '0')}s`;
  };

  // Build the complete combined list with the user's score ranked into it
  const userEntry: LeaderboardEntry = {
    id: 'current-user',
    name: playerName || 'Ihre Diplomaten-Delegation',
    schoolOrDelegation: 'Auswärtiges Amt (Aktuelle Spielrunde)',
    score: currentUserScore,
    timeSeconds: currentUserTimeSeconds || 600,
    rankTitle: currentUserRankTitle,
    badge:
      currentUserScore >= 4600
        ? 'platin'
        : currentUserScore >= 3800
        ? 'gold'
        : currentUserScore >= 3000
        ? 'silber'
        : 'bronze',
    date: 'Heute',
    isCurrentUser: true,
  };

  // Combine and sort by score descending, then by time ascending
  const allEntries = [...DEFAULT_GLOBAL_ENTRIES, userEntry].sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.timeSeconds - b.timeSeconds;
  });

  const currentUserPosition = allEntries.findIndex((e) => e.isCurrentUser) + 1;

  const handleSaveName = (newName: string) => {
    setPlayerName(newName);
    localStorage.setItem('julikrise_player_name', newName);
    onUpdatePlayerName?.(newName);
    setIsEditingName(false);
    soundEffects.playStamp();
  };

  const filteredEntries = allEntries.filter(
    (e) =>
      e.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      e.schoolOrDelegation.toLowerCase().includes(filterQuery.toLowerCase()) ||
      e.rankTitle.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="bg-[#211b15] border-2 border-[#483a2b] rounded-lg p-5 sm:p-7 shadow-2xl space-y-6 text-[#dcd1be]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#3b2e21]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#33281c] border border-[#54412e] flex items-center justify-center text-xl text-[#d4af37]">
            🏆
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-sans-clean font-bold tracking-widest uppercase text-[#c9a86a] bg-[#3a2f22] px-2 py-0.5 rounded">
                Simulierte Internationale Bestenliste
              </span>
              <span className="text-xs text-[#a49680]">Schulklassen & Gesandtschaften</span>
            </div>
            <h3 className="font-display font-bold text-lg sm:text-xl text-[#f1eadc] mt-0.5">
              Globale Diplomaten-Rangliste 1914
            </h3>
          </div>
        </div>

        {/* Current user's rank highlight badge */}
        <div className="flex items-center gap-3 px-4 py-2 bg-[#2a2219] border-2 border-[#c9a86a] rounded-lg font-sans-clean shadow-md">
          <Medal className="w-5 h-5 text-[#d4af37]" />
          <div>
            <span className="text-[10px] uppercase text-[#a49680] block font-semibold">Ihr Rangplatz</span>
            <span className="font-typewriter text-base sm:text-lg font-bold text-[#f5ede0]">
              Platz #{currentUserPosition} <span className="text-xs text-[#c9a86a]">von {allEntries.length}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Name Customization Strip */}
      <div className="p-3.5 bg-[#191410] border border-[#3f3123] rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-sans-clean">
        <div className="flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-[#c9a86a]" />
          <span className="text-[#a49680]">Name Ihrer Delegation:</span>
          {!isEditingName ? (
            <span className="font-bold text-[#f2e9dc] bg-[#2a221a] px-2.5 py-1 rounded border border-[#483929]">
              {playerName}
            </span>
          ) : (
            <input
              type="text"
              defaultValue={playerName}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveName(e.currentTarget.value);
              }}
              onBlur={(e) => handleSaveName(e.currentTarget.value)}
              className="bg-[#2a221a] border border-[#c9a86a] text-[#f2e9dc] px-2 py-1 rounded focus:outline-none"
            />
          )}
        </div>

        {!isEditingName ? (
          <button
            onClick={() => setIsEditingName(true)}
            className="text-[#c9a86a] hover:text-[#e8ce9d] underline text-xs cursor-pointer"
          >
            Namen anpassen
          </button>
        ) : (
          <span className="text-[11px] text-[#8f806e]">Drücke Enter zum Speichern</span>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#8a7b6a] absolute left-3 top-2.5" />
        <input
          type="text"
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          placeholder="Nach Schule, Schüler oder Rang suchen..."
          className="w-full bg-[#16120e] border border-[#3f3223] rounded pl-9 pr-3 py-2 text-xs text-[#e6decb] placeholder-[#7a6d5d] focus:outline-none focus:border-[#c9a86a] transition-colors font-sans-clean"
        />
      </div>

      {/* Leaderboard Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-sans-clean border-collapse">
          <thead>
            <tr className="border-b border-[#3d3226] text-[#9c8d7b] uppercase text-[10px] tracking-wider">
              <th className="py-2.5 px-3">Rang</th>
              <th className="py-2.5 px-3">Delegation / Schüler</th>
              <th className="py-2.5 px-3">Diplomaten-Ehrentitel</th>
              <th className="py-2.5 px-3 text-right">Punkte</th>
              <th className="py-2.5 px-3 text-right">Spielzeit</th>
              <th className="py-2.5 px-3 text-right">Datum</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#32271d]">
            {filteredEntries.map((entry, index) => {
              const actualRank = allEntries.indexOf(entry) + 1;
              const isCurrentUser = entry.isCurrentUser;

              let medalBadge = null;
              if (actualRank === 1) medalBadge = <span className="text-base">🥇</span>;
              else if (actualRank === 2) medalBadge = <span className="text-base">🥈</span>;
              else if (actualRank === 3) medalBadge = <span className="text-base">🥉</span>;

              return (
                <tr
                  key={entry.id}
                  className={`transition-colors ${
                    isCurrentUser
                      ? 'bg-[#3d2f1f] text-[#f7eedc] font-semibold border-l-4 border-l-[#d4af37]'
                      : 'hover:bg-[#282018]/50 text-[#cfc4b2]'
                  }`}
                >
                  <td className="py-3 px-3 font-mono font-bold whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      {medalBadge || <span className="text-[#8f806e]">#{actualRank}</span>}
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#f5ede0]">
                        {entry.name}
                      </span>
                      {isCurrentUser && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#c9a86a] text-[#1a1714]">
                          SIE
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#91816e] block">
                      {entry.schoolOrDelegation}
                    </span>
                  </td>

                  <td className="py-3 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium ${
                        entry.badge === 'platin'
                          ? 'bg-[#3b2a40] text-[#e3c7ed] border border-[#6d4378]'
                          : entry.badge === 'gold'
                          ? 'bg-[#3a2f1e] text-[#e8c88c] border border-[#7a5830]'
                          : entry.badge === 'silber'
                          ? 'bg-[#29323a] text-[#c0d4e3] border border-[#485b6b]'
                          : 'bg-[#33251e] text-[#d6aa96] border border-[#6b4535]'
                      }`}
                    >
                      {entry.rankTitle}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-right font-mono font-bold tabular-nums text-sm text-[#e6decb]">
                    {entry.score} <span className="text-[10px] text-[#8f806e]">Pkt</span>
                  </td>

                  <td className="py-3 px-3 text-right font-mono tabular-nums text-[#b8a994]">
                    {formatTime(entry.timeSeconds)}
                  </td>

                  <td className="py-3 px-3 text-right font-serif text-[11px] text-[#8f806e] whitespace-nowrap">
                    {entry.date}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
