import React, { useState, useCallback } from 'react';

// ─── SVG Virus Diagrams ────────────────────────────────────────────────────

function GeneralVirus({ highlightPart, size = 220 }) {
  const hl = (part) => highlightPart === part;
  return (
    <svg viewBox="0 0 220 260" width={size} height={size * 260/220} className="drop-shadow-lg">
      {/* Envelope (套膜) - outer layer */}
      <ellipse cx="110" cy="120" rx="90" ry="85"
        fill={hl('envelope') ? '#fde68a' : '#fef3c7'}
        stroke="#f59e0b" strokeWidth="3" strokeDasharray="6,3"
        className={hl('envelope') ? 'animate-pulse' : ''}
      />
      {/* Spike proteins on envelope */}
      {[
        [30, 75, -30], [20, 110, -45], [30, 150, -60],
        [190, 75, 30], [200, 110, 45], [190, 150, 60],
        [60, 40, -10], [90, 35, 0], [130, 35, 0], [160, 40, 10],
        [60, 200, 10], [100, 210, 0], [150, 200, -10],
      ].map(([x, y, rot], i) => (
        <g key={`sp${i}`} transform={`rotate(${rot} ${x} ${y})`}
          className={hl('spike') ? 'animate-pulse' : ''}
        >
          <line x1={x} y1={y} x2={x} y2={y - 16} stroke="#ef4444" strokeWidth="2" />
          <circle cx={x} cy={y - 18} r="4" fill={hl('spike') ? '#fca5a5' : '#ef4444'} />
        </g>
      ))}

      {/* Protein coat (蛋白質外殼) */}
      <ellipse cx="110" cy="120" rx="60" ry="55"
        fill={hl('coat') ? '#c4b5fd' : '#ddd6fe'}
        stroke="#7c3aed" strokeWidth="3"
        className={hl('coat') ? 'animate-pulse' : ''}
      />
      {/* Pattern on coat */}
      {[[85,90],[135,90],[80,120],[140,120],[85,150],[135,150],[110,80],[110,155]].map(([x,y],i) => (
        <circle key={`cp${i}`} cx={x} cy={y} r="4" fill="#a78bfa" opacity="0.5" />
      ))}

      {/* Genetic material (遺傳物質 DNA/RNA) */}
      <g className={hl('dna') ? 'animate-pulse' : ''}>
        <path
          d="M90 100 Q95 85 105 95 Q115 105 110 115 Q105 125 115 135 Q125 145 120 155 Q115 140 105 145 Q95 150 100 135 Q105 125 95 120 Q88 115 95 105Z"
          fill="none" stroke={hl('dna') ? '#f87171' : '#dc2626'} strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Base pairs */}
        {[[95,105,108,100],[105,115,118,112],[100,130,114,128],[108,142,120,138]].map(([x1,y1,x2,y2],i) => (
          <line key={`bp${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={hl('dna') ? '#fca5a5' : '#fca5a5'} strokeWidth="1.5" />
        ))}
      </g>

      {/* Labels */}
      <text x="110" y="250" textAnchor="middle" fontSize="11" fill="#7c3aed" fontWeight="bold">一般病毒構造</text>
    </svg>
  );
}

function Bacteriophage({ highlightPart, size = 220 }) {
  const hl = (part) => highlightPart === part;
  return (
    <svg viewBox="0 0 220 300" width={size} height={size * 300/220} className="drop-shadow-lg">
      {/* Head (二十面體) */}
      <polygon
        points="110,20 155,50 155,100 110,130 65,100 65,50"
        fill={hl('head') ? '#bfdbfe' : '#dbeafe'}
        stroke="#3b82f6" strokeWidth="3"
        className={hl('head') ? 'animate-pulse' : ''}
      />
      {/* Internal structure lines */}
      <line x1="110" y1="20" x2="110" y2="130" stroke="#93c5fd" strokeWidth="1" opacity="0.5" />
      <line x1="65" y1="50" x2="155" y2="100" stroke="#93c5fd" strokeWidth="1" opacity="0.5" />
      <line x1="65" y1="100" x2="155" y2="50" stroke="#93c5fd" strokeWidth="1" opacity="0.5" />

      {/* DNA inside head */}
      <g className={hl('phage_dna') ? 'animate-pulse' : ''}>
        <path d="M95 55 Q100 45 110 55 Q120 65 115 75 Q110 85 115 95 Q120 105 110 110 Q100 105 105 95 Q110 85 105 75 Q100 65 95 55Z"
          fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* Collar */}
      <rect x="98" y="128" width="24" height="8" rx="2"
        fill={hl('collar') ? '#d1d5db' : '#9ca3af'}
        stroke="#6b7280" strokeWidth="1.5"
        className={hl('collar') ? 'animate-pulse' : ''}
      />

      {/* Tail sheath (尾鞘) */}
      <rect x="103" y="136" width="14" height="80" rx="2"
        fill={hl('tail') ? '#d9f99d' : '#ecfccb'}
        stroke="#65a30d" strokeWidth="2"
        className={hl('tail') ? 'animate-pulse' : ''}
      />
      {/* Tail stripes */}
      {[150,160,170,180,190,200].map((y,i) => (
        <line key={`ts${i}`} x1="105" y1={y} x2="115" y2={y}
          stroke="#84cc16" strokeWidth="1" opacity="0.6" />
      ))}

      {/* Base plate (基板) */}
      <polygon
        points="90,218 130,218 140,230 80,230"
        fill={hl('baseplate') ? '#fde68a' : '#fef9c3'}
        stroke="#eab308" strokeWidth="2"
        className={hl('baseplate') ? 'animate-pulse' : ''}
      />

      {/* Tail fibers (尾絲) */}
      {[
        'M80 230 Q55 245 40 270',
        'M90 230 Q70 250 55 275',
        'M130 230 Q150 250 165 275',
        'M140 230 Q160 245 180 270',
        'M85 230 Q60 260 50 280',
        'M135 230 Q160 260 170 280',
      ].map((d, i) => (
        <path key={`tf${i}`} d={d}
          fill="none" stroke={hl('fibers') ? '#f97316' : '#fb923c'}
          strokeWidth="2" strokeLinecap="round"
          className={hl('fibers') ? 'animate-pulse' : ''}
        />
      ))}

      {/* Labels */}
      <text x="110" y="295" textAnchor="middle" fontSize="11" fill="#3b82f6" fontWeight="bold">噬菌體構造</text>
    </svg>
  );
}

function CoronaVirus({ highlightPart, size = 220 }) {
  const hl = (part) => highlightPart === part;
  return (
    <svg viewBox="0 0 220 240" width={size} height={size * 240/220} className="drop-shadow-lg">
      {/* Envelope */}
      <circle cx="110" cy="110" r="75"
        fill={hl('corona_envelope') ? '#fde68a' : '#fef3c7'}
        stroke="#f59e0b" strokeWidth="2.5"
        className={hl('corona_envelope') ? 'animate-pulse' : ''}
      />

      {/* Spike proteins (棘突蛋白) - crown shape */}
      {Array.from({ length: 16 }, (_, i) => {
        const angle = (i / 16) * Math.PI * 2 - Math.PI / 2;
        const r = 75;
        const x1 = 110 + Math.cos(angle) * r;
        const y1 = 110 + Math.sin(angle) * r;
        const x2 = 110 + Math.cos(angle) * (r + 22);
        const y2 = 110 + Math.sin(angle) * (r + 22);
        return (
          <g key={`cs${i}`} className={hl('corona_spike') ? 'animate-pulse' : ''}>
            <line x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#ef4444" strokeWidth="2.5" />
            <circle cx={x2} cy={y2} r="5"
              fill={hl('corona_spike') ? '#fca5a5' : '#ef4444'} />
            {/* Three-pronged tip */}
            {[-0.3, 0, 0.3].map((offset, j) => {
              const tipAngle = angle + offset;
              const tx = x2 + Math.cos(tipAngle) * 6;
              const ty = y2 + Math.sin(tipAngle) * 6;
              return (
                <circle key={`t${j}`} cx={tx} cy={ty} r="2" fill="#dc2626" />
              );
            })}
          </g>
        );
      })}

      {/* M protein dots on envelope */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const x = 110 + Math.cos(angle) * 65;
        const y = 110 + Math.sin(angle) * 65;
        return (
          <circle key={`mp${i}`} cx={x} cy={y} r="3"
            fill={hl('m_protein') ? '#a78bfa' : '#8b5cf6'} opacity="0.7"
            className={hl('m_protein') ? 'animate-pulse' : ''}
          />
        );
      })}

      {/* RNA inside */}
      <g className={hl('corona_rna') ? 'animate-pulse' : ''}>
        <path
          d="M80 90 Q85 75 95 85 Q105 95 100 105 Q95 115 105 125 Q115 135 110 140 Q100 145 95 135 Q90 125 95 115 Q100 105 90 100 Q82 95 85 85Z"
          fill="none" stroke={hl('corona_rna') ? '#f87171' : '#dc2626'}
          strokeWidth="3" strokeLinecap="round"
        />
        <path
          d="M115 85 Q125 80 130 90 Q135 100 128 108 Q122 115 128 125"
          fill="none" stroke={hl('corona_rna') ? '#f87171' : '#dc2626'}
          strokeWidth="2.5" strokeLinecap="round"
        />
      </g>

      {/* Label */}
      <text x="110" y="232" textAnchor="middle" fontSize="11" fill="#dc2626" fontWeight="bold">冠狀病毒構造</text>
    </svg>
  );
}

// ─── Virus info data ────────────────────────────────────────────────────────

const virusTypes = {
  general: {
    name: '一般病毒',
    emoji: '🦠',
    component: GeneralVirus,
    parts: [
      {
        id: 'dna', label: '遺傳物質', emoji: '🧬',
        info: '病毒的核心就是一段遺傳物質，可能是 DNA 或 RNA（但不會兩種都有）。這段遺傳物質記錄了「如何複製自己」的密碼。病毒沒有自己的工廠，所以必須把密碼送進活細胞裡，偷用細胞的工具來複製！',
        color: 'red',
      },
      {
        id: 'coat', label: '蛋白質外殼', emoji: '🛡️',
        info: '遺傳物質外面包著一層蛋白質外殼（又叫衣殼），就像幫 DNA/RNA 穿上盔甲。這層殼保護裡面的遺傳物質不被破壞，形狀可能是球形、桿狀或二十面體。',
        color: 'purple',
      },
      {
        id: 'envelope', label: '套膜', emoji: '🫧',
        info: '有些病毒外面還有一層「套膜」，是從宿主細胞膜偷來的！套膜幫助病毒偽裝自己，躲過免疫系統的偵查。有套膜的病毒比較怕酒精和肥皂，所以洗手很重要！（不是所有病毒都有套膜）',
        color: 'amber',
      },
      {
        id: 'spike', label: '表面蛋白（突起）', emoji: '📌',
        info: '病毒表面有很多蛋白質突起，就像鑰匙一樣，可以「插入」細胞表面的特定受體（鎖）。不同病毒的鑰匙不同，所以只能感染特定的細胞。疫苗就是教免疫系統認識這些「鑰匙」的形狀！',
        color: 'red',
      },
    ],
  },
  phage: {
    name: '噬菌體',
    emoji: '🔬',
    component: Bacteriophage,
    parts: [
      {
        id: 'head', label: '頭部', emoji: '💎',
        info: '噬菌體的頭部是一個二十面體（像鑽石的形狀），裡面裝著 DNA 遺傳物質。頭部由蛋白質組成，保護著裡面的 DNA 不被破壞。',
        color: 'blue',
      },
      {
        id: 'phage_dna', label: 'DNA', emoji: '🧬',
        info: '噬菌體頭部裡面盤繞著一條 DNA。當噬菌體找到目標細菌時，會把這條 DNA 像打針一樣注入細菌體內，然後利用細菌的工具大量複製自己。',
        color: 'red',
      },
      {
        id: 'tail', label: '尾鞘', emoji: '📏',
        info: '尾鞘是連接頭部和基板的管子。當噬菌體要注入 DNA 時，尾鞘會像注射器一樣收縮，把 DNA 從頭部「擠」進細菌裡面！',
        color: 'green',
      },
      {
        id: 'baseplate', label: '基板', emoji: '🔧',
        info: '基板是尾部底端的結構，負責「降落」在細菌表面。它像太空船的降落腳架，穩穩地固定在細菌的細胞壁上。',
        color: 'yellow',
      },
      {
        id: 'fibers', label: '尾絲', emoji: '🕷️',
        info: '尾絲像蜘蛛的腳一樣從基板伸出，負責「抓住」細菌表面。尾絲上有特殊的蛋白質，能辨認特定的細菌——每種噬菌體只攻擊特定的細菌！科學家正在研究用噬菌體來對付抗藥性超級細菌。',
        color: 'orange',
      },
    ],
  },
  corona: {
    name: '冠狀病毒',
    emoji: '👑',
    component: CoronaVirus,
    parts: [
      {
        id: 'corona_rna', label: 'RNA 遺傳物質', emoji: '🧬',
        info: '冠狀病毒的遺傳物質是一條很長的 RNA。COVID-19 的 RNA 有將近 3 萬個「字母」（鹼基），記錄著製造所有蛋白質的密碼。RNA 病毒容易突變，所以冠狀病毒會不斷出現新的變異株。',
        color: 'red',
      },
      {
        id: 'corona_spike', label: '棘突蛋白（S蛋白）', emoji: '👑',
        info: '這就是冠狀病毒最有名的「皇冠」！棘突蛋白像鑰匙一樣，能打開人體細胞表面的 ACE2 受體（鎖），讓病毒跑進去。mRNA 疫苗就是教你的免疫系統製造對付棘突蛋白的抗體！',
        color: 'red',
      },
      {
        id: 'corona_envelope', label: '套膜', emoji: '🫧',
        info: '冠狀病毒有一層脂質套膜（從宿主細胞偷來的），外面插著棘突蛋白。因為套膜是脂質做的，所以肥皂和酒精可以破壞它——這就是為什麼勤洗手這麼重要！',
        color: 'amber',
      },
      {
        id: 'm_protein', label: 'M蛋白', emoji: '🟣',
        info: 'M蛋白（膜蛋白）嵌在套膜裡面，幫助維持病毒的形狀，也參與新病毒的組裝過程。',
        color: 'purple',
      },
    ],
  },
};

// ─── Color helpers ──────────────────────────────────────────────────────────

const colorMap = {
  red:    { bg: 'bg-red-900/40',    border: 'border-red-400',    text: 'text-red-300',    badge: 'bg-red-500' },
  blue:   { bg: 'bg-blue-900/40',   border: 'border-blue-400',   text: 'text-blue-300',   badge: 'bg-blue-500' },
  green:  { bg: 'bg-green-900/40',  border: 'border-green-400',  text: 'text-green-300',  badge: 'bg-green-500' },
  purple: { bg: 'bg-purple-900/40', border: 'border-purple-400', text: 'text-purple-300', badge: 'bg-purple-500' },
  amber:  { bg: 'bg-amber-900/40',  border: 'border-amber-400',  text: 'text-amber-300',  badge: 'bg-amber-500' },
  yellow: { bg: 'bg-yellow-900/40', border: 'border-yellow-400', text: 'text-yellow-300', badge: 'bg-yellow-500' },
  orange: { bg: 'bg-orange-900/40', border: 'border-orange-400', text: 'text-orange-300', badge: 'bg-orange-500' },
};

// ─── Main Component ─────────────────────────────────────────────────────────

export default function VirusExplore({ content, onComplete }) {
  const { title, instruction, virusData, replicationSteps, funFact } = content;

  const [activeVirusType, setActiveVirusType] = useState('general');
  const [explored, setExplored] = useState(new Set());
  const [activePart, setActivePart] = useState(null);
  const [showReplication, setShowReplication] = useState(false);
  const [repStep, setRepStep] = useState(0);
  const [showComplete, setShowComplete] = useState(false);

  // Count total explorable items across all virus types + replication
  const allPartIds = Object.values(virusTypes).flatMap(v => v.parts.map(p => p.id));
  const totalItems = allPartIds.length + (replicationSteps ? replicationSteps.length : 0);
  const exploredCount = explored.size;
  const allExplored = exploredCount >= totalItems;

  const currentVirus = virusTypes[activeVirusType];
  const DiagramComponent = currentVirus.component;

  const handlePartClick = useCallback((part) => {
    setActivePart(prev => prev?.id === part.id ? null : part);
    setExplored(prev => {
      const next = new Set(prev);
      next.add(part.id);
      return next;
    });
  }, []);

  const handleRepStepClick = useCallback((idx) => {
    setRepStep(idx);
    setExplored(prev => {
      const next = new Set(prev);
      next.add(`rep_${idx}`);
      if (next.size >= totalItems && !showComplete) {
        setTimeout(() => setShowComplete(true), 600);
      }
      return next;
    });
  }, [totalItems, showComplete]);

  // Check completion whenever explored changes
  React.useEffect(() => {
    if (explored.size >= totalItems && !showComplete) {
      setTimeout(() => setShowComplete(true), 600);
    }
  }, [explored.size, totalItems, showComplete]);

  return (
    <div className="max-w-4xl mx-auto px-3 py-6">
      <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="px-5 pt-6 pb-4 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
            🦠 {title}
          </h2>
          <p className="text-slate-300 text-base md:text-lg">{instruction}</p>
        </div>

        {/* Progress */}
        <div className="px-5 mb-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>已探索 {exploredCount}/{totalItems} 個項目</span>
            {allExplored && <span className="text-emerald-400 font-bold">全部完成！</span>}
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-400 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${(exploredCount / totalItems) * 100}%` }}
            />
          </div>
        </div>

        {/* Virus type tabs */}
        <div className="px-5 mb-4">
          <div className="flex gap-2 justify-center flex-wrap">
            {Object.entries(virusTypes).map(([key, virus]) => (
              <button
                key={key}
                onClick={() => { setActiveVirusType(key); setActivePart(null); }}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all cursor-pointer
                  ${activeVirusType === key
                    ? 'bg-gradient-to-r from-red-500 to-purple-500 text-white shadow-lg shadow-purple-500/30 scale-105'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
              >
                {virus.emoji} {virus.name}
              </button>
            ))}
            {replicationSteps && (
              <button
                onClick={() => { setShowReplication(true); setActivePart(null); }}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all cursor-pointer
                  ${showReplication
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-red-500/30 scale-105'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
              >
                🔄 繁殖過程
              </button>
            )}
          </div>
        </div>

        {/* Diagram + parts */}
        {!showReplication ? (
          <div className="px-4 pb-2">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              {/* SVG diagram */}
              <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600">
                <DiagramComponent
                  highlightPart={activePart?.id}
                  size={200}
                />
              </div>

              {/* Parts buttons */}
              <div className="flex flex-col gap-2 w-full md:w-auto">
                <p className="text-xs text-slate-400 font-bold mb-1">👆 點擊各部位了解更多：</p>
                {currentVirus.parts.map((part) => {
                  const isActive = activePart?.id === part.id;
                  const wasExplored = explored.has(part.id);
                  const c = colorMap[part.color] || colorMap.purple;
                  return (
                    <button
                      key={part.id}
                      onClick={() => { setShowReplication(false); handlePartClick(part); }}
                      className={`
                        relative flex items-center gap-3 px-4 py-3 rounded-xl text-left
                        transition-all duration-200 cursor-pointer
                        ${isActive
                          ? `${c.bg} ${c.border} border-2 shadow-lg`
                          : wasExplored
                            ? 'bg-slate-700/60 border border-slate-500 hover:border-slate-400'
                            : 'bg-slate-700/40 border border-slate-600 hover:border-slate-400 hover:bg-slate-700/70'
                        }
                      `}
                    >
                      <span className="text-xl flex-shrink-0">{part.emoji}</span>
                      <span className={`text-sm font-bold ${isActive ? c.text : 'text-slate-200'}`}>
                        {part.label}
                      </span>
                      {wasExplored && !isActive && (
                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}

        {/* Part detail panel */}
        <div className={`transition-all duration-400 ease-in-out overflow-hidden ${
          activePart && !showReplication ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          {activePart && (
            <div className={`mx-5 my-4 rounded-xl border-2 ${colorMap[activePart.color]?.border || 'border-purple-400'} ${colorMap[activePart.color]?.bg || 'bg-purple-900/40'} p-5`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{activePart.emoji}</span>
                <h3 className={`text-lg font-bold ${colorMap[activePart.color]?.text || 'text-purple-300'}`}>
                  {activePart.label}
                </h3>
              </div>
              <p className="text-slate-200 text-sm leading-relaxed">{activePart.info}</p>
            </div>
          )}
        </div>

        {/* Replication steps view */}
        {showReplication && replicationSteps && (
          <div className="px-5 pb-4">
            <button
              onClick={() => setShowReplication(false)}
              className="text-xs text-slate-400 hover:text-slate-200 mb-3 cursor-pointer"
            >
              ← 返回構造圖
            </button>

            <div className="bg-slate-700/50 rounded-xl p-5 border border-slate-600">
              <h3 className="text-lg font-bold text-orange-300 mb-4 text-center">
                🔄 病毒繁殖四步驟
              </h3>

              {/* Step indicators */}
              <div className="flex justify-center gap-2 mb-5">
                {replicationSteps.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleRepStepClick(idx)}
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center text-xl
                      transition-all cursor-pointer border-2
                      ${repStep === idx
                        ? 'bg-orange-500 border-orange-300 scale-110 shadow-lg shadow-orange-500/40'
                        : explored.has(`rep_${idx}`)
                          ? 'bg-slate-600 border-green-400'
                          : 'bg-slate-700 border-slate-500 hover:border-slate-400'
                      }
                    `}
                  >
                    {step.emoji}
                  </button>
                ))}
              </div>

              {/* Current step detail */}
              <div className="bg-slate-800/60 rounded-xl p-5 border border-orange-500/30">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center text-sm">
                    {repStep + 1}
                  </span>
                  <h4 className="text-orange-300 font-bold text-base">{replicationSteps[repStep].title}</h4>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed">{replicationSteps[repStep].description}</p>
                {replicationSteps[repStep].visual && (
                  <div className="mt-3 text-center text-2xl tracking-widest">
                    {replicationSteps[repStep].visual}
                  </div>
                )}
              </div>

              {/* Step navigation */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => { if (repStep > 0) handleRepStepClick(repStep - 1); }}
                  disabled={repStep === 0}
                  className="px-4 py-2 rounded-lg text-sm font-bold text-slate-300 bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  ← 上一步
                </button>
                <button
                  onClick={() => { if (repStep < replicationSteps.length - 1) handleRepStepClick(repStep + 1); }}
                  disabled={repStep === replicationSteps.length - 1}
                  className="px-4 py-2 rounded-lg text-sm font-bold text-white bg-orange-500 hover:bg-orange-400 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  下一步 →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Completion section */}
        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
          showComplete ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="mx-5 mb-5 bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border border-emerald-500/50 rounded-xl p-5 text-center">
            <div className="text-3xl mb-2">🎉</div>
            <p className="text-emerald-300 font-bold text-lg mb-2">太棒了！你已經了解病毒的完整構造！</p>
            {funFact && (
              <div className="bg-slate-800/50 rounded-lg p-3 mb-4 inline-block">
                <p className="text-amber-300 text-sm">
                  <span className="font-bold">💡 冷知識：</span> {funFact}
                </p>
              </div>
            )}
            <button
              onClick={onComplete}
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-full
                hover:from-emerald-400 hover:to-teal-400 transition-all duration-200 shadow-lg shadow-emerald-500/30
                active:scale-95 cursor-pointer text-lg"
            >
              繼續學習 ➡️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
