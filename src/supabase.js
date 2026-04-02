import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const isConfigured = !!(supabaseUrl && supabaseAnonKey)

const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Generate student ID from class + seat
function getStudentId(classNum, seatNum) {
  return `${classNum}_${seatNum}`
}

const defaultProgress = { unit1: {}, unit2: {}, unit3: {}, unit4: {}, unit5: {}, unit6: {} }

// Login: look up by class+seat, verify birthday
export async function loginStudent(classNum, seatNum, birthday) {
  const studentId = getStudentId(classNum, seatNum)

  if (!isConfigured) {
    return {
      id: studentId,
      班級: classNum,
      姓名: '測試同學',
      座號: Number(seatNum),
      進度: defaultProgress,
    }
  }

  // Try to find existing student
  const { data: existing } = await supabase
    .from('bio_students')
    .select('*')
    .eq('id', studentId)
    .single()

  if (existing) {
    // Check birthday matches
    if (existing.birthday && existing.birthday !== birthday) {
      throw new Error('WRONG_PASSWORD')
    }
    return {
      id: existing.id,
      班級: existing.class_num,
      姓名: existing.name,
      座號: existing.seat_num,
      進度: existing.progress || defaultProgress,
    }
  }

  // New student - need to collect name first
  return { needsName: true }
}

// Complete first-time registration
export async function completeRegistration(classNum, seatNum, birthday, name) {
  const studentId = getStudentId(classNum, seatNum)

  if (!isConfigured) {
    return {
      id: studentId,
      班級: classNum,
      姓名: name,
      座號: Number(seatNum),
      進度: defaultProgress,
    }
  }

  const { data: created, error } = await supabase
    .from('bio_students')
    .insert({
      id: studentId,
      class_num: classNum,
      name: name,
      seat_num: Number(seatNum),
      birthday: birthday,
      progress: defaultProgress,
    })
    .select()
    .single()

  if (error) throw error

  return {
    id: created.id,
    班級: created.class_num,
    姓名: created.name,
    座號: created.seat_num,
    進度: created.progress,
  }
}

// Update concept completion
export async function updateProgress(studentId, unitKey, conceptKey) {
  if (!isConfigured) return

  const { data } = await supabase
    .from('bio_students')
    .select('progress')
    .eq('id', studentId)
    .single()

  if (!data) return

  const progress = data.progress || {}
  if (!progress[unitKey]) progress[unitKey] = {}
  progress[unitKey][conceptKey] = {
    完成: true,
    時間: new Date().toISOString(),
  }

  await supabase
    .from('bio_students')
    .update({ progress })
    .eq('id', studentId)
}

// Get student progress
export async function getStudentProgress(studentId) {
  if (!isConfigured) return null

  const { data } = await supabase
    .from('bio_students')
    .select('progress')
    .eq('id', studentId)
    .single()

  return data?.progress || null
}

// Get all students (for admin)
export async function getAllStudents() {
  if (!isConfigured) return []

  const { data, error } = await supabase
    .from('bio_students')
    .select('*')
    .order('class_num')
    .order('seat_num')

  if (error) return []

  return data.map(s => ({
    id: s.id,
    班級: s.class_num,
    姓名: s.name,
    座號: s.seat_num,
    進度: s.progress || {},
    建立時間: s.created_at,
  }))
}

// Settings: get quiz links
export async function getSettings() {
  const defaults = { unit1TestLink: '', unit2TestLink: '', unit3TestLink: '', unit4TestLink: '', unit5TestLink: '', unit6TestLink: '' }
  if (!isConfigured) return defaults

  const { data } = await supabase
    .from('bio_settings')
    .select('*')
    .eq('id', 'quizLinks')
    .single()

  if (!data) return defaults

  return {
    unit1TestLink: data.unit1_test_link || '',
    unit2TestLink: data.unit2_test_link || '',
    unit3TestLink: data.unit3_test_link || '',
    unit4TestLink: data.unit4_test_link || '',
    unit5TestLink: data.unit5_test_link || '',
    unit6TestLink: data.unit6_test_link || '',
  }
}

// Settings: update quiz links (FIXED: was using wrong table name 'settings')
export async function updateSettings(settings) {
  if (!isConfigured) return

  const { data: existing } = await supabase
    .from('bio_settings')
    .select('id')
    .eq('id', 'quizLinks')
    .single()

  const row = {
    id: 'quizLinks',
    unit1_test_link: settings.unit1TestLink || '',
    unit2_test_link: settings.unit2TestLink || '',
    unit3_test_link: settings.unit3TestLink || '',
    unit4_test_link: settings.unit4TestLink || '',
    unit5_test_link: settings.unit5TestLink || '',
    unit6_test_link: settings.unit6TestLink || '',
  }

  if (existing) {
    await supabase.from('bio_settings').update(row).eq('id', 'quizLinks')
  } else {
    await supabase.from('bio_settings').insert(row)
  }
}

export { supabase }
