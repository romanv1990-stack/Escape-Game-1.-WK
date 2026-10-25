import React, { useState } from 'react';
import { X, BookOpen, Search } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface HistoricalGlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GLOSSARY_TERMS = [
  {
    term: 'Der Blankoscheck',
    date: '5. Juli 1914',
    definition:
      'Die Zusicherung Kaiser Wilhelms II. und des Reichskanzlers an Österreich-Ungarn, im Konflikt mit Serbien bedingungslose Bündnistreue zu wahren – selbst wenn daraus ein Krieg mit Russland entstünde. Wien erhielt damit de facto freie Hand für den Angriff auf Serbien.',
  },
  {
    term: 'Der Schlieffen-Plan',
    date: 'Entwickelt 1905 von Graf Alfred von Schlieffen',
    definition:
      'Der deutsche strategische Aufmarschplan zur Vermeidung eines langwierigen Zweifrontenkriegs: Er sah vor, die Masse des Heeres durch das neutrale Belgien zu werfen, um Frankreich in maximal sechs Wochen einzukreisen und zu besiegen, bevor die russische Armee voll mobilisiert war.',
  },
  {
    term: 'Entente Cordiale & Triple Entente',
    date: '1904 bzw. 1907',
    definition:
      'Das Bündnissystem zwischen Großbritannien und Frankreich (1904) sowie die Erweiterung um Russland (1907). Ursprünglich zur Beilegung kolonialer Konflikte gedacht, entwickelte sich die Entente zum defensiven Gegenpol zum deutsch-österreichischen Zweibund.',
  },
  {
    term: 'Panslawismus',
    date: '19. & frühes 20. Jahrhundert',
    definition:
      'Eine politische und kulturelle Strömung, die die Einheit aller slawischen Völker anstrebte. Das zaristische Russland verstand sich als natürliche Schutzmacht der slawischen Balkanvölker (insbesondere Serbiens) gegen osmanische und österreichisch-ungarische Vorherrschaft.',
  },
  {
    term: 'Belgische Neutralität & Vertrag von 1839',
    date: 'Londoner Vertrag von 1839',
    definition:
      'Völkerrechtlicher Vertrag, in dem alle europäischen Großmächte (darunter Preußen und Großbritannien) die ewige Neutralität und Unverletzlichkeit Belgiens garantierten. Der deutsche Bruch 1914 führte zum sofortigen britischen Kriegseintritt.',
  },
  {
    term: 'Kettenreaktion der Mobilmachungen',
    date: 'Ende Juli bis Anfang August 1914',
    definition:
      'Der fatale Automatismus der Militärplanungen: Da moderne Massenheere Wochen für den Eisenbahntransport an die Front benötigten, bedeutete jede feindliche Mobilmachung eine tödliche Bedrohung. Niemand wagte es, die eigene Mobilmachung aufzuhalten, was die Diplomatie handlungsunfähig machte.',
  },
  {
    term: 'Zweibund & Dreibund',
    date: '1879 / 1882',
    definition:
      'Verteidigungsbündnis zwischen dem Deutschen Reich und Österreich-Ungarn (1879), später erweitert um Italien zum Dreibund (1882). Italien blieb 1914 jedoch neutral mit dem Verweis darauf, dass Wien der Angreifer sei.',
  },
];

export const HistoricalGlossaryModal: React.FC<HistoricalGlossaryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredTerms = GLOSSARY_TERMS.filter(
    (t) =>
      t.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.definition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#1f1a14] border-2 border-[#52412e] rounded-lg max-w-2xl w-full p-6 text-[#dcd1be] shadow-2xl space-y-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#3e3224] shrink-0">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#d4af37]" />
            <div>
              <h3 className="font-display font-bold text-base text-[#e6decb]">
                Diplomatisches Handbuch & Glossar
              </h3>
              <p className="text-[11px] text-[#9c8d7b] font-sans-clean">
                Historische Schlüsselbegriffe der Julikrise 1914
              </p>
            </div>
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

        {/* Search bar */}
        <div className="relative shrink-0">
          <Search className="w-4 h-4 text-[#8a7b6a] absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Begriff oder Definition durchsuchen..."
            className="w-full bg-[#16120e] border border-[#3f3223] rounded pl-9 pr-3 py-2 text-xs text-[#e6decb] placeholder-[#7a6d5d] focus:outline-none focus:border-[#c9a86a] transition-colors"
          />
        </div>

        {/* Term List */}
        <div className="overflow-y-auto space-y-3 pr-1 text-xs font-sans-clean flex-1">
          {filteredTerms.length > 0 ? (
            filteredTerms.map((item) => (
              <div
                key={item.term}
                className="p-3.5 bg-[#251f18] border border-[#423425] rounded space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-[#e1d5c2] font-display text-sm tracking-wide">
                    {item.term}
                  </h4>
                  <span className="text-[10px] text-[#c9a86a] font-mono shrink-0">
                    {item.date}
                  </span>
                </div>
                <p className="text-[#bfb29f] font-book leading-relaxed text-xs">
                  {item.definition}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-[#8c7d6c]">
              Kein Glossareintrag zu dieser Suchanfrage gefunden.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-[#382c1f] flex justify-end shrink-0">
          <button
            onClick={() => {
              soundEffects.playRustle();
              onClose();
            }}
            className="px-4 py-1.5 rounded bg-[#c9a86a] hover:bg-[#dbbd82] text-[#1c1813] font-bold text-xs transition-colors"
          >
            Zurück zu den Depeschen
          </button>
        </div>
      </div>
    </div>
  );
};
