import React from 'react'

interface CardProps {
  rating: number
  name: string
  cardId: string
  rarity: string
  edition: string
  team: string
  prints: number
}

const Card: React.FC<CardProps> = ({ rating, name, cardId, rarity, edition, team, prints }) => {
  const rarityColor = {
    'Common': 'bg-gray-500',
    'Uncommon': 'bg-green-500',
    'Rare': 'bg-blue-500',
    'Epic': 'bg-purple-500',
    'Legendary': 'bg-yellow-500',
  }[rarity] || 'bg-gray-500'

  return (
    <div className={`${rarityColor} rounded-lg overflow-hidden shadow-lg`}>
      <div className="bg-gray-800 bg-opacity-75 text-white text-center py-2 font-bold">
        {rarity}
      </div>
      <div className="p-4 bg-gray-800 bg-opacity-75">
        <h3 className="text-xl font-bold mb-2 text-white">{name}</h3>
        <p className="text-gray-200 mb-2">Rating: {rating}</p>
        <p className="text-gray-200 mb-2">Card ID: {cardId}</p>
        <p className="text-gray-200 mb-2">Edition: {edition}</p>
        <p className="text-gray-200 mb-2">Team: {team}</p>
        <p className="text-gray-200">Prints: {prints}</p>
      </div>
    </div>
  )
}

export default Card