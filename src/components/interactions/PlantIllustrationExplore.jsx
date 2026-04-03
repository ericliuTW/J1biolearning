import React, { useState, useCallback } from 'react';

// ─── SVG Plant Illustration Components ──────────────────────────────────────

function MossPlant({ highlight, size = 180 }) {
  const hl = (part) => highlight === part ? 'animate-pulse' : '';
  const hlStroke = (part, baseWidth = 1.5) => highlight === part
    ? { stroke: '#facc15', strokeWidth: baseWidth + 2, filter: 'url(#glowMoss)' }
    : {};
  return (
    <svg viewBox="0 0 200 240" width={size} height={size} className="drop-shadow-lg">
      <defs>
        <filter id="glowMoss"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Ground / soil line */}
      <rect x="0" y="180" width="200" height="60" fill="#8B6914" rx="4" opacity="0.3" />
      <line x1="0" y1="180" x2="200" y2="180" stroke="#92400e" strokeWidth="2" />

      {/* Rhizoids (假根) - thin threads at bottom */}
      <g className={hl('rhizoids')} {...(highlight === 'rhizoids' ? { filter: 'url(#glowMoss)' } : {})}>
        {[[50,180,45,210],[60,180,55,205],[70,180,72,208],[90,180,85,212],
          [100,180,105,207],[110,180,108,210],[120,180,125,205],[140,180,138,210]].map(([x1,y1,x2,y2],i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={highlight === 'rhizoids' ? '#facc15' : '#a3e635'} strokeWidth={highlight === 'rhizoids' ? 2.5 : 1} opacity="0.9" />
        ))}
      </g>

      {/* Moss clump - fuzzy green mound */}
      <g className={hl('body')} {...(highlight === 'body' ? { filter: 'url(#glowMoss)' } : {})}>
        <ellipse cx="70" cy="172" rx="30" ry="14" fill="#4ade80" opacity="0.8" />
        <ellipse cx="100" cy="168" rx="28" ry="16" fill="#22c55e" opacity="0.85" />
        <ellipse cx="130" cy="174" rx="25" ry="12" fill="#4ade80" opacity="0.8" />
        {/* Small leaf-like bumps */}
        {[[55,165],[65,158],[75,155],[85,152],[95,150],[105,153],[115,156],[125,162],[135,168]].map(([x,y],i) => (
          <ellipse key={i} cx={x} cy={y} rx="6" ry="10" fill="#16a34a" opacity="0.7"
            transform={`rotate(${(i-4)*8} ${x} ${y})`} />
        ))}
      </g>

      {/* Sporangium (孢蒴) on thin stalks */}
      <g className={hl('sporangium')} {...(highlight === 'sporangium' ? { filter: 'url(#glowMoss)' } : {})}>
        <line x1="80" y1="155" x2="78" y2="100" stroke="#a16207" strokeWidth="1.5" />
        <ellipse cx="78" cy="95" rx="5" ry="8" fill="#ca8a04" stroke="#a16207" strokeWidth="1"
          {...hlStroke('sporangium', 1)}
        />
        <line x1="100" y1="150" x2="102" y2="85" stroke="#a16207" strokeWidth="1.5" />
        <ellipse cx="102" cy="80" rx="5" ry="8" fill="#ca8a04" stroke="#a16207" strokeWidth="1"
          {...hlStroke('sporangium', 1)}
        />
        <line x1="115" y1="156" x2="120" y2="108" stroke="#a16207" strokeWidth="1.5" />
        <ellipse cx="120" cy="103" rx="5" ry="8" fill="#ca8a04" stroke="#a16207" strokeWidth="1"
          {...hlStroke('sporangium', 1)}
        />
      </g>

      {/* No vascular bundle indicator */}
      <g className={hl('noVascular')} {...(highlight === 'noVascular' ? { filter: 'url(#glowMoss)' } : {})}>
        <line x1="155" y1="140" x2="175" y2="140" stroke="#ef4444" strokeWidth="2" />
        <line x1="155" y1="150" x2="175" y2="150" stroke="#ef4444" strokeWidth="2" />
        <line x1="152" y1="135" x2="178" y2="155" stroke="#ef4444" strokeWidth="3" opacity="0.7" />
      </g>

      {/* Labels */}
      <rect x="40" y="59" width="76" height="16" rx="3" fill="rgba(255,255,255,0.8)"/>
      <text x="78" y="72" textAnchor="middle" fontSize="12" fill="#a16207" fontWeight="bold">&#x1F4A7; &#x5B62;&#x84F4;</text>
      <rect x="75" y="220" width="50" height="16" rx="3" fill="rgba(255,255,255,0.8)"/>
      <text x="100" y="232" textAnchor="middle" fontSize="12" fill="#65a30d" fontWeight="bold">&#x5047;&#x6839;</text>
      <rect x="120" y="119" width="90" height="16" rx="3" fill="rgba(255,255,255,0.8)"/>
      <text x="165" y="132" textAnchor="middle" fontSize="11" fill="#ef4444" fontWeight="bold">&#x7121;&#x7DAD;&#x7BA1;&#x675F;</text>

      {/* Height indicator */}
      <g className={hl('height')}>
        <line x1="20" y1="150" x2="20" y2="180" stroke="#64748b" strokeWidth="1" strokeDasharray="3,2" />
        <line x1="15" y1="150" x2="25" y2="150" stroke="#64748b" strokeWidth="1" />
        <line x1="15" y1="180" x2="25" y2="180" stroke="#64748b" strokeWidth="1" />
        <rect x="4" y="158" width="36" height="14" rx="3" fill="rgba(255,255,255,0.8)"/>
        <text x="22" y="168" textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="bold">&#x5E7E;cm</text>
      </g>
    </svg>
  );
}

