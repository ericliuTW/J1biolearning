import { useState, useEffect } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { units } from '../data/units'
import { getStudentProgress, updateProgress, getSettings } from '../supabase'
import ProgressBar from '../components/ProgressBar'
import DnaMutator from '../components/interactions/DnaMutator'
import ClickExploreScene from '../components/interactions/ClickExploreScene'
import StepProcess from '../components/interactions/StepProcess'
import TimelineExplorer from '../components/interactions/TimelineExplorer'
import DigReveal from '../components/interactions/DigReveal'
import FossilSortingGame from '../components/interactions/FossilSortingGame'
import EvolutionMatchGame from '../components/interactions/EvolutionMatchGame'
import CloningLab from '../components/interactions/CloningLab'
import GeneTransferLab from '../components/interactions/GeneTransferLab'
import CategorySortGame from '../components/interactions/CategorySortGame'
import MatchingPairsGame from '../components/interactions/MatchingPairsGame'
import SequenceOrderGame from '../components/interactions/SequenceOrderGame'
import Quiz from '../components/Quiz'
import Celebration from '../components/Celebration'

const interactionComponents = {
  dnaMutator: DnaMutator,
  clickExplore: ClickExploreScene,
  stepProcess: StepProcess,
  timelineExplorer: TimelineExplorer,
  digReveal: DigReveal,
  fossilSorting: FossilSortingGame,
  evolutionMatch: EvolutionMatchGame,
  cloningLab: CloningLab,
  geneTransferLab: GeneTransferLab,
  categorySort: CategorySortGame,
  matchingPairs: MatchingPairsGame,
  sequenceOrder: SequenceOrderGame,
}

const PHASE = {
  INTERACTION: 'interaction',
  QUIZ: 'quiz',
  CELEBRATION: 'celebration',
}

