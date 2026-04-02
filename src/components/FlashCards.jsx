import React, { useState } from 'react';

export default function FlashCards({ content, onComplete }) {
  const { cards } = content;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flippedCards, setFlippedCards] = useState(new Set());

  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true);
      setFlippedCards((prev) => new Set(prev).add(currentIndex));
    }
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= cards.length) {
      onComplete();
    } else {
      setCurrentIndex(nextIndex);
      setIsFlipped(false);
    }
  };

  const card = cards[currentIndex];
  const isLastCard = currentIndex === cards.length - 1;

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto px-4 py-6">
      {/* Card counter */}
      <div className="mb-4 text-teal-600 font-semibold text-lg">
        {currentIndex + 1}/{cards.length}
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mb-6">
        {cards.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              i === currentIndex
                ? 'bg-teal-500 scale-125'
                : flippedCards.has(i)
                ? 'bg-emerald-400'
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Flip card */}
      <div
        className={`flip-card w-full aspect-[3/2] cursor-pointer ${isFlipped ? 'flipped' : ''}`}
        onClick={handleFlip}
      >
        <div className="flip-card-inner">
          <div className="flip-card-front bg-gradient-to-br from-teal-400 to-emerald-500 rounded-2xl shadow-lg flex flex-col items-center justify-center p-6 text-white">
            <p className="text-sm uppercase tracking-wide mb-3 opacity-80">
              點擊翻轉卡片
            </p>
            <p className="text-xl sm:text-2xl font-bold text-center leading-relaxed">
              {card.front}
            </p>
          </div>
          <div className="flip-card-back bg-gradient-to-br from-emerald-50 to-teal-100 rounded-2xl shadow-lg flex flex-col items-center justify-center p-6 border-2 border-emerald-300">
            <p className="text-sm uppercase tracking-wide mb-3 text-teal-500">
              答案
            </p>
            <p className="text-xl sm:text-2xl font-bold text-center text-teal-800 leading-relaxed">
              {card.back}
            </p>
          </div>
        </div>
      </div>

      {/* Next button */}
      {isFlipped && (
        <button
          onClick={handleNext}
          className="mt-6 px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold text-lg rounded-full shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          {isLastCard ? '完成！' : '下一張'}
        </button>
      )}
    </div>
  );
}
