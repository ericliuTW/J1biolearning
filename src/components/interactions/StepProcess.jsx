import React, { useState } from 'react';

export default function StepProcess({ content, onComplete }) {
  const { title, steps } = content;
  const [currentStep, setCurrentStep] = useState(0);
  const [actionDone, setActionDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [showSummary, setShowSummary] = useState(false);

  const totalSteps = steps.length;
  const step = steps[currentStep];
  const isLastStep = currentStep === totalSteps - 1;

  const handleAction = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setActionDone(true);
      setCompletedSteps((prev) => new Set([...prev, currentStep]));
    }, 600);
  };

  const handleNext = () => {
    if (isLastStep) {
      setShowSummary(true);
    } else {
      setCurrentStep((prev) => prev + 1);
      setActionDone(false);
    }
  };

  if (showSummary) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <span className="text-6xl block mb-3">🎉</span>
          <h2 className="text-2xl font-bold text-teal-800 mb-2">實驗完成！</h2>
          <p className="text-lg text-teal-600">{title}</p>
        </div>

        <div className="space-y-3 mb-8">
          {steps.map((s, i) => (
            <div
              key={i}
              className="flex items-start gap-3 bg-white border border-emerald-200 rounded-xl p-4 shadow-sm"
            >
              <span className="w-8 h-8 flex-shrink-0 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                ✓
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{s.emoji}</span>
                  <span className="font-bold text-gray-800">{s.title}</span>
                </div>
                <p className="text-sm text-emerald-600 mt-1">{s.resultText}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={onComplete}
            className="px-10 py-3 bg-emerald-600 text-white text-lg font-bold rounded-xl
                       hover:bg-emerald-700 active:scale-95 transition-all duration-200 shadow-lg"
          >
            完成學習 🚀
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Title */}
      <h2 className="text-2xl font-bold text-teal-800 text-center mb-6">{title}</h2>

      {/* Step progress indicator */}
      <div className="flex items-center justify-center gap-1 mb-8 overflow-x-auto px-2">
        {steps.map((_, i) => {
          const isDone = completedSteps.has(i);
          const isCurrent = i === currentStep;
          return (
            <React.Fragment key={i}>
              <div
                className={`
                  flex-shrink-0 rounded-full flex items-center justify-center font-bold
                  transition-all duration-300
                  ${isCurrent
                    ? 'w-10 h-10 bg-teal-500 text-white text-lg shadow-lg ring-4 ring-teal-200'
                    : isDone
                      ? 'w-8 h-8 bg-emerald-500 text-white text-sm'
                      : 'w-8 h-8 bg-gray-200 text-gray-400 text-sm'
                  }
                `}
              >
                {isDone ? '✓' : i + 1}
              </div>
              {i < totalSteps - 1 && (
                <div
                  className={`flex-shrink-0 w-6 sm:w-10 h-1 rounded transition-colors duration-300 ${
                    isDone ? 'bg-emerald-400' : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Completed steps (collapsed notebook) */}
      {currentStep > 0 && (
        <div className="space-y-2 mb-4">
          {steps.slice(0, currentStep).map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2 text-sm"
            >
              <span className="text-emerald-600 font-bold">✓</span>
              <span className="text-xl">{s.emoji}</span>
              <span className="text-emerald-700 font-medium">{s.title}</span>
            </div>
          ))}
        </div>
      )}

      {/* Current step card */}
      <div className="bg-white border-2 border-teal-200 rounded-2xl p-6 shadow-lg animate-slide-up">
        {/* Emoji with bounce */}
        <div className="text-center mb-4">
          <span className="text-6xl inline-block animate-subtle-bounce">{step.emoji}</span>
        </div>

        {/* Step title */}
        <h3 className="text-xl font-bold text-teal-800 text-center mb-3">{step.title}</h3>

        {/* Description */}
        <p className="text-lg text-gray-700 leading-relaxed mb-4">{step.description}</p>

        {/* Visual indicator */}
        <div className="bg-teal-50 border border-teal-200 rounded-xl px-4 py-3 mb-6 text-center">
          <span className="text-lg font-mono text-teal-700">{step.visual}</span>
        </div>

        {/* Action / Result area */}
        {!actionDone ? (
          <button
            onClick={handleAction}
            disabled={loading}
            className={`
              w-full py-4 text-lg font-bold rounded-xl transition-all duration-300 shadow-md
              ${loading
                ? 'bg-teal-400 text-white cursor-wait'
                : 'bg-teal-600 text-white hover:bg-teal-700 active:scale-95 cursor-pointer'
              }
            `}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                處理中...
              </span>
            ) : (
              <span>🔬 {step.actionText}</span>
            )}
          </button>
        ) : (
          <div className="animate-result-flash">
            {/* Result */}
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-4 mb-4 flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">✅</span>
              <p className="text-lg text-emerald-700 font-medium">{step.resultText}</p>
            </div>

            {/* Next button */}
            <button
              onClick={handleNext}
              className="w-full py-4 bg-emerald-600 text-white text-lg font-bold rounded-xl
                         hover:bg-emerald-700 active:scale-95 transition-all duration-200 shadow-md cursor-pointer"
            >
              {isLastStep ? '查看實驗總結 📋' : '下一步 →'}
            </button>
          </div>
        )}
      </div>

      {/* Step counter */}
      <p className="text-center text-teal-500 mt-4 text-sm">
        步驟 {currentStep + 1} / {totalSteps}
      </p>

      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
        @keyframes subtle-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-subtle-bounce {
          animation: subtle-bounce 2s ease-in-out infinite;
        }
        @keyframes result-flash {
          0% { opacity: 0; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.02); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-result-flash {
          animation: result-flash 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
