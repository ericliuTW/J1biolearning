import React, { useState, useCallback } from 'react';

// ─── SVG Cell Illustration Components ───────────────────────────────────────

function AnimalCell({ highlightPart, size = 200 }) {
  const isHighlighted = (part) => highlightPart === part;
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className="drop-shadow-lg">
      {/* Cytoplasm - irregular blob shape */}
      <ellipse cx="100" cy="100" rx="85" ry="78"
        fill="#dbeafe" stroke="#60a5fa" strokeWidth="3"
        className={isHighlighted('membrane') ? 'animate-pulse' : ''}
      />
      {/* Ribosomes - tiny dots */}
      {[[45,60],[155,70],[50,140],[140,145],[70,75],[130,80],[65,130],[135,125]].map(([x,y],i) => (
        <circle key={`r${i}`} cx={x} cy={y} r="2" fill="#94a3b8"
          className={isHighlighted('ribosome') ? 'animate-pulse' : ''}
        />
      ))}
      {/* Mitochondria - orange ovals */}
      {[[55,90,16,8,20],[145,95,14,7,-15],[60,130,15,7,40],[140,130,13,7,-30]].map(([cx,cy,rx,ry,rot],i) => (
        <ellipse key={`m${i}`} cx={cx} cy={cy} rx={rx} ry={ry}
          fill="#fdba74" stroke="#f97316" strokeWidth="1.5"
          transform={`rotate(${rot} ${cx} ${cy})`}
          className={isHighlighted('mitochondria') ? 'animate-pulse' : ''}
        />
      ))}
      {/* ER - wavy lines near nucleus */}
      <path d="M70 85 Q75 80 80 85 Q85 90 90 85" fill="none" stroke="#a78bfa" strokeWidth="1.5"
        className={isHighlighted('er') ? 'animate-pulse' : ''}
      />
      <path d="M72 92 Q77 87 82 92 Q87 97 92 92" fill="none" stroke="#a78bfa" strokeWidth="1.5"
        className={isHighlighted('er') ? 'animate-pulse' : ''}
      />
      {/* Nucleus */}
      <circle cx="100" cy="100" r="30" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="2.5"
        className={isHighlighted('nucleus') ? 'animate-pulse' : ''}
      />
      {/* Nucleolus */}
      <circle cx="100" cy="100" r="10" fill="#8b5cf6"
        className={isHighlighted('nucleus') ? 'animate-pulse' : ''}
      />
      {/* DNA dots inside nucleus */}
      {[[92,90],[108,95],[95,110],[105,88]].map(([x,y],i) => (
        <circle key={`d${i}`} cx={x} cy={y} r="2" fill="#6d28d9"
          className={isHighlighted('dna') ? 'animate-pulse' : ''}
        />
      ))}
      {/* Labels */}
      <text x="100" y="18" textAnchor="middle" fontSize="9" fill="#334155" fontWeight="bold">細胞膜</text>
      <line x1="100" y1="20" x2="100" y2="24" stroke="#334155" strokeWidth="0.8"/>
      <text x="100" y="103" textAnchor="middle" fontSize="8" fill="#ffffff" fontWeight="bold">細胞核</text>
      <text x="50" y="105" textAnchor="middle" fontSize="7" fill="#9a3412" fontWeight="bold">粒線體</text>
      <text x="100" y="190" textAnchor="middle" fontSize="8" fill="#475569">細胞質</text>
    </svg>
  );
}

