import React, { useState, useEffect } from 'react';
import { QuizQuestion, QuizOption } from '../types/escapeGame';
import { HelpCircle, CheckCircle2, XCircle, Award } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface QuizCardProps {
  questions: QuizQuestion[];
  slideId: number;
  slideIndex: number;
  // quizAnswers structure: questionIndex -> { answered, attempts, selectedOptionId }
  answersState: {
    [qIndex: number]: {
      answered: boolean;
      attempts: number;
      selectedOptionId: string | null;
    };
  };
  onAnswerQuestion: (qIndex: number, pointsAwarded: number, selectedId: string, isCorrect: boolean) => void;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  questions,
  slideId,
  slideIndex,
  answersState,
  onAnswerQuestion,
}) => {
  const [activeQuestionTab, setActiveQuestionTab] = useState<number>(0);
  const [feedbackMap, setFeedbackMap] = useState<Record<number, QuizOption | null>>({});

  // Reset tab and feedback whenever slide changes to prevent state leakage from previous level!
  useEffect(() => {
    setActiveQuestionTab(0);
    setFeedbackMap({});
  }, [slideId, slideIndex]);

  const currentQ = questions[activeQuestionTab] || questions[0];
  const qState = answersState[activeQuestionTab] || {
    answered: false,
    attempts: 0,
    selectedOptionId: null,
  };

  const handleSelectOption = (option: QuizOption) => {
    if (qState.answered) return;

    setFeedbackMap((prev) => ({
      ...prev,
      [activeQuestionTab]: option,
    }));

    if (option.isCorrect) {
      soundEffects.playSuccess();
      const points = qState.attempts === 0 ? 150 : 75;
      onAnswerQuestion(activeQuestionTab, points, option.id, true);
    } else {
      soundEffects.playError();
      onAnswerQuestion(activeQuestionTab, 0, option.id, false);
    }
  };

  const currentFeedback = feedbackMap[activeQuestionTab];

  return (
    <div className="bg-[#241e18] border border-[#44382c] rounded-lg p-5 text-[#dcd1be] shadow-lg space-y-4">
      {/* Header with 2 Question Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-[#3d3226]">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-[#c9a86a]" />
          <h3 className="font-sans-clean font-bold text-sm text-[#ebdcc2] uppercase tracking-wider">
            Diplomatisches Verständnis-Quiz (2 Fragen)
          </h3>
        </div>

        {/* Tab switchers between Question 1 and Question 2 */}
        <div className="flex items-center gap-1.5 p-0.5 bg-[#1a1511] border border-[#3b2e21] rounded">
          {questions.map((q, idx) => {
            const isQAnswered = answersState[idx]?.answered;
            return (
              <button
                key={idx}
                onClick={() => setActiveQuestionTab(idx)}
                className={`px-2.5 py-1 text-xs font-sans-clean font-semibold rounded transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeQuestionTab === idx
                    ? 'bg-[#c9a86a] text-[#1c1813] shadow'
                    : 'text-[#9c8d7b] hover:text-[#dcd1be]'
                }`}
              >
                <span>Frage {idx + 1}</span>
                {isQAnswered && <span className="text-[10px] text-emerald-800 font-bold">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Points indicator for active question */}
      <div className="flex items-center justify-between text-xs font-sans-clean text-[#a49680]">
        <span>Frage {activeQuestionTab + 1} von {questions.length}</span>
        <div className="flex items-center gap-1">
          <Award className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Möglich: </span>
          <span className="font-mono font-bold text-[#e6decb]">
            {qState.answered ? 'Gelöst' : qState.attempts === 0 ? '+150 Pkt' : '+75 Pkt'}
          </span>
        </div>
      </div>

      {/* Question Text */}
      <p className="font-book text-sm sm:text-base font-semibold leading-snug text-[#f3ebd9]">
        {currentQ.question}
      </p>

      {/* Options List */}
      <div className="space-y-2 pt-1">
        {currentQ.options.map((option) => {
          const isSelected = qState.selectedOptionId === option.id;
          let containerClasses =
            'border-[#3d3326] bg-[#1d1712] hover:bg-[#2c241c] hover:border-[#63523f] text-[#cfc4b2]';

          if (isSelected) {
            if (option.isCorrect) {
              containerClasses = 'border-[#437a54] bg-[#223828] text-[#d6ecd7]';
            } else {
              containerClasses = 'border-[#8f3636] bg-[#3a1d1d] text-[#f2cece]';
            }
          } else if (qState.answered && option.isCorrect) {
            containerClasses = 'border-[#437a54] bg-[#223828]/60 text-[#c2e2c4]';
          }

          return (
            <button
              key={`${slideId}-${currentQ.id}-${option.id}`}
              onClick={() => handleSelectOption(option)}
              disabled={qState.answered}
              className={`w-full text-left p-3 rounded border transition-all flex items-start gap-3 cursor-pointer disabled:cursor-default ${containerClasses}`}
            >
              <span className="w-6 h-6 rounded bg-[#2d241a] border border-[#483a2a] flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                {option.id}
              </span>
              <div className="flex-1 text-xs sm:text-sm font-sans-clean leading-relaxed">
                <span>{option.text}</span>
              </div>
              {isSelected && (
                <div className="shrink-0 mt-0.5">
                  {option.isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-[#68b97d]" />
                  ) : (
                    <XCircle className="w-4 h-4 text-[#e06c75]" />
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Didactic feedback */}
      {currentFeedback && (
        <div
          className={`p-3.5 rounded text-xs leading-relaxed font-sans-clean border animate-in fade-in duration-200 ${
            currentFeedback.isCorrect
              ? 'bg-[#1e2f22] border-[#386644] text-[#c9e7ce]'
              : 'bg-[#311b1b] border-[#6b2c2c] text-[#edd1d1]'
          }`}
        >
          <div className="font-bold mb-1 flex items-center gap-1.5">
            {currentFeedback.isCorrect ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-[#75c68b]" />
                <span>Korrekt analysiert!</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-[#e06c75]" />
                <span>Fehleinschätzung der Lage:</span>
              </>
            )}
          </div>
          <p>{currentFeedback.feedback}</p>
        </div>
      )}

      {/* Explanation once answered */}
      {qState.answered && (
        <div className="p-3 bg-[#191410] border border-[#3a2f23] rounded text-xs text-[#a99c89] font-book">
          <span className="font-bold text-[#c9a86a] block mb-1 font-sans-clean">
            Geschichtsdidaktische Auswertung:
          </span>
          <p className="leading-relaxed">{currentQ.explanation}</p>
        </div>
      )}

      {/* Next question navigation button if not at last question */}
      {activeQuestionTab < questions.length - 1 && (
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => setActiveQuestionTab(activeQuestionTab + 1)}
            className="text-xs text-[#c9a86a] hover:text-[#e8ce9d] font-sans-clean underline underline-offset-2 cursor-pointer"
          >
            Weiter zu Frage {activeQuestionTab + 2} →
          </button>
        </div>
      )}
    </div>
  );
};
