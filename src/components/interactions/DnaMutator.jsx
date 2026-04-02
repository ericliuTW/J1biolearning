import React, { useState, useCallback, useMemo } from 'react';

const BASE_COLORS = {
  A: 'bg-green-500',
  T: 'bg-red-500',
  C: 'bg-blue-500',
  G: 'bg-yellow-500',
};

const BASE_NAMES = {
  A: '腺嘌呤',
  T: '胸腺嘧啶',
  C: '胞嘧啶',
  G: '鳥嘌呤',
};

const COMPLEMENT = { A: 'T', T: 'A', C: 'G', G: 'C' };
const ALL_BASES = ['A', 'T', 'C', 'G'];

function getRandomDifferentBase(current) {
  const others = ALL_BASES.filter((b) => b !== current);
  return others[Math.floor(Math.random() * others.length)];
}

export default function DnaMutator({ content, onComplete }) {
  const { dna, knowledgePoints } = content;

  const complementaryStrand = useMemo(
    () => dna.map((base) => COMPLEMENT[base]),
    [dna]
  );

  const [topStrand, setTopStrand] = useState(dna);
  const [bottomStrand, setBottomStrand] = useState(complementaryStrand);
  const [mutatedIndices, setMutatedIndices] = useState(new Set());
  const [shakingIndex, setShakingIndex] = useState(null);
  const [shakingRow, setShakingRow] = useState(null);
  const [hasMutated, setHasMutated] = useState(false);
  const [readPoints, setReadPoints] = useState(new Set());
  const [expandedPoint, setExpandedPoint] = useState(null);
  const [showKnowledge, setShowKnowledge] = useState(false);

  const allComplete =
    hasMutated && readPoints.size === knowledgePoints.length;

  const handleBaseClick = useCallback(
    (index, row) => {
      if (mutatedIndices.has(`${row}-${index}`)) return;

      setShakingIndex(index);
      setShakingRow(row);

      setTimeout(() => {
        if (row === 'top') {
          setTopStrand((prev) => {
            const next = [...prev];
            next[index] = getRandomDifferentBase(next[index]);
            return next;
          });
        } else {
          setBottomStrand((prev) => {
            const next = [...prev];
            next[index] = getRandomDifferentBase(next[index]);
            return next;
          });
        }

        setMutatedIndices((prev) => new Set([...prev, `${row}-${index}`]));
        setShakingIndex(null);
        setShakingRow(null);

        if (!hasMutated) {
          setHasMutated(true);
          setTimeout(() => setShowKnowledge(true), 600);
        }
      }, 500);
    },
    [mutatedIndices, hasMutated]
  );

  const handlePointClick = useCallback(
    (id) => {
      if (expandedPoint === id) {
        setExpandedPoint(null);
      } else {
        setExpandedPoint(id);
        setReadPoints((prev) => new Set([...prev, id]));
      }
    },
    [expandedPoint]
  );

  const isMismatched = (index) => {
    const top = topStrand[index];
    const bottom = bottomStrand[index];
    return COMPLEMENT[top] !== bottom;
  };

  // Generate helix path data for SVG
  const helixWidth = 400;
  const pairCount = dna.length;

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6">
      {/* Title */}
      <div className="text-center mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-teal-700 mb-2">
          🧬 DNA 雙股螺旋探索器
        </h2>
        <p className="text-base sm:text-lg text-teal-600">
          點擊任一個鹼基字母，觀察突變的發生！
        </p>
      </div>

      {/* DNA intro explanation */}
      <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-5">
        <p className="text-base text-teal-800 leading-relaxed mb-3">
          <strong>什麼是 DNA？</strong> DNA 是生物體內儲存遺傳資訊的分子，像一條扭轉的梯子（雙股螺旋）。梯子的每一階由兩個<strong>鹼基</strong>配對組成：
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-3">
          {ALL_BASES.map((base) => (
            <div key={base} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm">
              <span className={`inline-flex items-center justify-center w-9 h-9 rounded-full text-white font-bold text-lg ${BASE_COLORS[base]}`}>
                {base}
              </span>
              <span className="text-sm text-gray-700">{BASE_NAMES[base]}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-teal-700">
          🔗 配對規則：<strong>A 永遠配 T</strong>，<strong>C 永遠配 G</strong>。如果配對被打亂，就是發生了<strong>突變</strong>！
        </p>
      </div>

      {/* DNA Double Helix Visualization */}
      <div className="relative bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl p-5 sm:p-8 shadow-xl mb-6 overflow-hidden">
        {/* Animated helix background curves */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 400 280"
          preserveAspectRatio="none"
        >
          {/* Left helix backbone */}
          <path
            d="M30,20 C80,60 80,100 30,140 C-20,180 -20,220 30,260"
            fill="none"
            stroke="rgba(94,234,212,0.3)"
            strokeWidth="3"
            className="helix-path-1"
          />
          {/* Right helix backbone */}
          <path
            d="M370,20 C320,60 320,100 370,140 C420,180 420,220 370,260"
            fill="none"
            stroke="rgba(94,234,212,0.3)"
            strokeWidth="3"
            className="helix-path-2"
          />
          {/* Horizontal rungs - decorative */}
          {[50, 90, 130, 170, 210, 250].map((y, i) => (
            <line
              key={i}
              x1={40 + Math.sin((y / 60) * Math.PI) * 20}
              y1={y}
              x2={360 - Math.sin((y / 60) * Math.PI) * 20}
              y2={y}
              stroke="rgba(94,234,212,0.1)"
              strokeWidth="1"
            />
          ))}
        </svg>

        {/* Helix title label */}
        <div className="relative z-10 text-center mb-4">
          <span className="inline-block bg-teal-900/60 text-teal-300 text-xs sm:text-sm px-3 py-1 rounded-full border border-teal-700/50">
            🔬 DNA 雙股螺旋結構 — 點擊任一鹼基
          </span>
        </div>

        {/* DNA strands */}
        <div className="relative z-10">
          {/* Strand label */}
          <div className="text-center mb-2">
            <span className="text-xs text-teal-400 tracking-widest">5' ——— 上股 ——— 3'</span>
          </div>

          {/* Top strand */}
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-0">
            {topStrand.map((base, i) => {
              const isMut = mutatedIndices.has(`top-${i}`);
              const isShaking = shakingIndex === i && shakingRow === 'top';
              return (
                <button
                  key={`top-${i}`}
                  onClick={() => handleBaseClick(i, 'top')}
                  className={`
                    relative w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center
                    text-white font-bold text-base sm:text-xl
                    transition-all duration-300 cursor-pointer select-none
                    ${isMut ? 'ring-3 ring-orange-400 shadow-orange-400/50 shadow-lg' : 'hover:ring-2 hover:ring-teal-300'}
                    ${BASE_COLORS[base]}
                    ${isShaking ? 'animate-shake' : ''}
                    ${isMut ? 'animate-pop' : 'hover:scale-110 hover:brightness-110'}
                    active:scale-95
                  `}
                  title={`${base} (${BASE_NAMES[base]})`}
                  aria-label={`鹼基 ${base} ${BASE_NAMES[base]}`}
                >
                  {base}
                  {isMut && (
                    <span className="absolute -top-1 -right-1 text-xs">💥</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Connecting bridges (hydrogen bonds) */}
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 my-0">
            {topStrand.map((_, i) => {
              const mismatched = isMismatched(i);
              return (
                <div
                  key={`bridge-${i}`}
                  className="w-11 sm:w-14 flex flex-col items-center"
                >
                  {mismatched ? (
                    <div className="flex flex-col items-center gap-0.5 py-1">
                      <div className="w-0.5 h-1.5 bg-red-400 rounded" />
                      <span className="text-red-400 text-[8px] leading-none">✕</span>
                      <div className="w-0.5 h-1.5 bg-red-400 rounded" />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-0.5 py-1">
                      <div className="w-0.5 h-1.5 bg-teal-400/70 rounded" />
                      <div className="w-1 h-1 bg-teal-400/50 rounded-full" />
                      <div className="w-0.5 h-1.5 bg-teal-400/70 rounded" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom strand */}
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mt-0">
            {bottomStrand.map((base, i) => {
              const isMut = mutatedIndices.has(`bottom-${i}`);
              const isShaking = shakingIndex === i && shakingRow === 'bottom';
              return (
                <button
                  key={`bottom-${i}`}
                  onClick={() => handleBaseClick(i, 'bottom')}
                  className={`
                    relative w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center
                    text-white font-bold text-base sm:text-xl
                    transition-all duration-300 cursor-pointer select-none
                    ${isMut ? 'ring-3 ring-orange-400 shadow-orange-400/50 shadow-lg' : 'hover:ring-2 hover:ring-teal-300'}
                    ${BASE_COLORS[base]}
                    ${isShaking ? 'animate-shake' : ''}
                    ${isMut ? 'animate-pop' : 'hover:scale-110 hover:brightness-110'}
                    active:scale-95
                  `}
                  title={`${base} (${BASE_NAMES[base]})`}
                  aria-label={`鹼基 ${base} ${BASE_NAMES[base]}`}
                >
                  {base}
                  {isMut && (
                    <span className="absolute -top-1 -right-1 text-xs">💥</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Strand label */}
          <div className="text-center mt-2">
            <span className="text-xs text-teal-400 tracking-widest">3' ——— 下股 ——— 5'</span>
          </div>
        </div>

        {/* Mismatch warning */}
        {hasMutated && (
          <div className="relative z-10 mt-5 text-center animate-fade-in">
            <span className="inline-block bg-orange-500/20 text-orange-300 border border-orange-500/40 px-4 py-2 rounded-full text-sm sm:text-base font-medium">
              ⚠️ 突變發生！鹼基配對規則被打亂了
            </span>
          </div>
        )}

        {/* Legend */}
        <div className="relative z-10 mt-4 flex flex-wrap justify-center gap-2">
          <span className="flex items-center gap-1 text-xs text-teal-400">
            <span className="inline-block w-3 h-3 bg-teal-400/50 rounded-full" /> 正常配對
          </span>
          <span className="flex items-center gap-1 text-xs text-red-400">
            <span className="inline-block w-3 h-3 bg-red-400 rounded-full" /> 突變錯配
          </span>
          <span className="flex items-center gap-1 text-xs text-orange-300">
            💥 已突變的鹼基
          </span>
        </div>
      </div>

      {/* First mutation knowledge card */}
      {hasMutated && !showKnowledge && (
        <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-lg mb-6 animate-slide-up">
          <p className="text-lg text-teal-800">
            🔬 這就是<strong>突變</strong>！DNA 的鹼基序列發生了改變，配對規則（A-T、C-G）被打亂了。
          </p>
        </div>
      )}

      {/* Knowledge Points Section */}
      {showKnowledge && (
        <div className="animate-slide-up">
          <h3 className="text-xl font-bold text-teal-700 mb-4">
            關於突變，你還需要知道...
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {knowledgePoints.map((point) => {
              const isRead = readPoints.has(point.id);
              const isExpanded = expandedPoint === point.id;

              return (
                <button
                  key={point.id}
                  onClick={() => handlePointClick(point.id)}
                  className={`
                    text-left w-full p-4 rounded-xl border-2 transition-all duration-300
                    ${
                      isExpanded
                        ? 'border-teal-500 bg-teal-50 shadow-lg'
                        : isRead
                          ? 'border-emerald-300 bg-emerald-50 hover:shadow-md'
                          : 'border-teal-200 bg-white hover:border-teal-400 hover:shadow-md animate-subtle-pulse'
                    }
                  `}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{point.emoji}</span>
                      <span className="text-lg font-semibold text-teal-800">
                        {point.title}
                      </span>
                    </div>
                    <span className="text-lg">
                      {isRead ? (
                        <span className="text-emerald-500">✅</span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-7 h-7 bg-teal-200 text-teal-700 rounded-full text-sm font-bold">
                          ?
                        </span>
                      )}
                    </span>
                  </div>

                  {isExpanded && (
                    <p className="text-base text-teal-700 mt-2 leading-relaxed animate-fade-in">
                      {point.text}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Progress */}
      {showKnowledge && (
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 bg-teal-100 px-4 py-2 rounded-full">
            <span className="text-lg text-teal-700 font-medium">
              已學習 {readPoints.size}/{knowledgePoints.length} 個知識點
            </span>
          </div>

          {/* Progress bar */}
          <div className="mt-3 w-full bg-teal-100 rounded-full h-3 overflow-hidden">
            <div
              className="bg-teal-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${(readPoints.size / knowledgePoints.length) * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Complete button */}
      {allComplete && (
        <div className="text-center mt-6 animate-fade-in">
          <button
            onClick={onComplete}
            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-bold rounded-full
              shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
          >
            完成學習 🎉
          </button>
        </div>
      )}

      {/* Inline keyframe styles */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10% { transform: translateX(-4px) rotate(-2deg); }
          20% { transform: translateX(4px) rotate(2deg); }
          30% { transform: translateX(-4px) rotate(-1deg); }
          40% { transform: translateX(4px) rotate(1deg); }
          50% { transform: translateX(-2px); }
          60% { transform: translateX(2px); }
          70% { transform: translateX(-1px); }
          80% { transform: translateX(1px); }
          90% { transform: translateX(0); }
        }
        @keyframes pop {
          0% { transform: scale(0.6); opacity: 0.5; }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes subtlePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(20, 184, 166, 0.3); }
          50% { box-shadow: 0 0 0 6px rgba(20, 184, 166, 0); }
        }
        @keyframes helixSpin {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 100; }
        }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-pop { animation: pop 0.4s ease-out; }
        .animate-slide-up { animation: slideUp 0.5s ease-out; }
        .animate-fade-in { animation: fadeIn 0.4s ease-out; }
        .animate-subtle-pulse { animation: subtlePulse 2s ease-in-out infinite; }
        .helix-path-1, .helix-path-2 {
          stroke-dasharray: 10 5;
          animation: helixSpin 3s linear infinite;
        }
        .helix-path-2 { animation-direction: reverse; }
      `}</style>
    </div>
  );
}
