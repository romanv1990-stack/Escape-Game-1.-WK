import React, { useState } from 'react';
import { HISTORICAL_CHRONOLOGY } from '../data/julikriseData';
import { Clock, ChevronLeft, ChevronRight, Sparkles, Calendar, BookOpen, AlertCircle } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface TimelineEventExtended {
  date: string;
  dayNumber: number; // For relative spacing on time axis
  title: string;
  nation: string;
  flag: string;
  alliance: 'Mittelmächte' | 'Entente' | 'Krisenherd';
  desc: string;
  keyDocExcerpt: string;
  didacticTakeaway: string;
}

const EXTENDED_TIMELINE_EVENTS: TimelineEventExtended[] = [
  {
    date: '28. Juni 1914',
    dayNumber: 0,
    title: 'Attentat von Sarajevo',
    nation: 'Österreich-Ungarn / Bosnien',
    flag: '🦅',
    alliance: 'Krisenherd',
    desc: 'Erzherzog Franz Ferdinand und seine Gemahlin Sophie werden vom serbischen Nationalisten Gavrilo Princip erschossen.',
    keyDocExcerpt: '„Zwei Schüsse in Sarajevo entzünden die Lunte am europäischen Pulverfass.“',
    didacticTakeaway: 'Wien suchte seit Jahren nach einem Vorwand, Serbien zu schwächen. Das Attentat bot die ersehnte moralische Legitimation.',
  },
  {
    date: '05. Juli 1914',
    dayNumber: 7,
    title: 'Der deutsche „Blankoscheck“',
    nation: 'Deutsches Kaiserreich',
    flag: '⚔️',
    alliance: 'Mittelmächte',
    desc: 'Kaiser Wilhelm II. verspricht Österreich-Ungarn in Potsdam bedingungslose militärische Bündnistreue.',
    keyDocExcerpt: '„Kaiser Franz Joseph könne sich darauf verlassen, dass Deutschland treu an seiner Seite stehen werde – selbst im Falle eines europäischen Krieges.“',
    didacticTakeaway: 'Der Blankoscheck entfesselte Wiens Kriegspartei. Berlin rechnete fahrlässig mit einer Lokalisierung des Konflikts.',
  },
  {
    date: '23. Juli 1914',
    dayNumber: 25,
    title: 'Das 48-Stunden-Ultimatum an Serbien',
    nation: 'Österreich-Ungarn',
    flag: '🦅',
    alliance: 'Mittelmächte',
    desc: 'Wien überreicht in Belgrad ein unannehmbares 48-Stunden-Ultimatum mit Eingriffen in die serbische Justiz.',
    keyDocExcerpt: '„Die Frist zur vorbehaltlosen Annahme läuft binnen achtundvierzig Stunden ab – bis Samstag 18 Uhr!“',
    didacticTakeaway: 'Absichtlich so formuliert, dass Serbien ablehnen musste. Der britische Außenminister Grey nannte es das schärfste Dokument der Diplomatiegeschichte.',
  },
  {
    date: '28. Juli 1914',
    dayNumber: 30,
    title: 'Kriegserklärung an Serbien & Beschuss Belgrads',
    nation: 'Österreich-Ungarn',
    flag: '🦅',
    alliance: 'Mittelmächte',
    desc: 'Trotz weitgehender serbischer Nachgiebigkeit erklärt Österreich-Ungarn den Krieg; Kanonenboote eröffnen das Feuer auf Belgrad.',
    keyDocExcerpt: '„Die k.u.k. Regierung sieht sich von nun an im Kriegszustand mit Serbien.“',
    didacticTakeaway: 'Der erste militärische Schritt war getan. Nun konnte Russland unmöglich mehr tatenlos zusehen.',
  },
  {
    date: '30. Juli 1914',
    dayNumber: 32,
    title: 'Russische Gesamtmobilmachung',
    nation: 'Russisches Kaiserreich',
    flag: '☦️',
    alliance: 'Entente',
    desc: 'Zar Nikolaus II. unterzeichnet unter extremem Druck seiner Generäle den Mobilmachungsbefehl für die gesamte russische Armee.',
    keyDocExcerpt: '„Ich sehe Mich gezwungen, militärische Maßnahmen zu ergreifen, um das slawische Brudervolk zu schützen.“',
    didacticTakeaway: 'Der logistische Wendepunkt: Durch die starren Eisenbahnfahrpläne diktierte nun das Militär den Staatsmännern die Zeit.',
  },
  {
    date: '01. August 1914',
    dayNumber: 34,
    title: 'Deutsche Kriegserklärung an Russland & Französische Mobilmachung',
    nation: 'Deutsches Reich & Frankreich',
    flag: '⚔️',
    alliance: 'Mittelmächte',
    desc: 'Nach Verstreichen des deutschen Ultimatums an Russland mobilisiert Deutschland und erklärt St. Petersburg den Krieg; Frankreich ordnet die Generalmobilmachung an.',
    keyDocExcerpt: '„Frankreich weicht 10 km zurück – doch wenn Deutschland angreift, schlägt die Stunde der Bündnistreue!“',
    didacticTakeaway: 'Der Zweifrontenkrieg wird Realität. Der deutsche Schlieffen-Plan läuft unwiderruflich an.',
  },
  {
    date: '03. August 1914',
    dayNumber: 36,
    title: 'Kriegserklärung an Frankreich & Einmarsch in Belgien',
    nation: 'Deutsches Reich / Belgien',
    flag: '⚔️',
    alliance: 'Mittelmächte',
    desc: 'Deutsche Truppen überqueren völkerrechtswidrig die Grenze des neutralen Belgien, um die französischen Festungen zu umgehen.',
    keyDocExcerpt: '„Not kennt kein Gebot! Unsere Truppen müssen sich den Durchmarsch durch Belgien erzwingen.“',
    didacticTakeaway: 'Der deutsche Völkerrechtsbruch zerstört jede Chance auf eine britische Neutralität.',
  },
  {
    date: '04. August 1914',
    dayNumber: 37,
    title: 'Britisches Ultimatum & Der Weltkrieg beginnt',
    nation: 'Britisches Empire',
    flag: '🦁',
    alliance: 'Entente',
    desc: 'Nach Ablauf des Ultimatums an Berlin zum Schutz der belgischen Neutralität tritt Großbritannien um Mitternacht in den Krieg ein.',
    keyDocExcerpt: '„Die Lampen gehen in ganz Europa aus; wir werden sie in unserem Leben nicht mehr brennen sehen.“',
    didacticTakeaway: 'Die Kettenreaktion der Bündnisse hat gesiegt. Aus dem Balkanstreit ist der Erste Weltkrieg geworden.',
  },
];