function FernPlant({ highlight, size = 180 }) {
  const hl = (part) => highlight === part ? 'animate-pulse' : '';
  const hlFilter = (part) => highlight === part ? { filter: 'url(#glowFern)' } : {};
  return (
    <svg viewBox="0 0 200 240" width={size} height={size} className="drop-shadow-lg">
      <defs>
        <filter id="glowFern"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Ground */}
      <rect x="0" y="185" width="200" height="55" fill="#8B6914" rx="4" opacity="0.3" />
      <line x1="0" y1="185" x2="200" y2="185" stroke="#92400e" strokeWidth="2" />

      {/* Roots from rhizome */}
      <g className={hl('roots')} {...hlFilter('roots')}>
        {[[70,200,50,225],[80,200,65,230],[90,200,80,228],[110,200,120,230],[120,200,135,225],[130,200,145,228]].map(([x1,y1,x2,y2],i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#92400e" strokeWidth="2" />
        ))}
      </g>

      {/* Underground rhizome (根莖) */}
      <g className={hl('rhizome')} {...hlFilter('rhizome')}>
        <path d="M50 198 Q80 195 100 198 Q120 201 150 198" fill="none" stroke="#65a30d" strokeWidth="5" strokeLinecap="round" />
      </g>

      {/* Main stem / stipe */}
      <g className={hl('stem')} {...hlFilter('stem')}>
        <line x1="100" y1="195" x2="100" y2="80" stroke="#15803d" strokeWidth="4" />
      </g>

      {/* Fiddlehead at top */}
      <g className={hl('fiddlehead')} {...hlFilter('fiddlehead')}>
        <path d="M100 80 Q100 60 110 50 Q120 42 118 55 Q115 65 108 68" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Compound fronds - left side */}
      <g className={hl('fronds')} {...hlFilter('fronds')}>
        {[
          [100,100, 35,75], [100,115, 30,95], [100,130, 35,115], [100,145, 40,135], [100,160, 45,152],
          [100,100, 165,75], [100,115, 170,95], [100,130, 165,115], [100,145, 160,135], [100,160, 155,152],
        ].map(([x1,y1,x2,y2],i) => (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#16a34a" strokeWidth="2" />
            {/* Small leaflets along each frond */}
            {[0.3, 0.5, 0.7].map((t, j) => {
              const lx = x1 + (x2 - x1) * t;
              const ly = y1 + (y2 - y1) * t;
              const dir = x2 < x1 ? -1 : 1;
              return <ellipse key={j} cx={lx} cy={ly} rx="6" ry="3" fill="#4ade80" opacity="0.8"
                transform={`rotate(${dir * 30} ${lx} ${ly})`} />;
            })}
          </g>
        ))}
      </g>

      {/* Sporangia dots on leaf undersides (孢子囊堆) */}
      <g className={hl('sporangia')} {...hlFilter('sporangia')}>
        {[[45,82],[38,100],[162,82],[167,100],[42,120],[158,120]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#92400e" opacity="0.8" />
        ))}
      </g>

      {/* Vascular bundle indicator */}
      <g className={hl('vascular')} {...hlFilter('vascular')}>
        <rect x="96" y="130" width="8" height="20" fill="none" stroke="#0ea5e9" strokeWidth="1.5" rx="2" />
        <line x1="98" y1="132" x2="98" y2="148" stroke="#0ea5e9" strokeWidth="1" />
        <line x1="102" y1="132" x2="102" y2="148" stroke="#0ea5e9" strokeWidth="1" />
      </g>

      {/* Labels */}
      <rect x="115" y="33" width="56" height="15" rx="3" fill="rgba(255,255,255,0.8)"/>
      <text x="143" y="45" textAnchor="middle" fontSize="11" fill="#15803d" fontWeight="bold">&#x5377;&#x65CB;&#x82BD;</text>
      <rect x="10" y="58" width="76" height="15" rx="3" fill="rgba(255,255,255,0.8)"/>
      <text x="48" y="70" textAnchor="middle" fontSize="11" fill="#92400e" fontWeight="bold">&#x5B62;&#x5B50;&#x56CA;&#x5806;</text>
      <rect x="82" y="224" width="36" height="15" rx="3" fill="rgba(255,255,255,0.8)"/>
      <text x="100" y="236" textAnchor="middle" fontSize="11" fill="#92400e" fontWeight="bold">&#x6839;</text>
      <rect x="63" y="188" width="44" height="15" rx="3" fill="rgba(255,255,255,0.8)"/>
      <text x="85" y="200" textAnchor="middle" fontSize="11" fill="#65a30d" fontWeight="bold">&#x6839;&#x8396;</text>
      <rect x="115" y="133" width="56" height="15" rx="3" fill="rgba(255,255,255,0.8)"/>
      <text x="143" y="145" textAnchor="middle" fontSize="10" fill="#0ea5e9" fontWeight="bold">&#x7DAD;&#x7BA1;&#x675F;</text>
    </svg>
  );
}

