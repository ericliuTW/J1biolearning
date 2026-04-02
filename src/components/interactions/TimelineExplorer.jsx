import React, { useState, useRef, useEffect } from 'react';

export default function TimelineExplorer({ content, onComplete }) {
  const { title, instruction, stages } = content;
  const [explored, setExplored] = useState(new Set());
  const [activeIndex, setActiveIndex] = useState(null);
  const [showComplete, setShowComplete] = useState(false);
  const timelineRef = useRef(null);

  const totalStages = stages.length;
  const exploredCount = explored.size;
  const allExplored = exploredCount === totalStages;

  const activeStage = activeIndex !== null ? stages[activeIndex] : null;

  // Find the previously explored stage (by timeline order, before current)
  const previousStage = activeIndex !== null && activeIndex > 0 ? stages[activeIndex - 1] : null;
  const showComparison = activeStage && previousStage && explored.has(previousStage.id);

  // Scroll active marker into view on mobile
  useEffect(() => {
    if (activeIndex !== null && timelineRef.current) {
      const markers = timelineRef.current.querySelectorAll('[data-marker]');
      if (markers[activeIndex]) {
        markers[activeIndex].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [activeIndex]);

  const handleMarkerClick = (index) => {
    const stage = stages[index];
    setActiveIndex(index);
    setExplored((prev) => {
      const next = new Set([...prev, stage.id]);
      if (next.size === totalStages && !showComplete) {
        setTimeout(() => setShowComplete(true), 500);
      }
      return next;
    });
  };

  const handlePrev = () => {
    if (activeIndex !== null && activeIndex > 0) {
      handleMarkerClick(activeIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex !== null && activeIndex < totalStages - 1) {
      handleMarkerClick(activeIndex + 1);
    }
  };

  // Build comparison data between two stages
  const getComparisons = (prev, curr) => {
    if (!prev || !curr) return [];
    const prevMap = {};
    (prev.highlights || []).forEach((h) => { prevMap[h.label] = h.value; });
    return (curr.highlights || [])
      .filter((h) => prevMap[h.label] && prevMap[h.label] !== h.value)
      .map((h) => ({ label: h.label, oldValue: prevMap[h.label], newValue: h.value }));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-teal-800 mb-2">{title}</h2>
        <p className="text-lg text-teal-600">{instruction}</p>
      </div>

      {/* Timeline */}
      <div className="relative mb-6">
        <div
          ref={timelineRef}
          className="flex items-center overflow-x-auto pb-4 px-4 scrollbar-thin"
          style={{ scrollbarWidth: 'thin' }}
        >
          {stages.map((stage, i) => {
            const isExplored = explored.has(stage.id);
            const isActive = activeIndex === i;

            return (
              <React.Fragment key={stage.id}>
                <div className="flex flex-col items-center flex-shrink-0" data-marker>
                  {/* Marker button */}
                  <button
                    onClick={() => handleMarkerClick(i)}
                    className={`
                      relative rounded-full flex items-center justify-center
                      transition-all duration-300 cursor-pointer
                      ${isActive
                        ? 'w-14 h-14 bg-teal-500 text-white shadow-lg ring-4 ring-teal-200'
                        : isExplored
                          ? 'w-10 h-10 bg-emerald-500 text-white shadow-md'
                          : 'w-10 h-10 bg-gray-200 text-gray-400 hover:bg-teal-100 hover:text-teal-500'
                      }
                    `}
                  >
                    {/* Pulse on unexplored */}
                    {!isExplored && !isActive && (
                      <span className="absolute inset-0 rounded-full bg-teal-400 animate-ping opacity-20" />
                    )}
                    <span className="text-lg font-bold relative z-10">
                      {isExplored && !isActive ? '✓' : i + 1}
                    </span>
                  </button>
                  {/* Period label */}
                  <span
                    className={`
                      mt-2 text-xs sm:text-sm text-center whitespace-nowrap font-medium
                      ${isActive ? 'text-teal-700' : isExplored ? 'text-emerald-600' : 'text-gray-400'}
                    `}
                  >
                    {stage.period}
                  </span>
                </div>

                {/* Connector line */}
                {i < totalStages - 1 && (
                  <div
                    className={`flex-shrink-0 w-10 sm:w-16 h-1 rounded mx-1 transition-colors duration-300 ${
                      explored.has(stage.id) && explored.has(stages[i + 1].id)
                        ? 'bg-emerald-400'
                        : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Navigation arrows + Detail card */}
      {activeStage && (
        <div className="animate-card-in">
          {/* Arrow navigation */}
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={`
                w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold
                transition-all duration-200
                ${activeIndex === 0
                  ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                  : 'bg-teal-100 text-teal-600 hover:bg-teal-200 active:scale-90 cursor-pointer'
                }
              `}
            >
              ←
            </button>
            <div className="flex-1 text-center text-sm text-teal-500 font-medium">
              {activeIndex + 1} / {totalStages}
            </div>
            <button
              onClick={handleNext}
              disabled={activeIndex === totalStages - 1}
              className={`
                w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold
                transition-all duration-200
                ${activeIndex === totalStages - 1
                  ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                  : 'bg-teal-100 text-teal-600 hover:bg-teal-200 active:scale-90 cursor-pointer'
                }
              `}
            >
              →
            </button>
          </div>

          {/* Detail card */}
          <div className="bg-white border-2 border-teal-200 rounded-2xl p-6 shadow-lg">
            <div className="text-center mb-4">
              <span className="text-6xl inline-block">{activeStage.emoji}</span>
            </div>

            <p className="text-sm font-medium text-teal-500 text-center mb-1">{activeStage.period}</p>
            <h3 className="text-xl font-bold text-teal-800 text-center mb-3">{activeStage.title}</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-5">{activeStage.description}</p>

            {/* Highlight chips */}
            {activeStage.highlights && activeStage.highlights.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {activeStage.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-teal-50 border border-teal-200 rounded-full text-sm"
                  >
                    <span className="font-bold text-teal-700">{h.label}:</span>
                    <span className="text-teal-600">{h.value}</span>
                  </span>
                ))}
              </div>
            )}

            {/* Comparison section */}
            {showComparison && (() => {
              const comparisons = getComparisons(previousStage, activeStage);
              if (comparisons.length === 0) return null;
              return (
                <div className="bg-gradient-to-r from-gray-50 to-teal-50 border border-teal-200 rounded-xl p-4 mt-2">
                  <h4 className="text-sm font-bold text-teal-700 mb-3 flex items-center gap-2">
                    📊 比較：{previousStage.title} → {activeStage.title}
                  </h4>
                  <div className="space-y-2">
                    {comparisons.map((c, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm flex-wrap">
                        <span className="font-bold text-gray-600 min-w-[3rem]">{c.label}:</span>
                        <span className="px-2 py-0.5 bg-gray-200 text-gray-500 rounded line-through">
                          {c.oldValue}
                        </span>
                        <span className="text-teal-500 font-bold">→</span>
                        <span className="px-2 py-0.5 bg-teal-100 text-teal-700 rounded font-medium">
                          {c.newValue}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Prompt to start */}
      {activeStage === null && (
        <div className="text-center py-12 bg-teal-50 rounded-2xl border-2 border-dashed border-teal-200">
          <span className="text-5xl block mb-3">👆</span>
          <p className="text-lg text-teal-600">點擊上方時間線的圓圈開始探索！</p>
        </div>
      )}

      {/* Progress */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-teal-700">
            已探索 {exploredCount}/{totalStages} 個時期
          </span>
          <span className="text-sm text-teal-500">{Math.round((exploredCount / totalStages) * 100)}%</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${(exploredCount / totalStages) * 100}%` }}
          />
        </div>
      </div>

      {/* Complete */}
      {showComplete && (
        <div className="mt-6 text-center bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-2xl p-6 animate-card-in">
          <span className="text-5xl block mb-3">🏆</span>
          <h3 className="text-xl font-bold text-emerald-700 mb-2">所有時期都探索完成！</h3>
          <p className="text-lg text-emerald-600 mb-4">你已經了解了完整的演化歷程！</p>
          <button
            onClick={onComplete}
            className="px-10 py-3 bg-emerald-600 text-white text-lg font-bold rounded-xl
                       hover:bg-emerald-700 active:scale-95 transition-all duration-200 shadow-lg"
          >
            完成學習 🚀
          </button>
        </div>
      )}

      <style>{`
        @keyframes card-in {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-card-in {
          animation: card-in 0.4s ease-out;
        }
        .scrollbar-thin::-webkit-scrollbar {
          height: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #99f6e4;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
