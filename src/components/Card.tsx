import React from 'react'
import { CardType } from '../types'

const Card: React.FC<CardType> = ({ rating, name, rarity, team, stats, bestStat }) => {
  const rarityColor = {
    'Common': 'bg-gray-500',
    'Uncommon': 'bg-green-500',
    'Rare': 'bg-blue-500',
    'Epic': 'bg-purple-500',
    'Legendary': 'bg-yellow-500',
  }[rarity] || 'bg-gray-500'

  const getStatColor = (stat: string) => {
    return stat === bestStat ? 'text-yellow-300 font-bold' : 'text-gray-200'
  }

  return (
    <div className={`${rarityColor} rounded-lg overflow-hidden shadow-lg`}>
      <div className="bg-gray-800 bg-opacity-75 text-white text-center py-2 font-bold">
        {rarity}
      </div>
      <div className="p-4 bg-gray-800 bg-opacity-75">
        <h3 className="text-xl font-bold mb-2 text-white">{name}</h3>
        <p className="text-gray-200 mb-2">Rating: {rating}</p>
        <p className="text-gray-200 mb-2">Team: {team}</p>
        <div className="mt-4">
          <h4 className="text-lg font-semibold text-white mb-2">Stats:</h4>
          <p className={getStatColor('shooting')}>Shooting: {stats.shooting}</p>
          <p className={getStatColor('checking')}>Checking: {stats.checking}</p>
          <p className={getStatColor('puckControl')}>Puck Control: {stats.puckControl}</p>
          <p className={getStatColor('passing')}>Passing: {stats.passing}</p>
          <p className={getStatColor('speed')}>Speed: {stats.speed}</p>
          <p className={getStatColor('endurance')}>Endurance: {stats.endurance}</p>
        </div>
      </div>
    </div>
  )
}

export default Card