function GymnoPlant({ highlight, size = 180 }) {
  const hl = (part) => highlight === part ? 'animate-pulse' : '';
  const hlFilter = (part) => highlight === part ? { filter: 'url(#glowGymno)' } : {};
  return (
    <svg viewBox="0 0 200 240" width={size} height={size} className="drop-shadow-lg">
      <defs>
        <filter id="glowGymno"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Ground */}
      <rect x="0" y="195" width="200" height="45" fill="#8B6914" rx="4" opacity="0.3" />
      <line x1="0" y1="195" x2="200" y2="195" stroke="#92400e" strokeWidth="2" />

      {/* Trunk */}
      <rect x="93" y="130" width="14" height="70" fill="#92400e" rx="2" />

      {/* Triangle tree shape with needle leaves */}
      <g className={hl('leaves')} {...hlFilter('leaves')}>
        <polygon points="100,20 45,120 155,120" fill="#15803d" stroke="#166534" strokeWidth="2" />
        <polygon points="100,45 55,135 145,135" fill="#16a34a" stroke="#166534" strokeWidth="1.5" />
        <polygon points="100,70 60,150 140,150" fill="#22c55e" stroke="#166534" strokeWidth="1.5" />
        {/* Needle texture lines */}
        {[[80,80,75,95],[120,80,125,95],[90,60,85,75],[110,60,115,75],[70,100,65,115],[130,100,135,115]].map(([x1,y1,x2,y2],i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#14532d" strokeWidth="0.8" opacity="0.5" />
        ))}
      </g>

      {/* Male cones (雄毬果) - small, near branch tips */}
      <g className={hl('maleCone')} {...hlFilter('maleCone')}>
        <ellipse cx="65" cy="130" rx="6" ry="4" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
        <ellipse cx="135" cy="128" rx="6" ry="4" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
        {/* Pollen dots */}
        {[[60,125],[68,127],[130,123],[138,125]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="1.5" fill="#fde68a" opacity="0.8" />
        ))}
      </g>

      {/* Female cone (雌毬果) - larger, on tree */}
      <g className={hl('femaleCone')} {...hlFilter('femaleCone')}>
        <path d="M100 95 L90 115 L110 115 Z" fill="#b45309" stroke="#92400e" strokeWidth="1.5" />
        <line x1="95" y1="105" x2="105" y2="105" stroke="#78350f" strokeWidth="1" />
        <line x1="93" y1="110" x2="107" y2="110" stroke="#78350f" strokeWidth="1" />
      </g>

      {/* Naked seed indicator */}
      <g className={hl('nakedSeed')} {...hlFilter('nakedSeed')}>
        <circle cx="165" cy="100" r="5" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
        <text x="165" y="103" textAnchor="middle" fontSize="9" fill="#78350f" fontWeight="bold">&#x7A2E;</text>
      </g>

      {/* No flower indicator */}
      <g className={hl('noFlower')} {...hlFilter('noFlower')}>
        <text x="170" y="65" textAnchor="middle" fontSize="10" fill="#ef4444" fontWeight="bold">&#x2716; &#x7121;&#x82B1;</text>
        <text x="170" y="78" textAnchor="middle" fontSize="10" fill="#ef4444" fontWeight="bold">&#x2716; &#x7121;&#x679C;&#x5BE6;</text>
      </g>

      {/* Labels */}
      <rect x="30" y="133" width="90" height="15" rx="3" fill="rgba(255,255,255,0.8)"/>
      <text x="75" y="145" textAnchor="middle" fontSize="11" fill="#d97706" fontWeight="bold">&#x2642; &#x96C4;&#x6BC6;&#x679C;</text>
      <rect x="100" y="80" width="86" height="15" rx="3" fill="rgba(255,255,255,0.8)"/>
      <text x="143" y="92" textAnchor="middle" fontSize="11" fill="#92400e" fontWeight="bold">&#x2640; &#x96CC;&#x6BC6;&#x679C;</text>
      <rect x="118" y="103" width="94" height="15" rx="3" fill="rgba(255,255,255,0.8)"/>
      <text x="165" y="115" textAnchor="middle" fontSize="10" fill="#d97706" fontWeight="bold">&#x7A2E;&#x5B50;(&#x88F8;&#x9732;)</text>
      <rect x="75" y="5" width="50" height="15" rx="3" fill="rgba(255,255,255,0.8)"/>
      <text x="100" y="17" textAnchor="middle" fontSize="11" fill="#15803d" fontWeight="bold">&#x91DD;&#x8449;</text>

      {/* Roots */}
      <g>
        {[[93,195,70,225],[100,195,95,230],[107,195,130,225]].map(([x1,y1,x2,y2],i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#92400e" strokeWidth="2" />
        ))}
      </g>
    </svg>
  );
}

