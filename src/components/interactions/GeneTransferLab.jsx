import React, { useState, useEffect, useCallback, useRef } from 'react';

/* ═══════════════════════════════════════════════════════
   Drag Hook (same pattern as CloningLab)
   ═══════════════════════════════════════════════════════ */
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

  const reset = useCallback(() => {
    setDropped(false);
    setDragging(false);
  }, []);

  return { dragging, dropped, handleStart, elRef, dropTargetRef, reset };
}

/* ═══════════════════════════════════════════════════════
   SVG Components
   ═══════════════════════════════════════════════════════ */

function DNAStripSVG({ highlightInsulin, insulinFound, gapMode }) {
  const segments = [
    { x: 0, w: 70, label: '其他基因', color: '#475569', textColor: '#94a3b8' },
    { x: 72, w: 60, label: '其他基因', color: '#475569', textColor: '#94a3b8' },
    { x: 134, w: 90, label: '胰島素基因', color: '#f59e0b', textColor: '#451a03', isInsulin: true },
    { x: 226, w: 60, label: '其他基因', color: '#475569', textColor: '#94a3b8' },
  ];

  return (
    <svg width="290" height="44" viewBox="0 0 290 44" className="drop-shadow-lg">
      {/* Double helix lines */}
      <line x1="0" y1="10" x2="290" y2="10" stroke="#334155" strokeWidth="2" />
      <line x1="0" y1="34" x2="290" y2="34" stroke="#334155" strokeWidth="2" />
      {segments.map((seg, i) => {
        if (gapMode && seg.isInsulin) {
          return (
            <g key={i}>
              <rect x={seg.x} y="6" width={seg.w} height="32" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1" strokeDasharray="4 2" />
              <text x={seg.x + seg.w / 2} y="26" textAnchor="middle" fill="#475569" fontSize="10">已剪下</text>
            </g>
          );
        }
        const isHighlighted = highlightInsulin && seg.isInsulin;
        const isFound = insulinFound && seg.isInsulin;
        return (
          <g key={i}>
            <rect
              x={seg.x} y="6" width={seg.w} height="32" rx="4"
              fill={seg.color}
              stroke={isHighlighted ? '#fbbf24' : 'transparent'}
              strokeWidth={isHighlighted ? 2 : 0}
              className={isHighlighted && !isFound ? 'animate-pulse' : ''}
            />
            {isFound && (
              <rect x={seg.x} y="6" width={seg.w} height="32" rx="4" fill="none" stroke="#fbbf24" strokeWidth="3">
                <animate attributeName="opacity" values="1;0.4;1" dur="1s" repeatCount="3" />
              </rect>
            )}
            <text x={seg.x + seg.w / 2} y="26" textAnchor="middle" fill={seg.textColor} fontSize={seg.isInsulin ? 11 : 9} fontWeight={seg.isInsulin ? 'bold' : 'normal'}>
              {seg.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function PlasmidSVG({ open, hasGene, glowing }) {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <defs>
        {glowing && (
          <filter id="plasmid-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        )}
      </defs>
      {/* Plasmid ring */}
      {open ? (
        <>
          <path d="M 60 15 A 45 45 0 1 1 30 25" fill="none" stroke="#fbbf24" strokeWidth="5" strokeDasharray="8 4" strokeLinecap="round" filter={glowing ? 'url(#plasmid-glow)' : undefined} />
          {/* Opening indicator */}
          <circle cx="30" cy="25" r="4" fill="#ef4444">
            <animate attributeName="r" values="3;5;3" dur="1s" repeatCount="indefinite" />
          </circle>
          <circle cx="60" cy="15" r="4" fill="#ef4444">
            <animate attributeName="r" values="3;5;3" dur="1s" repeatCount="indefinite" />
          </circle>
        </>
      ) : (
        <circle cx="60" cy="60" r="45" fill="none" stroke="#fbbf24" strokeWidth="5" strokeDasharray="8 4" filter={glowing ? 'url(#plasmid-glow)' : undefined} />
      )}
      {/* Gene segment inside plasmid */}
      {hasGene && (
        <path d="M 60 15 A 45 45 0 0 0 30 25" fill="none" stroke="#f59e0b" strokeWidth="7" strokeLinecap="round">
          <animate attributeName="opacity" values="0;1" dur="0.5s" fill="freeze" />
        </path>
      )}
      <text x="60" y="65" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">質體</text>
    </svg>
  );
}

function CellSVG({ type, children }) {
  if (type === 'human') {
    return (
      <div className="relative flex flex-col items-center justify-center">
        <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-xl">
          <defs>
            <radialGradient id="human-cell-grad" cx="40%" cy="40%">
              <stop offset="0%" stopColor="#bfdbfe" />
              <stop offset="60%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#3b82f6" />
            </radialGradient>
          </defs>
          <ellipse cx="100" cy="100" rx="95" ry="90" fill="url(#human-cell-grad)" stroke="#7dd3fc" strokeWidth="3" />
          {/* Nucleus */}
          <ellipse cx="100" cy="100" rx="55" ry="50" fill="rgba(30,58,138,0.3)" stroke="#60a5fa" strokeWidth="2" strokeDasharray="6 3" />
          <text x="100" y="50" textAnchor="middle" fill="#1e3a8a" fontSize="12" fontWeight="bold">人類細胞</text>
          <text x="100" y="75" textAnchor="middle" fontSize="22">🧬</text>
        </svg>
        <div className="absolute bottom-4">{children}</div>
      </div>
    );
  }
  // bacteria
  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg width="180" height="180" viewBox="0 0 180 180" className="drop-shadow-xl">
        <defs>
          <radialGradient id="bact-grad" cx="40%" cy="40%">
            <stop offset="0%" stopColor="#bbf7d0" />
            <stop offset="60%" stopColor="#86efac" />
            <stop offset="100%" stopColor="#22c55e" />
          </radialGradient>
        </defs>
        <ellipse cx="90" cy="95" rx="80" ry="70" fill="url(#bact-grad)" stroke="#86efac" strokeWidth="3" />
        {/* Flagellum */}
        <path d="M 10 95 Q -5 80 -10 95 Q -15 110 -20 95" fill="none" stroke="#86efac" strokeWidth="2" />
        <text x="90" y="50" textAnchor="middle" fill="#166534" fontSize="12" fontWeight="bold">細菌</text>
        <text x="90" y="72" textAnchor="middle" fontSize="20">🦠</text>
      </svg>
      <div className="absolute" style={{ top: '55%' }}>{children}</div>
    </div>
  );
}

function FloatingGene({ small }) {
  const w = small ? 100 : 130;
  const h = small ? 32 : 38;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <rect x="2" y="2" width={w - 4} height={h - 4} rx="8" fill="linear-gradient(135deg, #0d9488, #0f766e)" stroke="#2dd4bf" strokeWidth="2" />
      <rect x="2" y="2" width={w - 4} height={h - 4} rx="8" fill="#0d9488" stroke="#2dd4bf" strokeWidth="2" />
      <text x={w / 2} y={h / 2 + 1} textAnchor="middle" dominantBaseline="middle" fill="#ccfbf1" fontSize={small ? 10 : 12} fontWeight="bold">🧬 胰島素基因</text>
    </svg>
  );
}

function VialSVG({ fillPercent }) {
  const fillH = 70 * (fillPercent / 100);
  return (
    <svg width="50" height="100" viewBox="0 0 50 100">
      {/* Vial body */}
      <path d="M 12 10 L 12 75 Q 12 90 25 90 Q 38 90 38 75 L 38 10" fill="rgba(15,23,42,0.6)" stroke="#94a3b8" strokeWidth="2" />
      {/* Cap */}
      <rect x="8" y="5" width="34" height="8" rx="3" fill="#94a3b8" />
      {/* Fill */}
      <clipPath id="vial-clip">
        <path d="M 13 10 L 13 75 Q 13 89 25 89 Q 37 89 37 75 L 37 10 Z" />
      </clipPath>
      <rect x="13" y={85 - fillH} width="24" height={fillH} fill="url(#insulin-grad)" clipPath="url(#vial-clip)">
        <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
      </rect>
      <defs>
        <linearGradient id="insulin-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <text x="25" y="98" textAnchor="middle" fill="#cbd5e1" fontSize="9">胰島素</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   Constants
   ═══════════════════════════════════════════════════════ */

const STAGES = [
  { id: 1, label: '認識目標基因' },
  { id: 2, label: '剪下基因' },
  { id: 3, label: '打開細菌的質體' },
  { id: 4, label: '插入基因' },
  { id: 5, label: '細菌大量繁殖' },
];

const FUN_FACTS = [
  { emoji: '🐟', title: '螢光魚', text: '把水母的螢光基因轉殖到魚身上，魚就會發光！這是基因轉殖最酷的視覺展示。' },
  { emoji: '🌾', title: '黃金米', text: '含有胡蘿蔔素基因，能產生維生素A，幫助全球營養不良地區的人們改善健康。' },
  { emoji: '💉', title: '人工胰島素', text: '以前要從豬胰臟提取，現在用基因轉殖的細菌就能大量製造，拯救了上億糖尿病患者！' },
];

const KNOWLEDGE = {
  1: '胰島素是控制血糖的重要蛋白質。糖尿病患者無法自行製造足夠的胰島素，所以科學家想讓細菌來幫忙製造！',
  2: '限制酶就像分子層級的剪刀，能在DNA上特定的位置精確地切割。每種限制酶只認得特定的DNA序列，就像鑰匙配鎖一樣！',
  3: '質體是細菌體內的小型環形DNA，可以獨立複製。科學家把它當作運送基因的「載體」——就像一台快遞車！',
  4: '用DNA連接酶（像膠水一樣）把基因片段和質體黏合在一起。現在質體攜帶了人類的胰島素基因，準備進入細菌工廠！',
};

/* ═══════════════════════════════════════════════════════
   Scissors Tool Component
   ═══════════════════════════════════════════════════════ */

function ScissorsTool({ drag, label }) {
  return (
    <div
      ref={drag.elRef}
      onMouseDown={drag.handleStart}
      onTouchStart={drag.handleStart}
      className={`scissors-tool select-none cursor-grab active:cursor-grabbing flex flex-col items-center gap-1 px-4 py-3 rounded-xl bg-slate-800 border-2 border-yellow-500/60 shadow-lg shadow-yellow-500/20 ${
        drag.dragging ? '' : 'scissors-idle-glow'
      }`}
      style={{ touchAction: 'none', position: 'relative' }}
    >
      <span className={`text-3xl ${drag.dragging ? '' : 'scissors-wobble'}`}>✂️</span>
      <span className="text-xs font-bold text-yellow-300">{label || '限制酶'}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════════ */

export default function GeneTransferLab({ content, onComplete }) {
  const [stage, setStage] = useState(1);
  const [actionDone, setActionDone] = useState(false);
  const [showKnowledge, setShowKnowledge] = useState(false);

  // Stage 1
  const [insulinFound, setInsulinFound] = useState(false);

  // Stage 2
  const [geneCut, setGeneCut] = useState(false);
  const [cutting, setCutting] = useState(false);

  // Stage 3
  const [plasmidOpen, setPlasmidOpen] = useState(false);
  const [plasmidCutting, setPlasmidCutting] = useState(false);

  // Stage 4
  const [geneInserted, setGeneInserted] = useState(false);
  const [inserting, setInserting] = useState(false);
  const [sparkJoin, setSparkJoin] = useState(false);

  // Stage 5
  const [bacteriaCount, setBacteriaCount] = useState(1);
  const [producing, setProducing] = useState(false);
  const [insulinCount, setInsulinCount] = useState(0);
  const [labComplete, setLabComplete] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  /* ── Navigation ── */
  const nextStage = useCallback(() => {
    setActionDone(false);
    setShowKnowledge(false);
    setStage((s) => s + 1);
  }, []);

  /* ── Drag hooks ── */

  // Stage 2: scissors onto DNA
  const scissorsDrag2 = useDrag(() => {
    if (geneCut || cutting) return;
    setCutting(true);
    setTimeout(() => {
      setGeneCut(true);
      setActionDone(true);
      setTimeout(() => setShowKnowledge(true), 500);
    }, 900);
  });

  // Stage 3: scissors onto plasmid
  const scissorsDrag3 = useDrag(() => {
    if (plasmidOpen || plasmidCutting) return;
    setPlasmidCutting(true);
    setTimeout(() => {
      setPlasmidOpen(true);
      setActionDone(true);
      setTimeout(() => setShowKnowledge(true), 500);
    }, 900);
  });

  // Stage 4: gene onto plasmid
  const geneDrag4 = useDrag(() => {
    if (geneInserted || inserting) return;
    setInserting(true);
    setTimeout(() => {
      setSparkJoin(true);
      setTimeout(() => {
        setGeneInserted(true);
        setSparkJoin(false);
        setActionDone(true);
        setTimeout(() => setShowKnowledge(true), 500);
      }, 600);
    }, 400);
  });

  /* ── Stage 1: click insulin gene ── */
  const handleGeneClick = () => {
    if (stage !== 1 || actionDone) return;
    setInsulinFound(true);
    setActionDone(true);
    setTimeout(() => setShowKnowledge(true), 600);
  };

  /* ── Stage 5: auto animations ── */
  useEffect(() => {
    if (stage !== 5) return;
    if (bacteriaCount >= 16) {
      if (!producing) setProducing(true);
      return;
    }
    const delay = 1200 / speedMultiplier;
    const timer = setTimeout(() => {
      setBacteriaCount((c) => Math.min(c * 2, 16));
    }, delay);
    return () => clearTimeout(timer);
  }, [stage, bacteriaCount, speedMultiplier, producing]);

  useEffect(() => {
    if (!producing || labComplete) return;
    if (insulinCount >= 12) {
      setLabComplete(true);
      return;
    }
    const delay = 300 / speedMultiplier;
    const timer = setTimeout(() => {
      setInsulinCount((c) => c + 1);
    }, delay);
    return () => clearTimeout(timer);
  }, [producing, insulinCount, speedMultiplier, labComplete]);

  /* ═══════════════════════════════════════════════════════
     Shared UI
     ═══════════════════════════════════════════════════════ */

  const renderProgressBar = () => (
    <div className="flex items-center gap-3 mb-6 px-1">
      <span className="text-xs font-bold text-slate-400 whitespace-nowrap">步驟 {stage}/5</span>
      <div className="flex-1 flex gap-1">
        {STAGES.map((s) => (
          <div
            key={s.id}
            className={`h-2 rounded-full transition-all duration-500 flex-1 ${
              s.id < stage
                ? 'bg-emerald-400'
                : s.id === stage
                  ? 'bg-teal-400'
                  : 'bg-slate-700'
            }`}
            title={s.label}
          />
        ))}
      </div>
      <span className="text-xs text-slate-500 whitespace-nowrap">{STAGES[stage - 1].label}</span>
    </div>
  );

  const renderKnowledge = (text) => {
    if (!showKnowledge) return null;
    return (
      <div className="knowledge-card mt-5 bg-teal-900/60 border border-teal-500/40 rounded-xl p-4 text-teal-100 text-sm sm:text-base leading-relaxed animate-fadeSlideUp max-w-md">
        <span className="text-lg mr-2">💡</span>
        {text}
      </div>
    );
  };

  const renderNextButton = () => {
    if (!actionDone || !showKnowledge) return null;
    return (
      <button
        onClick={nextStage}
        className="mt-5 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl text-lg transition-colors hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/30 animate-fadeSlideUp"
      >
        下一步 →
      </button>
    );
  };

  const renderDragHint = (text) => (
    <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-600 rounded-lg px-3 py-1.5 text-xs text-slate-400 mt-2 animate-fadeSlideUp">
      <span className="text-base">👆</span> {text}
    </div>
  );

  /* ═══════════════════════════════════════════════════════
     Stage Renderers
     ═══════════════════════════════════════════════════════ */

  const renderStage1 = () => (
    <div className="flex flex-col items-center">
      <p className="text-base sm:text-lg text-slate-200 mb-6 text-center leading-relaxed">
        人類的DNA中有一段負責製造胰島素的基因。<br />
        <span className="text-teal-300 font-bold">找到並點擊發亮的胰島素基因！</span>
      </p>

      <CellSVG type="human">
        <div className="cursor-pointer" onClick={handleGeneClick}>
          <DNAStripSVG highlightInsulin={!actionDone} insulinFound={insulinFound} />
        </div>
      </CellSVG>

      {renderKnowledge(KNOWLEDGE[1])}
      {renderNextButton()}
    </div>
  );

  const renderStage2 = () => (
    <div className="flex flex-col items-center">
      <p className="text-base sm:text-lg text-slate-200 mb-4 text-center leading-relaxed">
        使用限制酶把胰島素基因從DNA上剪下來！<br />
        <span className="text-teal-300 font-bold">
          {geneCut ? '基因已成功剪下！' : '拖曳 ✂️ 限制酶到DNA上的胰島素基因'}
        </span>
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-6 mb-4">
        {/* Scissors tool - always visible in stage 2 */}
        {!geneCut && (
          <div className="flex flex-col items-center gap-2">
            <ScissorsTool drag={scissorsDrag2} />
            {renderDragHint('拖曳到DNA上')}
          </div>
        )}

        {/* DNA target */}
        <div
          ref={scissorsDrag2.dropTargetRef}
          className={`dna-target-zone p-4 rounded-xl border-2 transition-all ${
            geneCut
              ? 'border-slate-600 bg-slate-800/30'
              : scissorsDrag2.dragging
                ? 'border-yellow-400 bg-yellow-400/10 shadow-lg shadow-yellow-400/20'
                : 'border-dashed border-slate-600 bg-slate-800/50'
          }`}
        >
          <DNAStripSVG highlightInsulin={!geneCut} gapMode={geneCut} />
          {cutting && !geneCut && (
            <div className="flex justify-center mt-2">
              <span className="text-2xl animate-pulse">✂️ 剪切中...</span>
            </div>
          )}
        </div>
      </div>

      {/* Floating cut gene */}
      {geneCut && (
        <div className="floating-gene-container mt-4 flex flex-col items-center animate-fadeSlideUp">
          <div className="text-xs text-teal-300 mb-2">🧪 已取得基因片段</div>
          <div className="test-tube-chip px-5 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-teal-700 to-teal-600 border-2 border-teal-400 text-teal-100 shadow-lg shadow-teal-500/20">
            🧬 胰島素基因
          </div>
        </div>
      )}

      {/* Scissors indicator stays visible when gene cut */}
      {geneCut && (
        <div className="flex items-center gap-2 mt-3 text-sm text-yellow-300/70">
          <span>✂️</span> 限制酶已完成切割
        </div>
      )}

      {renderKnowledge(KNOWLEDGE[2])}
      {renderNextButton()}
    </div>
  );

  const renderStage3 = () => (
    <div className="flex flex-col items-center">
      <p className="text-base sm:text-lg text-slate-200 mb-4 text-center leading-relaxed">
        用同一把限制酶剪開細菌的質體，準備接入新基因！<br />
        <span className="text-teal-300 font-bold">
          {plasmidOpen ? '質體已成功剪開！' : '拖曳 ✂️ 限制酶到質體上'}
        </span>
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 mb-4">
        {/* Scissors tool - always visible in stage 3 */}
        {!plasmidOpen && (
          <div className="flex flex-col items-center gap-2">
            <ScissorsTool drag={scissorsDrag3} />
            {renderDragHint('拖曳到質體上')}
          </div>
        )}

        {/* Bacteria with plasmid - drop target */}
        <div
          ref={scissorsDrag3.dropTargetRef}
          className={`transition-all rounded-full ${
            !plasmidOpen && scissorsDrag3.dragging
              ? 'ring-4 ring-yellow-400/50 shadow-lg shadow-yellow-400/20'
              : ''
          }`}
        >
          <CellSVG type="bacteria">
            <PlasmidSVG open={plasmidOpen} glowing={scissorsDrag3.dragging && !plasmidOpen} />
          </CellSVG>
          {plasmidCutting && !plasmidOpen && (
            <div className="text-center mt-1">
              <span className="text-xl animate-pulse">✂️ 剪切中...</span>
            </div>
          )}
        </div>

        {/* Gene in tube */}
        <div className="flex flex-col items-center">
          <div className="text-xs text-teal-300 mb-2">🧪 試管中</div>
          <div className="test-tube-chip px-4 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-teal-700 to-teal-600 border-2 border-teal-400 text-teal-100">
            🧬 胰島素基因
          </div>
        </div>
      </div>

      {plasmidOpen && (
        <div className="flex items-center gap-2 mt-1 text-sm text-yellow-300/70">
          <span>✂️</span> 限制酶已完成切割
        </div>
      )}

      {renderKnowledge(KNOWLEDGE[3])}
      {renderNextButton()}
    </div>
  );

  const renderStage4 = () => (
    <div className="flex flex-col items-center">
      <p className="text-base sm:text-lg text-slate-200 mb-4 text-center leading-relaxed">
        把胰島素基因接入打開的質體中！<br />
        <span className="text-teal-300 font-bold">
          {geneInserted ? '基因成功插入！' : '拖曳 🧬 胰島素基因到質體中'}
        </span>
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 mb-4">
        {/* Draggable gene */}
        {!geneInserted && !inserting && (
          <div className="flex flex-col items-center gap-2">
            <div
              ref={geneDrag4.elRef}
              onMouseDown={geneDrag4.handleStart}
              onTouchStart={geneDrag4.handleStart}
              className={`select-none cursor-grab active:cursor-grabbing px-5 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-teal-700 to-teal-600 border-2 border-teal-400 text-teal-100 shadow-lg shadow-teal-500/20 ${
                geneDrag4.dragging ? '' : 'gene-float'
              }`}
              style={{ touchAction: 'none', position: 'relative' }}
            >
              🧬 胰島素基因
            </div>
            {renderDragHint('拖曳到質體中')}
          </div>
        )}

        {/* Plasmid - drop target */}
        <div
          ref={geneDrag4.dropTargetRef}
          className={`relative transition-all ${
            !geneInserted && geneDrag4.dragging
              ? 'ring-4 ring-teal-400/50 rounded-full shadow-lg shadow-teal-400/20'
              : ''
          }`}
        >
          <PlasmidSVG open={!geneInserted} hasGene={geneInserted} glowing={geneDrag4.dragging} />
          {sparkJoin && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl animate-ping">⚡</span>
            </div>
          )}
        </div>
      </div>

      {inserting && !geneInserted && (
        <div className="text-teal-300 text-sm animate-pulse mb-2">正在插入基因...</div>
      )}

      {geneInserted && !sparkJoin && (
        <div className="text-emerald-300 font-bold text-lg animate-fadeSlideUp mb-2">
          ✅ 基因成功插入質體！
        </div>
      )}

      {renderKnowledge(KNOWLEDGE[4])}
      {renderNextButton()}
    </div>
  );

  const renderStage5 = () => (
    <div className="flex flex-col items-center w-full">
      {!labComplete ? (
        <>
          <p className="text-base sm:text-lg text-slate-200 mb-4 text-center leading-relaxed">
            細菌開始大量繁殖，每一個細菌都帶有胰島素基因！<br />
            <span className="text-teal-300 font-bold">觀看它們製造胰島素 💉</span>
          </p>

          <div className="flex flex-wrap items-end justify-center gap-6 mb-4 w-full">
            {/* Bacteria field */}
            <div className="bacteria-field relative flex-1 min-w-[14rem] max-w-[22rem]">
              <div className="flex flex-wrap justify-center items-center gap-2 p-4">
                {Array.from({ length: bacteriaCount }).map((_, i) => (
                  <span
                    key={i}
                    className="text-2xl animate-bacteriaPop inline-block"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    🦠
                  </span>
                ))}
              </div>

              {producing && (
                <div className="flex flex-wrap justify-center gap-1 px-4 pb-3">
                  {Array.from({ length: insulinCount }).map((_, i) => (
                    <span
                      key={i}
                      className="insulin-dot animate-fadeSlideUp"
                      style={{ animationDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>
              )}

              <div className="absolute -top-3 right-2 bg-slate-700 border border-slate-500 rounded-full px-2 py-0.5 text-xs text-slate-300">
                x{bacteriaCount}
              </div>
            </div>

            {/* Vial */}
            <div className="flex flex-col items-center">
              <VialSVG fillPercent={Math.min(100, (insulinCount / 12) * 100)} />
            </div>
          </div>

          <button
            onClick={() => setSpeedMultiplier((m) => Math.min(m * 2, 8))}
            className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-lg text-sm transition-all hover:scale-105 active:scale-95 shadow-md"
          >
            ⚡ 加速繁殖 ×{speedMultiplier}
          </button>
        </>
      ) : (
        <div className="animate-fadeSlideUp w-full max-w-lg mx-auto">
          <div className="text-center mb-6">
            <span className="text-5xl block mb-3">🎉</span>
            <h3 className="text-2xl font-bold text-emerald-300 mb-2">實驗完成！</h3>
            <div className="inline-flex items-center gap-2 bg-emerald-900/50 border border-emerald-500/40 rounded-xl px-5 py-2.5">
              <span className="text-2xl">🧪</span>
              <span className="text-lg font-bold text-emerald-200">人類胰島素</span>
              <span className="text-emerald-400 text-xl">✔</span>
            </div>
          </div>

          {/* Fun fact cards */}
          <div className="space-y-3 mb-6">
            <p className="text-sm text-teal-300 font-semibold text-center mb-3">
              💡 基因轉殖的其他神奇應用：
            </p>
            {FUN_FACTS.map((fact, i) => (
              <div
                key={i}
                className="bg-slate-800/80 border border-slate-600/50 rounded-xl px-4 py-3 animate-fadeSlideUp"
                style={{ animationDelay: `${i * 200}ms` }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{fact.emoji}</span>
                  <div>
                    <div className="font-bold text-slate-200 text-sm mb-0.5">{fact.title}</div>
                    <div className="text-slate-400 text-sm leading-relaxed">{fact.text}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={onComplete}
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl text-lg transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/30"
            >
              完成實驗 🔬
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const stageRenderers = { 1: renderStage1, 2: renderStage2, 3: renderStage3, 4: renderStage4, 5: renderStage5 };

  /* ═══════════════════════════════════════════════════════
     Render
     ═══════════════════════════════════════════════════════ */

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <style>{`
        /* ── Animations ── */
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeSlideUp {
          animation: fadeSlideUp 0.5s ease-out both;
        }

        @keyframes bacteriaPop {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bacteriaPop {
          animation: bacteriaPop 0.5s ease-out both;
        }

        /* ── Scissors idle glow (no transform!) ── */
        @keyframes idleGlow {
          0%, 100% { box-shadow: 0 0 8px rgba(234, 179, 8, 0.3), 0 4px 12px rgba(0,0,0,0.3); }
          50% { box-shadow: 0 0 20px rgba(234, 179, 8, 0.6), 0 4px 16px rgba(0,0,0,0.4); }
        }
        .scissors-idle-glow {
          animation: idleGlow 2s ease-in-out infinite;
        }

        /* ── Scissors wobble (no transform!) ── */
        @keyframes wobble {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(234, 179, 8, 0.4)); }
          50% { filter: drop-shadow(0 0 10px rgba(234, 179, 8, 0.8)); }
        }
        .scissors-wobble {
          animation: wobble 1.5s ease-in-out infinite;
        }

        /* ── Gene float (no transform!) ── */
        @keyframes geneGlow {
          0%, 100% { box-shadow: 0 0 8px rgba(45, 212, 191, 0.3), 0 4px 12px rgba(0,0,0,0.3); }
          50% { box-shadow: 0 0 20px rgba(45, 212, 191, 0.6), 0 4px 16px rgba(0,0,0,0.4); }
        }
        .gene-float {
          animation: geneGlow 2s ease-in-out infinite;
        }

        /* ── Insulin dots ── */
        .insulin-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: linear-gradient(135deg, #a78bfa, #7c3aed);
          box-shadow: 0 0 6px rgba(167, 139, 250, 0.6);
          display: inline-block;
        }

        /* ── Bacteria field ── */
        .bacteria-field {
          background: rgba(15, 23, 42, 0.5);
          border: 2px solid #334155;
          border-radius: 1rem;
          min-height: 8rem;
        }

        /* ── Knowledge card ── */
        .knowledge-card {
          backdrop-filter: blur(8px);
        }

        /* ── Scissors tool ── */
        .scissors-tool {
          transition: box-shadow 0.3s ease;
        }
      `}</style>

      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-teal-300 mb-1">
          🔬 {content?.title || '基因轉殖實驗室'}
        </h2>
      </div>

      {renderProgressBar()}

      {/* Lab bench */}
      <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-5 sm:p-8 min-h-[26rem] flex flex-col items-center justify-center shadow-xl shadow-slate-950/50">
        {stageRenderers[stage]()}
      </div>
    </div>
  );
}
