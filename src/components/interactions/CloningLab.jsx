import React, { useState, useEffect, useRef, useCallback } from 'react';

// --- Small SVG components ---
function DnaHelix({ size = 20, color = '#0d4f4f' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ opacity: 0.7 }}>
      <path d="M8 2c0 4 8 4 8 8s-8 4-8 8 8 4 8 8" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M16 2c0 4-8 4-8 8s8 4 8 8-8 4-8 8" stroke={color} strokeWidth="1.5" fill="none" />
      <line x1="9" y1="6" x2="15" y2="6" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="9" y1="10" x2="15" y2="10" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="9" y1="14" x2="15" y2="14" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="9" y1="18" x2="15" y2="18" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function CartoonOvary({ highlight, children }) {
  return (
    <div className="relative flex flex-col items-center">
      <svg width="140" height="100" viewBox="0 0 140 100">
        {/* Fallopian tube */}
        <path d="M120 50 Q140 50 140 35 Q140 20 130 20" stroke="#e8a0bf" strokeWidth="4" fill="none" />
        {/* Ovary body */}
        <ellipse cx="65" cy="50" rx="55" ry="40" fill="#f9c4d8" stroke="#e8a0bf" strokeWidth="2.5" />
        {/* Follicles */}
        <circle cx="35" cy="38" r="8" fill="#f0e0e8" stroke="#dda0c0" strokeWidth="1" />
        <circle cx="50" cy="62" r="6" fill="#f0e0e8" stroke="#dda0c0" strokeWidth="1" />
        <circle cx="80" cy="35" r="7" fill="#f0e0e8" stroke="#dda0c0" strokeWidth="1" />
        {/* The main egg cell (highlighted) */}
        <circle cx="85" cy="58" r="12" fill={highlight ? '#d8b4fe' : '#f0e0e8'} stroke={highlight ? '#a855f7' : '#dda0c0'} strokeWidth={highlight ? '2.5' : '1'} className={highlight ? 'cloning-pulse-cell' : ''} />
        {highlight && <circle cx="85" cy="58" r="4" fill="#7c3aed" opacity="0.6" />}
      </svg>
      <span className="text-xs text-pink-600 font-bold mt-1">卵巢</span>
      {children}
    </div>
  );
}

function CellNucleus({ size = 16, color = '#0d4f4f' }) {
  return (
    <div className="flex items-center justify-center" style={{ width: size, height: size }}>
      <DnaHelix size={size} color={color} />
    </div>
  );
}

// --- Drag hook (uses ref + direct DOM for smooth tracking) ---
function useDrag(onDrop) {
  const [dragging, setDragging] = useState(false);
  const [dropped, setDropped] = useState(false);
  const elRef = useRef(null);
  const dropTargetRef = useRef(null);
  const draggingRef = useRef(false);
  const startRef = useRef({ x: 0, y: 0 });
  const onDropRef = useRef(onDrop);
  onDropRef.current = onDrop;

  const getXY = (e) => {
    if (e.touches) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    return { x: e.clientX, y: e.clientY };
  };

  const handleStart = useCallback((e) => {
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
      if (elRef.current) {
        elRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
      }
    };

    const handleEnd = (ev) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      setDragging(false);

      const endPoint = ev.changedTouches ? ev.changedTouches[0] : ev;
      const target = dropTargetRef.current;
      let success = false;
      if (target) {
        const rect = target.getBoundingClientRect();
        if (
          endPoint.clientX >= rect.left &&
          endPoint.clientX <= rect.right &&
          endPoint.clientY >= rect.top &&
          endPoint.clientY <= rect.bottom
        ) {
          success = true;
        }
      }

      if (elRef.current) {
        elRef.current.style.transform = 'translate(0px, 0px)';
        elRef.current.style.zIndex = '1';
      }

      if (success) {
        setDropped(true);
        onDropRef.current?.();
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
  }, []);

  return { dragging, dropped, handleStart, elRef, dropTargetRef };
}

