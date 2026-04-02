import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function Celebration({ message, onContinue }) {
  useEffect(() => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  }, []);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-12">
      {/* Checkmark circle */}
      <div className="mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-xl shadow-emerald-200 animate-checkPop sm:h-36 sm:w-36">
        <svg
          className="h-14 w-14 text-white sm:h-18 sm:w-18 animate-checkDraw"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="4 12 10 18 20 6" />
        </svg>
      </div>

      {/* Message */}
      <h1 className="mb-3 text-3xl font-extrabold text-gray-900 sm:text-4xl animate-fadeUp">
        {message}
      </h1>

      <p className="mb-8 text-lg text-gray-500 animate-fadeUp animation-delay-100">
        做得好，繼續加油！
      </p>

      {/* Continue button */}
      <button
        onClick={onContinue}
        className="rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 px-10 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-200 transition-all hover:scale-105 hover:shadow-xl active:scale-95 animate-fadeUp animation-delay-200"
      >
        繼續學習
      </button>

      {/* CSS animations */}
      <style>{`
        @keyframes checkPop {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.15); }
          70% { transform: scale(0.95); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-checkPop {
          animation: checkPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes checkDraw {
          0% { stroke-dasharray: 40; stroke-dashoffset: 40; }
          100% { stroke-dasharray: 40; stroke-dashoffset: 0; }
        }
        .animate-checkDraw {
          animation: checkDraw 0.5s ease-out 0.35s forwards;
          stroke-dasharray: 40;
          stroke-dashoffset: 40;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp {
          animation: fadeUp 0.5s ease-out 0.4s both;
        }
        .animation-delay-100 {
          animation-delay: 0.55s;
        }
        .animation-delay-200 {
          animation-delay: 0.7s;
        }
      `}</style>
    </div>
  );
}
