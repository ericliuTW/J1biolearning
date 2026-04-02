import React, { useState } from 'react';

export default function FillBlank({ content, onComplete }) {
  const { sentences } = content;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [shakingOption, setShakingOption] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const sentence = sentences[currentIndex];

  const handleOptionClick = (option) => {
    if (answered) return;

    if (option === sentence.blank) {
      setSelectedOption(option);
      setAnswered(true);
      setScore((prev) => prev + 1);
    } else {
      setShakingOption(option);
      setTimeout(() => setShakingOption(null), 600);
    }
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= sentences.length) {
      setFinished(true);
      onComplete();
    } else {
      setCurrentIndex(nextIndex);
      setAnswered(false);
      setSelectedOption(null);
      setShakingOption(null);
    }
  };

  const renderSentence = () => {
    const parts = sentence.text.split('___');
    return (
      <p className="text-xl sm:text-2xl text-gray-800 leading-relaxed text-center">
        {parts.map((part, i) => (
          <React.Fragment key={i}>
            {part}
            {i < parts.length - 1 && (
              <span
                className={`inline-block min-w-[80px] px-3 py-1 mx-1 rounded-lg font-bold text-center transition-all duration-300 ${
                  answered
                    ? 'bg-emerald-200 text-emerald-800 border-2 border-emerald-400'
                    : 'bg-teal-100 text-teal-400 border-2 border-teal-300 border-dashed'
                }`}
              >
                {answered ? selectedOption : '？'}
              </span>
            )}
          </React.Fragment>
        ))}
      </p>
    );
  };

  if (finished) {
    const percentage = Math.round((score / sentences.length) * 100);
    return (
      <div className="flex flex-col items-center w-full max-w-lg mx-auto px-4 py-8">
        <div className="text-6xl mb-4">
          {percentage >= 80 ? '🌟' : percentage >= 60 ? '👏' : '💪'}
        </div>
        <h2 className="text-2xl font-bold text-teal-700 mb-2">填空完成！</h2>
        <p className="text-xl text-teal-600">
          答對 <span className="font-bold text-emerald-500">{score}</span> / {sentences.length} 題
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto px-4 py-6">
      {/* Progress */}
      <div className="w-full flex items-center justify-between mb-4">
        <span className="text-teal-600 font-semibold text-lg">
          第 {currentIndex + 1} / {sentences.length} 題
        </span>
        <span className="text-emerald-500 font-semibold">
          得分：{score}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 transition-all duration-500"
          style={{ width: `${(currentIndex / sentences.length) * 100}%` }}
        />
      </div>

      {/* Sentence with blank */}
      <div className="w-full bg-white rounded-2xl shadow-md p-6 mb-6 border-2 border-teal-100">
        {renderSentence()}
      </div>

      {/* Options */}
      {!answered && (
        <div className="w-full grid grid-cols-2 gap-3">
          {sentence.options.map((option) => (
            <button
              key={option}
              onClick={() => handleOptionClick(option)}
              className={`
                py-3 px-4 rounded-xl text-lg font-medium text-center
                transition-all duration-200 border-2
                ${
                  shakingOption === option
                    ? 'bg-red-100 border-red-400 text-red-600 animate-shake'
                    : 'bg-white border-teal-200 text-gray-700 hover:border-teal-400 hover:bg-teal-50 active:scale-95'
                }
              `}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {/* Success feedback */}
      {answered && (
        <div className="w-full bg-emerald-50 rounded-xl p-4 border-2 border-emerald-300 text-center mb-4">
          <p className="text-xl font-bold text-emerald-600">✨ 正確！</p>
        </div>
      )}

      {/* Next button */}
      {answered && (
        <button
          onClick={handleNext}
          className="mt-2 px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold text-lg rounded-full shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          {currentIndex === sentences.length - 1 ? '查看結果' : '下一題'}
        </button>
      )}

      {/* Shake animation style */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