function AngioPlant({ highlight, size = 180 }) {
  const hl = (part) => highlight === part ? 'animate-pulse' : '';
  const hlFilter = (part) => highlight === part ? { filter: 'url(#glowAngio)' } : {};
  return (
    <svg viewBox="0 0 200 240" width={size} height={size} className="drop-shadow-lg">
      <defs>
        <filter id="glowAngio"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Ground */}
      <rect x="0" y="195" width="200" height="45" fill="#8B6914" rx="4" opacity="0.3" />
      <line x1="0" y1="195" x2="200" y2="195" stroke="#92400e" strokeWidth="2" />

      {/* Roots */}
      <g>
        {[[90,195,60,225],[95,195,85,228],[105,195,115,228],[110,195,140,225]].map(([x1,y1,x2,y2],i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#92400e" strokeWidth="2" />
        ))}
      </g>

      {/* Stem */}
      <line x1="100" y1="195" x2="100" y2="75" stroke="#16a34a" strokeWidth="4" />
      {/* Branch stems */}
      <line x1="100" y1="130" x2="55" y2="100" stroke="#16a34a" strokeWidth="2.5" />
      <line x1="100" y1="140" x2="150" y2="115" stroke="#16a34a" strokeWidth="2.5" />

      {/* Leaves - different shapes for monocot/dicot variety */}
      <g className={hl('leaves')} {...hlFilter('leaves')}>
        {/* Net-veined leaf (dicot) */}
        <ellipse cx="55" cy="155" rx="20" ry="10" fill="#4ade80" stroke="#16a34a" strokeWidth="1.5" transform="rotate(-30 55 155)" />
        <line x1="45" y1="155" x2="65" y2="155" stroke="#15803d" strokeWidth="0.8" transform="rotate(-30 55 155)" />
        {/* Parallel-veined leaf (monocot) */}
        <ellipse cx="148" cy="160" rx="18" ry="8" fill="#86efac" stroke="#16a34a" strokeWidth="1.5" transform="rotate(25 148 160)" />
        {[0,3,-3].map((dy,i) => (
          <line key={i} x1="135" y1={160+dy} x2="161" y2={160+dy} stroke="#15803d" strokeWidth="0.5"
            transform={`rotate(25 148 160)`} />
        ))}
      </g>

      {/* Flower (花) at top */}
      <g className={hl('flower')} {...hlFilter('flower')}>
        {/* Petals */}
        {[0,72,144,216,288].map((angle,i) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 100 + Math.cos(rad) * 16;
          const cy = 55 + Math.sin(rad) * 16;
          return <ellipse key={i} cx={cx} cy={cy} rx="10" ry="6" fill="#f472b6" stroke="#ec4899" strokeWidth="1"
            transform={`rotate(${angle} ${cx} ${cy})`} opacity="0.85" />;
        })}
        {/* Center */}
        <circle cx="100" cy="55" r="7" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
        {/* Stamens */}
        {[0,90,180,270].map((angle,i) => {
          const rad = (angle * Math.PI) / 180;
          return <circle key={i} cx={100 + Math.cos(rad)*5} cy={55 + Math.sin(rad)*5} r="1.5" fill="#f59e0b" />;
        })}
      </g>

      {/* Fruit (果實) with seed inside */}
      <g className={hl('fruit')} {...hlFilter('fruit')}>
        <ellipse cx="55" cy="90" rx="14" ry="11" fill="#fb923c" stroke="#ea580c" strokeWidth="1.5" />
        {/* Seed inside fruit */}
        <ellipse cx="55" cy="92" rx="5" ry="4" fill="#92400e" />
        <text x="55" y="95" textAnchor="middle" fontSize="7" fill="#fef3c7" fontWeight="bold">&#x7A2E;</text>
      </g>

      {/* Another fruit on right branch */}
      <g className={hl('fruit')} {...hlFilter('fruit')}>
        <ellipse cx="150" cy="108" rx="12" ry="10" fill="#f87171" stroke="#dc2626" strokeWidth="1.5" />
        <ellipse cx="150" cy="110" rx="4" ry="3" fill="#92400e" />
      </g>

      {/* Labels */}
      <rect x="85" y="15" width="30" height="16" rx="3" fill="rgba(255,255,255,0.8)"/>
      <text x="100" y="28" textAnchor="middle" fontSize="12" fill="#ec4899" fontWeight="bold">&#x82B1;</text>
      <rect x="15" y="76" width="44" height="15" rx="3" fill="rgba(255,255,255,0.8)"/>
      <text x="37" y="88" textAnchor="middle" fontSize="11" fill="#ea580c" fontWeight="bold">&#x679C;&#x5BE6;</text>
      <rect x="22" y="98" width="66" height="15" rx="3" fill="rgba(255,255,255,0.8)"/>
      <text x="55" y="110" textAnchor="middle" fontSize="10" fill="#92400e" fontWeight="bold">&#x5305;&#x4F4F;&#x7A2E;&#x5B50;</text>
      <rect x="155" y="88" width="44" height="15" rx="3" fill="rgba(255,255,255,0.8)"/>
      <text x="177" y="100" textAnchor="middle" fontSize="10" fill="#dc2626" fontWeight="bold">&#x679C;&#x5BE6;</text>
    </svg>
  );
}