export default function Learning({ student }) {
  const { unitId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const unit = units.find(u => u.id === unitId)
  const isRelearn = searchParams.get('relearn') === 'true'

  const [currentConceptIndex, setCurrentConceptIndex] = useState(0)
  const [phase, setPhase] = useState(PHASE.INTERACTION)
  const [completedConcepts, setCompletedConcepts] = useState({})
  const [allDone, setAllDone] = useState(false)
  const [testLink, setTestLink] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!unit) return
      try {
        const progress = await getStudentProgress(student.id)
        const unitProgress = progress?.[unitId] || {}
        setCompletedConcepts(unitProgress)

        if (isRelearn) {
          // Relearn mode: start from concept 1
          setCurrentConceptIndex(0)
          setAllDone(false)
          setPhase(PHASE.INTERACTION)
        } else {
          // Normal mode: find first incomplete
          const firstIncomplete = unit.concepts.findIndex(
            c => !unitProgress[c.id]?.完成
          )
          if (firstIncomplete === -1) {
            setAllDone(true)
            setCurrentConceptIndex(unit.concepts.length - 1)
          } else {
            setCurrentConceptIndex(firstIncomplete)
          }
        }

        const settings = await getSettings()
        const linkKey = `${unitId}TestLink`
        setTestLink(settings[linkKey] || '')
      } catch (err) {
        console.error('Failed to load progress:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [student.id, unitId])

  if (!unit) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-500">找不到此單元</p>
          <button onClick={() => navigate('/units')} className="btn-primary mt-4">
            返回選擇單元
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">🧬</div>
          <p className="text-gray-500 text-lg">載入中...</p>
        </div>
      </div>
    )
  }

  const currentConcept = unit.concepts[currentConceptIndex]
  const InteractionComponent = interactionComponents[currentConcept.interactionType]

  const handleInteractionComplete = () => {
    setPhase(PHASE.QUIZ)
  }

  const handleQuizPass = async () => {
    try {
      await updateProgress(student.id, unitId, currentConcept.id)
    } catch (err) {
      console.error('Failed to save progress:', err)
    }

    setCompletedConcepts(prev => ({
      ...prev,
      [currentConcept.id]: { 完成: true }
    }))
    setPhase(PHASE.CELEBRATION)
  }

  const handleContinue = () => {
    if (currentConceptIndex < unit.concepts.length - 1) {
      setCurrentConceptIndex(prev => prev + 1)
      setPhase(PHASE.INTERACTION)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setAllDone(true)
    }
  }

  // All concepts completed view
  if (allDone) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="card text-center py-12">
            <div className="text-7xl mb-6">🎉</div>
            <h2 className="text-3xl font-black text-primary-800 mb-4">
              恭喜完成！
            </h2>
            <p className="text-xl text-gray-600 mb-2">
              你已經完成了「{unit.title}」的所有概念！
            </p>
            <p className="text-gray-400 mb-8">
              太厲害了！繼續保持這個學習態度！
            </p>

            <div className="space-y-4">
              {testLink && (
                <a
                  href={testLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block btn-primary text-xl py-4"
                >
                  📝 前往單元測驗
                </a>
              )}
              <button
                onClick={() => {
                  setAllDone(false)
                  setCurrentConceptIndex(0)
                  setPhase(PHASE.INTERACTION)
                }}
                className="block w-full text-sm px-4 py-3 rounded-xl border-2 border-primary-300 text-primary-600 hover:bg-primary-50 font-medium transition-colors"
              >
                🔄 重新學習此單元
              </button>
              <button
                onClick={() => navigate('/units')}
                className="block w-full btn-outline"
              >
                ← 返回選擇單元
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <ProgressBar
        current={currentConceptIndex + 1}
        total={unit.concepts.length}
        unitTitle={unit.title}
      />

      <div className="max-w-3xl mx-auto px-4 pt-4">
        <button
          onClick={() => navigate('/units')}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1"
        >
          ← 返回單元列表
        </button>
      </div>

      {/* Concept navigation */}
      <div className="max-w-3xl mx-auto px-4 py-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {unit.concepts.map((concept, idx) => {
            const isCompleted = completedConcepts[concept.id]?.完成
            const isCurrent = idx === currentConceptIndex
            // In relearn mode, all concepts are unlocked
            const isLocked = !isRelearn && idx > currentConceptIndex && !isCompleted

            return (
              <button
                key={concept.id}
                disabled={isLocked}
                onClick={() => {
                  if (!isLocked) {
                    setCurrentConceptIndex(idx)
                    // In relearn mode, always start interaction
                    if (isRelearn) {
                      setPhase(PHASE.INTERACTION)
                    } else {
                      setPhase(isCompleted ? PHASE.CELEBRATION : PHASE.INTERACTION)
                    }
                  }
                }}
                className={`
                  flex-shrink-0 w-10 h-10 rounded-full font-bold text-sm flex items-center justify-center transition-all
                  ${isCurrent ? 'bg-primary-500 text-white scale-110 shadow-lg' : ''}
                  ${isCompleted && !isCurrent ? 'bg-green-500 text-white' : ''}
                  ${isLocked ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : ''}
                  ${!isCurrent && !isCompleted && !isLocked ? 'bg-gray-200 text-gray-600 hover:bg-gray-300' : ''}
                `}
              >
                {isCompleted ? '✓' : idx + 1}
              </button>
            )
          })}
        </div>
        {isRelearn && (
          <p className="text-xs text-primary-500 mt-1 font-medium">🔄 重新學習模式 — 所有概念已解鎖</p>
        )}
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-black text-gray-800">
            概念 {currentConceptIndex + 1}：{currentConcept.title}
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            {phase === PHASE.INTERACTION && '完成互動內容後即可進入練習題'}
            {phase === PHASE.QUIZ && '答對練習題才能解鎖下一個概念'}
            {phase === PHASE.CELEBRATION && '恭喜完成此概念！'}
          </p>
        </div>

        {phase === PHASE.INTERACTION && InteractionComponent && (
          <InteractionComponent
            content={currentConcept.content}
            onComplete={handleInteractionComplete}
          />
        )}

        {phase === PHASE.QUIZ && (
          <Quiz
            quiz={currentConcept.quiz}
            onPass={handleQuizPass}
          />
        )}

        {phase === PHASE.CELEBRATION && (
          <Celebration
            message={`「${currentConcept.title}」完成！`}
            onContinue={handleContinue}
          />
        )}
      </div>
    </div>
  )
}
