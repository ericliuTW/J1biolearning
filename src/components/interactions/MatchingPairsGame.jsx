import React, { useState, useCallback, useRef, useMemo } from 'react';

const MATCH_COLORS = [
  { bg: 'bg-emerald-100', border: 'border-emerald-400', text: 'text-emerald-700', line: '#34d399' },
  { bg: 'bg-sky-100', border: 'border-sky-400', text: 'text-sky-700', line: '#38bdf8' },
  { bg: 'bg-violet-100', border: 'border-violet-400', text: 'text-violet-700', line: '#a78bfa' },
  { bg: 'bg-amber-100', border: 'border-amber-400', text: 'text-amber-700', line: '#fbbf24' },
  { bg: 'bg-rose-100', border: 'border-rose-400', text: 'text-rose-700', line: '#fb7185' },
  { bg: 'bg-teal-100', border: 'border-teal-400', text: 'text-teal-700', line: '#2dd4bf' },
  { bg: 'bg-orange-100', border: 'border-orange-400', text: 'text-orange-700', line: '#fb923c' },
  { bg: 'bg-indigo-100', border: 'border-indigo-400', text: 'text-indigo-700', line: '#818cf8' },
];

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/* ── Draggable left-side item (own refs/state, no hooks in loops) ── */
function DraggableLeftItem({ pair, matched, colorStyle, onDrop }) {
  const elRef = useRef(null);
  const draggingRef = useRef(false);
  const startRef = useRef({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleStart = useCallback((e) => {
    if (matched) return;
    e.preventDefault();
    const pt = e.touches ? e.touches[0] : e;
    startRef.current = { x: pt.clientX, y: pt.clientY };
    draggingRef.current = true;
    setDragging(true);
    if (elRef.current) {
      elRef.current.style.transform = 'translate(0px, 0px)';
      elRef.current.style.zIndex = '50';
    }

    const handleMove = (ev) => {
      if (!draggingRef.current) return;
      ev.preventDefault();
      const mp = ev.touches ? ev.touches[0] : ev;
      const dx = mp.clientX - startRef.current.x;
      const dy = mp.clientY - startRef.current.y;
      if (elRef.current) elRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
    };

    const handleEnd = (ev) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      setDragging(false);
      if (elRef.current) {
        elRef.current.style.transform = 'translate(0px, 0px)';
        elRef.current.style.zIndex = '1';
      }
      const endPt = ev.changedTouches ? ev.changedTouches[0] : ev;
      onDrop(pair.id, endPt, () => {
        setShaking(true);
        setTimeout(() => setShaking(false), 500);
      });
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleEnd);
  }, [matched, pair.id, onDrop]);

  const baseClasses = 'relative select-none rounded-xl px-4 py-3 font-semibold text-base shadow-md border-2 transition-colors duration-200 flex items-center gap-2';

  if (matched) {
    return (
      <div className={`${baseClasses} ${colorStyle.bg} ${colorStyle.border} ${colorStyle.text} cursor-default`}>
        <span className="text-xl">{pair.left.emoji}</span>
        <span>{pair.left.text}</span>
        <span className="ml-auto text-green-500">✓</span>
      </div>
    );
  }

  return (
    <div
      ref={elRef}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
      style={{ touchAction: 'none' }}
      className={[
        baseClasses,
        'bg-white border-indigo-300 text-gray-800 cursor-grab active:cursor-grabbing hover:border-indigo-500 hover:shadow-lg',
        dragging ? 'ring-2 ring-indigo-400 shadow-xl scale-105' : '',
        shaking ? 'animate-[shake_0.4s_ease-in-out]' : '',
      ].join(' ')}
    >
      <span className="text-xl">{pair.left.emoji}</span>
      <span>{pair.left.text}</span>
    </div>
  );
}

/* ── Main component ── */
export default function MatchingPairsGame({ content, onComplete }) {
  const { title, instruction, leftLabel, rightLabel, pairs } = content;

  const shuffledLeft = useMemo(() => shuffleArray(pairs), [pairs]);
  const shuffledRight = useMemo(() => shuffleArray(pairs), [pairs]);

  const [matchedIds, setMatchedIds] = useState(new Set());
  const [matchColorMap, setMatchColorMap] = useState({});
  const [explanations, setExplanations] = useState({});
  const [wrongId, setWrongId] = useState(null);
  const [allDone, setAllDone] = useState(false);

  // refs for right-column drop targets
  const rightRefs = useRef({});
  const setRightRef = useCallback((id, el) => {
    if (el) rightRefs.current[id] = el;
  }, []);

  // colour index tracker
  const colorIndexRef = useRef(0);

  const handleDrop = useCallback((leftPairId, endPoint, onWrong) => {
    const dropX = endPoint.clientX;
    const dropY = endPoint.clientY;

    // find which right-column target the drop landed on
    let hitId = null;
    for (const [id, el] of Object.entries(rightRefs.current)) {
      const rect = el.getBoundingClientRect();
      if (dropX >= rect.left && dropX <= rect.right && dropY >= rect.top && dropY <= rect.bottom) {
        hitId = id;
        break;
      }
    }

    if (!hitId) return; // dropped nowhere

    if (matchedIds.has(hitId)) return; // target already matched

    if (hitId === leftPairId) {
      // correct match
      const color = MATCH_COLORS[colorIndexRef.current % MATCH_COLORS.length];
      colorIndexRef.current += 1;
      const pair = pairs.find((p) => p.id === leftPairId);

      setMatchedIds((prev) => {
        const next = new Set(prev);
        next.add(leftPairId);
        if (next.size === pairs.length) {
          setTimeout(() => setAllDone(true), 600);
        }
        return next;
      });
      setMatchColorMap((prev) => ({ ...prev, [leftPairId]: color }));
      setExplanations((prev) => ({ ...prev, [leftPairId]: pair?.explanation || '' }));
    } else {
      // wrong match – shake
      onWrong();
      setWrongId(hitId);
      setTimeout(() => setWrongId(null), 500);
    }
  }, [matchedIds, pairs]);

  const matched = matchedIds.size;
  const total = pairs.length;

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6">
      {/* Shake keyframe injected once */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>

      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-2">{title}</h2>
        <p className="text-gray-600 text-base sm:text-lg">{instruction}</p>
      </div>

      {/* Score */}
      <div className="flex justify-center mb-5">
        <div className="bg-indigo-50 border border-indigo-200 rounded-full px-5 py-1.5 text-indigo-700 font-semibold text-sm sm:text-base">
          已配對：{matched}/{total}
        </div>
      </div>

      {/* Column labels */}
      <div className="grid grid-cols-2 gap-4 sm:gap-8 mb-3">
        <div className="text-center font-bold text-indigo-600 text-sm sm:text-base">{leftLabel}</div>
        <div className="text-center font-bold text-purple-600 text-sm sm:text-base">{rightLabel}</div>
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-2 gap-4 sm:gap-8">
        {/* Left column – draggable items */}
        <div className="flex flex-col gap-3">
          {shuffledLeft.map((pair) => {
            const isMatched = matchedIds.has(pair.id);
            const colorStyle = matchColorMap[pair.id] || {};
            return (
              <DraggableLeftItem
                key={pair.id}
                pair={pair}
                matched={isMatched}
                colorStyle={colorStyle}
                onDrop={handleDrop}
              />
            );
          })}
        </div>

        {/* Right column – drop targets */}
        <div className="flex flex-col gap-3">
          {shuffledRight.map((pair) => {
            const isMatched = matchedIds.has(pair.id);
            const colorStyle = matchColorMap[pair.id] || {};
            const isWrong = wrongId === pair.id;

            return (
              <div
                key={pair.id}
                ref={(el) => setRightRef(pair.id, el)}
                className={[
                  'rounded-xl px-4 py-3 font-semibold text-base flex items-center gap-2 transition-all duration-200',
                  isMatched
                    ? `${colorStyle.bg} ${colorStyle.border} ${colorStyle.text} border-2 shadow-md`
                    : 'bg-white border-2 border-dashed border-purple-300 text-gray-700 shadow-sm',
                  isWrong ? 'animate-[shake_0.4s_ease-in-out] border-red-400 bg-red-50' : '',
                ].join(' ')}
              >
                <span className="text-xl">{pair.right.emoji}</span>
                <span>{pair.right.text}</span>
                {isMatched && <span className="ml-auto text-green-500">✓</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Explanations for matched pairs */}
      {Object.keys(explanations).length > 0 && (
        <div className="mt-6 flex flex-col gap-2">
          {pairs
            .filter((p) => explanations[p.id])
            .map((p) => {
              const color = matchColorMap[p.id] || {};
              return (
                <div
                  key={p.id}
                  className={`rounded-lg px-4 py-2.5 text-sm border ${color.border || 'border-gray-200'} ${color.bg || 'bg-gray-50'} ${color.text || 'text-gray-700'} flex items-start gap-2`}
                >
                  <span className="text-lg mt-0.5">💡</span>
                  <span>
                    <strong>{p.left.text} ↔ {p.right.text}：</strong>
                    {explanations[p.id]}
                  </span>
                </div>
              );
            })}
        </div>
      )}

      {/* Celebration overlay */}
      {allDone && (
        <div className="mt-8 text-center bg-gradient-to-r from-emerald-50 via-sky-50 to-violet-50 rounded-2xl p-6 sm:p-8 border-2 border-emerald-300 shadow-lg">
          <div className="text-5xl mb-3">🎉🏆🎉</div>
          <h3 className="text-2xl font-bold text-emerald-700 mb-2">太棒了！全部配對完成！</h3>
          <p className="text-gray-600 mb-5">你已經成功配對了所有 {total} 組，做得好！</p>
          <button
            onClick={() => onComplete?.({ score: total, total })}
            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full text-lg shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
          >
            繼續前進 →
          </button>
        </div>
      )}
    </div>
  );
}
