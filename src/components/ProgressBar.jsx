export default function ProgressBar({ current, total, unitTitle }) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center gap-4 px-4 py-3">
        {/* Unit title */}
        <h3 className="shrink-0 text-sm font-semibold text-gray-700 sm:text-base">
          {unitTitle}
        </h3>

        {/* Bar + label container */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {/* Track */}
          <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-gray-200">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 transition-[width] duration-500 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>

          {/* Label */}
          <span className="shrink-0 text-xs font-medium text-gray-500 sm:text-sm">
            概念 {current} / {total}
          </span>
        </div>
      </div>
    </div>
  );
}