function MonocotVsDicot({ highlight, size = 200 }) {
  const hl = (part) => highlight === part ? 'animate-pulse' : '';
  const hlFilter = (part) => highlight === part ? { filter: 'url(#glowMD)' } : {};
  return (
    <svg viewBox="0 0 400 280" width={size * 2} height={size * 1.4} className="drop-shadow-lg">
      <defs>
        <filter id="glowMD"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Divider */}
      <line x1="200" y1="30" x2="200" y2="270" stroke="#475569" strokeWidth="2" strokeDasharray="5,5" />

      {/* LEFT - Monocot (單子葉) */}
      <text x="100" y="25" textAnchor="middle" fontSize="16" fill="#22c55e" fontWeight="bold">&#x55AE;&#x5B50;&#x8449;</text>

      {/* Monocot leaf - parallel veins */}
      <g className={hl('leafVein')} {...hlFilter('leafVein')}>
        <ellipse cx="60" cy="90" rx="30" ry="12" fill="#86efac" stroke="#16a34a" strokeWidth="1.5" transform="rotate(-10 60 90)" />
        {[-6,-3,0,3,6].map((dy,i) => (
          <line key={i} x1="35" y1={90+dy} x2="85" y2={90+dy} stroke="#15803d" strokeWidth="0.7"
            transform="rotate(-10 60 90)" />
        ))}
        <rect x="30" y="103" width="60" height="15" rx="3" fill="rgba(255,255,255,0.8)"/>
        <text x="60" y="115" textAnchor="middle" fontSize="12" fill="#15803d" fontWeight="bold">&#x5E73;&#x884C;&#x8108;</text>
      </g>

      {/* Monocot flower - 3 petals */}
      <g className={hl('flowerParts')} {...hlFilter('flowerParts')}>
        {[0,120,240].map((angle,i) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 150 + Math.cos(rad) * 14;
          const cy = 80 + Math.sin(rad) * 14;
          return <ellipse key={i} cx={cx} cy={cy} rx="10" ry="5" fill="#c084fc" stroke="#a855f7" strokeWidth="1"
            transform={`rotate(${angle} ${cx} ${cy})`} />;
        })}
        <circle cx="150" cy="80" r="5" fill="#fbbf24" />
        <rect x="114" y="93" width="72" height="15" rx="3" fill="rgba(255,255,255,0.8)"/>
        <text x="150" y="105" textAnchor="middle" fontSize="12" fill="#a855f7" fontWeight="bold">3&#x7684;&#x500D;&#x6578;</text>
      </g>

      {/* Monocot stem cross-section - scattered vascular bundles */}
      <g className={hl('stemStructure')} {...hlFilter('stemStructure')}>
        <circle cx="60" cy="185" r="30" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
        {[[45,175],[55,168],[70,172],[50,185],[65,180],[75,188],[48,198],[60,195],[72,200],[55,208],[65,178],[52,192]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#15803d" />
        ))}
        <rect x="35" y="213" width="50" height="15" rx="3" fill="rgba(255,255,255,0.8)"/>
        <text x="60" y="225" textAnchor="middle" fontSize="11" fill="#15803d" fontWeight="bold">&#x6563;&#x751F;</text>
      </g>

      {/* Monocot seed - 1 cotyledon */}
      <g className={hl('seed')} {...hlFilter('seed')}>
        <ellipse cx="150" cy="185" rx="18" ry="22" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
        <ellipse cx="150" cy="185" rx="10" ry="16" fill="#fbbf24" opacity="0.6" />
        <text x="150" y="190" textAnchor="middle" fontSize="11" fill="#92400e" fontWeight="bold">1&#x7247;</text>
        <rect x="125" y="206" width="50" height="15" rx="3" fill="rgba(255,255,255,0.8)"/>
        <text x="150" y="218" textAnchor="middle" fontSize="11" fill="#d97706" fontWeight="bold">&#x5B50;&#x8449;</text>
      </g>

      {/* RIGHT - Dicot (雙子葉) */}
      <text x="300" y="25" textAnchor="middle" fontSize="16" fill="#0ea5e9" fontWeight="bold">&#x96D9;&#x5B50;&#x8449;</text>

      {/* Dicot leaf - net veins */}
      <g className={hl('leafVein')} {...hlFilter('leafVein')}>
        <ellipse cx="260" cy="88" rx="28" ry="15" fill="#86efac" stroke="#16a34a" strokeWidth="1.5" transform="rotate(10 260 88)" />
        {/* Main vein */}
        <line x1="240" y1="88" x2="280" y2="88" stroke="#15803d" strokeWidth="1.2" transform="rotate(10 260 88)" />
        {/* Branch veins */}
        {[[250,88,245,80],[255,88,250,95],[265,88,270,80],[270,88,275,95],[260,88,258,80],[260,88,262,96]].map(([x1,y1,x2,y2],i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#15803d" strokeWidth="0.6"
            transform="rotate(10 260 88)" />
        ))}
        <rect x="230" y="103" width="60" height="15" rx="3" fill="rgba(255,255,255,0.8)"/>
        <text x="260" y="115" textAnchor="middle" fontSize="12" fill="#15803d" fontWeight="bold">&#x7DB2;&#x72C0;&#x8108;</text>
      </g>

      {/* Dicot flower - 5 petals */}
      <g className={hl('flowerParts')} {...hlFilter('flowerParts')}>
        {[0,72,144,216,288].map((angle,i) => {
          const rad = (angle * Math.PI) / 180;
          const cx = 350 + Math.cos(rad) * 14;
          const cy = 80 + Math.sin(rad) * 14;
          return <ellipse key={i} cx={cx} cy={cy} rx="9" ry="5" fill="#fb7185" stroke="#f43f5e" strokeWidth="1"
            transform={`rotate(${angle} ${cx} ${cy})`} />;
        })}
        <circle cx="350" cy="80" r="5" fill="#fbbf24" />
        <rect x="300" y="93" width="100" height="15" rx="3" fill="rgba(255,255,255,0.8)"/>
        <text x="350" y="105" textAnchor="middle" fontSize="12" fill="#f43f5e" fontWeight="bold">4&#x6216;5&#x7684;&#x500D;&#x6578;</text>
      </g>

      {/* Dicot stem cross-section - ring arrangement with cambium */}
      <g className={hl('stemStructure')} {...hlFilter('stemStructure')}>
        <circle cx="260" cy="185" r="30" fill="#dbeafe" stroke="#0ea5e9" strokeWidth="2" />
        {/* Ring of vascular bundles */}
        {[0,45,90,135,180,225,270,315].map((angle,i) => {
          const rad = (angle * Math.PI) / 180;
          return <circle key={i} cx={260 + Math.cos(rad)*18} cy={185 + Math.sin(rad)*18} r="4" fill="#0369a1" />;
        })}
        {/* Cambium ring */}
        <circle cx="260" cy="185" r="18" fill="none" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="3,2" />
        <rect x="222" y="213" width="76" height="15" rx="3" fill="rgba(255,255,255,0.8)"/>
        <text x="260" y="225" textAnchor="middle" fontSize="10" fill="#0369a1" fontWeight="bold">&#x74B0;&#x72C0;&#x6392;&#x5217;</text>
        <rect x="226" y="225" width="68" height="15" rx="3" fill="rgba(255,255,255,0.8)"/>
        <text x="260" y="237" textAnchor="middle" fontSize="10" fill="#16a34a" fontWeight="bold">+&#x5F62;&#x6210;&#x5C64;</text>
      </g>

      {/* Dicot seed - 2 cotyledons */}
      <g className={hl('seed')} {...hlFilter('seed')}>
        <ellipse cx="350" cy="185" rx="18" ry="22" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
        <line x1="350" y1="165" x2="350" y2="205" stroke="#d97706" strokeWidth="1.5" />
        <ellipse cx="343" cy="185" rx="6" ry="14" fill="#fbbf24" opacity="0.6" />
        <ellipse cx="357" cy="185" rx="6" ry="14" fill="#fbbf24" opacity="0.6" />
        <text x="350" y="190" textAnchor="middle" fontSize="11" fill="#92400e" fontWeight="bold">2&#x7247;</text>
        <rect x="325" y="206" width="50" height="15" rx="3" fill="rgba(255,255,255,0.8)"/>
        <text x="350" y="218" textAnchor="middle" fontSize="11" fill="#d97706" fontWeight="bold">&#x5B50;&#x8449;</text>
      </g>

      {/* Monocot examples */}
      <rect x="40" y="253" width="120" height="15" rx="3" fill="rgba(255,255,255,0.8)"/>
      <text x="100" y="265" textAnchor="middle" fontSize="11" fill="#64748b" fontWeight="bold">&#x7A3B;&#x7C73;&#x3001;&#x7389;&#x7C73;&#x3001;&#x767E;&#x5408;</text>
      {/* Dicot examples */}
      <rect x="230" y="253" width="140" height="15" rx="3" fill="rgba(255,255,255,0.8)"/>
      <text x="300" y="265" textAnchor="middle" fontSize="11" fill="#64748b" fontWeight="bold">&#x73AB;&#x7470;&#x3001;&#x5411;&#x65E5;&#x8475;&#x3001;&#x860B;&#x679C;</text>
    </svg>
  );
}

