import React, { useState, useCallback, useEffect } from 'react';

// ─── SVG Virus Diagrams (redesigned) ─────────────────────────────────────────

function GeneralVirusSVG({ activePart }) {
  const dim = (partId) => activePart && activePart !== partId ? 0.2 : 1;
  const isActive = (partId) => activePart === partId;

  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-[300px] drop-shadow-lg">
      {/* Envelope - dashed outer circle */}
      <circle cx="150" cy="150" r="120"
        fill={isActive('envelope') ? '#fef3c7' : '#fefce8'}
        stroke="#f59e0b" strokeWidth={isActive('envelope') ? 4 : 2.5}
        strokeDasharray="8,4"
        opacity={dim('envelope')}
        style={{ filter: isActive('envelope') ? 'drop-shadow(0 0 8px #f59e0b)' : 'none' }}
        className="transition-all duration-300"
      />

      {/* Spike proteins - lollipop style, fewer but larger */}
      {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const innerR = 120;
        const outerR = 145;
        const x1 = 150 + Math.cos(rad) * innerR;
        const y1 = 150 + Math.sin(rad) * innerR;
        const x2 = 150 + Math.cos(rad) * outerR;
        const y2 = 150 + Math.sin(rad) * outerR;
        return (
          <g key={`spike-${i}`} opacity={dim('spike')}
            style={{ filter: isActive('spike') ? 'drop-shadow(0 0 6px #ef4444)' : 'none' }}
            className="transition-all duration-300">
            <line x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#ef4444" strokeWidth={isActive('spike') ? 3.5 : 2.5} />
            <circle cx={x2} cy={y2} r={isActive('spike') ? 8 : 6}
              fill="#fca5a5" stroke="#ef4444" strokeWidth="2" />
          </g>
        );
      })}

      {/* Protein coat - hexagonal shape */}
      <polygon
        points={[0, 1, 2, 3, 4, 5].map(i => {
          const angle = (i * 60 - 90) * Math.PI / 180;
          return `${150 + 72 * Math.cos(angle)},${150 + 72 * Math.sin(angle)}`;
        }).join(' ')}
        fill={isActive('coat') ? '#ddd6fe' : '#ede9fe'}
        stroke="#7c3aed" strokeWidth={isActive('coat') ? 4 : 2.5}
        opacity={dim('coat')}
        style={{ filter: isActive('coat') ? 'drop-shadow(0 0 8px #7c3aed)' : 'none' }}
        className="transition-all duration-300"
      />
      {/* Coat pattern dots */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <circle key={`cd-${i}`} cx={150 + 45 * Math.cos(rad)} cy={150 + 45 * Math.sin(rad)}
            r="4" fill="#a78bfa" opacity={dim('coat') * 0.5}
            className="transition-all duration-300" />
        );
      })}

      {/* DNA/RNA strand - red wavy line */}
      <g opacity={dim('dna')}
        style={{ filter: isActive('dna') ? 'drop-shadow(0 0 8px #dc2626)' : 'none' }}
        className="transition-all duration-300">
        <path
          d="M125 115 Q135 95 150 110 Q165 125 155 145 Q145 165 160 175 Q170 180 155 190 Q140 185 145 170 Q150 155 135 145 Q120 135 130 120Z"
          fill="none" stroke={isActive('dna') ? '#f87171' : '#dc2626'}
          strokeWidth={isActive('dna') ? 4.5 : 3} strokeLinecap="round" />
        {/* Base pair rungs */}
        {[[132, 118, 148, 112], [152, 130, 166, 125], [148, 155, 162, 150], [152, 172, 165, 168]].map(([x1, y1, x2, y2], i) => (
          <line key={`bp-${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#fca5a5" strokeWidth="2" />
        ))}
      </g>
    </svg>
  );
}

function BacteriophageSVG({ activePart }) {
  const dim = (partId) => activePart && activePart !== partId ? 0.2 : 1;
  const isActive = (partId) => activePart === partId;

  return (
    <svg viewBox="0 0 240 320" className="w-full max-w-[260px] drop-shadow-lg">
      {/* Head (icosahedron) */}
      <polygon
        points="120,15 170,50 170,110 120,145 70,110 70,50"
        fill={isActive('head') ? '#bfdbfe' : '#dbeafe'}
        stroke="#3b82f6" strokeWidth={isActive('head') ? 4 : 3}
        opacity={dim('head')}
        style={{ filter: isActive('head') ? 'drop-shadow(0 0 8px #3b82f6)' : 'none' }}
        className="transition-all duration-300"
      />
      {/* Internal lines */}
      <g opacity={dim('head') * 0.35} className="transition-all duration-300">
        <line x1="120" y1="15" x2="120" y2="145" stroke="#93c5fd" strokeWidth="1" />
        <line x1="70" y1="50" x2="170" y2="110" stroke="#93c5fd" strokeWidth="1" />
        <line x1="70" y1="110" x2="170" y2="50" stroke="#93c5fd" strokeWidth="1" />
      </g>

      {/* DNA inside head */}
      <g opacity={dim('phage_dna')}
        style={{ filter: isActive('phage_dna') ? 'drop-shadow(0 0 6px #dc2626)' : 'none' }}
        className="transition-all duration-300">
        <path d="M105 55 Q110 40 120 55 Q130 70 125 85 Q120 100 125 110 Q130 115 120 120 Q110 115 115 105 Q110 95 115 80 Q120 65 110 60Z"
          fill="none" stroke="#dc2626" strokeWidth={isActive('phage_dna') ? 3.5 : 2.5} strokeLinecap="round" />
      </g>

      {/* Collar */}
      <rect x="107" y="143" width="26" height="9" rx="2"
        fill={isActive('collar') ? '#d1d5db' : '#9ca3af'}
        stroke="#6b7280" strokeWidth="1.5"
        opacity={dim('collar')}
        className="transition-all duration-300"
      />

      {/* Tail sheath */}
      <rect x="113" y="152" width="14" height="82" rx="2"
        fill={isActive('tail') ? '#d9f99d' : '#ecfccb'}
        stroke="#65a30d" strokeWidth={isActive('tail') ? 3 : 2}
        opacity={dim('tail')}
        style={{ filter: isActive('tail') ? 'drop-shadow(0 0 6px #65a30d)' : 'none' }}
        className="transition-all duration-300"
      />
      {[165, 175, 185, 195, 205, 215].map((y, i) => (
        <line key={`ts-${i}`} x1="115" y1={y} x2="125" y2={y}
          stroke="#84cc16" strokeWidth="1" opacity={dim('tail') * 0.6}
          className="transition-all duration-300" />
      ))}

      {/* Base plate */}
      <polygon
        points="100,236 140,236 150,250 90,250"
        fill={isActive('baseplate') ? '#fde68a' : '#fef9c3'}
        stroke="#eab308" strokeWidth={isActive('baseplate') ? 3 : 2}
        opacity={dim('baseplate')}
        style={{ filter: isActive('baseplate') ? 'drop-shadow(0 0 6px #eab308)' : 'none' }}
        className="transition-all duration-300"
      />

      {/* Tail fibers */}
      {[
        'M90 250 Q65 265 50 290',
        'M95 250 Q75 270 62 295',
        'M145 250 Q165 270 178 295',
        'M150 250 Q175 265 190 290',
        'M92 250 Q55 275 45 300',
        'M148 250 Q185 275 195 300',
      ].map((d, i) => (
        <path key={`tf-${i}`} d={d}
          fill="none" stroke={isActive('fibers') ? '#f97316' : '#fb923c'}
          strokeWidth={isActive('fibers') ? 3 : 2} strokeLinecap="round"
          opacity={dim('fibers')}
          style={{ filter: isActive('fibers') ? 'drop-shadow(0 0 6px #f97316)' : 'none' }}
          className="transition-all duration-300"
        />
      ))}
    </svg>
  );
}

function CoronaVirusSVG({ activePart }) {
  const dim = (partId) => activePart && activePart !== partId ? 0.2 : 1;
  const isActive = (partId) => activePart === partId;

  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-[300px] drop-shadow-lg">
      {/* Envelope circle */}
      <circle cx="150" cy="150" r="95"
        fill={isActive('corona_envelope') ? '#fef3c7' : '#fefce8'}
        stroke="#f59e0b" strokeWidth={isActive('corona_envelope') ? 4 : 2.5}
        opacity={dim('corona_envelope')}
        style={{ filter: isActive('corona_envelope') ? 'drop-shadow(0 0 8px #f59e0b)' : 'none' }}
        className="transition-all duration-300"
      />

      {/* M protein - larger dots on envelope */}
      {Array.from({ length: 10 }, (_, i) => {
        const angle = (i / 10) * Math.PI * 2;
        const x = 150 + Math.cos(angle) * 82;
        const y = 150 + Math.sin(angle) * 82;
        return (
          <circle key={`mp-${i}`} cx={x} cy={y}
            r={isActive('m_protein') ? 6 : 4.5}
            fill={isActive('m_protein') ? '#c4b5fd' : '#8b5cf6'}
            stroke={isActive('m_protein') ? '#7c3aed' : 'none'}
            strokeWidth="2"
            opacity={dim('m_protein')}
            style={{ filter: isActive('m_protein') ? 'drop-shadow(0 0 6px #8b5cf6)' : 'none' }}
            className="transition-all duration-300"
          />
        );
      })}

      {/* Spike proteins - club/mushroom shape, the signature crown */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const stemStart = 95;
        const stemEnd = 120;
        const headR = 9;
        const x1 = 150 + Math.cos(angle) * stemStart;
        const y1 = 150 + Math.sin(angle) * stemStart;
        const x2 = 150 + Math.cos(angle) * stemEnd;
        const y2 = 150 + Math.sin(angle) * stemEnd;
        const hx = 150 + Math.cos(angle) * (stemEnd + headR);
        const hy = 150 + Math.sin(angle) * (stemEnd + headR);
        // Three prong tips for club shape
        const prongs = [-0.25, 0, 0.25].map(offset => {
          const pa = angle + offset;
          return {
            x: hx + Math.cos(pa) * 5,
            y: hy + Math.sin(pa) * 5,
          };
        });
        return (
          <g key={`cs-${i}`} opacity={dim('corona_spike')}
            style={{ filter: isActive('corona_spike') ? 'drop-shadow(0 0 6px #ef4444)' : 'none' }}
            className="transition-all duration-300">
            {/* Stem */}
            <line x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#ef4444" strokeWidth={isActive('corona_spike') ? 3.5 : 2.5} />
            {/* Club head */}
            <circle cx={hx} cy={hy} r={isActive('corona_spike') ? headR + 2 : headR}
              fill="#fca5a5" stroke="#ef4444" strokeWidth="2" />
            {/* Prong tips */}
            {prongs.map((p, j) => (
              <circle key={j} cx={p.x} cy={p.y} r="3" fill="#dc2626" />
            ))}
          </g>
        );
      })}

      {/* RNA coil inside */}
      <g opacity={dim('corona_rna')}
        style={{ filter: isActive('corona_rna') ? 'drop-shadow(0 0 8px #dc2626)' : 'none' }}
        className="transition-all duration-300">
        <path
          d="M115 110 Q125 90 140 105 Q155 120 145 140 Q135 160 150 175 Q160 185 148 195 Q135 190 140 175 Q145 160 130 148 Q115 138 125 125Z"
          fill="none" stroke={isActive('corona_rna') ? '#f87171' : '#dc2626'}
          strokeWidth={isActive('corona_rna') ? 4.5 : 3} strokeLinecap="round" />
        <path
          d="M155 108 Q168 100 172 115 Q176 130 165 142"
          fill="none" stroke={isActive('corona_rna') ? '#f87171' : '#dc2626'}
          strokeWidth={isActive('corona_rna') ? 3.5 : 2.5} strokeLinecap="round" />
      </g>
    </svg>
  );
}

// ─── Replication Step Components ─────────────────────────────────────────────

function RepStep1({ played, onPlay }) {
  return (
    <div className="relative">
      <svg viewBox="0 0 400 200" className="w-full rounded-lg bg-slate-800/50">
        {/* Cell */}
        <circle cx="290" cy="100" r="75" fill="#dbeafe" stroke="#60a5fa" strokeWidth="2" />
        <text x="290" y="70" textAnchor="middle" fontSize="11" fill="#3b82f6" fontWeight="bold">宿主細胞</text>
        {/* Receptors on cell surface */}
        <rect x="210" y="88" width="8" height="24" rx="2" fill="#60a5fa" stroke="#3b82f6" strokeWidth="1" />
        <text x="225" y="84" fontSize="9" fill="#93c5fd">受體</text>

        {/* Virus particle */}
        <g style={{
          transform: played ? 'translateX(120px)' : 'translateX(0px)',
          transition: 'transform 1.2s ease-in-out'
        }}>
          <circle cx="70" cy="100" r="22" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
          {/* Small spikes */}
          {[0, 60, 120, 180, 240, 300].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            const sx = 70 + Math.cos(rad) * 22;
            const sy = 100 + Math.sin(rad) * 22;
            const ex = 70 + Math.cos(rad) * 30;
            const ey = 100 + Math.sin(rad) * 30;
            return (
              <g key={i}>
                <line x1={sx} y1={sy} x2={ex} y2={ey} stroke="#ef4444" strokeWidth="1.5" />
                <circle cx={ex} cy={ey} r="3" fill="#ef4444" />
              </g>
            );
          })}
          <text x="70" y="104" textAnchor="middle" fontSize="8" fill="#b45309" fontWeight="bold">病毒</text>
        </g>

        {/* Attachment indicator */}
        {played && (
          <g>
            <text x="200" y="140" textAnchor="middle" fontSize="11" fill="#22c55e" fontWeight="bold">
              附著成功！
            </text>
            <text x="200" y="158" textAnchor="middle" fontSize="9" fill="#86efac">
              表面蛋白與受體結合
            </text>
          </g>
        )}
      </svg>
      {!played && (
        <button onClick={onPlay}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white text-sm font-bold rounded-full shadow-lg cursor-pointer transition-all active:scale-95">
          點擊播放：病毒附著到細胞
        </button>
      )}
    </div>
  );
}

function RepStep2({ played, onPlay }) {
  return (
    <div className="relative">
      <svg viewBox="0 0 400 200" className="w-full rounded-lg bg-slate-800/50">
        {/* Cell */}
        <circle cx="250" cy="100" r="85" fill="#dbeafe" stroke="#60a5fa" strokeWidth="2" />
        <text x="250" y="55" textAnchor="middle" fontSize="11" fill="#3b82f6" fontWeight="bold">宿主細胞</text>

        {/* Virus attached to cell */}
        <circle cx="162" cy="100" r="20" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        {[120, 180, 240].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <g key={i}>
              <line x1={162 + Math.cos(rad) * 20} y1={100 + Math.sin(rad) * 20}
                x2={162 + Math.cos(rad) * 27} y2={100 + Math.sin(rad) * 27}
                stroke="#ef4444" strokeWidth="1.5" />
              <circle cx={162 + Math.cos(rad) * 27} cy={100 + Math.sin(rad) * 27} r="3" fill="#ef4444" />
            </g>
          );
        })}

        {/* DNA strand being injected */}
        <g style={{
          transform: played ? 'translateX(60px)' : 'translateX(0px)',
          opacity: played ? 1 : 0.6,
          transition: 'all 1.2s ease-in-out'
        }}>
          <path d="M165 90 Q175 80 185 90 Q195 100 185 110 Q175 120 165 110"
            fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Injection arrow */}
        {played && (
          <g>
            <line x1="185" y1="100" x2="240" y2="100" stroke="#dc2626" strokeWidth="2" strokeDasharray="4,3" />
            <polygon points="240,95 250,100 240,105" fill="#dc2626" />
            <text x="280" y="105" textAnchor="middle" fontSize="11" fill="#22c55e" fontWeight="bold">
              DNA 注入！
            </text>
            <text x="280" y="122" textAnchor="middle" fontSize="9" fill="#86efac">
              遺傳物質進入細胞
            </text>
          </g>
        )}
      </svg>
      {!played && (
        <button onClick={onPlay}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white text-sm font-bold rounded-full shadow-lg cursor-pointer transition-all active:scale-95">
          點擊播放：注入遺傳物質
        </button>
      )}
    </div>
  );
}

function RepStep3({ played, onPlay }) {
  const [showMultiple, setShowMultiple] = useState(false);

  useEffect(() => {
    if (played) {
      const timer = setTimeout(() => setShowMultiple(true), 800);
      return () => clearTimeout(timer);
    }
  }, [played]);

  return (
    <div className="relative">
      <svg viewBox="0 0 400 200" className="w-full rounded-lg bg-slate-800/50">
        {/* Cell (now hijacked) */}
        <circle cx="200" cy="100" r="90" fill={played ? '#fef2f2' : '#dbeafe'}
          stroke={played ? '#f87171' : '#60a5fa'} strokeWidth="2"
          className="transition-all duration-700" />
        <text x="200" y="38" textAnchor="middle" fontSize="11"
          fill={played ? '#ef4444' : '#3b82f6'} fontWeight="bold">
          {played ? '被劫持的細胞' : '宿主細胞'}
        </text>

        {/* Original virus DNA */}
        <path d="M180 75 Q190 65 200 75 Q210 85 200 95"
          fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />

        {/* Replicated virus particles appearing */}
        {played && (
          <g>
            {[
              [155, 100], [200, 120], [245, 100], [170, 140], [230, 140],
              [200, 80], [160, 115], [240, 115],
            ].map(([cx, cy], i) => (
              <g key={i} style={{
                opacity: showMultiple ? 1 : 0,
                transform: showMultiple ? 'scale(1)' : 'scale(0)',
                transformOrigin: `${cx}px ${cy}px`,
                transition: `all 0.5s ease-out ${i * 0.15}s`
              }}>
                <circle cx={cx} cy={cy} r="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
                <path d={`M${cx - 3} ${cy - 2} Q${cx} ${cy - 5} ${cx + 3} ${cy - 2} Q${cx + 5} ${cy + 1} ${cx + 2} ${cy + 3}`}
                  fill="none" stroke="#dc2626" strokeWidth="1" />
              </g>
            ))}
          </g>
        )}

        {played && showMultiple && (
          <text x="200" y="180" textAnchor="middle" fontSize="11" fill="#22c55e" fontWeight="bold">
            大量複製中！細胞變成病毒工廠
          </text>
        )}
      </svg>
      {!played && (
        <button onClick={onPlay}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white text-sm font-bold rounded-full shadow-lg cursor-pointer transition-all active:scale-95">
          點擊播放：細胞被迫複製病毒
        </button>
      )}
    </div>
  );
}

function RepStep4({ played, onPlay }) {
  const [scattered, setScattered] = useState(false);

  useEffect(() => {
    if (played) {
      const timer = setTimeout(() => setScattered(true), 600);
      return () => clearTimeout(timer);
    }
  }, [played]);

  // Pre-calculate scatter positions
  const scatterPositions = [
    [-60, -40], [70, -50], [-50, 50], [80, 40], [-30, -70],
    [50, 70], [-70, 10], [75, -10], [0, -80], [0, 80],
  ];

  return (
    <div className="relative">
      <svg viewBox="0 0 400 200" className="w-full rounded-lg bg-slate-800/50">
        {/* Cell membrane fragments (after burst) */}
        {played && scattered && (
          <g>
            {[
              'M160 60 Q170 55 175 65', 'M230 55 Q240 50 245 60',
              'M145 140 Q155 145 150 155', 'M250 135 Q260 140 255 150',
              'M170 150 Q180 155 185 145', 'M220 150 Q230 155 235 145',
            ].map((d, i) => (
              <path key={`frag-${i}`} d={d} fill="none" stroke="#93c5fd" strokeWidth="2"
                opacity="0.5" className="transition-all duration-500" />
            ))}
          </g>
        )}

        {/* Cell - intact or bursting */}
        {!scattered && (
          <circle cx="200" cy="100" r={played ? 95 : 85}
            fill="#fef2f2"
            stroke={played ? '#ef4444' : '#f87171'} strokeWidth={played ? 3 : 2}
            strokeDasharray={played ? '8,4' : 'none'}
            className="transition-all duration-500"
          />
        )}

        {/* Virus particles - packed inside or scattered */}
        {scatterPositions.map(([dx, dy], i) => {
          const baseCx = 200;
          const baseCy = 100;
          // Packed positions (close to center)
          const packedDx = (dx / 4);
          const packedDy = (dy / 4);
          const finalDx = scattered ? dx : packedDx;
          const finalDy = scattered ? dy : packedDy;
          return (
            <g key={`vp-${i}`}
              style={{
                transform: `translate(${finalDx}px, ${finalDy}px)`,
                transition: `transform 0.8s ease-out ${i * 0.08}s`
              }}>
              <circle cx={baseCx} cy={baseCy} r="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
              {[0, 120, 240].map((deg, j) => {
                const rad = (deg * Math.PI) / 180;
                return (
                  <circle key={j}
                    cx={baseCx + Math.cos(rad) * 11}
                    cy={baseCy + Math.sin(rad) * 11}
                    r="2" fill="#ef4444" />
                );
              })}
            </g>
          );
        })}

        {played && scattered && (
          <text x="200" y="195" textAnchor="middle" fontSize="11" fill="#ef4444" fontWeight="bold">
            細胞裂解！病毒釋出感染更多細胞
          </text>
        )}
      </svg>
      {!played && (
        <button onClick={onPlay}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white text-sm font-bold rounded-full shadow-lg cursor-pointer transition-all active:scale-95">
          點擊播放：細胞裂解釋出病毒
        </button>
      )}
    </div>
  );
}

// ─── Virus info data ────────────────────────────────────────────────────────

const virusTypes = {
  general: {
    name: '一般病毒',
    emoji: '🦠',
    component: GeneralVirusSVG,
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
    component: BacteriophageSVG,
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
    component: CoronaVirusSVG,
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

const repStepComponents = [RepStep1, RepStep2, RepStep3, RepStep4];

// ─── Main Component ─────────────────────────────────────────────────────────

export default function VirusExplore({ content, onComplete }) {
  const { title, instruction, replicationSteps, funFact } = content;

  const [activeVirusType, setActiveVirusType] = useState('general');
  const [showReplication, setShowReplication] = useState(false);
  const [explored, setExplored] = useState(new Set());
  const [activePart, setActivePart] = useState(null);
  const [repStepsPlayed, setRepStepsPlayed] = useState(new Set());
  const [repStep, setRepStep] = useState(0);
  const [showComplete, setShowComplete] = useState(false);

  // Count total explorable items
  const allPartIds = Object.values(virusTypes).flatMap(v => v.parts.map(p => p.id));
  const totalItems = allPartIds.length + (replicationSteps ? replicationSteps.length : 0);
  const exploredCount = explored.size;
  const allExplored = exploredCount >= totalItems;

  const currentVirus = virusTypes[activeVirusType];
  const DiagramComponent = currentVirus.component;

  // BUG FIX: clicking virus tabs resets showReplication
  const handleVirusTabClick = useCallback((key) => {
    setActiveVirusType(key);
    setShowReplication(false);
    setActivePart(null);
  }, []);

  const handlePartClick = useCallback((part) => {
    setActivePart(prev => prev?.id === part.id ? null : part);
    setExplored(prev => {
      const next = new Set(prev);
      next.add(part.id);
      return next;
    });
  }, []);

  const handleRepStepPlay = useCallback((idx) => {
    setRepStepsPlayed(prev => {
      const next = new Set(prev);
      next.add(idx);
      return next;
    });
    setExplored(prev => {
      const next = new Set(prev);
      next.add(`rep_${idx}`);
      return next;
    });
  }, []);

  // Check completion
  useEffect(() => {
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

        {/* Virus type tabs + replication tab */}
        <div className="px-5 mb-4">
          <div className="flex gap-2 justify-center flex-wrap">
            {Object.entries(virusTypes).map(([key, virus]) => (
              <button
                key={key}
                onClick={() => handleVirusTabClick(key)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all cursor-pointer
                  ${!showReplication && activeVirusType === key
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

        {/* ── Virus anatomy view ── */}
        {!showReplication && (
          <div className="px-4 pb-2">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              {/* SVG diagram */}
              <div className="bg-slate-700/50 rounded-xl p-5 border border-slate-600 flex items-center justify-center min-w-[260px]">
                <DiagramComponent activePart={activePart?.id} />
              </div>

              {/* Parts buttons */}
              <div className="flex flex-col gap-2 w-full md:w-auto">
                <p className="text-xs text-slate-400 font-bold mb-1">點擊各部位了解更多：</p>
                {currentVirus.parts.map((part) => {
                  const isActive = activePart?.id === part.id;
                  const wasExplored = explored.has(part.id);
                  const c = colorMap[part.color] || colorMap.purple;
                  return (
                    <button
                      key={part.id}
                      onClick={() => handlePartClick(part)}
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

            {/* Spotlight hint */}
            {activePart && (
              <p className="text-center text-xs text-slate-500 mt-3">
                其他部位已變暗，讓你聚焦在選取的結構上
              </p>
            )}
          </div>
        )}

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

        {/* ── Replication steps view ── */}
        {showReplication && replicationSteps && (
          <div className="px-5 pb-4">
            <button
              onClick={() => setShowReplication(false)}
              className="text-xs text-slate-400 hover:text-slate-200 mb-3 cursor-pointer"
            >
              &larr; 返回構造圖
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
                    onClick={() => setRepStep(idx)}
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

              {/* Interactive animation scene */}
              <div className="mb-4">
                {repStepComponents[repStep] && React.createElement(
                  repStepComponents[repStep],
                  {
                    played: repStepsPlayed.has(repStep),
                    onPlay: () => handleRepStepPlay(repStep),
                  }
                )}
              </div>

              {/* Text explanation (shown after animation plays) */}
              <div className={`transition-all duration-500 overflow-hidden ${
                repStepsPlayed.has(repStep) ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="bg-slate-800/60 rounded-xl p-4 border border-orange-500/30">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-7 h-7 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center text-sm">
                      {repStep + 1}
                    </span>
                    <h4 className="text-orange-300 font-bold text-base">{replicationSteps[repStep].title}</h4>
                  </div>
                  <p className="text-slate-200 text-sm leading-relaxed">{replicationSteps[repStep].description}</p>
                </div>
              </div>

              {/* Step navigation */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => { if (repStep > 0) setRepStep(repStep - 1); }}
                  disabled={repStep === 0}
                  className="px-4 py-2 rounded-lg text-sm font-bold text-slate-300 bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  &larr; 上一步
                </button>
                <button
                  onClick={() => { if (repStep < replicationSteps.length - 1) setRepStep(repStep + 1); }}
                  disabled={repStep === replicationSteps.length - 1}
                  className="px-4 py-2 rounded-lg text-sm font-bold text-white bg-orange-500 hover:bg-orange-400 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  下一步 &rarr;
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
