import React, { useState, useCallback, useEffect, useRef } from 'react';

/* ── CSS animations injected once ── */
const STYLES = `
@keyframes dk-pulse {
  0%, 100% { transform: scale(1); opacity: 0.85; }
  50% { transform: scale(1.06); opacity: 1; }
}
@keyframes dk-flip {
  0% { transform: rotateY(0deg) scale(1); }
  50% { transform: rotateY(90deg) scale(0.95); }
  100% { transform: rotateY(0deg) scale(1); }
}
@keyframes dk-pop {
  0% { transform: scale(0.3); opacity: 0; }
  60% { transform: scale(1.15); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes dk-shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
}
@keyframes dk-flash-green {
  0% { background-color: rgba(34,197,94,0.35); }
  100% { background-color: transparent; }
}
@keyframes dk-flash-red {
  0% { background-color: rgba(239,68,68,0.35); }
  100% { background-color: transparent; }
}
@keyframes dk-confetti-fall {
  0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(60px) rotate(360deg); opacity: 0; }
}
@keyframes dk-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
.dk-pulse { animation: dk-pulse 2s ease-in-out infinite; }
.dk-flip { animation: dk-flip 0.6s ease-in-out forwards; }
.dk-pop { animation: dk-pop 0.5s ease-out forwards; }
.dk-shake { animation: dk-shake 0.4s ease-in-out; }
.dk-flash-green { animation: dk-flash-green 0.8s ease-out forwards; }
.dk-flash-red { animation: dk-flash-red 0.8s ease-out forwards; }
.dk-float { animation: dk-float 3s ease-in-out infinite; }
`;

const CONFETTI_EMOJIS = ['🎉', '🎊', '⭐', '✨', '🌟', '🎯', '💫'];

/* ── Hardcoded clues for each organism ── */
const organismClues = {
  '大腸桿菌': [
    '用顯微鏡觀察：看不到明顯的細胞核構造',
    '細胞很小，只有幾微米',
    '有細胞壁保護',
    '會自己分裂繁殖',
  ],
  '香菇': [
    '長在腐爛的木頭上',
    '有傘狀的子實體',
    '不是綠色的，沒有葉綠素',
    '底下有菌絲深入土壤',
    '用顯微鏡看：細胞裡有細胞核',
  ],
  '玫瑰': [
    '長在土裡，有根、莖、葉',
    '葉子是綠色的，會行光合作用',
    '莖裡面有維管束（切開可以看到）',
    '會開出美麗的花朵',
    '花謝後會結出果實（玫瑰果），裡面有種子',
  ],
  '松樹': [
    '高大的樹木，葉子像針一樣細',
    '葉子是綠色的，會行光合作用',
    '莖裡面有維管束',
    '會產生毬果（松果）',
    '毬果裡有種子，但沒有果實包住',
    '不會開花',
  ],
  '老鷹': [
    '會飛、會移動、會捕食其他動物',
    '用顯微鏡看：細胞裡有細胞核',
    '身體裡有骨頭（脊椎）',
    '體溫恆定（恆溫動物）',
    '身上有羽毛',
  ],
};

function ConfettiPiece({ emoji, delay, left }) {
  return (
    <span
      className="absolute text-2xl pointer-events-none"
      style={{
        left: `${left}%`,
        top: '-10px',
        animation: `dk-confetti-fall 1.5s ease-out ${delay}s forwards`,
        opacity: 0,
        animationFillMode: 'forwards',
      }}
    >
      {emoji}
    </span>
  );
}