function PlantCell({ highlightPart, size = 200 }) {
  const isHighlighted = (part) => highlightPart === part;
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className="drop-shadow-lg">
      {/* Cell wall - outer rectangle */}
      <rect x="10" y="10" width="180" height="180" rx="12" ry="12"
        fill="none" stroke="#16a34a" strokeWidth="5"
        className={isHighlighted('cell_wall') ? 'animate-pulse' : ''}
      />
      {/* Cell membrane - inner rectangle */}
      <rect x="18" y="18" width="164" height="164" rx="8" ry="8"
        fill="#dbeafe" stroke="#60a5fa" strokeWidth="2"
        className={isHighlighted('membrane') ? 'animate-pulse' : ''}
      />
      {/* Central vacuole - large light blue rect */}
      <rect x="50" y="55" width="100" height="90" rx="15" ry="15"
        fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.5" opacity="0.7"
        className={isHighlighted('vacuole') ? 'animate-pulse' : ''}
      />
      <text x="100" y="105" textAnchor="middle" fontSize="8" fill="#1e40af" fontWeight="bold">大液泡</text>
      {/* Chloroplasts - bright green ovals */}
      {[[38,45,12,7,30],[160,50,11,6,-20],[35,155,12,7,-15],[162,155,11,6,25],[38,100,10,6,0]].map(([cx,cy,rx,ry,rot],i) => (
        <g key={`c${i}`} transform={`rotate(${rot} ${cx} ${cy})`}
          className={isHighlighted('chloroplast') ? 'animate-pulse' : ''}
        >
          <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#4ade80" stroke="#15803d" strokeWidth="1.5"/>
          <line x1={cx-rx+3} y1={cy} x2={cx+rx-3} y2={cy} stroke="#15803d" strokeWidth="0.8" opacity="0.5"/>
        </g>
      ))}
      {/* Mitochondria - orange ovals */}
      {[[155,100,10,5,45],[42,130,9,5,-30]].map(([cx,cy,rx,ry,rot],i) => (
        <ellipse key={`m${i}`} cx={cx} cy={cy} rx={rx} ry={ry}
          fill="#fdba74" stroke="#f97316" strokeWidth="1.5"
          transform={`rotate(${rot} ${cx} ${cy})`}
          className={isHighlighted('mitochondria') ? 'animate-pulse' : ''}
        />
      ))}
      {/* Nucleus */}
      <circle cx="100" cy="45" r="18" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="2"
        className={isHighlighted('nucleus') ? 'animate-pulse' : ''}
      />
      <circle cx="100" cy="45" r="6" fill="#8b5cf6"/>
      {/* Labels */}
      <text x="100" y="6" textAnchor="middle" fontSize="7" fill="#15803d" fontWeight="bold">細胞壁</text>
      <text x="100" y="49" textAnchor="middle" fontSize="7" fill="#fff" fontWeight="bold">細胞核</text>
      <text x="35" y="42" textAnchor="middle" fontSize="6" fill="#15803d" fontWeight="bold">葉綠體</text>
      <text x="158" y="115" textAnchor="middle" fontSize="6" fill="#9a3412">粒線體</text>
    </svg>
  );
}

function BacteriaCell({ highlightPart, size = 200 }) {
  const isHighlighted = (part) => highlightPart === part;
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className="drop-shadow-lg">
      {/* Flagella - wavy lines */}
      <path d="M170 100 Q180 85 190 100 Q200 115 210 100" fill="none" stroke="#a8a29e"
        strokeWidth="2" strokeLinecap="round"
        className={isHighlighted('flagella') ? 'animate-pulse' : ''}
      />
      <path d="M170 110 Q182 95 192 110 Q202 125 212 108" fill="none" stroke="#a8a29e"
        strokeWidth="1.5" strokeLinecap="round"
        className={isHighlighted('flagella') ? 'animate-pulse' : ''}
      />
      {/* Pili - short hair-like lines */}
      {[[40,55],[35,70],[32,90],[35,120],[40,135],[160,60],[163,80],[160,130]].map(([x,y],i) => (
        <line key={`p${i}`} x1={x} y1={y} x2={x + (x<100?-12:12)} y2={y + (i%2===0?-3:3)}
          stroke="#d6d3d1" strokeWidth="1" strokeLinecap="round"
        />
      ))}
      {/* Cell wall - outer capsule */}
      <ellipse cx="100" cy="100" rx="72" ry="52"
        fill="none" stroke="#16a34a" strokeWidth="4"
        className={isHighlighted('cell_wall') ? 'animate-pulse' : ''}
      />
      {/* Cell membrane - inner capsule */}
      <ellipse cx="100" cy="100" rx="65" ry="45"
        fill="#fef3c7" stroke="#60a5fa" strokeWidth="2"
        className={isHighlighted('membrane') ? 'animate-pulse' : ''}
      />
      {/* Nucleoid / DNA - tangled squiggly lines (NO nucleus!) */}
      <g className={isHighlighted('dna') || isHighlighted('nucleus') ? 'animate-pulse' : ''}>
        <path d="M80 95 Q85 82 95 90 Q105 98 100 85 Q95 75 105 80 Q115 85 110 95 Q105 105 115 100 Q120 95 115 108 Q110 118 100 112 Q90 106 85 115 Q80 108 80 95Z"
          fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
      </g>
      {/* Ribosomes */}
      {[[60,85],[140,90],[65,115],[130,115],[75,95],[125,100],[80,120],[120,85],[90,115],[110,112]].map(([x,y],i) => (
        <circle key={`r${i}`} cx={x} cy={y} r="2" fill="#94a3b8"
          className={isHighlighted('ribosome') ? 'animate-pulse' : ''}
        />
      ))}
      {/* Plasmid - small circular DNA */}
      <circle cx="130" cy="108" r="7" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2,1"
        className={isHighlighted('plasmid') ? 'animate-pulse' : ''}
      />
      {/* Labels */}
      <text x="100" y="38" textAnchor="middle" fontSize="7" fill="#15803d" fontWeight="bold">細胞壁</text>
      <text x="100" y="170" textAnchor="middle" fontSize="7" fill="#dc2626" fontWeight="bold">擬核（DNA）</text>
      <text x="22" y="100" textAnchor="middle" fontSize="6" fill="#475569">鞭毛</text>
      <text x="142" y="122" fontSize="6" fill="#b45309">質體</text>
    </svg>
  );
}

