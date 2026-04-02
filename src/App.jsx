import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Login from './pages/Login'
import UnitSelect from './pages/UnitSelect'
import Learning from './pages/Learning'
import Admin from './pages/Admin'

function getInitialStudent() {
  try {
    const saved = localStorage.getItem('bio_student')
    return saved ? JSON.parse(saved) : null
  } catch {
    localStorage.removeItem('bio_student')
    return null
  }
}

function App() {
  const [student, setStudent] = useState(getInitialStudent)

  const handleLogin = (studentData) => {
    setStudent(studentData)
    localStorage.setItem('bio_student', JSON.stringify(studentData))
  }

  const handleLogout = () => {
    setStudent(null)
    localStorage.removeItem('bio_student')
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            student
              ? <Navigate to="/units" replace />
              : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/units"
          element={
            student
              ? <UnitSelect student={student} onLogout={handleLogout} />
              : <Navigate to="/" replace />
          }
        />
        <Route
          path="/learn/:unitId"
          element={
            student
              ? <Learning student={student} />
              : <Navigate to="/" replace />
          }
        />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  )
}

export default App
