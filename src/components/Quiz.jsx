import { useState } from 'react';

const prefixes = ['A', 'B', 'C', 'D'];

export default function Quiz({ quiz, onPass }) {
  const { question, options, correctIndex, explanation } = quiz;
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [disabledIndices, setDisabledIndices] = useState(new Set());

  const handleSelect = (index) => {
    if (selectedIndex !== null || disabledIndices.has(index)) return;

    setSelectedIndex(index);

    if (index === correctIndex) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
      setDisabledIndices((prev) => new Set(prev).add(index));
    }
  };

  const handleRetry = () => {
    setSelectedIndex(null);
    setIsCorrect(null);
  };

  const getOptionClasses = (index) => {
    const base =
      'w-full rounded-xl border-2 p-4 sm:p-5 text-left text-base sm:text-lg font-medium transition-all duration-300 ease-out flex items-center gap-3 min-h-[56px]';

    if (selectedIndex === index && isCorrect) {
      return `${base} border-emerald-500 bg-emerald-50 text-emerald-800 scale-[1.02] shadow-lg shadow-emerald-200`;
    }

    if (selectedIndex === index && !isCorrect) {
      return `${base} border-red-400 bg-red-50 text-red-700 animate-shake`;
    }

    if (disabledIndices.has(index)) {
      return `${base} border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed opacity-60`;
    }

    if (selectedIndex !== null) {
      return `${base} border-gray-200 bg-white text-gray-700 cursor-default`;
    }

    return `${base} border-gray-200 bg-white text-gray-800 hover:border-teal-400 hover:bg-teal-50 hover:shadow-md cursor-pointer active:scale-[0.98]`;
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6">
      {/* Question */}
      <h2 className="mb-8 text-xl font-bold leading-relaxed text-gray-900 sm:text-2xl">
        {question}
      </h2>

      {/* Options */}
      <div className="flex flex-col gap-3 sm:gap-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            disabled={disabledIndices.has(index) || selectedIndex !== null}
            className={getOptionClasses(index)}
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                selectedIndex === index && isCorrect
                  ? 'bg-emerald-500 text-white'
                  : selectedIndex === index && !isCorrect
                    ? 'bg-red-400 text-white'
                    : disabledIndices.has(index)
                      ? 'bg-gray-300 text-gray-500'
                      : 'bg-gray-100 text-gray-600'
              }`}
            >
              {prefixes[index]}
            </span>
            <span>{option}</span>
          </button>
        ))}
      </div>

      {/* Feedback */}
      {selectedIndex !== null && (
        <div
          className={`mt-6 animate-fadeIn rounded-xl p-5 ${
            isCorrect
              ? 'border border-emerald-200 bg-emerald-50'
              : 'border border-red-200 bg-red-50'
          }`}
        >
          {isCorrect ? (
            <div className="text-center">
              <p className="mb-4 text-2xl font-bold text-emerald-700">
                答對了！🎉
              </p>
              <button
                onClick={onPass}
                className="rounded-xl bg-emerald-500 px-8 py-3 text-lg font-semibold text-white shadow-md transition-all hover:bg-emerald-600 hover:shadow-lg active:scale-95"
              >
                繼續
              </button>
            </div>
          ) : (
            <div>
              <p className="mb-2 font-semibold text-red-700">
                不太對喔，看看提示：
              </p>
              <p className="mb-4 leading-relaxed text-red-600">
                {explanation}
              </p>
              <button
                onClick={handleRetry}
                className="rounded-xl bg-red-400 px-8 py-3 text-lg font-semibold text-white shadow-md transition-all hover:bg-red-500 hover:shadow-lg active:scale-95"
              >
                再試一次
              </button>
            </div>
          )}
        </div>
      )}

      {/* Inline keyframes for shake and fadeIn */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.35s ease-out;
        }
      `}</style>
    </div>
  );
}
