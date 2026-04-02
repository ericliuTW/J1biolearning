import React, { useState, useCallback, useRef, useMemo } from 'react';

const ITEMS = [
  {
    id: 'shape',
    emoji: '🦴',
    label: '古代生物的外型／骨骼結構',
    canKnow: true,
    explanation: '骨骼、外殼等硬組織容易形成化石，所以我們可以從化石推知古代生物的外型和骨骼結構。',
  },
  {
    id: 'color',
    emoji: '🎨',
    label: '古代生物的體色',
    canKnow: false,
    explanation: '皮膚、顏色等軟組織通常無法保存為化石，所以我們無法從化石得知古代生物的真正顏色。電影裡恐龍的顏色都是推測的喔！',
  },
  {
    id: 'era',
    emoji: '📅',
    label: '古代生物生存的年代',
    canKnow: true,
    explanation: '科學家可以用放射性定年法測定化石所在岩層的年齡，進而推知該生物生存的年代。',
  },
  {
    id: 'behavior',
    emoji: '🔊',
    label: '古代生物的行為／叫聲',
    canKnow: false,
    explanation: '行為和叫聲不會留下直接的痕跡，化石無法記錄聲音或動態行為，所以我們無法確切知道古生物的叫聲或行為模式。',
  },
  {
    id: 'environment',
    emoji: '🌿',
    label: '古代的環境／氣候',
    canKnow: true,
    explanation: '化石的種類可以反映當時的環境。例如在陸地上發現海洋生物化石，就代表那裡過去曾是海洋。花粉化石也能幫助推測古代氣候！',
  },
  {
    id: 'dna',
    emoji: '🧬',
    label: '古代生物的 DNA 序列',
    canKnow: 'partial',
    explanation: 'DNA 會隨時間降解，大多數化石中的 DNA 已經消失。但在極少數保存條件特別好的情況下（如琥珀或永凍土中），科學家曾成功提取出部分 DNA 片段。所以答案是「部分可以」！',
  },
];

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function DraggableItem({ item, onSorted, binCanRef, binCannotRef, sorted }) {
  const [dragging, setDragging] = useState(false);
  const elRef = useRef(null);
  const draggingRef = useRef(false);
  const startRef = useRef({ x: 0, y: 0 });

  const getXY = (e) => {
    if (e.touches) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    return { x: e.clientX, y: e.clientY };
  };

  const handleStart = useCallback((e) => {
    if (sorted) return;
    e.preventDefault();
    const { x, y } = getXY(e);
    startRef.current = { x, y };
    draggingRef.current = true;
    setDragging(true);
    if (elRef.current) {
      elRef.current.style.transform = 'translate(0px, 0px)';
      elRef.current.style.zIndex = '50';
    }

    const handleMove = (ev) => {
      if (!draggingRef.current) return;
      ev.preventDefault();
      const pt = ev.touches ? ev.touches[0] : ev;
      const dx = pt.clientX - startRef.current.x;
      const dy = pt.clientY - startRef.current.y;
      if (elRef.current) elRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
    };

    const handleEnd = (ev) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      setDragging(false);
      const endPoint = ev.changedTouches ? ev.changedTouches[0] : ev;

      let droppedBin = null;
      const canRect = binCanRef.current?.getBoundingClientRect();
      const cannotRect = binCannotRef.current?.getBoundingClientRect();

      if (canRect && endPoint.clientX >= canRect.left && endPoint.clientX <= canRect.right && endPoint.clientY >= canRect.top && endPoint.clientY <= canRect.bottom) {
        droppedBin = 'can';
      } else if (cannotRect && endPoint.clientX >= cannotRect.left && endPoint.clientX <= cannotRect.right && endPoint.clientY >= cannotRect.top && endPoint.clientY <= cannotRect.bottom) {
        droppedBin = 'cannot';
      }

      if (elRef.current) {
        elRef.current.style.transform = 'translate(0px, 0px)';
        elRef.current.style.zIndex = '1';
      }

      if (droppedBin) {
        onSorted(item, droppedBin);
      }

      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleEnd);
  }, [sorted, item, onSorted, binCanRef, binCannotRef]);

  if (sorted) return null;

  return (
    <div
      ref={elRef}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
      className={`
        relative select-none cursor-grab active:cursor-grabbing
        bg-white border-2 border-amber-300 rounded-xl px-4 py-3
        flex items-center gap-3 shadow-md
        transition-shadow duration-200
        ${dragging ? 'shadow-xl ring-2 ring-amber-400 opacity-90' : 'hover:shadow-lg hover:border-amber-400'}
      `}
      style={{ touchAction: 'none', position: 'relative', zIndex: 1 }}
    >
      <span className="text-2xl flex-shrink-0">{item.emoji}</span>
      <span className="text-base font-medium text-gray-800 leading-tight">{item.label}</span>
      <span className="ml-auto text-gray-400 text-lg flex-shrink-0">⠿</span>
    </div>
  );
}

