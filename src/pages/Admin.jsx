import { useState, useEffect } from 'react'
import { getAllStudents, getSettings, updateSettings } from '../supabase'
import { units } from '../data/units'

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [students, setStudents] = useState([])
  const [settings, setSettingsState] = useState({})
  const [loading, setLoading] = useState(false)
  const [filterClass, setFilterClass] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    let success = false
    try {
      const res = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) success = true
    } catch {
      // API not available, fall through to local check
    }
    if (!success) {
      success = password === 'door949kyle461'
    }
    if (success) {
      setIsLoggedIn(true)
      setLoginError('')
      loadData()
    } else {
      setLoginError('密碼錯誤')
    }
  }

  const loadData = async () => {
    setLoading(true)
    try {
      const [studentData, settingsData] = await Promise.all([
        getAllStudents(),
        getSettings(),
      ])
      setStudents(studentData)
      setSettingsState(settingsData)
    } catch (err) {
      console.error('Failed to load data:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredStudents = filterClass
    ? students.filter(s => s.班級 === filterClass)
    : students

  const uniqueClasses = [...new Set(students.map(s => s.班級))].sort()

  const getConceptStatus = (student, unitId, conceptId) => {
    const unitProgress = student.進度?.[unitId]
    if (!unitProgress) return false
    return unitProgress[conceptId]?.完成 || false
  }

  const getCompletionTime = (student, unitId, conceptId) => {
    const unitProgress = student.進度?.[unitId]
    if (!unitProgress || !unitProgress[conceptId]) return ''
    const time = unitProgress[conceptId]?.時間
    if (!time) return ''
    const date = new Date(time)
    return date.toLocaleString('zh-TW')
  }

  const getUnitCompletedCount = (student, unit) => {
    return unit.concepts.filter(c => getConceptStatus(student, unit.id, c.id)).length
  }

  const handleSaveSettings = async () => {
    setSaving(true)
    try {
      await updateSettings(settings)
      setSaveMsg('儲存成功！')
      setTimeout(() => setSaveMsg(''), 3000)
    } catch (err) {
      setSaveMsg('儲存失敗')
    } finally {
      setSaving(false)
    }
  }

  const exportCSV = () => {
    const headers = ['班級', '姓名', '座號']
    units.forEach(unit => {
      headers.push(`${unit.title} 完成概念數`)
      unit.concepts.forEach(c => {
        headers.push(`${unit.title}-${c.title}`)
      })
    })

    const rows = filteredStudents.map(student => {
      const row = [student.班級, student.姓名, student.座號]
      units.forEach(unit => {
        const completed = getUnitCompletedCount(student, unit)
        row.push(`${completed}/${unit.concepts.length}`)
        unit.concepts.forEach(c => {
          const done = getConceptStatus(student, unit.id, c.id)
          const time = getCompletionTime(student, unit.id, c.id)
          row.push(done ? `完成 ${time}` : '未完成')
        })
      })
      return row
    })

    const BOM = '\uFEFF'
    const csvContent = BOM + [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `學生學習進度_${new Date().toLocaleDateString('zh-TW')}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Login page
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="card w-full max-w-sm">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            🔐 老師後台
          </h1>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-600 mb-2">
              管理員密碼
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:outline-none text-lg"
              placeholder="請輸入密碼"
            />
          </div>
          {loginError && (
            <p className="text-red-500 text-sm mb-4">{loginError}</p>
          )}
          <button type="submit" className="w-full btn-primary">
            登入
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">🔐 老師後台管理</h1>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="text-sm text-gray-400 hover:text-gray-600"
          >
            登出
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Settings Section */}
        <section className="card">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📝 單元測驗連結設定</h2>
          <div className="space-y-4">
            {units.map(unit => (
              <div key={unit.id} className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label className="text-sm font-bold text-gray-600 w-48 flex-shrink-0">
                  {unit.title}
                </label>
                <input
                  type="url"
                  value={settings[`${unit.id}TestLink`] || ''}
                  onChange={(e) => setSettingsState(prev => ({
                    ...prev,
                    [`${unit.id}TestLink`]: e.target.value
                  }))}
                  placeholder="https://forms.gle/..."
                  className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-primary-400 focus:outline-none"
                />
              </div>
            ))}
            <div className="flex items-center gap-4">
              <button
                onClick={handleSaveSettings}
                disabled={saving}
                className="btn-primary"
              >
                {saving ? '儲存中...' : '儲存設定'}
              </button>
              {saveMsg && (
                <span className={`text-sm font-medium ${saveMsg.includes('成功') ? 'text-green-600' : 'text-red-600'}`}>
                  {saveMsg}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Students Section */}
        <section className="card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-800">📊 學生學習進度</h2>
            <div className="flex gap-3">
              <select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className="px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-primary-400 focus:outline-none"
              >
                <option value="">全部班級</option>
                {uniqueClasses.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <button onClick={loadData} className="btn-outline text-sm">
                🔄 重新整理
              </button>
              <button onClick={exportCSV} className="btn-secondary text-sm">
                📥 匯出 CSV
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin text-3xl mb-2">⏳</div>
              <p className="text-gray-400">載入中...</p>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">尚無學生資料</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-3 font-bold text-gray-600">班級</th>
                    <th className="text-left py-3 px-3 font-bold text-gray-600">座號</th>
                    <th className="text-left py-3 px-3 font-bold text-gray-600">姓名</th>
                    {units.map(unit => (
                      <th key={unit.id} className="text-center py-3 px-3 font-bold text-gray-600">
                        {unit.title.split(' ')[0]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents
                    .sort((a, b) => {
                      if (a.班級 !== b.班級) return a.班級.localeCompare(b.班級)
                      return a.座號 - b.座號
                    })
                    .map(student => (
                    <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-3">{student.班級}</td>
                      <td className="py-3 px-3">{student.座號}</td>
                      <td className="py-3 px-3 font-medium">{student.姓名}</td>
                      {units.map(unit => {
                        const completed = getUnitCompletedCount(student, unit)
                        const total = unit.concepts.length
                        const percent = Math.round((completed / total) * 100)
                        return (
                          <td key={unit.id} className="py-3 px-3 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-16 bg-gray-100 rounded-full h-2 overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    percent === 100 ? 'bg-green-500' : 'bg-primary-400'
                                  }`}
                                  style={{ width: `${percent}%` }}
                                />
                              </div>
                              <span className="text-xs text-gray-500">
                                {completed}/{total}
                              </span>
                            </div>
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