// ─── Plant Types Data ──────────────────────────────────────────────────────

const PLANT_TYPES = [
  {
    id: 'moss',
    name: '蘚苔植物',
    emoji: '\uD83C\uDF31',
    Component: MossPlant,
    features: [
      { id: 'rhizoids', label: '假根', emoji: '\uD83E\uDEB4', highlightPart: 'rhizoids',
        info: '不是真正的根，只能固定植物在土壤上，不能吸收水分和養分。這就是蘚苔只能長在潮濕地方的原因之一！' },
      { id: 'sporangium', label: '孢蒴', emoji: '\uD83C\uDF21\uFE0F', highlightPart: 'sporangium',
        info: '像小火柴棒的構造，長在細細的柄上。成熟後孢蒴會打開，把裡面的孢子彈出來，靠風傳播到新的地方繁殖。' },
      { id: 'noVascular', label: '沒有維管束', emoji: '\u274C', highlightPart: 'noVascular',
        info: '沒有像水管一樣的維管束系統，水分只能靠細胞一個接一個慢慢傳遞，效率很低，所以蘚苔永遠長不高！' },
      { id: 'water', label: '需要水繁殖', emoji: '\uD83D\uDCA7', highlightPart: 'body',
        info: '精子必須靠水游泳到卵的位置才能受精，所以蘚苔一定住在潮濕的環境。' },
      { id: 'examples', label: '代表物種', emoji: '\uD83D\uDCCB', highlightPart: 'body',
        info: '常見的蘚苔植物有：土馬騌、地錢、泥炭蘚。它們喜歡生長在陰暗潮濕的石頭、樹幹或泥土上。' },
    ],
  },
  {
    id: 'fern',
    name: '蕨類植物',
    emoji: '\uD83C\uDF3F',
    Component: FernPlant,
    features: [
      { id: 'vascular', label: '維管束', emoji: '\uD83D\uDEA3', highlightPart: 'vascular',
        info: '蕨類有了「水管系統」（維管束），可以高效率運送水分和養分，所以能長得比蘚苔高很多！有的筆筒樹甚至可以長到好幾公尺。' },
      { id: 'trueOrgans', label: '真正的根莖葉', emoji: '\uD83C\uDF3F', highlightPart: 'stem',
        info: '根能吸收水和養分，莖能輸送物質，葉能行光合作用。三個各有專門工作，比蘚苔進步很多！' },
      { id: 'sporangia', label: '孢子囊堆', emoji: '\uD83D\uDD35', highlightPart: 'sporangia',
        info: '葉子背面那些褐色小圓點不是蟲卵！它們是孢子囊堆，裡面裝滿了孢子，成熟後會彈出來繁殖。' },
      { id: 'waterRepro', label: '需要水繁殖', emoji: '\uD83D\uDCA7', highlightPart: 'roots',
        info: '雖然有了維管束，但精子仍然需要水才能游到卵的位置受精。所以蕨類也偏好生長在潮濕的環境。' },
      { id: 'examples', label: '代表物種', emoji: '\uD83D\uDCCB', highlightPart: 'fronds',
        info: '常見蕨類：筆筒樹（超高的樹蕨）、腎蕨、鳥巢蕨、山蘇（你可能在餐廳吃過炒山蘇！）' },
    ],
  },
  {
    id: 'gymno',
    name: '裸子植物',
    emoji: '\uD83C\uDF32',
    Component: GymnoPlant,
    features: [
      { id: 'seed', label: '種子繁殖', emoji: '\uD83C\uDF30', highlightPart: 'nakedSeed',
        info: '不再用孢子，改用種子繁殖！種子比孢子更耐旱、裡面還帶便當（養分），所以發芽成功率更高。' },
      { id: 'cone', label: '毬果', emoji: '\uD83C\uDF32', highlightPart: 'femaleCone',
        info: '雌毬果比較大，裡面裝胚珠（以後變成種子）。雄毬果比較小，負責產生大量花粉。松鼠最愛啃毬果找種子吃！' },
      { id: 'wind', label: '花粉靠風傳播', emoji: '\uD83D\uDCA8', highlightPart: 'maleCone',
        info: '不需要水來受精了！花粉靠風吹到雌毬果上完成授粉。一棵松樹可以產生幾百萬顆花粉，讓風帶到遠方。' },
      { id: 'noFlower', label: '沒有花和果實', emoji: '\u274C', highlightPart: 'noFlower',
        info: '裸子植物的「裸」就是說它的種子沒有果實包住，直接裸露在毬果鱗片上。跟被子植物最大的差別就是這個！' },
      { id: 'examples', label: '代表物種', emoji: '\uD83D\uDCCB', highlightPart: 'leaves',
        info: '常見裸子植物：松樹、柏樹、銀杏（活化石！）、蘇鐵（也是活化石）。大多是常綠的針葉樹。' },
    ],
  },
  {
    id: 'angio',
    name: '被子植物',
    emoji: '\uD83C\uDF38',
    Component: AngioPlant,
    features: [
      { id: 'flower', label: '花', emoji: '\uD83C\uDF3A', highlightPart: 'flower',
        info: '被子植物獨有的構造！用美麗的花瓣和香味吸引昆蟲、鳥類來傳粉，效率比靠風傳粉高很多。' },
      { id: 'fruit', label: '果實', emoji: '\uD83C\uDF4E', highlightPart: 'fruit',
        info: '子房發育成果實，把種子包在裡面。果實可以靠動物吃了帶到遠方、靠風吹走、或靠水漂流，幫助種子散播。' },
      { id: 'diversity', label: '種類最多', emoji: '\uD83C\uDF0D', highlightPart: 'leaves',
        info: '地球上有超過25萬種被子植物，是植物界的霸主！從沙漠到雨林、從海邊到高山，到處都有它們的身影。' },
      { id: 'monodicot', label: '單子葉vs雙子葉', emoji: '\uD83E\uDD1D', highlightPart: 'fruit',
        info: '被子植物還可以再分成單子葉（如稻米、玉米）和雙子葉（如玫瑰、蘋果），它們在葉脈、花瓣數、莖的構造上都不同！切換到「比較」分頁看更多。' },
      { id: 'examples', label: '代表物種', emoji: '\uD83D\uDCCB', highlightPart: 'flower',
        info: '常見被子植物：玫瑰、稻米、向日葵、蘋果、櫻花。我們吃的大部分蔬菜水果都是被子植物！' },
    ],
  },
  {
    id: 'compare',
    name: '單子葉vs雙子葉',
    emoji: '\uD83E\uDD1D',
    Component: null, // Uses MonocotVsDicot separately
    features: [
      { id: 'leafVein', label: '葉脈', emoji: '\uD83C\uDF43', highlightPart: 'leafVein',
        info: '單子葉的葉脈是平行排列的（像稻葉），雙子葉的葉脈是像網子一樣交叉分支（像楓葉）。下次看到葉子可以觀察看看！' },
      { id: 'flowerParts', label: '花瓣數', emoji: '\uD83C\uDF3C', highlightPart: 'flowerParts',
        info: '單子葉的花瓣數通常是3的倍數（3、6片），雙子葉通常是4或5的倍數。百合花6片花瓣→單子葉，玫瑰5片花瓣→雙子葉！' },
      { id: 'stemStructure', label: '莖的構造', emoji: '\uD83E\UDEB5', highlightPart: 'stemStructure',
        info: '單子葉的維管束在莖裡面散亂排列，雙子葉的維管束排成一圈環狀，中間還有形成層可以讓莖不斷加粗（所以大樹幾乎都是雙子葉）。' },
      { id: 'seed', label: '子葉數', emoji: '\uD83C\uDF31', highlightPart: 'seed',
        info: '種子發芽時，單子葉只冒出1片子葉，雙子葉冒出2片子葉。子葉就像寶寶的「第一餐便當」，提供發芽初期的養分。' },
    ],
  },
];

