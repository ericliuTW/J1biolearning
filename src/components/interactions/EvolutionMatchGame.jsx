import React, { useState, useCallback, useRef, useMemo } from 'react';

const STEPS = [
  {
    id: 'water_to_land',
    title: '水生 → 陸生',
    emoji: '🌊',
    description: '生物最早在水中誕生，經過漫長的演化，逐漸適應陸地環境。',
    organisms: [
      { id: 'fish', emoji: '🐟', label: '魚類（水生）', order: 1 },
      { id: 'amphibian', emoji: '🐸', label: '兩生類（水陸兩棲）', order: 2 },
      { id: 'reptile', emoji: '🦎', label: '爬蟲類（陸生）', order: 3 },
      { id: 'mammal', emoji: '🐄', label: '哺乳類（陸生）', order: 4 },
    ],
    knowledge: '生物從水中開始演化，逐步發展出肺和四肢等構造來適應陸地生活。魚類→兩生類→爬蟲類→哺乳類，展現了從水生到陸生的演化歷程。',
  },
  {
    id: 'simple_to_complex',
    title: '簡單 → 複雜',
    emoji: '🔬',
    description: '生物的身體結構從簡單逐漸演化為複雜。',
    organisms: [
      { id: 'bacteria', emoji: '🦠', label: '細菌（單細胞）', order: 1 },
      { id: 'algae', emoji: '🟢', label: '藻類（簡單多細胞）', order: 2 },
      { id: 'fern', emoji: '🌿', label: '蕨類（有維管束）', order: 3 },
      { id: 'flower', emoji: '🌸', label: '開花植物（最複雜）', order: 4 },
    ],
    knowledge: '最早的生命是簡單的單細胞生物，經過數十億年的演化，出現了多細胞生物，再逐漸發展出更複雜的身體結構，如維管束、種子、花朵等。',
  },
  {
    id: 'low_to_high',
    title: '低等 → 高等',
    emoji: '📈',
    description: '生物從低等逐漸演化為高等，身體構造越來越精密。',
    organisms: [
      { id: 'proto', emoji: '🫧', label: '原生生物', order: 1 },
      { id: 'invert', emoji: '🪱', label: '無脊椎動物', order: 2 },
      { id: 'vert_cold', emoji: '🐊', label: '冷血脊椎動物', order: 3 },
      { id: 'vert_warm', emoji: '🐕', label: '溫血脊椎動物', order: 4 },
    ],
    knowledge: '生物從簡單的原生生物，演化出無脊椎動物，再演化出有脊椎的動物。脊椎動物中，又從冷血（變溫）動物演化出溫血（恆溫）動物，體溫調節能力越來越好。',
  },
  {
    id: 'size_trend',
    title: '體型的變化（不一定越來越大）',
    emoji: '📏',
    description: '有些人以為演化一定是體型越來越大，但這不一定正確！',
    organisms: [
      { id: 'dino', emoji: '🦕', label: '恐龍（巨大但已滅絕）', order: 1 },
      { id: 'early_mammal', emoji: '🐀', label: '早期哺乳類（很小）', order: 2 },
      { id: 'elephant', emoji: '🐘', label: '大象（現代大型）', order: 3 },
      { id: 'hummingbird', emoji: '🐦', label: '蜂鳥（現代極小）', order: 4 },
    ],
    knowledge: '體型大小不是演化的固定方向！恐龍體型巨大但滅絕了，早期哺乳類很小卻生存下來。現代生物有大如大象，也有小如蜂鳥，體型的變化取決於環境適應的需求。',
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

function DraggableOrganism({ organism, onDrop, slotRefs, placed }) {
  const [dragging, setDragging] = useState(false);
  const elRef = useRef(null);
  const draggingRef = useRef(false);
  const startRef = useRef({ x: 0, y: 0 });

  const getXY = (e) => {
    if (e.touches) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    return { x: e.clientX, y: e.clientY };
  };

  const handleStart = useCallback((e) => {
    if (placed) return;
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

      let matchedSlot = null;
      for (const [slotIndex, ref] of Object.entries(slotRefs)) {
        if (!ref.current) continue;
        const rect = ref.current.getBoundingClientRect();
        if (endPoint.clientX >= rect.left && endPoint.clientX <= rect.right &&
            endPoint.clientY >= rect.top && endPoint.clientY <= rect.bottom) {
          matchedSlot = parseInt(slotIndex, 10);
          break;
        }
      }

      if (elRef.current) {
        elRef.current.style.transform = 'translate(0px, 0px)';
        elRef.current.style.zIndex = '1';
      }

      if (matchedSlot !== null) {
        onDrop(organism, matchedSlot);
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
  }, [placed, organism, onDrop, slotRefs]);

  if (placed) return null;

  return (
    <div
      ref={elRef}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
      className={`
        select-none cursor-grab active:cursor-grabbing
        bg-white border-2 border-indigo-300 rounded-xl px-3 py-2.5
        flex items-center gap-2 shadow-md
        transition-shadow duration-200
        ${dragging ? 'shadow-xl ring-2 ring-indigo-400 opacity-90' : 'hover:shadow-lg hover:border-indigo-400'}
      `}
      style={{ touchAction: 'none', position: 'relative', zIndex: 1 }}
    >
      <span className="text-2xl flex-shrink-0">{organism.emoji}</span>
      <span className="text-sm font-medium text-gray-800 leading-tight">{organism.label}</span>
      <span className="ml-auto text-gray-400 text-base flex-shrink-0">⠿</span>
    </div>
  );
}

function StepView({ step, onStepComplete }) {
  const shuffled = useMemo(() => shuffleArray(step.organisms), [step.organisms]);
  const [placements, setPlacements] = useState({});
  const [wrongFlash, setWrongFlash] = useState(null);
  const [showKnowledge, setShowKnowledge] = useState(false);

  const slotRefs = useMemo(() => {
    const refs = {};
    step.organisms.forEach((_, i) => {
      refs[i + 1] = { current: null };
    });
    return refs;
  }, [step.organisms]);

  const setSlotRef = useCallback((order) => (el) => {
    if (slotRefs[order]) slotRefs[order].current = el;
  }, [slotRefs]);

  const allPlaced = Object.keys(placements).length === step.organisms.length;

  const handleDrop = useCallback((organism, slotOrder) => {
    if (organism.order === slotOrder) {
      setPlacements((prev) => {
        const next = { ...prev, [organism.id]: slotOrder };
        if (Object.keys(next).length === step.organisms.length) {
          setTimeout(() => setShowKnowledge(true), 500);
        }
        return next;
      });
    } else {
      setWrongFlash(slotOrder);
      setTimeout(() => setWrongFlash(null), 600);
    }
  }, [step.organisms.length]);

  return (
    <div>
      {/* Step header */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 sm:p-5 mb-5 border-2 border-indigo-200">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{step.emoji}</span>
          <h3 className="text-xl font-bold text-indigo-800">{step.title}</h3>
        </div>
        <p className="text-base text-indigo-600 leading-relaxed">{step.description}</p>
      </div>

      {/* Evolution ladder (drop slots) */}
      <div className="mb-5">
        <h4 className="text-base font-bold text-indigo-700 mb-3 text-center">
          🪜 演化階梯（把生物拖到正確的位置）
        </h4>
        <div className="flex flex-col gap-2">
          {step.organisms.map((org, idx) => {
            const slotOrder = idx + 1;
            const placedOrg = step.organisms.find((o) => placements[o.id] === slotOrder);
            const isWrong = wrongFlash === slotOrder;

            return (
              <div
                key={slotOrder}
                ref={setSlotRef(slotOrder)}
                className={`
                  relative rounded-xl border-2 border-dashed min-h-[56px] px-4 py-3
                  flex items-center gap-3 transition-all duration-300
                  ${placedOrg
                    ? 'bg-indigo-50 border-indigo-400 border-solid'
                    : isWrong
                      ? 'bg-red-50 border-red-400 animate-shake'
                      : 'bg-gray-50 border-gray-300 hover:border-indigo-300'
                  }
                `}
              >
                {/* Position indicator */}
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0
                  ${placedOrg ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-500'}
                `}>
                  {slotOrder}
                </div>

                {/* Arrow between slots */}
                {idx < step.organisms.length - 1 && (
                  <div className="absolute -bottom-2.5 left-6 text-indigo-300 text-lg z-10 pointer-events-none">↓</div>
                )}

                {placedOrg ? (
                  <div className="flex items-center gap-2 animate-drop-in">
                    <span className="text-2xl">{placedOrg.emoji}</span>
                    <span className="text-sm font-medium text-indigo-800">{placedOrg.label}</span>
                  </div>
                ) : (
                  <span className="text-sm text-gray-400">
                    {isWrong ? '❌ 不對喔，再試試！' : '拖拉生物到這裡'}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Draggable organisms */}
      {!allPlaced && (
        <div className="bg-gradient-to-b from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-2xl p-4 mb-5">
          <h4 className="text-sm font-bold text-indigo-700 mb-3 text-center">
            📦 生物卡片（拖拉到上方演化階梯）
          </h4>
          <div className="space-y-2.5">
            {shuffled.map((org) => (
              <DraggableOrganism
                key={org.id}
                organism={org}
                placed={!!placements[org.id]}
                onDrop={handleDrop}
                slotRefs={slotRefs}
              />
            ))}
          </div>
        </div>
      )}

      {/* Knowledge card */}
      {showKnowledge && (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-2xl p-5 mb-4 animate-slide-up">
          <div className="flex items-start gap-3 mb-3">
            <span className="text-3xl">💡</span>
            <h4 className="text-lg font-bold text-emerald-800">知識卡片</h4>
          </div>
          <p className="text-base text-gray-700 leading-relaxed mb-4">{step.knowledge}</p>
          <div className="text-center">
            <button
              onClick={onStepComplete}
              className="px-8 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg
                rounded-full transition-all duration-200 active:scale-95 shadow-md"
            >
              下一步 →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function EvolutionMatchGame({ content, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showFinalSuccess, setShowFinalSuccess] = useState(false);

  const handleStepComplete = useCallback(() => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowFinalSuccess(true);
    }
  }, [currentStep]);

  const step = STEPS[currentStep];
  const progress = showFinalSuccess ? 100 : Math.round((currentStep / STEPS.length) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6">
      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-2">
          演化趨勢大挑戰
        </h2>
        <p className="text-lg text-indigo-500">
          {content?.instruction || '排列生物的演化順序，建構演化階梯！'}
        </p>
      </div>

      {/* Step indicators */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {STEPS.map((s, idx) => (
          <div key={s.id} className="flex items-center gap-2">
            <div className={`
              w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold
              transition-all duration-300
              ${idx < currentStep || showFinalSuccess
                ? 'bg-emerald-500 text-white shadow-md'
                : idx === currentStep
                  ? 'bg-indigo-500 text-white shadow-md ring-2 ring-indigo-300 ring-offset-2'
                  : 'bg-gray-200 text-gray-500'
              }
            `}>
              {idx < currentStep || showFinalSuccess ? '✓' : idx + 1}
            </div>
            {idx < STEPS.length - 1 && (
              <div className={`w-6 sm:w-10 h-1 rounded-full transition-all duration-300 ${
                idx < currentStep || showFinalSuccess ? 'bg-emerald-400' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Current step */}
      {!showFinalSuccess && (
        <StepView
          key={step.id}
          step={step}
          onStepComplete={handleStepComplete}
        />
      )}

      {/* Progress bar */}
      <div className="mt-5 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-indigo-700">
            進度：第 {Math.min(currentStep + 1, STEPS.length)}/{STEPS.length} 關
          </span>
          <span className="text-sm text-indigo-500">{progress}%</span>
        </div>
        <div className="w-full h-3 bg-indigo-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Final success */}
      {showFinalSuccess && (
        <div className="mt-6 text-center bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-300 rounded-2xl p-6 animate-slide-up">
          <span className="text-5xl block mb-3">🎓</span>
          <h3 className="text-xl font-bold text-indigo-700 mb-2">恭喜完成所有關卡！</h3>
          <p className="text-lg text-indigo-600 mb-2">你已經掌握了生物演化的四大趨勢：</p>
          <div className="flex flex-wrap justify-center gap-2 mb-5">
            {STEPS.map((s) => (
              <span key={s.id} className="inline-flex items-center gap-1 bg-white border border-indigo-300 rounded-full px-3 py-1.5 text-sm font-medium text-indigo-700">
                {s.emoji} {s.title}
              </span>
            ))}
          </div>
          <button
            onClick={onComplete}
            className="px-10 py-3 bg-indigo-600 text-white text-lg font-bold rounded-xl
              hover:bg-indigo-700 active:scale-95 transition-all duration-200 shadow-lg"
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
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        .animate-drop-in { animation: dropIn 0.4s ease-out; }
        .animate-slide-up { animation: slideUp 0.4s ease-out; }
        .animate-fade-in { animation: fadeIn 0.3s ease-out; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
      `}</style>
    </div>
  );
}
