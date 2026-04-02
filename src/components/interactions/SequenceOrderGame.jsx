import React, { useState, useCallback, useRef, useMemo } from 'react';

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/* ── Draggable item sub-component (own refs/state to avoid hooks in loops) ── */
function DraggableOrderItem({ item, onDrop, disabled }) {
  const elRef = useRef(null);
  const draggingRef = useRef(false);
  const startRef = useRef({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const handleStart = useCallback((e) => {
    if (disabled) return;
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
      onDrop(item.id, endPt);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleEnd);
  }, [disabled, item.id, onDrop]);

  return (
    <div
      ref={elRef}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
      style={{ touchAction: 'none' }}
      className={`
        relative select-none rounded-xl px-4 py-3 font-semibold text-base
        shadow-md border-2 border-indigo-300 bg-white
        cursor-grab active:cursor-grabbing
        transition-shadow duration-200
        ${dragging ? 'shadow-xl ring-2 ring-indigo-400 opacity-90' : 'hover:shadow-lg'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <span className="text-xl mr-2">{item.emoji}</span>
      <span className="text-indigo-800">{item.text}</span>
    </div>
  );
}

/* ── Slot-placed item (draggable out of slot) ── */
function SlotDraggableItem({ item, slotIndex, onDragOut, disabled, result }) {
  const elRef = useRef(null);
  const draggingRef = useRef(false);
  const startRef = useRef({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const handleStart = useCallback((e) => {
    if (disabled) return;
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
      onDragOut(item.id, slotIndex, endPt);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleEnd);
  }, [disabled, item.id, slotIndex, onDragOut]);

  let borderColor = 'border-indigo-300';
  let bgColor = 'bg-white';
  let shake = '';
  if (result === 'correct') {
    borderColor = 'border-green-400';
    bgColor = 'bg-green-50';
  } else if (result === 'wrong') {
    borderColor = 'border-red-400';
    bgColor = 'bg-red-50';
    shake = 'animate-shake';
  }

  return (
    <div
      ref={elRef}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
      style={{ touchAction: 'none' }}
      className={`
        relative select-none rounded-lg px-3 py-2 font-semibold text-sm
        shadow border-2 ${borderColor} ${bgColor}
        cursor-grab active:cursor-grabbing
        transition-all duration-200 w-full
        ${dragging ? 'shadow-lg ring-2 ring-indigo-400 opacity-90' : ''}
        ${disabled ? 'cursor-not-allowed' : ''}
        ${shake}
      `}
    >
      <div className="flex items-center gap-2">
        <span className="text-lg">{item.emoji}</span>
        <span className="text-indigo-800">{item.text}</span>
      </div>
      <div className="text-xs text-gray-500 mt-0.5">{item.detail}</div>
    </div>
  );
}

/* ── Main component ── */
export default function SequenceOrderGame({ content, onComplete }) {
  const { title, instruction, description, items, completionMessage } = content;

  // Correct order is the original items array order
  const correctOrder = useMemo(() => items.map((it) => it.id), [items]);
  const itemMap = useMemo(() => {
    const m = {};
    items.forEach((it) => m[it.id] = it);
    return m;
  }, [items]);

  // Shuffled items for the pool (only on mount)
  const shuffledItems = useMemo(() => {
    let s = shuffleArray(items);
    // Ensure shuffled is different from correct order
    while (s.length > 1 && s.every((it, i) => it.id === correctOrder[i])) {
      s = shuffleArray(items);
    }
    return s;
  }, [items, correctOrder]);

  // slots[i] = itemId or null
  const [slots, setSlots] = useState(() => Array(items.length).fill(null));
  // Track which items are placed (not in pool)
  const placedIds = useMemo(() => new Set(slots.filter(Boolean)), [slots]);
  // Pool items = shuffled items not yet placed
  const poolItems = useMemo(
    () => shuffledItems.filter((it) => !placedIds.has(it.id)),
    [shuffledItems, placedIds]
  );

  const [checkResult, setCheckResult] = useState(null); // null | { results: ('correct'|'wrong')[], wrongCount: number }
  const [completed, setCompleted] = useState(false);
  const [showHints, setShowHints] = useState(false);

  const slotRefs = useRef([]);
  const allFilled = slots.every((s) => s !== null);

  // Find which slot a drop point overlaps
  const findSlotAt = useCallback((clientX, clientY) => {
    for (let i = 0; i < slotRefs.current.length; i++) {
      const el = slotRefs.current[i];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        return i;
      }
    }
    return -1;
  }, []);

  // Drop from pool into a slot
  const handlePoolDrop = useCallback((itemId, endPt) => {
    const slotIdx = findSlotAt(endPt.clientX, endPt.clientY);
    if (slotIdx < 0) return;
    setCheckResult(null);
    setShowHints(false);
    setSlots((prev) => {
      const next = [...prev];
      // If this slot already has an item, swap back to pool automatically
      // (the old item returns to pool since we remove it from slots)
      // If the item was in another slot, remove it from there first
      const existingSlot = next.indexOf(itemId);
      if (existingSlot >= 0) next[existingSlot] = null;
      next[slotIdx] = itemId;
      return next;
    });
  }, [findSlotAt]);

  // Drag item out of a slot (re-place into another slot or back to pool)
  const handleSlotDragOut = useCallback((itemId, fromSlotIdx, endPt) => {
    const targetSlot = findSlotAt(endPt.clientX, endPt.clientY);
    setCheckResult(null);
    setShowHints(false);
    if (targetSlot < 0) {
      // Dropped outside all slots -> return to pool
      setSlots((prev) => {
        const next = [...prev];
        next[fromSlotIdx] = null;
        return next;
      });
    } else if (targetSlot !== fromSlotIdx) {
      // Swap with target slot
      setSlots((prev) => {
        const next = [...prev];
        const targetItem = next[targetSlot];
        next[targetSlot] = itemId;
        next[fromSlotIdx] = targetItem;
        return next;
      });
    }
    // If dropped on same slot, do nothing
  }, [findSlotAt]);

  // Check answers
  const handleCheck = useCallback(() => {
    const results = slots.map((id, i) => (id === correctOrder[i] ? 'correct' : 'wrong'));
    const wrongCount = results.filter((r) => r === 'wrong').length;
    setCheckResult({ results, wrongCount });
    if (wrongCount === 0) {
      setCompleted(true);
    }
  }, [slots, correctOrder]);

  // Reset game
  const handleReset = useCallback(() => {
    setSlots(Array(items.length).fill(null));
    setCheckResult(null);
    setCompleted(false);
    setShowHints(false);
  }, [items.length]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {/* Shake animation */}
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

      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-800 mb-1">{title}</h2>
        <p className="text-lg text-indigo-600 font-medium">{instruction}</p>
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>

      {/* Item pool */}
      {poolItems.length > 0 && (
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-600 mb-2">
            拖曳下方卡片到正確位置：
          </p>
          <div className="flex flex-wrap gap-3 p-4 bg-indigo-50 rounded-2xl border-2 border-dashed border-indigo-200 min-h-[60px]">
            {poolItems.map((item) => (
              <DraggableOrderItem
                key={item.id}
                item={item}
                onDrop={handlePoolDrop}
                disabled={completed}
              />
            ))}
          </div>
        </div>
      )}

      {/* Slots */}
      <div className="space-y-3 mb-6">
        {slots.map((slotItemId, idx) => {
          const slotItem = slotItemId ? itemMap[slotItemId] : null;
          const result = checkResult ? checkResult.results[idx] : null;
          const correctItem = itemMap[correctOrder[idx]];
          const showHintForSlot = showHints && result === 'wrong';

          return (
            <div
              key={idx}
              ref={(el) => { slotRefs.current[idx] = el; }}
              className={`
                flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-200 min-h-[64px]
                ${!slotItem
                  ? 'border-dashed border-gray-300 bg-gray-50'
                  : result === 'correct'
                    ? 'border-green-400 bg-green-50'
                    : result === 'wrong'
                      ? 'border-red-400 bg-red-50'
                      : 'border-indigo-200 bg-white'
                }
              `}
            >
              {/* Number badge */}
              <div className={`
                flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg
                ${result === 'correct'
                  ? 'bg-green-500 text-white'
                  : result === 'wrong'
                    ? 'bg-red-500 text-white'
                    : 'bg-indigo-500 text-white'
                }
              `}>
                {idx + 1}
              </div>

              {/* Slot content */}
              <div className="flex-1">
                {slotItem ? (
                  <SlotDraggableItem
                    item={slotItem}
                    slotIndex={idx}
                    onDragOut={handleSlotDragOut}
                    disabled={completed}
                    result={result}
                  />
                ) : (
                  <div className="text-gray-400 text-sm italic py-2 px-3">
                    拖曳卡片到這裡
                  </div>
                )}
              </div>

              {/* Result indicators */}
              {result === 'correct' && (
                <span className="text-green-500 text-xl flex-shrink-0">&#10003;</span>
              )}
              {result === 'wrong' && (
                <span className="text-red-500 text-xl flex-shrink-0">&#10007;</span>
              )}

              {/* Hint */}
              {showHintForSlot && (
                <div className="flex-shrink-0 text-xs bg-amber-100 text-amber-700 rounded-lg px-2 py-1 border border-amber-300">
                  提示：{correctItem.emoji} {correctItem.text.charAt(0)}...
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Feedback message */}
      {checkResult && !completed && (
        <div className="text-center mb-4 p-3 bg-amber-50 border border-amber-300 rounded-xl">
          <p className="text-amber-700 font-semibold">
            有 {checkResult.wrongCount} 個位置不對，再試試看！
          </p>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        {/* Check answer button */}
        {allFilled && !completed && (
          <button
            onClick={handleCheck}
            className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 active:scale-95 transition-all duration-150 text-lg"
          >
            檢查答案
          </button>
        )}

        {/* Hint button */}
        {checkResult && !completed && !showHints && (
          <button
            onClick={() => setShowHints(true)}
            className="px-5 py-3 bg-amber-500 text-white font-bold rounded-xl shadow hover:bg-amber-600 active:scale-95 transition-all duration-150"
          >
            顯示提示
          </button>
        )}

        {/* Reset button */}
        {!completed && (slots.some((s) => s !== null) || checkResult) && (
          <button
            onClick={handleReset}
            className="px-5 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl shadow hover:bg-gray-300 active:scale-95 transition-all duration-150"
          >
            重新排列
          </button>
        )}
      </div>

      {/* Completion celebration */}
      {completed && (
        <div className="mt-6 text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl shadow-lg">
          <div className="text-5xl mb-3">🎉🏆🎉</div>
          <p className="text-xl font-bold text-green-700 mb-2">全部正確！</p>
          <p className="text-green-600 mb-4">{completionMessage}</p>
          <button
            onClick={onComplete}
            className="px-8 py-3 bg-green-600 text-white font-bold rounded-xl shadow-lg hover:bg-green-700 active:scale-95 transition-all duration-150 text-lg"
          >
            繼續
          </button>
        </div>
      )}
    </div>
  );
}