function FungiCell({ highlightPart, size = 200 }) {
  const isHighlighted = (part) => highlightPart === part;
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className="drop-shadow-lg">
      {/* Cell wall - outer rectangle (chitin) */}
      <rect x="10" y="10" width="180" height="180" rx="10" ry="10"
        fill="none" stroke="#ea580c" strokeWidth="5"
        className={isHighlighted('cell_wall') ? 'animate-pulse' : ''}
      />
      {/* Cell membrane */}
      <rect x="18" y="18" width="164" height="164" rx="6" ry="6"
        fill="#fef3c7" stroke="#60a5fa" strokeWidth="2"
        className={isHighlighted('membrane') ? 'animate-pulse' : ''}
      />
      {/* Vacuole - smaller than plant */}
      <ellipse cx="120" cy="120" rx="35" ry="28"
        fill="#bfdbfe" stroke="#3b82f6" strokeWidth="1.5" opacity="0.6"
        className={isHighlighted('vacuole') ? 'animate-pulse' : ''}
      />
      <text x="120" y="123" textAnchor="middle" fontSize="7" fill="#1e40af">液泡</text>
      {/* Nucleus */}
      <circle cx="80" cy="80" r="22" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="2"
        className={isHighlighted('nucleus') ? 'animate-pulse' : ''}
      />
      <circle cx="80" cy="80" r="7" fill="#8b5cf6"/>
      {/* Mitochondria */}
      {[[45,130,12,6,20],[150,70,11,5,-25],[50,60,10,5,10],[155,140,11,5,35]].map(([cx,cy,rx,ry,rot],i) => (
        <ellipse key={`m${i}`} cx={cx} cy={cy} rx={rx} ry={ry}
          fill="#fdba74" stroke="#f97316" strokeWidth="1.5"
          transform={`rotate(${rot} ${cx} ${cy})`}
          className={isHighlighted('mitochondria') ? 'animate-pulse' : ''}
        />
      ))}
      {/* Ribosomes */}
      {[[100,50],[130,60],[100,160],[60,150],[140,100]].map(([x,y],i) => (
        <circle key={`r${i}`} cx={x} cy={y} r="2" fill="#94a3b8"/>
      ))}
      {/* Labels */}
      <text x="100" y="6" textAnchor="middle" fontSize="7" fill="#ea580c" fontWeight="bold">細胞壁（幾丁質）</text>
      <text x="80" y="83" textAnchor="middle" fontSize="7" fill="#fff" fontWeight="bold">細胞核</text>
      <text x="45" y="145" textAnchor="middle" fontSize="6" fill="#9a3412">粒線體</text>
    </svg>
  );
}

