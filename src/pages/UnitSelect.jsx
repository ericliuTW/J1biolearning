import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getStudentProgress, getSettings } from '../supabase'
import { units } from '../data/units'

export default function UnitSelect({ student, onLogout }) {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(null)
  const [settings, setSettings] = useState({})

  useEffect(() => {
    async function load() {
      try {
        const [p, s] = await Promise.all([
          getStudentProgress(student.id),
          getSettings(),
        ])
        setProgress(p)
        setSettings(s)
      } catch (err) {
        console.error('Failed to load:', err)
      }
    }
    load()
  }, [student.id])

  const getUnitProgress = (unit) => {
    if (!progress || !progress[unit.id]) return { completed: 0, total: unit.concepts.length }
    const unitProgress = progress[unit.id]
    const completed = unit.concepts.filter(c => unitProgress[c.id]?.完成).length
    return { completed, total: unit.concepts.length }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-primary-800">🧬 國一生物自主學習</h1>
            <p className="text-sm text-gray-500">
              {student.班級} {student.座號}號 {student.姓名}
            </p>
          </div>
          <button
            onClick={onLogout}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            登出
          </button>
        </div>
      </div>

      {/* Units */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-black text-gray-800 mb-6">選擇學習單元</h2>

        <div className="grid gap-6 md:grid-cols-1">
          {units.map((unit) => {
            const { completed, total } = getUnitProgress(unit)
            const percent = Math.round((completed / total) * 100)
            const isComplete = completed === total
            const testLink = settings[`${unit.id}TestLink`]

            return (
              <div key={unit.id} className="card">
                <button
                  onClick={() => navigate(`/learn/${unit.id}`)}
                  className="w-full text-left hover:opacity-90 transition-opacity"
                >
                  <div className="flex items-start gap-4">
                    <div className={`text-5xl p-3 rounded-2xl bg-gradient-to-br ${unit.color} flex items-center justify-center`}>
                      <span className="drop-shadow">{unit.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {unit.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3">
                        {unit.concepts.length} 個概念
                      </p>

                      {/* Progress bar */}
                      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isComplete
                              ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                              : 'bg-gradient-to-r from-primary-400 to-primary-500'
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {isComplete ? '已完成 ✓' : `${completed} / ${total} 概念`}
                      </p>
                    </div>

                    {isComplete && (
                      <div className="text-3xl">🏆</div>
                    )}
                  </div>
                </button>

                {/* Bottom area: re-learn + test link */}
                {(isComplete || testLink) && (
                  <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-3">
                    {isComplete && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/learn/${unit.id}?relearn=true`)
                        }}
                        className="text-sm px-4 py-2 rounded-lg border-2 border-primary-300 text-primary-600 hover:bg-primary-50 font-medium transition-colors"
                      >
                        🔄 重新學習
                      </button>
                    )}
                    {testLink && (
                      <a
                        href={testLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className={`text-sm px-4 py-2 rounded-lg font-medium transition-colors ${
                          isComplete
                            ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-sm'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none'
                        }`}
                      >
                        📝 線上測驗
                      </a>
                    )}
                    {testLink && !isComplete && (
                      <span className="text-xs text-gray-400">完成學習後可進行測驗</span>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
