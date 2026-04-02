import React, { useState, useCallback, useMemo } from 'react';

const CATEGORY_COLORS = {
  遺骸化石: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300', badge: 'bg-blue-500' },
  遺跡化石: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300', badge: 'bg-orange-500' },
  活化石: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300', badge: 'bg-green-500' },
};

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function DigReveal({ content, onComplete }) {
  const { instruction, fossils, categories } = content;

  const tileOrder = useMemo(() => shuffleArray(fossils), [fossils]);

  const [revealedIds, setRevealedIds] = useState(new Set());
  const [crackingTile, setCrackingTile] = useState(null);
  const [activeFossil, setActiveFossil] = useState(null);
  const [showingInfo, setShowingInfo] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const allFound = revealedIds.size === fossils.length;

  const handleTileClick = useCallback(
    (fossil) => {
      if (revealedIds.has(fossil.id) || crackingTile) return;

      setHasInteracted(true);
      setCrackingTile(fossil.id);

      setTimeout(() => {
        setRevealedIds((prev) => new Set([...prev, fossil.id]));
        setCrackingTile(null);
        setActiveFossil(fossil);
        setShowingInfo(true);
      }, 700);
    },
    [revealedIds, crackingTile]
  );

  const dismissInfo = useCallback(() => {
    setShowingInfo(false);
    setActiveFossil(null);
  }, []);

  const fossilsByCategory = useMemo(() => {
    const grouped = {};
    categories.forEach((cat) => {
      grouped[cat] = fossils.filter(
        (f) => f.category === cat && revealedIds.has(f.id)
      );
    });
    return grouped;
  }, [categories, fossils, revealedIds]);

  // Compute grid columns based on fossil count
  const cols = tileOrder.length <= 4 ? 2 : tileOrder.length <= 6 ? 3 : 4;

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6">
      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-teal-700 mb-2">
          化石挖掘探險
        </h2>
        <p className="text-lg text-teal-600">{instruction}</p>
      </div>

      {/* Dig Site Grid */}
      <div
        className={`grid gap-3 sm:gap-4 mb-6`}
        style={{
          gridTemplateColumns: `repeat(${Math.min(cols, 4)}, minmax(0, 1fr))`,
        }}
      >
        {tileOrder.map((fossil) => {
          const isRevealed = revealedIds.has(fossil.id);
          const isCracking = crackingTile === fossil.id;

          return (
            <div key={fossil.id} className="relative aspect-square">
              {/* Rock tile */}
              {!isRevealed && (
                <button
                  onClick={() => handleTileClick(fossil)}
                  className={`
                    absolute inset-0 rounded-xl cursor-pickaxe
                    transition-all duration-300
                    ${isCracking ? 'animate-crack' : 'hover:scale-105 active:scale-95'}
                    group
                  `}
                  style={{ cursor: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2732%27 height=%2732%27 viewBox=%270 0 32 32%27%3E%3Ctext y=%2724%27 font-size=%2724%27%3E%E2%9B%8F%EF%B8%8F%3C/text%3E%3C/svg%3E") 4 28, pointer' }}
                >
                  {/* Rock texture layers */}
                  <div
                    className={`
                      absolute inset-0 rounded-xl overflow-hidden
                      ${isCracking ? 'animate-crack-pieces' : ''}
                    `}
                  >
                    {/* Base rock */}
                    <div
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: `
                          radial-gradient(ellipse at 30% 20%, #a8896c 0%, transparent 50%),
                          radial-gradient(ellipse at 70% 60%, #8b7355 0%, transparent 40%),
                          radial-gradient(ellipse at 50% 80%, #9c8870 0%, transparent 45%),
                          linear-gradient(135deg, #a0886e 0%, #7d6b55 30%, #8b7960 60%, #6d5c48 100%)
                        `,
                      }}
                    />
                    {/* Crack lines */}
                    <div
                      className="absolute inset-0 rounded-xl opacity-30"
                      style={{
                        background: `
                          linear-gradient(45deg, transparent 40%, #5a4a3a 40.5%, #5a4a3a 41%, transparent 41.5%),
                          linear-gradient(135deg, transparent 60%, #5a4a3a 60.5%, #5a4a3a 61%, transparent 61.5%),
                          linear-gradient(80deg, transparent 30%, #4a3c2e 30.3%, transparent 30.6%)
                        `,
                      }}
                    />
                    {/* Speckle texture */}
                    <div
                      className="absolute inset-0 rounded-xl opacity-20"
                      style={{
                        background: `
                          radial-gradient(circle at 20% 30%, #fff 1px, transparent 1px),
                          radial-gradient(circle at 60% 70%, #fff 0.5px, transparent 0.5px),
                          radial-gradient(circle at 80% 20%, #fff 1px, transparent 1px),
                          radial-gradient(circle at 40% 50%, #fff 0.5px, transparent 0.5px)
                        `,
                      }}
                    />
                    {/* Shadow/depth */}
                    <div className="absolute inset-0 rounded-xl shadow-inner" />
                  </div>

                  {/* Hover label */}
                  {!hasInteracted && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-black/60 text-white text-sm px-3 py-1.5 rounded-full font-medium">
                        ⛏️ 點擊挖掘
                      </span>
                    </div>
                  )}

                  {/* First visit hint */}
                  {!hasInteracted && (
                    <div className="absolute bottom-1 right-1 text-xs bg-black/40 text-white px-2 py-0.5 rounded-full sm:hidden">
                      ⛏️
                    </div>
                  )}
                </button>
              )}

              {/* Revealed fossil */}
              {isRevealed && (
                <div
                  className="absolute inset-0 rounded-xl bg-amber-50 border-2 border-amber-200
                    flex flex-col items-center justify-center animate-fossil-pop shadow-md"
                >
                  <span className="text-4xl sm:text-5xl mb-1">{fossil.emoji}</span>
                  <span className="text-xs sm:text-sm font-medium text-amber-800 text-center px-1 leading-tight">
                    {fossil.name}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Info Card Modal */}
      {showingInfo && activeFossil && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-slide-up">
            <div className="text-center mb-4">
              <span className="text-5xl">{activeFossil.emoji}</span>
            </div>
            <h3 className="text-xl font-bold text-teal-800 text-center mb-2">
              {activeFossil.name}
            </h3>
            <div className="flex justify-center mb-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                  CATEGORY_COLORS[activeFossil.category]?.badge || 'bg-gray-500'
                }`}
              >
                {activeFossil.category}
              </span>
            </div>
            <p className="text-base text-gray-700 text-center leading-relaxed mb-5">
              {activeFossil.info}
            </p>
            <div className="text-center">
              <button
                onClick={dismissInfo}
                className="px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-bold text-lg
                  rounded-full transition-all duration-200 active:scale-95 shadow-md"
              >
                知道了！
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Collection Display */}
      <div className="bg-gradient-to-b from-amber-50 to-orange-50 rounded-2xl p-4 sm:p-5 border-2 border-amber-200 mb-5">
        <h3 className="text-lg font-bold text-amber-800 mb-3 text-center">
          🏛️ 化石博物館
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {categories.map((cat) => {
            const colors = CATEGORY_COLORS[cat] || {
              bg: 'bg-gray-100',
              text: 'text-gray-700',
              border: 'border-gray-300',
            };
            const found = fossilsByCategory[cat] || [];

            return (
              <div
                key={cat}
                className={`${colors.bg} ${colors.border} border-2 rounded-xl p-3 min-h-[80px]`}
              >
                <div className={`text-sm font-bold ${colors.text} mb-2 text-center`}>
                  {cat}
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {found.length === 0 ? (
                    <span className="text-gray-400 text-sm">尚未發現</span>
                  ) : (
                    found.map((f) => (
                      <span
                        key={f.id}
                        className="text-2xl animate-fossil-pop"
                        title={f.name}
                      >
                        {f.emoji}
                      </span>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-2 bg-teal-100 px-4 py-2 rounded-full">
          <span className="text-lg text-teal-700 font-medium">
            已發現 {revealedIds.size}/{fossils.length} 個化石
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-3 w-full bg-teal-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-teal-500 h-3 rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${(revealedIds.size / fossils.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* All found celebration */}
      {allFound && (
        <div className="text-center mt-6 animate-slide-up">
          <p className="text-xl font-bold text-emerald-600 mb-4">
            🎉 恭喜！你已經發現所有化石！
          </p>
          <button
            onClick={onComplete}
            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-bold rounded-full
              shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
          >
            完成探險 🏆
          </button>
        </div>
      )}

      {/* Inline keyframe styles */}
      <style>{`
        @keyframes crack {
          0% { transform: scale(1); }
          20% { transform: scale(1.02) rotate(1deg); }
          40% { transform: scale(0.98) rotate(-1deg); }
          60% { transform: scale(1.01) rotate(0.5deg); }
          80% { opacity: 0.5; transform: scale(0.95); }
          100% { opacity: 0; transform: scale(0.8); }
        }
        @keyframes crackPieces {
          0% { clip-path: inset(0); }
          30% {
            clip-path: polygon(
              0% 0%, 45% 0%, 42% 48%, 0% 50%,
              0% 100%, 48% 100%, 50% 55%, 100% 52%,
              100% 0%, 55% 0%, 52% 45%, 100% 48%,
              100% 100%, 50% 100%, 48% 52%, 0% 55%
            );
          }
          100% { opacity: 0; transform: scale(0.7); }
        }
        @keyframes fossilPop {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.15); }
          70% { transform: scale(0.95); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-crack { animation: crack 0.7s ease-in-out forwards; }
        .animate-crack-pieces { animation: crackPieces 0.7s ease-in-out forwards; }
        .animate-fossil-pop { animation: fossilPop 0.5s ease-out; }
        .animate-slide-up { animation: slideUp 0.4s ease-out; }
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </div>
  );
}
