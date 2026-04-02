import React, { useState } from 'react';

export default function StepAnimation({ content, onComplete }) {
  const { steps, title } = content;
  const [revealedCount, setRevealedCount] = useState(1);
  const [completed, setCompleted] = useState(false);

  const handleNext = () => {
    const next = revealedCount + 1;
    if (next > steps.length) {
      setCompleted(true);
      onComplete();
    } else {
      setRevealedCount(next);
    }
  };

  const allRevealed = revealedCount >= steps.length;

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto px-4 py-6">
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-teal-700 mb-2 text-center">
        {title}
      </h2>

      {/* Progress */}
      <div className="text-teal-500 font-semibold mb-4">
        步驟 {Math.min(revealedCount, steps.length)} / {steps.length}
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 transition-all duration-700"
          style={{ width: `${(revealedCount / steps.length) * 100}%` }}
        />
      </div>

      {/* Steps */}
      <div className="w-full flex flex-col gap-4 mb-6">
        {steps.map((step, i) => {
          if (i >= revealedCount) return null;
          const isCurrent = i === revealedCount - 1;

          return (
            <div
              key={i}
              className={`
                w-full rounded-2xl p-5 border-2 transition-all duration-500
                ${
                  isCurrent
                    ? 'bg-white border-teal-400 shadow-lg scale-100 animate-fadeSlideIn'
                    : 'bg-gray-50 border-gray-200 opacity-60 scale-[0.98]'
                }
              `}
            >
              <div className="flex items-start gap-4">
                {/* Step number + emoji */}
                <div className="flex flex-col items-center shrink-0">
                  <span className="text-3xl sm:text-4xl mb-1">{step.emoji}</span>
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      isCurrent
                        ? 'bg-teal-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {i + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3
                    className={`text-lg font-bold mb-1 ${
                      isCurrent ? 'text-teal-700' : 'text-gray-500'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-base leading-relaxed ${
                      isCurrent ? 'text-gray-700' : 'text-gray-400'
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connector line */}
              {i < revealedCount - 1 && (
                <div className="flex justify-center mt-2">
                  <div className="w-0.5 h-4 bg-gray-300" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Next / Complete button */}
      {!completed && (
        <button
          onClick={handleNext}
          className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold text-lg rounded-full shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          {allRevealed ? '完成！' : '下一步'}
        </button>
      )}

      {/* Completed message */}
      {completed && (
        <div className="text-center mt-2">
          <p className="text-2xl font-bold text-emerald-600">🎉 全部步驟完成！</p>
        </div>
      )}

      {/* Animation styles */}
      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeSlideIn {
          animation: fadeSlideIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
