import React, { useState, useMemo } from 'react';

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function DragMatch({ content, onComplete }) {
  const { pairs, instruction } = content;

  const shuffledItems = useMemo(() => shuffle(pairs.map((p) => p.item)), [pairs]);
  const shuffledTargets = useMemo(() => shuffle(pairs.map((p) => p.target)), [pairs]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [matches, setMatches] = useState({}); // { item: target }
  const [shaking, setShaking] = useState(null); // item key that should shake
  const [completed, setCompleted] = useState(false);

  const correctMap = useMemo(() => {
    const map = {};
    pairs.forEach((p) => {
      map[p.item] = p.target;
    });
    return map;
  }, [pairs]);

  const matchedItems = new Set(Object.keys(matches));
  const matchedTargets = new Set(Object.values(matches));

  const handleItemClick = (item) => {
    if (matchedItems.has(item)) return;
    setSelectedItem(item === selectedItem ? null : item);
  };

  const handleTargetClick = (target) => {
    if (!selectedItem || matchedTargets.has(target)) return;

    if (correctMap[selectedItem] === target) {
      const newMatches = { ...matches, [selectedItem]: target };
      setMatches(newMatches);
      setSelectedItem(null);

      if (Object.keys(newMatches).length === pairs.length) {
        setCompleted(true);
        setTimeout(() => onComplete(), 800);
      }
    } else {
      setShaking(selectedItem);
      setTimeout(() => {
        setShaking(null);
        setSelectedItem(null);
      }, 600);
    }
  };

  const handleReset = () => {
    setMatches({});
    setSelectedItem(null);
    setShaking(null);
    setCompleted(false);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto px-4 py-6">
      {/* Instruction */}
      <div className="w-full bg-teal-50 rounded-xl p-4 mb-6 border border-teal-200">
        <p className="text-lg text-teal-700 text-center font-medium">{instruction}</p>
      </div>

      {/* Progress */}
      <div className="mb-4 text-teal-600 font-semibold">
        已配對：{Object.keys(matches).length} / {pairs.length}
      </div>

      {/* Matching area */}
      <div className="w-full flex gap-4 sm:gap-8">
        {/* Items column */}
        <div className="flex-1 flex flex-col gap-3">
          <h3 className="text-center text-sm font-semibold text-teal-500 uppercase tracking-wide mb-1">
            選擇項目
          </h3>
          {shuffledItems.map((item) => {
            const isMatched = matchedItems.has(item);
            const isSelected = selectedItem === item;
            const isShaking = shaking === item;

            return (
              <button
                key={item}
                onClick={() => handleItemClick(item)}
                disabled={isMatched}
                className={`
                  w-full py-3 px-4 rounded-xl text-lg font-medium text-center
                  transition-all duration-200 border-2
                  ${isShaking ? 'animate-shake' : ''}
                  ${
                    isMatched
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-700 cursor-default'
                      : isSelected
                      ? 'bg-teal-500 border-teal-600 text-white shadow-lg scale-105'
                      : 'bg-white border-teal-200 text-gray-700 hover:border-teal-400 hover:bg-teal-50 active:scale-95'
                  }
                `}
              >
                {isMatched && <span className="mr-1">✓</span>}
                {item}
              </button>
            );
          })}
        </div>

        {/* Connection indicator */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-0.5 h-full bg-teal-200 rounded" />
        </div>

        {/* Targets column */}
        <div className="flex-1 flex flex-col gap-3">
          <h3 className="text-center text-sm font-semibold text-emerald-500 uppercase tracking-wide mb-1">
            配對目標
          </h3>
          {shuffledTargets.map((target) => {
            const isMatched = matchedTargets.has(target);

            return (
              <button
                key={target}
                onClick={() => handleTargetClick(target)}
                disabled={isMatched || !selectedItem}
                className={`
                  w-full py-3 px-4 rounded-xl text-lg font-medium text-center
                  transition-all duration-200 border-2
                  ${
                    isMatched
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-700 cursor-default'
                      : selectedItem
                      ? 'bg-white border-emerald-200 text-gray-700 hover:border-emerald-400 hover:bg-emerald-50 active:scale-95 cursor-pointer'
                      : 'bg-gray-50 border-gray-200 text-gray-500 cursor-default'
                  }
                `}
              >
                {isMatched && <span className="mr-1">✓</span>}
                {target}
              </button>
            );
          })}
        </div>
      </div>

      {/* Completed message */}
      {completed && (
        <div className="mt-6 text-center">
          <p className="text-2xl font-bold text-emerald-600">🎉 全部配對成功！</p>
        </div>
      )}

      {/* Reset button */}
      {Object.keys(matches).length > 0 && !completed && (
        <button
          onClick={handleReset}
          className="mt-6 px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-600 font-medium rounded-full transition-all duration-200"
        >
          重新配對
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
