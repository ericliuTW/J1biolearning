import React, { useState } from 'react';

export default function ClickExploreScene({ content, onComplete }) {
  const { title, instruction, sceneEmoji, items } = content;
  const [explored, setExplored] = useState(new Set());
  const [activeItem, setActiveItem] = useState(null);
  const [animatingId, setAnimatingId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const totalItems = items.length;
  const exploredCount = explored.size;
  const allExplored = exploredCount === totalItems;

  const handleItemClick = (item) => {
    if (activeItem?.id === item.id) return;
    setAnimatingId(item.id);
    setTimeout(() => setAnimatingId(null), 300);
    setActiveItem(item);
  };

  const handleDismiss = () => {
    if (activeItem) {
      setExplored((prev) => new Set([...prev, activeItem.id]));
      setActiveItem(null);
      const newCount = explored.has(activeItem.id) ? exploredCount : exploredCount + 1;
      if (newCount === totalItems) {
        setTimeout(() => setShowSuccess(true), 300);
      }
    }
  };

  const categoryColorMap = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    purple: 'bg-purple-100 text-purple-700',
    teal: 'bg-teal-100 text-teal-700',
    orange: 'bg-orange-100 text-orange-700',
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-teal-800 mb-2">{title}</h2>
        <p className="text-lg text-teal-600">{instruction}</p>
      </div>

      {/* Scene area */}
      <div className="relative bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-6 min-h-[300px]">
        {/* Background emoji */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[120px] sm:text-[160px] opacity-10">{sceneEmoji}</span>
        </div>

        {/* Item grid */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => {
            const isExplored = explored.has(item.id);
            const isActive = activeItem?.id === item.id;
            const isAnimating = animatingId === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`
                  relative flex flex-col items-center gap-2 p-4 rounded-xl
                  transition-all duration-300 cursor-pointer
                  ${isActive
                    ? 'bg-teal-100 border-2 border-teal-500 shadow-lg scale-105'
                    : isExplored
                      ? 'bg-white border-2 border-emerald-400 shadow-md'
                      : 'bg-white border-2 border-gray-200 shadow-sm hover:shadow-md hover:border-teal-300'
                  }
                  ${isAnimating ? 'scale-110' : ''}
                  min-h-[100px] active:scale-95
                `}
              >
                {/* Pulse ring on unexplored */}
                {!isExplored && !isActive && (
                  <span className="absolute inset-0 rounded-xl border-2 border-teal-400 animate-ping opacity-20" />
                )}

                {/* Checkmark badge */}
                {isExplored && (
                  <span className="absolute -top-2 -right-2 w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
                    ✓
                  </span>
                )}

                <span className="text-4xl">{item.emoji}</span>
                <span className={`text-sm font-medium ${isExplored ? 'text-emerald-700' : 'text-gray-700'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Knowledge card */}
      <div
        className={`
          overflow-hidden transition-all duration-500 ease-out
          ${activeItem ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}
        `}
      >
        {activeItem && (
          <div className="bg-white border-2 border-teal-200 rounded-2xl p-6 shadow-lg">
            <div className="flex items-start gap-4 mb-4">
              <span className="text-5xl">{activeItem.emoji}</span>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-teal-800">{activeItem.info.title}</h3>
                {activeItem.info.category && (
                  <span
                    className={`
                      inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium
                      ${categoryColorMap[activeItem.info.categoryColor] || 'bg-teal-100 text-teal-700'}
                    `}
                  >
                    {activeItem.info.category}
                  </span>
                )}
              </div>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-5">
              {activeItem.info.description}
            </p>
            <button
              onClick={handleDismiss}
              className="w-full sm:w-auto px-8 py-3 bg-teal-600 text-white text-lg font-bold rounded-xl
                         hover:bg-teal-700 active:scale-95 transition-all duration-200 shadow-md"
            >
              了解！ ✨
            </button>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-teal-700">
            已探索 {exploredCount}/{totalItems} 個知識點
          </span>
          <span className="text-sm text-teal-500">{Math.round((exploredCount / totalItems) * 100)}%</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${(exploredCount / totalItems) * 100}%` }}
          />
        </div>
      </div>

      {/* Success / complete */}
      {showSuccess && (
        <div className="mt-6 text-center bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-2xl p-6 animate-fade-in">
          <span className="text-5xl block mb-3">🎉</span>
          <h3 className="text-xl font-bold text-emerald-700 mb-2">太棒了！全部探索完成！</h3>
          <p className="text-lg text-emerald-600 mb-4">你已經學會了所有的知識點！</p>
          <button
            onClick={onComplete}
            className="px-10 py-3 bg-emerald-600 text-white text-lg font-bold rounded-xl
                       hover:bg-emerald-700 active:scale-95 transition-all duration-200 shadow-lg"
          >
            完成學習 🚀
          </button>
        </div>
      )}

      {/* Inline keyframes for fade-in */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