// ======== MAIN COMPONENT ========
export default function CloningLab({ content, onComplete }) {
  const { title } = content;
  const [stage, setStage] = useState(1);
  const [actionDone, setActionDone] = useState(false);
  const [showKnowledge, setShowKnowledge] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  // Stage 5
  const [divisionStep, setDivisionStep] = useState(0);
  const [divisionDone, setDivisionDone] = useState(false);
  // Stage 6
  const [showAnswer, setShowAnswer] = useState(false);
  const [showFacts, setShowFacts] = useState(false);

  const completeAction = useCallback(() => {
    setActionDone(true);
    setTimeout(() => setShowKnowledge(true), 300);
  }, []);

  // Drag hooks for each stage
  const drag1 = useDrag(completeAction);
  const drag2 = useDrag(completeAction);
  const drag3 = useDrag(completeAction);
  const drag4 = useDrag(completeAction);
  const drag5 = useDrag(completeAction);

  // Cell division for stage 5
  useEffect(() => {
    if (stage === 5 && !divisionDone) {
      const timer = setInterval(() => {
        setDivisionStep((prev) => {
          if (prev >= 4) {
            clearInterval(timer);
            setDivisionDone(true);
            return 4;
          }
          return prev + 1;
        });
      }, 700);
      return () => clearInterval(timer);
    }
  }, [stage, divisionDone]);

  const goNextStage = () => {
    setFadingOut(true);
    setTimeout(() => {
      setStage((s) => s + 1);
      setActionDone(false);
      setShowKnowledge(false);
      setFadingOut(false);
      setDivisionStep(0);
      setDivisionDone(false);
    }, 400);
  };

  const stageLabels = [
    '取得乳腺細胞', '取得卵細胞', '去除卵細胞核',
    '細胞融合', '胚胎發育 & 植入', '桃莉誕生！',
  ];

  // --- Renderers ---

  const renderStage1 = () => (
    <div className="cloning-bench flex flex-col md:flex-row items-center justify-center gap-8 min-h-[280px]">
      {/* White-face sheep with draggable cell */}
      <div className="flex flex-col items-center">
        <span className="text-6xl md:text-7xl">🐑</span>
        <span className="mt-1 px-3 py-1 bg-white rounded-full text-sm font-bold text-gray-700 shadow-sm border">
          白面母羊
        </span>
        {!actionDone && (
          <div
            ref={drag1.elRef}
            className={`mt-3 cursor-grab active:cursor-grabbing select-none touch-none relative ${drag1.dragging ? '' : 'cloning-pulse-cell'}`}
            onMouseDown={drag1.handleStart}
            onTouchStart={drag1.handleStart}
          >
            <div className="w-14 h-14 rounded-full cloning-mammary-cell flex items-center justify-center shadow-lg">
              <CellNucleus size={20} color="#064e3b" />
            </div>
            <span className="block text-xs text-teal-600 text-center mt-1 font-medium">
              {drag1.dragging ? '放開！' : '拖拉我 →'}
            </span>
          </div>
        )}
      </div>

      {/* Drop target: petri dish */}
      <div className="flex flex-col items-center" ref={drag1.dropTargetRef}>
        <div
          className={`w-28 h-28 rounded-full border-3 border-dashed flex items-center justify-center shadow-inner transition-all duration-300 ${
            actionDone
              ? 'border-teal-400 bg-teal-50'
              : drag1.dragging
              ? 'border-teal-400 bg-teal-50/50 scale-110'
              : 'border-gray-300 bg-white'
          }`}
        >
          {actionDone ? (
            <div className="cloning-fade-in flex flex-col items-center">
              <div className="w-14 h-14 rounded-full cloning-mammary-cell flex items-center justify-center">
                <CellNucleus size={20} color="#064e3b" />
              </div>
            </div>
          ) : (
            <span className="text-gray-300 text-xs">放在這裡</span>
          )}
        </div>
        <span className="mt-1 text-xs font-medium text-gray-400">培養皿</span>
        {actionDone && (
          <span className="text-xs font-medium text-teal-700 cloning-fade-in mt-1">
            乳腺細胞 (含完整DNA)
          </span>
        )}
      </div>
    </div>
  );

  const renderStage2 = () => (
    <div className="cloning-bench flex flex-col md:flex-row items-center justify-center gap-6 min-h-[280px]">
      {/* Mammary cell already in dish */}
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-full border-2 border-teal-400 bg-teal-50 flex items-center justify-center shadow-inner">
          <div className="w-10 h-10 rounded-full cloning-mammary-cell flex items-center justify-center">
            <CellNucleus size={14} color="#064e3b" />
          </div>
        </div>
        <span className="mt-1 text-xs font-medium text-teal-700">乳腺細胞</span>
      </div>

      {/* Cartoon ovary with draggable egg */}
      <div className="flex flex-col items-center relative">
        <CartoonOvary highlight={!actionDone}>
          {!actionDone && (
            <div
              ref={drag2.elRef}
              className="absolute cursor-grab active:cursor-grabbing select-none touch-none"
              style={{ right: '12px', bottom: '30px' }}
              onMouseDown={drag2.handleStart}
              onTouchStart={drag2.handleStart}
            >
              <div className="w-10 h-10 rounded-full cloning-egg-cell flex items-center justify-center shadow-lg border-2 border-purple-300">
                <CellNucleus size={14} color="#4c1d95" />
              </div>
              <span className="block text-xs text-purple-500 text-center mt-0.5 font-medium whitespace-nowrap">
                {drag2.dragging ? '放開！' : '拖拉卵 →'}
              </span>
            </div>
          )}
        </CartoonOvary>
        <span className="text-xs text-gray-500 mt-1">黑面母羊的卵巢</span>
      </div>

      {/* Drop target: second petri dish */}
      <div className="flex flex-col items-center" ref={drag2.dropTargetRef}>
        <div
          className={`w-28 h-28 rounded-full border-3 border-dashed flex items-center justify-center shadow-inner transition-all duration-300 ${
            actionDone
              ? 'border-purple-400 bg-purple-50'
              : drag2.dragging
              ? 'border-purple-400 bg-purple-50/50 scale-110'
              : 'border-gray-300 bg-white'
          }`}
        >
          {actionDone ? (
            <div className="cloning-fade-in">
              <div className="w-14 h-14 rounded-full cloning-egg-cell flex items-center justify-center">
                <CellNucleus size={18} color="#4c1d95" />
              </div>
            </div>
          ) : (
            <span className="text-gray-300 text-xs">放在這裡</span>
          )}
        </div>
        <span className="mt-1 text-xs font-medium text-gray-400">培養皿</span>
        {actionDone && (
          <span className="text-xs font-medium text-purple-700 cloning-fade-in mt-1">卵細胞</span>
        )}
      </div>
    </div>
  );

  const renderStage3 = () => (
    <div className="cloning-bench flex flex-col items-center justify-center gap-6 min-h-[280px]">
      <p className="text-sm text-gray-500">把細胞核從卵細胞中拖出來！</p>
      {/* Large egg cell */}
      <div className="relative">
        <div className="w-36 h-36 rounded-full cloning-egg-cell flex items-center justify-center shadow-xl border-2 border-purple-300">
          {!actionDone && (
            <div
              ref={drag3.elRef}
              className={`cursor-grab active:cursor-grabbing select-none touch-none relative ${drag3.dragging ? '' : 'cloning-pulse-cell'}`}
              onMouseDown={drag3.handleStart}
              onTouchStart={drag3.handleStart}
            >
              <div className="w-14 h-14 rounded-full bg-purple-900/70 flex items-center justify-center">
                <CellNucleus size={20} color="#e9d5ff" />
              </div>
              <span className="block text-xs text-purple-200 text-center mt-0.5 font-medium">
                細胞核
              </span>
            </div>
          )}
          {actionDone && (
            <span className="text-purple-200 text-sm font-medium">空</span>
          )}
        </div>
      </div>

      {/* Drop target: trash / pipette area */}
      <div className="flex items-center gap-3" ref={drag3.dropTargetRef}>
        <div
          className={`w-20 h-20 rounded-lg border-2 border-dashed flex flex-col items-center justify-center transition-all duration-300 ${
            drag3.dragging
              ? 'border-red-400 bg-red-50 scale-110'
              : actionDone
              ? 'border-green-400 bg-green-50'
              : 'border-gray-300 bg-gray-50'
          }`}
        >
          <span className="text-2xl">🧪</span>
          <span className="text-xs text-gray-400 mt-0.5">
            {actionDone ? '已移除' : '放這裡'}
          </span>
        </div>
      </div>

      {actionDone && (
        <div className="flex items-center gap-2 cloning-fade-in">
          <div className="w-28 h-28 rounded-full border-2 border-dashed border-purple-300 bg-purple-50/50 flex items-center justify-center">
            <span className="text-purple-300 text-xs">只剩細胞質</span>
          </div>
        </div>
      )}
    </div>
  );

  const renderStage4 = () => (
    <div className="cloning-bench flex flex-col md:flex-row items-center justify-center gap-8 min-h-[280px]">
      {/* Mammary cell (draggable) */}
      {!actionDone && (
        <div className="flex flex-col items-center">
          <div
            ref={drag4.elRef}
            className={`cursor-grab active:cursor-grabbing select-none touch-none relative ${drag4.dragging ? '' : 'cloning-pulse-cell'}`}
            onMouseDown={drag4.handleStart}
            onTouchStart={drag4.handleStart}
          >
            <div className="w-16 h-16 rounded-full cloning-mammary-cell flex items-center justify-center shadow-lg">
              <CellNucleus size={20} color="#064e3b" />
            </div>
            <span className="block text-xs text-teal-600 text-center mt-1 font-medium">
              {drag4.dragging ? '放到卵細胞！' : '拖拉融合 →'}
            </span>
          </div>
          <span className="mt-1 text-xs font-medium text-teal-700">乳腺細胞</span>
        </div>
      )}

      {/* Empty egg cell (drop target) / Fused cell */}
      <div className="flex flex-col items-center" ref={drag4.dropTargetRef}>
        {!actionDone ? (
          <div
            className={`w-28 h-28 rounded-full border-2 border-dashed flex items-center justify-center transition-all duration-300 ${
              drag4.dragging
                ? 'border-teal-400 bg-teal-50/50 scale-110'
                : 'border-purple-300 bg-purple-50/50'
            }`}
          >
            <span className="text-purple-300 text-xs">卵細胞（無核）</span>
          </div>
        ) : (
          <div className="cloning-fade-in">
            <div className="w-32 h-32 rounded-full cloning-fused-cell flex items-center justify-center shadow-2xl cloning-glow">
              <div className="flex flex-col items-center">
                <CellNucleus size={24} color="#e2e8f0" />
                <span className="text-xs text-white/80 mt-0.5">DNA</span>
              </div>
            </div>
            <p className="mt-2 text-center text-sm font-bold text-teal-700">
              融合細胞 ⚡
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderStage5 = () => (
    <div className="cloning-bench flex flex-col items-center justify-center gap-6 min-h-[280px]">
      {/* Cell division animation */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          {['1', '2', '4', '8', '🧫'].map((label, i) => (
            <React.Fragment key={i}>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                  i <= divisionStep
                    ? 'cloning-fused-cell text-white scale-100 opacity-100'
                    : 'bg-gray-200 text-gray-400 scale-75 opacity-40'
                }`}
              >
                {label}
              </div>
              {i < 4 && (
                <span className={`text-lg transition-opacity duration-300 ${i < divisionStep ? 'opacity-100' : 'opacity-20'}`}>
                  →
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
        <p className="text-sm text-gray-500 font-medium">
          {divisionDone ? '胚胎發育完成！' : '細胞分裂中...'}
        </p>
      </div>

      {/* Surrogate sheep - drag embryo to it */}
      {divisionDone && (
        <div className="flex flex-col md:flex-row items-center gap-8 cloning-fade-in">
          {/* Draggable embryo */}
          {!actionDone && (
            <div
              ref={drag5.elRef}
              className={`cursor-grab active:cursor-grabbing select-none touch-none relative ${drag5.dragging ? '' : 'cloning-pulse-cell'}`}
              onMouseDown={drag5.handleStart}
              onTouchStart={drag5.handleStart}
            >
              <div className="w-16 h-16 rounded-full cloning-fused-cell flex items-center justify-center shadow-lg text-2xl">
                🧫
              </div>
              <span className="block text-xs text-teal-600 text-center mt-1 font-medium">
                {drag5.dragging ? '放到代理孕母！' : '拖拉胚胎 →'}
              </span>
            </div>
          )}

          {/* Drop target: surrogate sheep */}
          <div className="flex flex-col items-center" ref={drag5.dropTargetRef}>
            <div
              className={`relative transition-all duration-300 ${
                drag5.dragging ? 'scale-110' : ''
              }`}
            >
              <span className="text-6xl md:text-7xl">🐑</span>
              {actionDone && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 cloning-fade-in">
                  <div className="w-6 h-6 rounded-full cloning-fused-cell" />
                </div>
              )}
            </div>
            <span className="px-3 py-1 bg-gray-800 text-white rounded-full text-xs font-bold shadow-sm">
              代理孕母
            </span>
            {!actionDone && (
              <span className="text-xs text-gray-400 mt-1">放到這裡</span>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderStage6 = () => (
    <div className="cloning-bench flex flex-col items-center justify-center gap-6 min-h-[320px]">
      {/* Celebration */}
      <div className="cloning-celebrate text-center">
        <div className="flex items-end justify-center gap-6 mb-4">
          <div className="flex flex-col items-center">
            <span className="text-5xl md:text-6xl">🐑</span>
            <span className="px-2 py-0.5 bg-gray-800 text-white rounded-full text-xs font-bold">
              代理孕母
            </span>
          </div>
          <div className="flex flex-col items-center cloning-bounce-in">
            <div className="relative">
              <span className="text-5xl md:text-7xl">🐑</span>
              <span className="absolute -top-3 -right-3 text-2xl cloning-sparkle">✨</span>
              <span className="absolute -top-2 -left-3 text-xl cloning-sparkle-delay">⭐</span>
            </div>
            <span className="px-3 py-1 bg-teal-500 text-white rounded-full text-sm font-bold shadow-md mt-1">
              🌟 桃莉
            </span>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="max-w-md mx-auto bg-yellow-50 border border-yellow-300 rounded-lg px-4 py-3 text-center">
        <p className="font-bold text-gray-800 mb-2">
          桃莉是白面的還是黑面的？為什麼？
        </p>
        {!showAnswer ? (
          <button
            onClick={() => { setShowAnswer(true); setTimeout(() => setShowFacts(true), 500); }}
            className="px-4 py-1.5 bg-yellow-400 hover:bg-yellow-500 text-gray-800 rounded-full text-sm font-medium transition-colors"
          >
            點此揭曉答案
          </button>
        ) : (
          <p className="text-teal-800 font-medium cloning-fade-in text-sm leading-relaxed">
            桃莉是白面的！因為她的DNA來自白面母羊的乳腺細胞。代理孕母只提供了子宮環境。
          </p>
        )}
      </div>

      {/* Facts */}
      {showFacts && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto cloning-fade-in">
          {[
            '複製動物屬於無性生殖（沒有受精過程）',
            '台灣在2001年也成功複製了牛「畜寶」！',
            '桃莉羊只活了6年，比正常羊短命',
          ].map((fact, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-3 text-center shadow-sm hover:shadow-md transition-shadow">
              <p className="text-xs text-gray-700 leading-relaxed">{fact}</p>
            </div>
          ))}
        </div>
      )}

      {/* Complete */}
      {showFacts && (
        <div className="text-center mt-3 cloning-fade-in">
          <button
            onClick={onComplete}
            className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95 text-lg"
          >
            完成實驗 🎉
          </button>
        </div>
      )}
    </div>
  );

  const stageData = {
    1: {
      instruction: '從白面母羊身上取出乳腺細胞！把細胞拖到培養皿中。',
      knowledge: '乳腺細胞是體細胞，含有完整的DNA（2n），擁有白面母羊的全部遺傳資訊。',
      render: renderStage1,
    },
    2: {
      instruction: '從黑面母羊的卵巢中取出卵細胞！把卵拖到培養皿。',
      knowledge: '卵細胞比一般細胞大很多，是人體最大的細胞。卵巢中有許多卵泡，每個卵泡裡有一個卵細胞。',
      render: renderStage2,
    },
    3: {
      instruction: '用微型吸管移除卵細胞的細胞核！把細胞核拖出來。',
      knowledge: '去除細胞核後，卵細胞只剩下細胞質，沒有遺傳物質了。',
      render: renderStage3,
    },
    4: {
      instruction: '將兩個細胞融合在一起！把乳腺細胞拖到空卵細胞中。',
      knowledge: '融合完成！新細胞擁有白面母羊的完整DNA，但使用卵細胞的細胞質。注意：整個過程沒有精子參與，不是受精！',
      render: renderStage4,
    },
    5: {
      instruction: '胚胎已經發育完成！把胚胎拖到代理孕母的子宮中。',
      knowledge: '胚胎植入另一隻黑面母羊（代理孕母）的子宮中繼續發育。',
      render: renderStage5,
    },
    6: {
      instruction: '',
      knowledge: '',
      render: renderStage6,
    },
  };

  const current = stageData[stage];

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <style>{`
        .cloning-bench {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          background-image:
            linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px);
          background-size: 20px 20px;
          border-radius: 16px;
          padding: 2rem;
          border: 1px solid #e2e8f0;
        }
        .cloning-mammary-cell {
          background: linear-gradient(135deg, #14b8a6, #0d9488);
        }
        .cloning-egg-cell {
          background: linear-gradient(135deg, #c084fc, #a855f7);
        }
        .cloning-fused-cell {
          background: linear-gradient(135deg, #14b8a6, #a855f7);
        }
        .cloning-glow {
          box-shadow: 0 0 20px rgba(20, 184, 166, 0.4), 0 0 40px rgba(168, 85, 247, 0.2);
        }
        .cloning-pulse-cell {
          animation: cloningPulse 1.5s ease-in-out infinite;
        }
        @keyframes cloningPulse {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.1); filter: brightness(1.2); }
        }
        .cloning-fade-in {
          animation: cloningFadeIn 0.5s ease-out forwards;
        }
        @keyframes cloningFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .cloning-bounce-in {
          animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards;
        }
        @keyframes bounceIn {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .cloning-sparkle {
          animation: sparkleAnim 1.5s ease-in-out infinite;
        }
        .cloning-sparkle-delay {
          animation: sparkleAnim 1.5s ease-in-out infinite 0.5s;
        }
        @keyframes sparkleAnim {
          0%, 100% { opacity: 1; transform: scale(1) rotate(0deg); }
          50% { opacity: 0.5; transform: scale(1.3) rotate(20deg); }
        }
        .cloning-celebrate {
          animation: cloningFadeIn 0.6s ease-out;
        }
        .cloning-stage-fade-out {
          animation: stageFadeOut 0.4s ease-in forwards;
        }
        @keyframes stageFadeOut {
          to { opacity: 0; transform: translateY(-10px); }
        }
      `}</style>

      {/* Title */}
      <div className="text-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-teal-800">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">重現1996年經典實驗</p>
      </div>

      {/* Progress bar */}
      <div className="flex items-center justify-center gap-1 mb-4">
        {[1, 2, 3, 4, 5, 6].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                s < stage
                  ? 'bg-teal-500 text-white'
                  : s === stage
                  ? 'bg-teal-600 text-white ring-2 ring-teal-300 ring-offset-1'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              {s < stage ? '✓' : s}
            </div>
            {s < 6 && (
              <div className={`w-6 h-0.5 ${s < stage ? 'bg-teal-400' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
        <span className="ml-3 text-sm text-gray-500 font-medium">
          階段 {stage}/6
        </span>
      </div>

      {/* Stage label */}
      <div className="text-center mb-3">
        <span className="inline-block px-4 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-bold">
          {stageLabels[stage - 1]}
        </span>
      </div>

      {/* Content */}
      <div className={fadingOut ? 'cloning-stage-fade-out' : 'cloning-fade-in'}>
        {current.instruction && (
          <div className="mx-auto max-w-md mb-4 px-4 py-3 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm transform -rotate-1">
            <p className="text-gray-700 text-sm md:text-base font-medium leading-relaxed">
              {current.instruction}
            </p>
          </div>
        )}

        {current.render()}

        {stage < 6 && actionDone && (
          <div
            className={`mx-auto max-w-lg mt-4 px-4 py-3 bg-teal-50 border-l-4 border-teal-400 rounded-r-lg transition-all duration-500 ${
              showKnowledge ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <p className="text-teal-800 text-sm leading-relaxed">
              <span className="font-bold mr-1">💡</span>
              {current.knowledge}
            </p>
          </div>
        )}

        {stage < 6 && actionDone && showKnowledge && (
          <div className="text-center mt-5">
            <button
              onClick={goNextStage}
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              下一步 →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
