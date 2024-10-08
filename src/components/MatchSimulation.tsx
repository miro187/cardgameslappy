import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CardType } from '../types'

interface MatchSimulationProps {
  activeTeam: CardType[]
  addGold: (amount: number) => void
}

interface Goal {
  team: string
  player: string
}

const MatchSimulation: React.FC<MatchSimulationProps> = ({ activeTeam, addGold }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { opponentTeam } = location.state as { opponentTeam: { name: string; rating: number } }
  
  const PERIOD_LENGTH = 5 * 60 // 5 minutes in seconds
  const SIMULATION_SPEED = 20 // Simulate 1 second every 50 milliseconds (20 times faster than real-time)
  const [currentPeriod, setCurrentPeriod] = useState(1)
  const [timeRemaining, setTimeRemaining] = useState(PERIOD_LENGTH)
  const [goals, setGoals] = useState<Goal[]>([])
  const [matchEnded, setMatchEnded] = useState(false)
  const [rewardsCalculated, setRewardsCalculated] = useState(false)
  const [goldEarned, setGoldEarned] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const calculateTeamRating = () => {
    if (activeTeam.length === 0) return 0
    const totalRating = activeTeam.reduce((sum, card) => sum + card.rating, 0)
    return Math.round(totalRating / activeTeam.length)
  }

  const playerTeamRating = calculateTeamRating()
  const ratingDifference = playerTeamRating - opponentTeam.rating

  const endMatch = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setMatchEnded(true)
  }, [])

  const calculateRewards = useCallback(() => {
    if (rewardsCalculated) return // Prevent recalculation

    const playerGoals = goals.filter(goal => goal.team === 'player').length
    const opponentGoals = goals.filter(goal => goal.team === 'opponent').length
    let earned = 100 // Base reward

    if (playerGoals > opponentGoals) {
      earned += 200 // Win bonus
      earned += (playerGoals - opponentGoals) * 50 // Goal difference bonus
    } else if (playerGoals === opponentGoals) {
      earned += 100 // Draw bonus
    }

    addGold(earned)
    setGoldEarned(earned)
    setRewardsCalculated(true)
  }, [goals, addGold, rewardsCalculated])

  useEffect(() => {
    if (matchEnded && !rewardsCalculated) {
      calculateRewards()
    }
  }, [matchEnded, calculateRewards, rewardsCalculated])

  useEffect(() => {
    const playerGoals = goals.filter(g => g.team === 'player').length
    const opponentGoals = goals.filter(g => g.team === 'opponent').length

    // Check for a 10-goal lead
    if (Math.abs(playerGoals - opponentGoals) >= 10) {
      endMatch()
    }
  }, [goals, endMatch])

  useEffect(() => {
    if (matchEnded) return

    intervalRef.current = setInterval(() => {
      setTimeRemaining(time => {
        if (time > 0) {
          simulateGoal()
          return time - 1
        } else if (currentPeriod < 3) {
          setCurrentPeriod(period => period + 1)
          return PERIOD_LENGTH // Reset to 5 minutes for the next period
        } else {
          endMatch()
          return 0
        }
      })
    }, 1000 / SIMULATION_SPEED)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [currentPeriod, matchEnded, endMatch])

  const simulateGoal = () => {
    const averageGoalsPerGame = 6 // NHL average is about 6 goals per game
    const secondsPerGame = 3 * PERIOD_LENGTH // Total game time in seconds
    const baseGoalChance = averageGoalsPerGame / secondsPerGame / 2 // Divide by 2 for each team

    // Adjust goal chances based on team ratings
    const ratingFactor = 0.0002 // This factor determines how much the rating difference affects goal chances
    const playerGoalChance = baseGoalChance * (1 + ratingDifference * ratingFactor)
    const opponentGoalChance = baseGoalChance * (1 - ratingDifference * ratingFactor)

    if (Math.random() < playerGoalChance) {
      addGoal('player')
    } else if (Math.random() < opponentGoalChance) {
      addGoal('opponent')
    }
  }

  const addGoal = (scoringTeam: string) => {
    const goal: Goal = {
      team: scoringTeam,
      player: scoringTeam === 'player' ? getRandomPlayer() : 'Opponent Player',
    }
    setGoals(prevGoals => [...prevGoals, goal])
  }

  const getRandomPlayer = () => {
    return activeTeam[Math.floor(Math.random() * activeTeam.length)].name
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Match Simulation</h1>
      <div className="flex justify-between mb-4">
        <div>Your Team (Rating: {playerTeamRating})</div>
        <div>{opponentTeam.name} (Rating: {opponentTeam.rating})</div>
      </div>
      {!matchEnded && (
        <div className="text-center mb-4">
          <div className="text-2xl font-bold">
            Simulating...
          </div>
          <div className="text-xl">
            {goals.filter(goal => goal.team === 'player').length} - {goals.filter(goal => goal.team === 'opponent').length}
          </div>
        </div>
      )}
      {matchEnded && (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Match Ended</h2>
          <div className="text-xl mb-4">
            Final Score: {goals.filter(goal => goal.team === 'player').length} - {goals.filter(goal => goal.team === 'opponent').length}
          </div>
          <div className="text-xl mb-4">
            Coins {goldEarned >= 0 ? 'Earned' : 'Lost'}: {Math.abs(goldEarned)}
          </div>
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