// ─── Main Component ────────────────────────────────────────────────────────

export default function PlantIllustrationExplore({ content, onComplete }) {
  const title = content?.title || '植物界四大分類';
  const instruction = content?.instruction || '點擊各個分頁和特徵按鈕，探索不同植物的構造';

  const [activeTab, setActiveTab] = useState(0);
  const [explored, setExplored] = useState(new Set());
  const [activeFeature, setActiveFeature] = useState(null);
  const [showComplete, setShowComplete] = useState(false);

  const totalFeatures = PLANT_TYPES.reduce((sum, p) => sum + p.features.length, 0);
  const exploredCount = explored.size;
  const allExplored = exploredCount >= totalFeatures;

  const handleFeatureClick = useCallback((plantId, feature) => {
    const key = `${plantId}__${feature.id}`;
    setActiveFeature((prev) => (prev?.key === key ? null : { ...feature, key }));
    setExplored((prev) => {
      const next = new Set(prev);
      next.add(key);
      if (next.size >= totalFeatures && !showComplete) {
        setTimeout(() => setShowComplete(true), 600);
      }
      return next;
    });
  }, [totalFeatures, showComplete]);

  const currentPlant = PLANT_TYPES[activeTab];
  const isCompareTab = currentPlant.id === 'compare';

  return (
    <div className="max-w-4xl mx-auto px-3 py-6">
      <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="px-5 pt-6 pb-4 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2 tracking-wide">
            {title}
          </h2>
          <p className="text-slate-300 text-base md:text-lg">{instruction}</p>
        </div>

        {/* Progress bar */}
        <div className="px-5 mb-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>已探索 {exploredCount}/{totalFeatures} 個特徵</span>
            {allExplored && <span className="text-emerald-400 font-bold">全部完成！</span>}
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(exploredCount / totalFeatures) * 100}%` }}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 mb-4">
          <div className="flex flex-wrap gap-1.5 justify-center">
            {PLANT_TYPES.map((plant, idx) => {
              const tabExplored = plant.features.every(
                (f) => explored.has(`${plant.id}__${f.id}`)
              );
              return (
                <button
                  key={plant.id}
                  onClick={() => { setActiveTab(idx); setActiveFeature(null); }}
                  className={`
                    px-3 py-2 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer
                    flex items-center gap-1.5 relative
                    ${activeTab === idx
                      ? 'bg-green-600 text-white shadow-lg shadow-green-500/30'
                      : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700 hover:text-white'
                    }
                  `}
                >
                  <span className="text-lg">{plant.emoji}</span>
                  <span>{plant.name}</span>
                  {tabExplored && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-800" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* SVG Illustration */}
        <div className="px-4 pb-2 flex justify-center">
          <div className="bg-slate-700/40 rounded-xl p-4 border border-slate-600 inline-block">
            {isCompareTab ? (
              <MonocotVsDicot
                highlight={activeFeature?.highlightPart}
                size={210}
              />
            ) : (
              <currentPlant.Component
                highlight={activeFeature?.highlightPart}
                size={230}
              />
            )}
          </div>
        </div>

        {/* Feature buttons */}
        <div className="px-5 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {currentPlant.features.map((feature) => {
              const key = `${currentPlant.id}__${feature.id}`;
              const isActive = activeFeature?.key === key;
              const wasExplored = explored.has(key);
              return (
                <button
                  key={feature.id}
                  onClick={() => handleFeatureClick(currentPlant.id, feature)}
                  className={`
                    relative flex items-center gap-2 px-3 py-2.5 rounded-xl text-left
                    transition-all duration-200 cursor-pointer group
                    ${isActive
                      ? 'bg-green-900/40 border-green-400 border-2 shadow-lg shadow-green-500/30'
                      : wasExplored
                        ? 'bg-slate-700/60 border border-slate-500 hover:border-slate-400'
                        : 'bg-slate-700/40 border border-slate-600 hover:border-slate-400 hover:bg-slate-700/70'
                    }
                  `}
                >
                  <span className="text-xl flex-shrink-0">{feature.emoji}</span>
                  <span className={`text-sm font-medium ${isActive ? 'text-green-300' : 'text-slate-200'}`}>
                    {feature.label}
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

        {/* Detail panel */}
        <div
          className={`transition-all duration-400 ease-in-out overflow-hidden ${
            activeFeature ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {activeFeature && (
            <div className="mx-5 mb-5 rounded-xl border-2 border-green-400 bg-green-900/30 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{activeFeature.emoji}</span>
                <span className="text-green-300 font-bold text-lg">{activeFeature.label}</span>
              </div>
              <p className="text-slate-200 text-sm leading-relaxed">{activeFeature.info}</p>
            </div>
          )}
        </div>

        {/* Completion section */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            showComplete ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="mx-5 mb-5 bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border border-emerald-500/50 rounded-xl p-5 text-center">
            <div className="text-3xl mb-2">&#x1F389;</div>
            <p className="text-emerald-300 font-bold text-lg mb-2">太棒了！你已經認識了植物界四大分類！</p>
            <div className="bg-slate-800/50 rounded-lg p-3 mb-4 inline-block">
              <p className="text-amber-300 text-sm">
                <span className="font-bold">&#x1F4A1; &#x8A18;&#x61B6;&#x53E3;&#x8A23;&#xFF1A;</span> &#x82DA;&#x2192;&#x8655;&#x2192;&#x88F8;&#x2192;&#x88AB;&#xFF0C;&#x6C34;&#x751F;&#x5230;&#x9678;&#x751F;&#xFF0C;&#x5B62;&#x5B50;&#x2192;&#x7A2E;&#x5B50;&#xFF0C;&#x8D8A;&#x4F86;&#x8D8A;&#x4E0D;&#x4F9D;&#x8CF4;&#x6C34;&#xFF01;
              </p>
            </div>
            <div>
              <button
                onClick={onComplete}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-full
                  hover:from-emerald-400 hover:to-teal-400 transition-all duration-200 shadow-lg shadow-emerald-500/30
                  active:scale-95 cursor-pointer text-lg"
              >
                &#x7E7C;&#x7E8C;&#x5B78;&#x7FD2; &#x27A1;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
