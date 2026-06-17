import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { QuizQuestion } from '../types/training';

interface QuizProps {
  questions: QuizQuestion[];
}

const Quiz = ({ questions }: QuizProps) => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const score = useMemo(
    () =>
      questions.reduce((total, question) => {
        return answers[question.id] === question.correctAnswer ? total + 1 : total;
      }, 0),
    [answers, questions],
  );

  const canSubmit = questions.every((question) => answers[question.id] !== undefined);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-950">Проверка знаний</h2>
          <p className="mt-1 text-sm text-slate-600">Ответьте на вопросы модуля.</p>
        </div>
        {isSubmitted && (
          <span className="rounded-full bg-brand-50 px-4 py-2 text-sm font-bold text-brand-700">
            {score} из {questions.length}
          </span>
        )}
      </div>

      <div className="mt-6 space-y-6">
        {questions.map((question, questionIndex) => (
          <fieldset key={question.id} className="space-y-3">
            <legend className="font-semibold text-slate-900">
              {questionIndex + 1}. {question.question}
            </legend>
            <div className="grid gap-2">
              {question.options.map((option, optionIndex) => {
                const isSelected = answers[question.id] === optionIndex;
                const isCorrect = question.correctAnswer === optionIndex;
                const showCorrect = isSubmitted && isCorrect;
                const showWrong = isSubmitted && isSelected && !isCorrect;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      if (!isSubmitted) {
                        setAnswers((current) => ({ ...current, [question.id]: optionIndex }));
                      }
                    }}
                    className={`focus-ring flex items-center justify-between rounded-lg border px-4 py-3 text-left text-sm transition ${
                      showCorrect
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                        : showWrong
                          ? 'border-red-300 bg-red-50 text-red-800'
                          : isSelected
                            ? 'border-brand-300 bg-brand-50 text-brand-800'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-brand-200'
                    }`}
                  >
                    {option}
                    {showCorrect && <CheckCircle2 className="h-5 w-5" />}
                    {showWrong && <XCircle className="h-5 w-5" />}
                  </button>
                );
              })}
            </div>
            {isSubmitted && <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">{question.explanation}</p>}
          </fieldset>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {!isSubmitted ? (
          <button
            type="button"
            disabled={!canSubmit}
            onClick={() => setIsSubmitted(true)}
            className="focus-ring rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Завершить тест
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setAnswers({});
              setIsSubmitted(false);
            }}
            className="focus-ring inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <RotateCcw className="h-4 w-4" />
            Пройти заново
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
