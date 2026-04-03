import { useState } from 'react'
import { loginStudent, completeRegistration } from '../supabase'

export default function Login({ onLogin }) {
  const [classNum, setClassNum] = useState('')
  const [seatNum, setSeatNum] = useState('')
  const [birthday, setBirthday] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [needsName, setNeedsName] = useState(false)
  const [pendingStudent, setPendingStudent] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!classNum || !seatNum || !birthday) {
      setError('請填寫所有欄位')
      return
    }
    if (birthday.length !== 4 || !/^\d{4}$/.test(birthday)) {
      setError('生日格式：4位數字，例如 0315 代表3月15日')
      return
    }
    setLoading(true)
    setError('')
    try {
      const result = await loginStudent(classNum, Number(seatNum), birthday)
      if (result.needsName) {
        // First time login, need to collect name
        setPendingStudent(result)
        setNeedsName(true)
      } else {
        onLogin(result)
      }
    } catch (err) {
      console.error(err)
      if (err.message === 'WRONG_PASSWORD') {
        setError('生日不正確，請重新輸入')
      } else {
        setError('登入失敗，請稍後再試')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleNameSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('請輸入你的姓名')
      return
    }
    setLoading(true)
    setError('')
    try {
      const student = await completeRegistration(
        classNum, Number(seatNum), birthday, name.trim()
      )
      onLogin(student)
    } catch (err) {
      console.error(err)
      setError('註冊失敗，請稍後再試')
    } finally {
      setLoading(false)
    }
  }

  // Name registration screen (first-time users)
  if (needsName) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">👋</div>
            <h1 className="text-2xl font-black text-primary-800 mb-2">
              歡迎新同學！
            </h1>
            <p className="text-gray-500">
              {classNum} 班 {seatNum} 號，這是你第一次登入
            </p>
            <p className="text-gray-400 text-sm mt-1">請輸入你的姓名完成註冊</p>
          </div>

          <form onSubmit={handleNameSubmit} className="card space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-2">
                姓名
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="請輸入你的姓名"
                autoFocus
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:outline-none text-lg transition-colors"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary text-xl py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '註冊中...' : '完成註冊，開始學習'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🧬</div>
          <h1 className="text-3xl font-black text-primary-800 mb-2">
            J14國一自然預習平台
          </h1>
          <p className="text-gray-500 text-lg">開始你的探索之旅吧！</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-2">
              班級
            </label>
            <input
              type="text"
              value={classNum}
              onChange={(e) => setClassNum(e.target.value)}
              placeholder="例：704"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:outline-none text-lg transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-600 mb-2">
              座號
            </label>
            <input
              type="number"
              value={seatNum}
              onChange={(e) => setSeatNum(e.target.value)}
              placeholder="例：15"
              min="1"
              max="50"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:outline-none text-lg transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-600 mb-2">
              生日（4位數字，當作密碼）
            </label>
            <input
              type="password"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              placeholder="例：0315（3月15日）"
              maxLength={4}
              inputMode="numeric"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-400 focus:outline-none text-lg transition-colors"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary text-xl py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                登入中...
              </span>
            ) : (
              '開始學習'
            )}
          </button>
        </form>

        {/* Admin link */}
        <div className="text-center mt-6">
          <a href="/admin" className="text-xs text-gray-300 hover:text-gray-500 transition-colors">
            老師後台
          </a>
        </div>
      </div>
    </div>
  )
}
