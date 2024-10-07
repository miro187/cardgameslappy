import React from 'react'
import { Users } from 'lucide-react'
import { CardType } from '../types'
import { useNavigate } from 'react-router-dom'

interface ScrimsProps {
  packedCards: CardType[]
  activeTeam: CardType[]
  addGold: (amount: number) => void
}

const Scrims: React.FC<ScrimsProps> = ({ packedCards, activeTeam, addGold }) => {
  const navigate = useNavigate()
  const teams = [
    { id: 1, name: 'Ice Breakers', rating: 70 },
    { id: 2, name: 'Puck Masters', rating: 75 },
    { id: 3, name: 'Slapshot Kings', rating: 80 },
    { id: 4, name: 'Frozen Fury', rating: 85 },
    { id: 5, name: 'Arctic Wolves', rating: 90 },
  ]

  const calculateTeamRating = () => {
    if (activeTeam.length === 0) return 0
    const totalRating = activeTeam.reduce((sum, card) => sum + card.rating, 0)
    return Math.round(totalRating / activeTeam.length)
  }

  const startMatch = (opponentTeam: { id: number; name: string; rating: number }) => {
    if (activeTeam.length < 4) {
      alert("You need 4 players in your active team to play a match!")
      return
    }
    navigate('/match-simulation', { state: { opponentTeam, playerTeam: activeTeam } })
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center">Scrims</h1>
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Available Teams</h2>
        <p className="mb-4">Your team rating: {calculateTeamRating()}</p>
        <ul className="space-y-4">
          {teams.map(team => (
            <li key={team.id} className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center">
                <Users className="mr-3" />
                <span>{team.name}</span>
              </div>
              <div>
                <span className="bg-blue-600 text-white px-2 py-1 rounded mr-4">Rating: {team.rating}</span>
                <button 
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => startMatch(team)}
                >
                  Challenge
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Scrims