function ProtistCell({ highlightPart, size = 200 }) {
  const isHighlighted = (part) => highlightPart === part;
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className="drop-shadow-lg">
      {/* Amoeba-like body with pseudopods */}
      <path d="M60 70 Q30 50 25 80 Q20 110 40 130 Q50 145 70 155 Q90 165 110 160 Q130 155 150 145 Q170 130 175 110 Q180 85 165 70 Q150 50 130 55 Q115 45 100 50 Q80 45 60 70Z"
        fill="#ede9fe" stroke="#7c3aed" strokeWidth="2.5"
        className={isHighlighted('membrane') ? 'animate-pulse' : ''}
      />
      {/* Pseudopods - extensions */}
      <path d="M25 80 Q10 75 5 85 Q8 95 20 100" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2"
        className={isHighlighted('pseudopod') ? 'animate-pulse' : ''}
      />
      <path d="M165 70 Q180 55 185 65 Q182 78 175 80" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2"
        className={isHighlighted('pseudopod') ? 'animate-pulse' : ''}
      />
      {/* Nucleus */}
      <circle cx="100" cy="100" r="22" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="2"
        className={isHighlighted('nucleus') ? 'animate-pulse' : ''}
      />
      <circle cx="100" cy="100" r="7" fill="#8b5cf6"/>
      {/* Food vacuoles - multiple small circles */}
      {[[60,95,8],[140,105,7],[75,130,6],[130,80,7]].map(([cx,cy,r],i) => (
        <circle key={`fv${i}`} cx={cx} cy={cy} r={r}
          fill="#fbcfe8" stroke="#ec4899" strokeWidth="1" opacity="0.7"
          className={isHighlighted('vacuole') ? 'animate-pulse' : ''}
        />
      ))}
      {/* Contractile vacuole */}
      <circle cx="140" cy="130" r="10" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1.5"
        className={isHighlighted('vacuole') ? 'animate-pulse' : ''}
      />
      {/* Mitochondria */}
      {[[70,75,9,5,20],[130,120,8,4,-15]].map(([cx,cy,rx,ry,rot],i) => (
        <ellipse key={`m${i}`} cx={cx} cy={cy} rx={rx} ry={ry}
          fill="#fdba74" stroke="#f97316" strokeWidth="1.5"
          transform={`rotate(${rot} ${cx} ${cy})`}
          className={isHighlighted('mitochondria') ? 'animate-pulse' : ''}
        />
      ))}
      {/* Labels */}
      <text x="100" y="103" textAnchor="middle" fontSize="7" fill="#fff" fontWeight="bold">細胞核</text>
      <text x="60" y="108" textAnchor="middle" fontSize="6" fill="#be185d">食泡</text>
      <text x="15" y="72" textAnchor="middle" fontSize="6" fill="#6d28d9">偽足</text>
      <text x="140" y="145" textAnchor="middle" fontSize="6" fill="#1e40af">伸縮泡</text>
    </svg>
  );
}

function AlgaeCell({ highlightPart, size = 200 }) {
  const isHighlighted = (part) => highlightPart === part;
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className="drop-shadow-lg">
      {/* Cell wall - thin green */}
      <ellipse cx="100" cy="100" rx="85" ry="75"
        fill="none" stroke="#16a34a" strokeWidth="3"
        className={isHighlighted('cell_wall') ? 'animate-pulse' : ''}
      />
      {/* Cell membrane */}
      <ellipse cx="100" cy="100" rx="80" ry="70"
        fill="#dcfce7" stroke="#60a5fa" strokeWidth="1.5"
        className={isHighlighted('membrane') ? 'animate-pulse' : ''}
      />
      {/* Large chloroplast - cup-shaped */}
      <path d="M40 70 Q35 100 40 140 Q60 160 100 160 Q140 160 160 140 Q165 100 160 70 Q140 90 100 95 Q60 90 40 70Z"
        fill="#4ade80" stroke="#15803d" strokeWidth="2" opacity="0.7"
        className={isHighlighted('chloroplast') ? 'animate-pulse' : ''}
      />
      {/* Pyrenoid inside chloroplast */}
      <circle cx="100" cy="140" r="10" fill="#15803d" opacity="0.5"
        className={isHighlighted('chloroplast') ? 'animate-pulse' : ''}
      />
      {/* Nucleus */}
      <circle cx="100" cy="75" r="18" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="2"
        className={isHighlighted('nucleus') ? 'animate-pulse' : ''}
      />
      <circle cx="100" cy="75" r="6" fill="#8b5cf6"/>
      {/* Eyespot */}
      <circle cx="55" cy="80" r="5" fill="#ef4444"
        className={isHighlighted('eyespot') ? 'animate-pulse' : ''}
      />
      {/* Labels */}
      <text x="100" y="18" textAnchor="middle" fontSize="7" fill="#15803d" fontWeight="bold">細胞壁</text>
      <text x="100" y="78" textAnchor="middle" fontSize="7" fill="#fff" fontWeight="bold">細胞核</text>
      <text x="100" y="125" textAnchor="middle" fontSize="8" fill="#15803d" fontWeight="bold">葉綠體</text>
      <text x="45" y="72" fontSize="6" fill="#dc2626">眼點</text>
    </svg>
  );
}