function Confetti() {
  const pieces = Array.from({ length: 14 }, (_, i) => ({
    emoji: CONFETTI_EMOJIS[i % CONFETTI_EMOJIS.length],
    delay: Math.random() * 0.6,
    left: 5 + Math.random() * 90,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pieces.map((p, i) => (
        <ConfettiPiece key={i} {...p} />
      ))}
    </div>
  );
}

/* ── Main component ── */
export default function DichotomousKeyGame({ content, onComplete }) {
  const { title, instruction, organisms } = content;
  const totalOrganisms = organisms.length;

  // Game phases: 'intro' | 'questioning' | 'reveal' | 'done'
  const [phase, setPhase] = useState('intro');
  const [currentOrgIndex, setCurrentOrgIndex] = useState(0);
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | null
  const [mistakes, setMistakes] = useState(0);
  const [totalMistakes, setTotalMistakes] = useState(0);
  const [identified, setIdentified] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const feedbackTimerRef = useRef(null);

  const currentOrganism = organisms[currentOrgIndex] || null;
  const currentKey = currentOrganism?.keys?.[currentKeyIndex] || null;
  const totalKeys = currentOrganism?.keys?.length || 0;
  const clues = currentOrganism ? (organismClues[currentOrganism.name] || []) : [];

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    };
  }, []);

  const handleStart = useCallback(() => {
    setPhase('questioning');
    setCurrentOrgIndex(0);
    setCurrentKeyIndex(0);
    setFeedback(null);
    setMistakes(0);
    setTotalMistakes(0);
    setIdentified(0);
  }, []);

  const handleAnswer = useCallback((userAnswer) => {
    if (!currentKey || feedback === 'correct') return;

    if (userAnswer === currentKey.answer) {
      // Correct
      setFeedback('correct');
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);

      feedbackTimerRef.current = setTimeout(() => {
        const nextKeyIndex = currentKeyIndex + 1;
        if (nextKeyIndex >= totalKeys) {
          // All keys done for this organism -> reveal
          setPhase('reveal');
          setIdentified((prev) => prev + 1);
          setAnimKey((k) => k + 1);
        } else {
          setCurrentKeyIndex(nextKeyIndex);
        }
        setFeedback(null);
        setMistakes(0);
      }, 900);
    } else {
      // Wrong
      setFeedback('wrong');
      setMistakes((m) => m + 1);
      setTotalMistakes((m) => m + 1);
      if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
      feedbackTimerRef.current = setTimeout(() => {
        setFeedback(null);
      }, 1500);
    }
  }, [currentKey, currentKeyIndex, totalKeys, feedback]);

  const handleNextOrganism = useCallback(() => {
    const nextOrg = currentOrgIndex + 1;
    if (nextOrg >= totalOrganisms) {
      setPhase('done');
    } else {
      setCurrentOrgIndex(nextOrg);
      setCurrentKeyIndex(0);
      setFeedback(null);
      setMistakes(0);
      setPhase('questioning');
      setAnimKey((k) => k + 1);
    }
  }, [currentOrgIndex, totalOrganisms]);

  // ── Intro screen ──
  if (phase === 'intro') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[420px] p-6 rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white">
        <style>{STYLES}</style>
        <div className="text-5xl mb-4 dk-float">🔬</div>
        <h2 className="text-2xl font-bold mb-3 text-center">{title}</h2>
        <p className="text-slate-300 text-center mb-4 max-w-md leading-relaxed">
          {instruction || '檢索表是生物學家用來辨認生物的工具，透過一連串的是非題，一步一步把生物分類出來。'}
        </p>
        <div className="bg-slate-800/60 rounded-xl p-4 mb-6 max-w-sm border border-slate-600/50">
          <p className="text-sm text-slate-300 leading-relaxed">
            <span className="text-amber-300 font-bold">玩法：</span>
            我們會給你一個生物的觀察紀錄，你要根據這些線索來回答檢索表的問題，一步步找出它屬於哪一類！
          </p>
          <p className="text-sm text-slate-400 mt-2">
            共有 <span className="text-teal-300 font-bold">{totalOrganisms}</span> 個生物等你來辨認。
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {organisms.map((org, i) => (
            <div
              key={org.id}
              className="w-12 h-12 rounded-xl bg-slate-700/60 border-2 border-slate-600 flex items-center justify-center text-2xl dk-pulse"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              {org.emoji}
            </div>
          ))}
        </div>
        <button
          onClick={handleStart}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg shadow-lg hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all"
        >
          開始辨認！
        </button>
      </div>
    );
  }

  // ── Done screen ──
  if (phase === 'done') {
    const perfect = totalMistakes === 0;
    return (
      <div className="flex flex-col items-center justify-center min-h-[420px] p-6 rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white relative overflow-hidden">
        <style>{STYLES}</style>
        <Confetti />
        <div className="text-6xl mb-4 dk-pop">🏆</div>
        <h2 className="text-2xl font-bold mb-2 text-center dk-pop" style={{ animationDelay: '0.2s' }}>
          太厲害了！
        </h2>
        <p className="text-xl text-emerald-300 font-semibold mb-4 dk-pop" style={{ animationDelay: '0.3s' }}>
          你成功辨認了 {identified}/{totalOrganisms} 個生物！
        </p>
        {perfect && (
          <p className="text-amber-300 mb-2 dk-pop" style={{ animationDelay: '0.4s' }}>
            完美通關，零失誤！
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-3 mb-6 dk-pop" style={{ animationDelay: '0.5s' }}>
          {organisms.map((org) => (
            <div
              key={org.id}
              className="flex flex-col items-center gap-1 bg-slate-800/60 rounded-xl px-3 py-2 border border-slate-600"
            >
              <span className="text-3xl">{org.emoji}</span>
              <span className="text-xs text-slate-300">{org.name}</span>
            </div>
          ))}
        </div>
        {onComplete && (
          <button
            onClick={onComplete}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-lg shadow-lg hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all dk-pop"
            style={{ animationDelay: '0.6s' }}
          >
            完成
          </button>
        )}
      </div>
    );
  }

  // ── Reveal screen (after correctly answering all keys for one organism) ──
  if (phase === 'reveal') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[420px] p-6 rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white relative overflow-hidden">
        <style>{STYLES}</style>
        <Confetti />
        {/* Progress */}
        <div className="text-sm text-slate-400 mb-4">
          生物 {currentOrgIndex + 1}/{totalOrganisms}
        </div>
        {/* Revealed organism */}
        <div
          key={`reveal-${animKey}`}
          className="dk-pop text-center py-8"
        >
          <div className="text-7xl mb-4">{currentOrganism.emoji}</div>
          <h3 className="text-2xl font-bold text-emerald-300 mb-2">
            答對了！這是{currentOrganism.name}！
          </h3>
          <p className="text-slate-300">
            你成功用檢索表辨認出了這種生物
          </p>
        </div>
        <button
          onClick={handleNextOrganism}
          className="mt-4 px-8 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold text-lg shadow-lg hover:shadow-teal-500/30 hover:scale-105 active:scale-95 transition-all dk-pop"
          style={{ animationDelay: '0.6s' }}
        >
          {currentOrgIndex + 1 < totalOrganisms ? '下一個生物 →' : '查看結果 🏆'}
        </button>
      </div>
    );
  }

  // ── Questioning phase ──
  const progressPercent = ((currentKeyIndex) / totalKeys) * 100;

  return (
    <div
      className={`flex flex-col items-center min-h-[420px] p-6 rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white relative overflow-hidden ${
        feedback === 'correct' ? 'dk-flash-green' : ''
      }`}
    >
      <style>{STYLES}</style>

      {/* Top progress */}
      <div className="w-full flex items-center justify-between text-sm text-slate-400 mb-3">
        <span>生物 {currentOrgIndex + 1}/{totalOrganisms}</span>
        <span>問題 {currentKeyIndex + 1}/{totalKeys}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-slate-700 rounded-full mb-5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Organism observation card */}
      <div
        key={`obs-${animKey}`}
        className="w-full max-w-md bg-slate-700/50 rounded-xl p-5 mb-5 border border-slate-500/70"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{currentOrganism.emoji}</span>
          <div>
            <h3 className="text-lg font-bold text-amber-300">
              神秘生物 #{currentOrgIndex + 1}
            </h3>
            <p className="text-slate-400 text-sm">
              根據觀察紀錄，用檢索表找出它是什麼！
            </p>
          </div>
        </div>

        {/* Clues list */}
        <div className="space-y-2">
          <p className="text-xs text-slate-400 font-bold tracking-wide">🔬 觀察紀錄：</p>
          {clues.length > 0 ? (
            clues.map((clue, i) => (
              <div key={i} className="flex items-start gap-2 text-slate-200 text-sm">
                <span className="text-teal-400 mt-0.5 shrink-0">•</span>
                <span>{clue}</span>
              </div>
            ))
          ) : (
            <p className="text-slate-400 text-sm italic">（觀察紀錄載入中...）</p>
          )}
        </div>
      </div>

      {/* Current question */}
      <div className="text-center mb-5 w-full max-w-md">
        <p className="text-slate-400 text-sm mb-2">
          檢索表問題 {currentKeyIndex + 1}/{totalKeys}：
        </p>
        <h4 className="text-xl font-bold text-white mb-5">
          {currentKey?.question}
        </h4>

        {/* YES / NO buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => handleAnswer(true)}
            disabled={feedback === 'correct'}
            className="px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            是
          </button>
          <button
            onClick={() => handleAnswer(false)}
            disabled={feedback === 'correct'}
            className="px-10 py-4 bg-red-600 hover:bg-red-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-red-500/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            否
          </button>
        </div>
      </div>

      {/* Feedback area */}
      <div className="w-full max-w-md min-h-[60px] flex items-center justify-center">
        {feedback === 'correct' && (
          <div className="dk-pop text-center">
            <span className="text-emerald-300 font-semibold text-lg">
              沒錯！往下一步前進
            </span>
          </div>
        )}
        {feedback === 'wrong' && (
          <div
            key={`wrong-${mistakes}`}
            className="dk-shake bg-red-900/30 border border-red-500/60 rounded-xl p-4 w-full text-center"
          >
            <p className="text-red-300 font-bold">再想想看！🤔</p>
            <p className="text-slate-300 text-sm mt-1">
              重新看一下觀察紀錄，答案就在裡面喔！
            </p>
          </div>
        )}
      </div>

      {/* Key step indicators */}
      <div className="flex gap-1.5 justify-center mt-4">
        {currentOrganism.keys.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              i < currentKeyIndex
                ? 'bg-emerald-400'
                : i === currentKeyIndex
                ? 'bg-amber-400'
                : 'bg-slate-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