export default function FossilSortingGame({ content, onComplete }) {
  const shuffledItems = useMemo(() => shuffleArray(ITEMS), []);

  const [sortedItems, setSortedItems] = useState({});
  const [feedbackItem, setFeedbackItem] = useState(null);
  const [feedbackCorrect, setFeedbackCorrect] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(new Set());
  const [showSuccess, setShowSuccess] = useState(false);

  const binCanRef = useRef(null);
  const binCannotRef = useRef(null);

  const sortedCount = Object.keys(sortedItems).length;
  const allSorted = sortedCount === ITEMS.length;

  const handleSorted = useCallback((item, bin) => {
    const isCorrectCan = item.canKnow === true && bin === 'can';
    const isCorrectCannot = item.canKnow === false && bin === 'cannot';
    const isPartial = item.canKnow === 'partial';
    const isCorrectPartial = isPartial && (bin === 'can');

    const isCorrect = isCorrectCan || isCorrectCannot || isCorrectPartial;

    if (isCorrect) {
      setSortedItems((prev) => ({ ...prev, [item.id]: bin }));
      setFeedbackItem(item);
      setFeedbackCorrect(true);
      setWrongAttempts((prev) => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });

      const newCount = sortedCount + 1;
      if (newCount === ITEMS.length) {
        setTimeout(() => setShowSuccess(true), 600);
      }
    } else {
      setFeedbackItem(item);
      setFeedbackCorrect(false);
      setWrongAttempts((prev) => new Set([...prev, item.id]));
    }
  }, [sortedCount]);

  const dismissFeedback = useCallback(() => {
    setFeedbackItem(null);
  }, []);

  const canBinItems = ITEMS.filter((it) => sortedItems[it.id] === 'can');
  const cannotBinItems = ITEMS.filter((it) => sortedItems[it.id] === 'cannot');

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6">
      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-amber-700 mb-2">
          化石資訊分類遊戲
        </h2>
        <p className="text-lg text-amber-600">
          {content?.instruction || '拖拉每個項目到正確的分類框中！'}
        </p>
      </div>

      {/* Drop Bins */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
        {/* CAN know bin */}
        <div
          ref={binCanRef}
          className="bg-gradient-to-b from-green-50 to-emerald-50 border-3 border-dashed border-green-400 rounded-2xl p-3 sm:p-4 min-h-[140px] transition-all duration-300"
        >
          <div className="text-center mb-3">
            <span className="inline-block bg-green-500 text-white text-sm sm:text-base font-bold px-4 py-1.5 rounded-full shadow-sm">
              ✅ 化石可以告訴我們的事
            </span>
          </div>
          <div className="space-y-2">
            {canBinItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-green-300 rounded-lg px-3 py-2 flex items-center gap-2 animate-drop-in"
              >
                <span className="text-xl">{item.emoji}</span>
                <span className="text-sm font-medium text-green-800 leading-tight">{item.label}</span>
              </div>
            ))}
            {canBinItems.length === 0 && (
              <p className="text-green-400 text-sm text-center py-4">
                拖拉項目到這裡
              </p>
            )}
          </div>
        </div>

        {/* CANNOT know bin */}
        <div
          ref={binCannotRef}
          className="bg-gradient-to-b from-red-50 to-orange-50 border-3 border-dashed border-red-400 rounded-2xl p-3 sm:p-4 min-h-[140px] transition-all duration-300"
        >
          <div className="text-center mb-3">
            <span className="inline-block bg-red-500 text-white text-sm sm:text-base font-bold px-4 py-1.5 rounded-full shadow-sm">
              ❌ 化石無法告訴我們的事
            </span>
          </div>
          <div className="space-y-2">
            {cannotBinItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-red-300 rounded-lg px-3 py-2 flex items-center gap-2 animate-drop-in"
              >
                <span className="text-xl">{item.emoji}</span>
                <span className="text-sm font-medium text-red-800 leading-tight">{item.label}</span>
              </div>
            ))}
            {cannotBinItems.length === 0 && (
              <p className="text-red-400 text-sm text-center py-4">
                拖拉項目到這裡
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Unsorted items */}
      {!allSorted && (
        <div className="bg-gradient-to-b from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl p-4 sm:p-5 mb-5">
          <h3 className="text-base font-bold text-amber-700 mb-3 text-center">
            📦 待分類的項目（拖拉到上方的分類框）
          </h3>
          <div className="space-y-3">
            {shuffledItems.map((item) => (
              <DraggableItem
                key={item.id}
                item={item}
                sorted={!!sortedItems[item.id]}
                onSorted={handleSorted}
                binCanRef={binCanRef}
                binCannotRef={binCannotRef}
              />
            ))}
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {feedbackItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-slide-up">
            <div className="text-center mb-3">
              <span className="text-5xl">{feedbackCorrect ? '🎯' : '🤔'}</span>
            </div>
            <h3 className={`text-xl font-bold text-center mb-2 ${feedbackCorrect ? 'text-green-700' : 'text-orange-700'}`}>
              {feedbackCorrect ? '答對了！' : '再想想看！'}
            </h3>
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-2xl">{feedbackItem.emoji}</span>
              <span className="font-medium text-gray-800">{feedbackItem.label}</span>
            </div>
            {feedbackCorrect ? (
              <div className={`rounded-xl p-4 mb-5 ${feedbackItem.canKnow === 'partial' ? 'bg-yellow-50 border border-yellow-300' : feedbackItem.canKnow ? 'bg-green-50 border border-green-300' : 'bg-red-50 border border-red-300'}`}>
                {feedbackItem.canKnow === 'partial' && (
                  <p className="text-sm font-bold text-yellow-700 mb-1">⚡ 特殊情況：部分可以！</p>
                )}
                <p className="text-base text-gray-700 leading-relaxed">
                  {feedbackItem.explanation}
                </p>
              </div>
            ) : (
              <p className="text-base text-gray-600 text-center mb-5 leading-relaxed">
                這個項目放錯分類了喔！再仔細想想，化石能不能告訴我們「{feedbackItem.label}」呢？
              </p>
            )}
            <div className="text-center">
              <button
                onClick={dismissFeedback}
                className={`px-6 py-2.5 text-white font-bold text-lg rounded-full transition-all duration-200 active:scale-95 shadow-md ${
                  feedbackCorrect ? 'bg-green-500 hover:bg-green-600' : 'bg-orange-500 hover:bg-orange-600'
                }`}
              >
                {feedbackCorrect ? '繼續分類！' : '再試一次！'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-amber-700">
            已分類 {sortedCount}/{ITEMS.length} 個項目
          </span>
          <span className="text-sm text-amber-500">
            {Math.round((sortedCount / ITEMS.length) * 100)}%
          </span>
        </div>
        <div className="w-full h-3 bg-amber-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500"
            style={{ width: `${(sortedCount / ITEMS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Success */}
      {showSuccess && (
        <div className="mt-6 text-center bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-6 animate-slide-up">
          <span className="text-5xl block mb-3">🏆</span>
          <h3 className="text-xl font-bold text-green-700 mb-2">太厲害了！全部分類完成！</h3>
          <p className="text-lg text-green-600 mb-4">你已經學會從化石能得到哪些資訊了！</p>
          <button
            onClick={onComplete}
            className="px-10 py-3 bg-green-600 text-white text-lg font-bold rounded-xl
              hover:bg-green-700 active:scale-95 transition-all duration-200 shadow-lg"
          >
            完成學習 🚀
          </button>
        </div>
      )}

      {/* Inline keyframes */}
      <style>{`
        @keyframes dropIn {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.05); }
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
        .animate-drop-in { animation: dropIn 0.4s ease-out; }
        .animate-slide-up { animation: slideUp 0.4s ease-out; }
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </div>
  );
}