// ─── Cell Renderer ──────────────────────────────────────────────────────────

const cellComponents = {
  animal: AnimalCell,
  plant: PlantCell,
  bacteria: BacteriaCell,
  fungi: FungiCell,
  protist: ProtistCell,
  algae: AlgaeCell,
  // moss and fern can reuse plant cell with minor label tweaks
  moss: PlantCell,
  fern: PlantCell,
};

function CellDiagram({ type, highlightPart, size }) {
  const Component = cellComponents[type] || AnimalCell;
  return <Component highlightPart={highlightPart} size={size} />;
}

// ─── Highlight color helpers ────────────────────────────────────────────────

const highlightStyles = {
  difference: {
    border: 'border-red-400',
    bg: 'bg-red-900/30',
    text: 'text-red-300',
    badge: 'bg-red-500',
    glow: 'shadow-red-500/40',
    label: '不同',
  },
  similar: {
    border: 'border-green-400',
    bg: 'bg-green-900/30',
    text: 'text-green-300',
    badge: 'bg-green-500',
    glow: 'shadow-green-500/40',
    label: '相似',
  },
  unique: {
    border: 'border-blue-400',
    bg: 'bg-blue-900/30',
    text: 'text-blue-300',
    badge: 'bg-blue-500',
    glow: 'shadow-blue-500/40',
    label: '獨有',
  },
};

// ─── Main Component ─────────────────────────────────────────────────────────

