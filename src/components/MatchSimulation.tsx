import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CardType } from '../types'

interface MatchSimulationProps {
  activeTeam: CardType[]
  addGold: (amount: number) => void
}

interface Goal {
  team: string
  player: string
  time: number
}

const MatchSimulation: React.FC<MatchSimulationProps> = ({ activeTeam, addGold }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { opponentTeam } = location.state as { opponentTeam: { name: string; rating: number } }
  
  const [currentPeriod, setCurrentPeriod] = useState(1)
  const [timeRemaining, setTimeRemaining] = useState(5 * 60) // 5 minutes in seconds
  const [goals, setGoals] = useState<Goal[]>([])
  const [matchEnded, setMatchEnded] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(time => time - 1)
        simulateGoal()
      } else if (currentPeriod < 3) {
        setCurrentPeriod(period => period + 1)
        setTimeRemaining(5 * 60)
      } else {
        clearInterval(interval)
        setMatchEnded(true)
        calculateRewards()
      }
    }, 1000 / 180) // Simulate 1 second every 5.56 milliseconds (180 times faster)

    return () => clearInterval(interval)
  }, [timeRemaining, currentPeriod])

  const simulateGoal = () => {
    const goalChance = 0.02 // 2% chance of goal per second
    if (Math.random() < goalChance) {
      const scoringTeam = Math.random() < 0.5 ? 'player' : 'opponent'
      const goal: Goal = {
        team: scoringTeam,
        player: scoringTeam === 'player' ? getRandomPlayer() : 'Opponent Player',
        time: 5 * 60 - timeRemaining + (currentPeriod - 1) * 5 * 60
      }
      setGoals(prevGoals => [...prevGoals, goal])
    }
  }

  const getRandomPlayer = () => {
    return activeTeam[Math.floor(Math.random() * activeTeam.length)].name
  }

  const calculateRewards = () => {
    const playerGoals = goals.filter(goal => goal.team === 'player').length
    const opponentGoals = goals.filter(goal => goal.team === 'opponent').length
    let goldEarned = 100 // Base reward

    if (playerGoals > opponentGoals) {
      goldEarned += 200 // Win bonus
      goldEarned += (playerGoals - opponentGoals) * 50 // Goal difference bonus
    } else if (playerGoals === opponentGoals) {
      goldEarned += 100 // Draw bonus
    }

    addGold(goldEarned)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Match Simulation</h1>
      <div className="flex justify-between mb-4">
        <div>Your Team</div>
        <div>{opponentTeam.name}</div>
      </div>
      <div className="text-center mb-4">
        <div className="text-2xl font-bold">
          Period {currentPeriod} - {formatTime(timeRemaining)}
        </div>
        <div className="text-xl">
          {goals.filter(goal => goal.team === 'player').length} - {goals.filter(goal => goal.team === 'opponent').length}
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Goals</h2>
        <ul>
          {goals.map((goal, index) => (
            <li key={index}>
              {formatTime(goal.time)} - {goal.player} ({goal.team === 'player' ? 'Your Team' : opponentTeam.name})
            </li>
          ))}
        </ul>
      </div>
      {matchEnded && (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Match Ended</h2>
          <button
            onClick={() => navigate('/scrims')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Return to Scrims
          </button>
        </div>
      )}
    </div>
  )
}

export default MatchSimulation