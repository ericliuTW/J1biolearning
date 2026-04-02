import React, { useState } from 'react';

export default function TrueFalse({ content, onComplete }) {
  const { statements } = content;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const statement = statements[currentIndex];

  const handleAnswer = (userAnswer) => {
    if (answered) return;
    const correct = userAnswer === statement.isTrue;
    setIsCorrect(correct);
    setAnswered(true);
    if (correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= statements.length) {
      setFinished(true);
      onComplete();
    } else {
      setCurrentIndex(nextIndex);
      setAnswered(false);
      setIsCorrect(false);
    }
  };

  if (finished) {
    const percentage = Math.round((score / statements.length) * 100);
    return (
      <div className="flex flex-col items-center w-full max-w-lg mx-auto px-4 py-8">
        <div className="text-6xl mb-4">
          {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪'}
        </div>
        <h2 className="text-2xl font-bold text-teal-700 mb-2">測驗完成！</h2>
        <p className="text-xl text-teal-600">
          你答對了 <span className="font-bold text-emerald-500">{score}</span> / {statements.length} 題
        </p>
        <div className="mt-4 w-full bg-gray-200 rounded-full h-4">
          <div
            className="h-4 rounded-full transition-all duration-1000 bg-gradient-to-r from-teal-400 to-emerald-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="mt-2 text-lg text-teal-500 font-semibold">{percentage}%</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto px-4 py-6">
      {/* Progress */}
      <div className="w-full flex items-center justify-between mb-4">
        <span className="text-teal-600 font-semibold text-lg">
          第 {currentIndex + 1} / {statements.length} 題
        </span>
        <span className="text-emerald-500 font-semibold">
          得分：{score}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 transition-all duration-500"
          style={{ width: `${((currentIndex) / statements.length) * 100}%` }}
        />
      </div>

      {/* Statement */}
      <div className="w-full bg-white rounded-2xl shadow-md p-6 mb-6 border-2 border-teal-100">
        <p className="text-xl sm:text-2xl text-gray-800 text-center leading-relaxed font-medium">
          {statement.text}
        </p>
      </div>

      {/* Answer buttons */}
      {!answered && (
        <div className="flex gap-4 w-full">
          <button
            onClick={() => handleAnswer(true)}
            className="flex-1 py-4 bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-300 rounded-xl text-xl font-bold text-emerald-600 transition-all duration-200 active:scale-95"
          >
            ⭕ 正確
          </button>
          <button
            onClick={() => handleAnswer(false)}
            className="flex-1 py-4 bg-red-50 hover:bg-red-100 border-2 border-red-300 rounded-xl text-xl font-bold text-red-500 transition-all duration-200 active:scale-95"
          >
            ❌ 錯誤
          </button>
        </div>
      )}

      {/* Feedback */}
      {answered && (
        <div
          className={`w-full rounded-2xl p-5 mb-4 border-2 transition-all duration-300 ${
            isCorrect
              ? 'bg-emerald-50 border-emerald-300'
              : 'bg-red-50 border-red-300'
          }`}
        >
          <p
            className={`text-xl font-bold mb-2 ${
              isCorrect ? 'text-emerald-600' : 'text-red-500'
            }`}
          >
            {isCorrect ? '🎉 答對了！' : '😅 答錯了！'}
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            {statement.explanation}
          </p>
        </div>
      )}

      {/* Next button */}
      {answered && (
        <button
          onClick={handleNext}
          className="mt-2 px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold text-lg rounded-full shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          {currentIndex === statements.length - 1 ? '查看結果' : '下一題'}
        </button>
      )}
    </div>
  );
}
