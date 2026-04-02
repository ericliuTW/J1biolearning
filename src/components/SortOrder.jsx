import React, { useState, useMemo } from 'react';

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function SortOrder({ content, onComplete }) {
  const { items, instruction } = content;
  const shuffledItems = useMemo(() => shuffle(items), [items]);

  const [availableItems, setAvailableItems] = useState(shuffledItems);
  const [slots, setSlots] = useState(Array(items.length).fill(null));
  const [checked, setChecked] = useState(false);
  const [wrongPositions, setWrongPositions] = useState(new Set());
  const [completed, setCompleted] = useState(false);

  const handleItemClick = (item) => {
    if (checked) return;
    const firstEmptySlot = slots.indexOf(null);
    if (firstEmptySlot === -1) return;

    const newSlots = [...slots];
    newSlots[firstEmptySlot] = item;
    setSlots(newSlots);
    setAvailableItems((prev) => prev.filter((i) => i !== item));
    setWrongPositions(new Set());
  };

  const handleSlotClick = (index) => {
    if (checked || slots[index] === null) return;
    const item = slots[index];
    const newSlots = [...slots];
    newSlots[index] = null;
    setSlots(newSlots);
    setAvailableItems((prev) => [...prev, item]);
    setWrongPositions(new Set());
  };

  const handleCheck = () => {
    const wrong = new Set();
    slots.forEach((item, i) => {
      if (item !== items[i]) {
        wrong.add(i);
      }
    });

    if (wrong.size === 0) {
      setChecked(true);
      setCompleted(true);
      setTimeout(() => onComplete(), 800);
    } else {
      setWrongPositions(wrong);
      setChecked(false);
    }
  };

  const handleReset = () => {
    setSlots(Array(items.length).fill(null));
    setAvailableItems(shuffle(items));
    setChecked(false);
    setWrongPositions(new Set());
    setCompleted(false);
  };

  const allSlotsFilled = slots.every((s) => s !== null);

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto px-4 py-6">
      {/* Instruction */}
      <div className="w-full bg-teal-50 rounded-xl p-4 mb-6 border border-teal-200">
        <p className="text-lg text-teal-700 text-center font-medium">{instruction}</p>
      </div>

      {/* Slots */}
      <div className="w-full mb-6">
        <h3 className="text-sm font-semibold text-teal-500 uppercase tracking-wide mb-3 text-center">
          排列順序（點擊可移除）
        </h3>
        <div className="flex flex-col gap-2">
          {slots.map((item, i) => (
            <div
              key={i}
              onClick={() => handleSlotClick(i)}
              className={`
                flex items-center gap-3 w-full py-3 px-4 rounded-xl border-2
                transition-all duration-300 min-h-[52px]
                ${
                  completed
                    ? 'bg-emerald-100 border-emerald-400'
                    : wrongPositions.has(i)
                    ? 'bg-red-100 border-red-400 animate-shake'
                    : item
                    ? 'bg-white border-teal-300 cursor-pointer hover:bg-teal-50'
                    : 'bg-gray-50 border-dashed border-gray-300'
                }
              `}
            >
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  completed
                    ? 'bg-emerald-500 text-white'
                    : wrongPositions.has(i)
                    ? 'bg-red-500 text-white'
                    : 'bg-teal-500 text-white'
                }`}
              >
                {i + 1}
              </span>
              <span className="text-lg font-medium text-gray-700 flex-1">
                {item || ''}
              </span>
              {wrongPositions.has(i) && (
                <span className="text-red-500 text-sm font-medium">✗</span>
              )}
              {completed && (
                <span className="text-emerald-500">✓</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Available items */}
      {availableItems.length > 0 && (
        <div className="w-full mb-6">
          <h3 className="text-sm font-semibold text-emerald-500 uppercase tracking-wide mb-3 text-center">
            可選項目（依序點擊排列）
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {availableItems.map((item) => (
              <button
                key={item}
                onClick={() => handleItemClick(item)}
                className="py-2 px-4 bg-white border-2 border-emerald-200 rounded-xl text-lg font-medium text-gray-700 hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-200 active:scale-95"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3">
        {allSlotsFilled && !completed && (
          <button
            onClick={handleCheck}
            className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold text-lg rounded-full shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            確認順序
          </button>
        )}
        {(allSlotsFilled || wrongPositions.size > 0) && !completed && (
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-600 font-medium rounded-full transition-all duration-200"
          >
            重新排列
          </button>
        )}
      </div>

      {/* Success message */}
      {completed && (
        <div className="mt-4 text-center">
          <p className="text-2xl font-bold text-emerald-600">🎉 順序正確！</p>
        </div>
      )}

      {/* Wrong feedback */}
      {wrongPositions.size > 0 && !completed && (
        <p className="mt-4 text-lg text-red-500 font-medium text-center">
          有 {wrongPositions.size} 個位置不正確，再試試看！
        </p>
      )}

      {/* Shake animation style */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