export default function CellCompareExplore({ content, onComplete }) {
  const {
    title,
    instruction,
    referenceCell,
    targetCell,
    comparisons,
    funFact,
  } = content;

  const [explored, setExplored] = useState(new Set());
  const [activeComparison, setActiveComparison] = useState(null);
  const [showComplete, setShowComplete] = useState(false);

  const totalComparisons = comparisons.length;
  const exploredCount = explored.size;
  const allExplored = exploredCount === totalComparisons;

  const handleComparisonClick = useCallback((comp) => {
    setActiveComparison((prev) => (prev?.id === comp.id ? null : comp));
    setExplored((prev) => {
      const next = new Set(prev);
      next.add(comp.id);
      if (next.size === totalComparisons && !showComplete) {
        setTimeout(() => setShowComplete(true), 600);
      }
      return next;
    });
  }, [totalComparisons, showComplete]);

  const style = activeComparison ? highlightStyles[activeComparison.highlight] || highlightStyles.difference : null;

  return (
    <div className="max-w-4xl mx-auto px-3 py-6">
      {/* ── Card container ── */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl overflow-hidden">

        {/* ── Header ── */}
        <div className="px-5 pt-6 pb-4 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2 tracking-wide">
            {title}
          </h2>
          <p className="text-slate-300 text-base md:text-lg">{instruction}</p>
        </div>

        {/* ── Progress bar ── */}
        <div className="px-5 mb-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>已探索 {exploredCount}/{totalComparisons} 個比較</span>
            {allExplored && <span className="text-emerald-400 font-bold">全部完成！</span>}
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(exploredCount / totalComparisons) * 100}%` }}
            />
          </div>
        </div>

        {/* ── Cells side by side ── */}
        <div className="px-4 pb-2">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0">
            {/* Reference Cell */}
            <div className="flex flex-col items-center flex-1 min-w-0">
              <span className="text-sm font-bold text-teal-300 mb-2 px-3 py-1 bg-teal-900/50 rounded-full">
                {referenceCell.name}
              </span>
              <div className="bg-slate-700/50 rounded-xl p-3 border border-slate-600">
                <CellDiagram
                  type={referenceCell.type}
                  highlightPart={activeComparison?.id}
                  size={190}
                />
              </div>
            </div>

            {/* VS badge */}
            <div className="flex-shrink-0 mx-2 my-2 md:my-0">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30 border-2 border-amber-300">
                <span className="text-white font-black text-lg tracking-tight">VS</span>
              </div>
            </div>

            {/* Target Cell */}
            <div className="flex flex-col items-center flex-1 min-w-0">
              <span className="text-sm font-bold text-amber-300 mb-2 px-3 py-1 bg-amber-900/50 rounded-full">
                {targetCell.name}
              </span>
              <div className="bg-slate-700/50 rounded-xl p-3 border border-slate-600">
                <CellDiagram
                  type={targetCell.type}
                  highlightPart={activeComparison?.id}
                  size={190}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Comparison buttons ── */}
        <div className="px-5 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {comparisons.map((comp) => {
              const isActive = activeComparison?.id === comp.id;
              const wasExplored = explored.has(comp.id);
              const cStyle = highlightStyles[comp.highlight] || highlightStyles.difference;
              return (
                <button
                  key={comp.id}
                  onClick={() => handleComparisonClick(comp)}
                  className={`
                    relative flex items-center gap-2 px-3 py-2.5 rounded-xl text-left
                    transition-all duration-200 cursor-pointer group
                    ${isActive
                      ? `${cStyle.bg} ${cStyle.border} border-2 shadow-lg ${cStyle.glow}`
                      : wasExplored
                        ? 'bg-slate-700/60 border border-slate-500 hover:border-slate-400'
                        : 'bg-slate-700/40 border border-slate-600 hover:border-slate-400 hover:bg-slate-700/70'
                    }
                  `}
                >
                  <span className="text-xl flex-shrink-0">{comp.emoji}</span>
                  <span className={`text-sm font-medium ${isActive ? cStyle.text : 'text-slate-200'}`}>
                    {comp.label}
                  </span>
                  {wasExplored && !isActive && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400" />
                  )}
                  {!wasExplored && (
                    <span className="ml-auto text-slate-500 group-hover:text-slate-300 text-xs">?</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Detail panel (slides open when a comparison is active) ── */}
        <div
          className={`transition-all duration-400 ease-in-out overflow-hidden ${
            activeComparison ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {activeComparison && (
            <div className={`mx-5 mb-5 rounded-xl border-2 ${style.border} ${style.bg} p-4`}>
              {/* Highlight type badge */}
              <div className="flex justify-center mb-3">
                <span className={`${style.badge} text-white text-xs font-bold px-3 py-0.5 rounded-full`}>
                  {style.label}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                {/* Reference side */}
                <div className="bg-slate-800/60 rounded-lg p-3">
                  <div className="text-teal-400 text-xs font-bold mb-1 flex items-center gap-1">
                    <span>&#x1F4CC;</span> {referenceCell.name}
                  </div>
                  <p className="text-slate-200 text-sm leading-relaxed">{activeComparison.reference}</p>
                </div>
                {/* Target side */}
                <div className="bg-slate-800/60 rounded-lg p-3">
                  <div className="text-amber-400 text-xs font-bold mb-1 flex items-center gap-1">
                    <span>&#x1F4CC;</span> {targetCell.name}
                  </div>
                  <p className="text-slate-200 text-sm leading-relaxed">{activeComparison.target}</p>
                </div>
              </div>

              {/* Summary */}
              {activeComparison.summary && (
                <div className={`text-center text-sm ${style.text} italic border-t border-slate-600 pt-3`}>
                  {activeComparison.summary}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Completion section ── */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            showComplete ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="mx-5 mb-5 bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border border-emerald-500/50 rounded-xl p-5 text-center">
            <div className="text-3xl mb-2">&#x1F389;</div>
            <p className="text-emerald-300 font-bold text-lg mb-2">太棒了！你完成了所有比較！</p>
            {funFact && (
              <div className="bg-slate-800/50 rounded-lg p-3 mb-4 inline-block">
                <p className="text-amber-300 text-sm">
                  <span className="font-bold">&#x1F4A1; 有趣小知識：</span> {funFact}
                </p>
              </div>
            )}
            <div>
              <button
                onClick={onComplete}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-full
                  hover:from-emerald-400 hover:to-teal-400 transition-all duration-200 shadow-lg shadow-emerald-500/30
                  active:scale-95 cursor-pointer text-lg"
              >
                繼續學習 &#x27A1;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