export const InteractiveTimeline: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const currentEvent = EXTENDED_TIMELINE_EVENTS[selectedIndex];

  const handleSelect = (idx: number) => {
    soundEffects.playTelegraph();
    setSelectedIndex(idx);
  };

  const handlePrev = () => {
    if (selectedIndex > 0) {
      handleSelect(selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex < EXTENDED_TIMELINE_EVENTS.length - 1) {
      handleSelect(selectedIndex + 1);
    }
  };

  return (
    <div className="bg-[#1a1410] border-2 border-[#3d2f22] rounded-lg p-5 sm:p-7 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#362a1e]">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#c9a86a]" />
          <div>
            <h3 className="font-display font-bold text-lg text-[#ebdcc2] uppercase tracking-wide">
              Interaktive Chronologie der Julikrise 1914
            </h3>
            <p className="text-xs text-[#9c8b78] font-sans-clean">
              37 Tage vom Attentat von Sarajevo bis zum Ausbruch des Weltkriegs
            </p>
          </div>
        </div>

        {/* Prev / Next controls */}
        <div className="flex items-center gap-2 font-sans-clean text-xs">
          <button
            onClick={handlePrev}
            disabled={selectedIndex === 0}
            className="p-1.5 rounded bg-[#251e18] hover:bg-[#332820] text-[#c9a86a] disabled:text-[#554737] disabled:cursor-not-allowed border border-[#3f3123] transition-colors cursor-pointer"
            title="Vorheriges Ereignis"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-mono text-[#e6decb] tabular-nums px-2">
            {selectedIndex + 1} / {EXTENDED_TIMELINE_EVENTS.length}
          </span>
          <button
            onClick={handleNext}
            disabled={selectedIndex === EXTENDED_TIMELINE_EVENTS.length - 1}
            className="p-1.5 rounded bg-[#251e18] hover:bg-[#332820] text-[#c9a86a] disabled:text-[#554737] disabled:cursor-not-allowed border border-[#3f3123] transition-colors cursor-pointer"
            title="Nächstes Ereignis"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Interactive Timeline Axis */}
      <div className="relative pt-6 pb-4 overflow-x-auto">
        {/* Connecting Axis Bar */}
        <div className="absolute top-10 left-4 right-4 h-1 bg-[#3a2d21] rounded" />

        {/* Milestone Nodes */}
        <div className="relative flex items-center justify-between min-w-[620px] px-4">
          {EXTENDED_TIMELINE_EVENTS.map((event, idx) => {
            const isSelected = selectedIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className="group flex flex-col items-center focus:outline-none cursor-pointer"
              >
                {/* Node Dot / Marker */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-md ${
                    isSelected
                      ? 'bg-[#c9a86a] text-[#1c1813] ring-4 ring-[#c9a86a]/30 scale-125 z-10'
                      : 'bg-[#282017] text-[#9c8d7b] hover:bg-[#382d21] hover:text-[#dcd1be] border-2 border-[#4a3928]'
                  }`}
                >
                  <span>{event.flag}</span>
                </div>

                {/* Date Label beneath */}
                <span
                  className={`mt-2 text-[10px] font-mono whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'text-[#f5ede0] font-bold'
                      : 'text-[#7d6f5f] group-hover:text-[#a89783]'
                  }`}
                >
                  {event.date.split(' ')[0]} {event.date.split(' ')[1].slice(0, 3)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Event Inspection Card */}
      <div className="paper-texture p-6 rounded-lg border-2 border-[#cfbe9f] text-[#2c2014] shadow-xl space-y-4 animate-in fade-in duration-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#cfbe9f] pb-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-typewriter text-[#705e4a]">
              <Calendar className="w-3.5 h-3.5 text-[#916b3f]" />
              <span className="font-bold text-[#1f170f]">{currentEvent.date}</span>
              <span>·</span>
              <span>Schauplatz: {currentEvent.nation}</span>
            </div>
            <h4 className="font-display font-bold text-lg sm:text-xl text-[#1c150d] mt-0.5">
              {currentEvent.title}
            </h4>
          </div>

          <span className="text-[10px] font-sans-clean font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#e2d5bd] text-[#554330] border border-[#cfbe9f]">
            {currentEvent.alliance}
          </span>
        </div>

        {/* Narrative Description */}
        <p className="font-book text-sm sm:text-base leading-relaxed text-[#362a1c]">
          {currentEvent.desc}
        </p>

        {/* Historical Document Quote Box */}
        <div className="bg-[#fbf9f4] p-3.5 rounded border-l-4 border-[#852c2c] text-xs sm:text-sm font-typewriter text-[#241c13] shadow-inner">
          <span className="text-[10px] uppercase font-sans-clean font-bold text-[#802525] block mb-1">
            Historisches Zitat / Depeschenauszug:
          </span>
          <p className="italic">{currentEvent.keyDocExcerpt}</p>
        </div>

        {/* Didactic Analysis */}
        <div className="bg-[#ede2ca] p-3 rounded text-xs font-sans-clean text-[#4a3a29] flex items-start gap-2 border border-[#d9c7a9]">
          <BookOpen className="w-4 h-4 text-[#8a6838] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-[#2a2015] block mb-0.5">
              Geschichtsdidaktische Bedeutung für die Kettenreaktion:
            </span>
            <p className="leading-relaxed">{currentEvent.didacticTakeaway}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
