import React from 'react'
import Card from './Card'
import { CardType } from '../types'

interface TeamManagementProps {
  packedCards: CardType[]
  activeTeam: CardType[]
  updateActiveTeam: (team: CardType[]) => void
}

const TeamManagement: React.FC<TeamManagementProps> = ({ packedCards, activeTeam, updateActiveTeam }) => {
  const addToTeam = (card: CardType) => {
    if (activeTeam.length < 4) {
      const newTeam = [...activeTeam, card]
      updateActiveTeam(newTeam)
    }
  }

  const removeFromTeam = (card: CardType) => {
    const newTeam = activeTeam.filter(c => c.cardId !== card.cardId)
    updateActiveTeam(newTeam)
  }

  const calculateTeamRating = () => {
    if (activeTeam.length === 0) return 0
    const totalRating = activeTeam.reduce((sum, card) => sum + card.rating, 0)
    return Math.round(totalRating / activeTeam.length)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center">Team Management</h1>
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Active Team</h2>
        <p className="mb-4">Team Rating: {calculateTeamRating()}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {activeTeam.map((card, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded-lg">
              <Card {...card} />
              <button
                onClick={() => removeFromTeam(card)}
                className="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded w-full"
              >
                Remove
              </button>
            </div>
          ))}
          {Array(4 - activeTeam.length).fill(null).map((_, index) => (
            <div key={`empty-${index}`} className="bg-gray-700 p-4 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Empty slot</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Cards</h2>
        {packedCards.length === 0 ? (
          <p className="text-center text-gray-400">You haven't opened any packs yet. Go to the Pack Opener to get some cards!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {packedCards.map((card, index) => (
              <div key={index} className="relative">
                <Card {...card} />
                {!activeTeam.some(c => c.cardId === card.cardId) && activeTeam.length < 4 && (
                  <button
                    onClick={() => addToTeam(card)}
                    className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded w-full"
                  >
                    Add to Team
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TeamManagement