import React, { useState, useCallback, useRef, useMemo } from 'react';

const COLOR_MAP = {
  green:  { border: 'border-green-400',  bg: 'bg-green-50',  header: 'bg-green-100', text: 'text-green-700',  ring: 'ring-green-400',  flash: 'bg-green-200' },
  amber:  { border: 'border-amber-400',  bg: 'bg-amber-50',  header: 'bg-amber-100', text: 'text-amber-700',  ring: 'ring-amber-400',  flash: 'bg-amber-200' },
  blue:   { border: 'border-blue-400',   bg: 'bg-blue-50',   header: 'bg-blue-100',  text: 'text-blue-700',   ring: 'ring-blue-400',   flash: 'bg-blue-200' },
  red:    { border: 'border-red-400',    bg: 'bg-red-50',    header: 'bg-red-100',   text: 'text-red-700',    ring: 'ring-red-400',    flash: 'bg-red-200' },
  purple: { border: 'border-purple-400', bg: 'bg-purple-50', header: 'bg-purple-100',text: 'text-purple-700', ring: 'ring-purple-400', flash: 'bg-purple-200' },
  teal:   { border: 'border-teal-400',   bg: 'bg-teal-50',   header: 'bg-teal-100',  text: 'text-teal-700',   ring: 'ring-teal-400',   flash: 'bg-teal-200' },
  orange: { border: 'border-orange-400', bg: 'bg-orange-50', header: 'bg-orange-100',text: 'text-orange-700', ring: 'ring-orange-400', flash: 'bg-orange-200' },
  pink:   { border: 'border-pink-400',   bg: 'bg-pink-50',   header: 'bg-pink-100',  text: 'text-pink-700',   ring: 'ring-pink-400',   flash: 'bg-pink-200' },
};

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function DraggableItem({ item, onDrop, sorted }) {
  const elRef = useRef(null);
  const draggingRef = useRef(false);
  const startRef = useRef({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleStart = useCallback((e) => {
    if (sorted) return;
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
      onDrop(item.id, endPt, () => {
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
  }, [sorted, item.id, onDrop]);

  if (sorted) return null;

  return (
    <div
      ref={elRef}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
      className={`
        select-none cursor-grab active:cursor-grabbing
        px-3 py-2 rounded-xl bg-white border-2 border-gray-200
        shadow-md hover:shadow-lg transition-shadow
        flex items-center gap-2 text-sm font-medium
        ${dragging ? 'opacity-75 scale-105' : ''}
        ${shaking ? 'animate-shake' : ''}
      `}
      style={{ touchAction: 'none', position: 'relative', zIndex: 1 }}
    >
      <span className="text-xl">{item.emoji}</span>
      <span>{item.text}</span>
    </div>
  );
}

export default function CategorySortGame({ content, onComplete }) {
  const { title, instruction, categories, items } = content;

  const [shuffledItems] = useState(() => shuffleArray([...items]));
  const [sortedItems, setSortedItems] = useState({});
  const [flashingBin, setFlashingBin] = useState(null);
  const [flashType, setFlashType] = useState(null);
  const binRefs = useRef({});

  const sortedCount = Object.keys(sortedItems).length;
  const totalCount = items.length;
  const allSorted = sortedCount === totalCount;

  const handleDrop = useCallback((itemId, endPoint, onWrong) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    let droppedOnCategoryId = null;
    for (const cat of categories) {
      const binEl = binRefs.current[cat.id];
      if (!binEl) continue;
      const rect = binEl.getBoundingClientRect();
      if (
        endPoint.clientX >= rect.left &&
        endPoint.clientX <= rect.right &&
        endPoint.clientY >= rect.top &&
        endPoint.clientY <= rect.bottom
      ) {
        droppedOnCategoryId = cat.id;
        break;
      }
    }

    if (!droppedOnCategoryId) return;

    if (droppedOnCategoryId === item.categoryId) {
      setSortedItems(prev => ({ ...prev, [itemId]: droppedOnCategoryId }));
      setFlashingBin(droppedOnCategoryId);
      setFlashType('correct');
      setTimeout(() => { setFlashingBin(null); setFlashType(null); }, 600);
    } else {
      setFlashingBin(droppedOnCategoryId);
      setFlashType('wrong');
      setTimeout(() => { setFlashingBin(null); setFlashType(null); }, 600);
      onWrong?.();
    }
  }, [items, categories]);

  const itemsByCategory = useMemo(() => {
    const map = {};
    categories.forEach(cat => { map[cat.id] = []; });
    Object.entries(sortedItems).forEach(([itemId, catId]) => {
      const item = items.find(i => i.id === itemId);
      if (item) map[catId]?.push(item);
    });
    return map;
  }, [sortedItems, items, categories]);

  const unsortedItems = shuffledItems.filter(item => !sortedItems[item.id]);

  return (
    <div className="space-y-5">
      {/* Title & Instruction */}
      <div className="text-center space-y-1">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-500 text-sm">{instruction}</p>
      </div>

      {/* Score */}
      <div className="text-center">
        <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
          已分類：{sortedCount}/{totalCount}
        </span>
      </div>

      {/* Draggable Items */}
      {!allSorted && (
        <div className="flex flex-wrap gap-2 justify-center p-3 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 min-h-[60px]">
          {unsortedItems.map(item => (
            <DraggableItem
              key={item.id}
              item={item}
              sorted={false}
              onDrop={handleDrop}
            />
          ))}
        </div>
      )}

      {/* Category Bins */}
      <div className={`grid gap-3 ${
        categories.length <= 2 ? 'grid-cols-1 sm:grid-cols-2' :
        categories.length <= 4 ? 'grid-cols-2' :
        'grid-cols-2 lg:grid-cols-3'
      }`}>
        {categories.map(cat => {
          const colors = COLOR_MAP[cat.color] || COLOR_MAP.blue;
          const isFlashing = flashingBin === cat.id;
          const isCorrectFlash = isFlashing && flashType === 'correct';
          const isWrongFlash = isFlashing && flashType === 'wrong';
          const sortedInBin = itemsByCategory[cat.id] || [];

          return (
            <div
              key={cat.id}
              ref={el => { binRefs.current[cat.id] = el; }}
              className={`
                rounded-xl border-2 overflow-hidden transition-all duration-300
                ${colors.border} ${colors.bg}
                ${isCorrectFlash ? `ring-4 ${colors.ring} ${colors.flash}` : ''}
                ${isWrongFlash ? 'ring-4 ring-red-400 bg-red-100 animate-shake' : ''}
              `}
            >
              {/* Bin Header */}
              <div className={`px-3 py-2 ${colors.header} flex items-center gap-2`}>
                <span className="text-lg">{cat.emoji}</span>
                <span className={`font-bold text-sm ${colors.text}`}>{cat.name}</span>
                {sortedInBin.length > 0 && (
                  <span className={`ml-auto text-xs font-semibold ${colors.text} opacity-70`}>
                    {sortedInBin.length}
                  </span>
                )}
              </div>

              {/* Sorted Items in Bin */}
              <div className="p-2 min-h-[50px] space-y-1.5">
                {sortedInBin.length === 0 && (
                  <p className="text-xs text-gray-400 text-center py-2">
                    拖拉項目到這裡
                  </p>
                )}
                {sortedInBin.map(item => (
                  <div
                    key={item.id}
                    className="bg-white/80 rounded-lg px-2.5 py-1.5 text-sm border border-white/50 animate-fadeIn"
                  >
                    <div className="flex items-center gap-1.5 font-medium">
                      <span>{item.emoji}</span>
                      <span>{item.text}</span>
                      <span className="text-green-500 ml-auto">✓</span>
                    </div>
                    {item.explanation && (
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                        {item.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion */}
      {allSorted && (
        <div className="text-center space-y-4 py-4 animate-fadeIn">
          <div className="text-4xl">🎉</div>
          <p className="text-lg font-bold text-green-700">
            太棒了！全部分類正確！
          </p>
          <p className="text-sm text-gray-500">
            你已經成功將所有項目分到正確的類別中。
          </p>
          {onComplete && (
            <button
              onClick={onComplete}
              className="mt-2 px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95"
            >
              繼續 →
            </button>
          )}
        </div>
      )}

      {/* Inline keyframes for animations */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
