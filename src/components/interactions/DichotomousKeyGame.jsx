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
      }, 800);
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
        <div className="text-5xl mb-4 dk-float">🔍</div>
        <h2 className="text-2xl font-bold mb-3 text-center">{title}</h2>
        <p className="text-slate-300 text-center mb-6 max-w-md leading-relaxed">
          {instruction || `回答是非題來辨認神秘生物！共有 ${totalOrganisms} 個生物等你來挑戰。`}
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {organisms.map((org, i) => (
            <div
              key={org.id}
              className="w-12 h-12 rounded-xl bg-slate-700/60 border-2 border-slate-600 flex items-center justify-center text-2xl dk-pulse"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              ❓
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
            🌟 完美通關，零失誤！ 🌟
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
            完成 ✓
          </button>
        )}
      </div>
    );
  }

  // ── Reveal screen ──
  if (phase === 'reveal') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[420px] p-6 rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white relative overflow-hidden">
        <style>{STYLES}</style>
        <Confetti />
        {/* Progress */}
        <div className="text-sm text-slate-400 mb-4">
          生物 {currentOrgIndex + 1}/{totalOrganisms}
        </div>
        {/* Revealed card */}
        <div
          key={`reveal-${animKey}`}
          className="dk-flip flex flex-col items-center justify-center w-52 h-64 rounded-2xl bg-gradient-to-br from-emerald-800/60 to-teal-900/60 border-4 border-emerald-400 shadow-lg shadow-emerald-500/20 mb-6"
        >
          <span className="text-7xl mb-3">{currentOrganism.emoji}</span>
          <span className="text-2xl font-bold text-emerald-200">{currentOrganism.name}</span>
        </div>
        <p className="text-xl font-semibold text-emerald-300 mb-6 dk-pop" style={{ animationDelay: '0.4s' }}>
          答對了！這是{currentOrganism.name}！
        </p>
        <button
          onClick={handleNextOrganism}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-bold text-lg shadow-lg hover:shadow-violet-500/30 hover:scale-105 active:scale-95 transition-all dk-pop"
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
        feedback === 'correct' ? 'dk-flash-green' : feedback === 'wrong' ? 'dk-flash-red' : ''
      }`}
      key={feedback === 'wrong' ? `shake-${mistakes}` : undefined}
    >
      <style>{STYLES}</style>

      {/* Top progress */}
      <div className="w-full flex items-center justify-between text-sm text-slate-400 mb-4">
        <span>生物 {currentOrgIndex + 1}/{totalOrganisms}</span>
        <span>問題 {currentKeyIndex + 1}/{totalKeys}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-slate-700 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Mystery organism card */}
      <div
        key={`mystery-${animKey}`}
        className="dk-pulse flex flex-col items-center justify-center w-36 h-44 rounded-2xl bg-gradient-to-br from-slate-700/80 to-slate-800/80 border-3 border-dashed border-indigo-400 shadow-lg mb-6"
      >
        <span className="text-5xl mb-2">❓</span>
        <span className="text-xs text-slate-400 text-center px-2">
          第 {currentOrgIndex + 1}/{totalOrganisms} 隻未知生物
        </span>
      </div>

      {/* Question card */}
      <div
        key={`q-${currentOrgIndex}-${currentKeyIndex}`}
        className={`dk-pop w-full max-w-sm rounded-2xl p-5 mb-6 border-2 shadow-lg ${
          feedback === 'wrong'
            ? 'dk-shake border-red-400 bg-red-950/30'
            : 'border-cyan-400/60 bg-slate-800/70'
        }`}
      >
        <p className="text-center text-lg font-semibold leading-relaxed">
          {currentKey?.question}
        </p>
      </div>

      {/* Feedback text */}
      <div className="h-8 mb-4 flex items-center justify-center">
        {feedback === 'correct' && (
          <span className="text-emerald-300 font-semibold dk-pop">
            ✅ 沒錯！往下一個問題前進
          </span>
        )}
        {feedback === 'wrong' && (
          <span className="text-red-300 font-semibold dk-shake">
            ❌ 再想想看！
          </span>
        )}
      </div>

      {/* Answer buttons */}
      <div className="flex gap-5">
        <button
          onClick={() => handleAnswer(true)}
          disabled={feedback === 'correct'}
          className="w-28 py-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 text-white text-2xl font-bold shadow-lg hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          是
        </button>
        <button
          onClick={() => handleAnswer(false)}
          disabled={feedback === 'correct'}
          className="w-28 py-4 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 text-white text-2xl font-bold shadow-lg hover:shadow-rose-500/40 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          否
        </button>
      </div>
    </div>
  );
}
