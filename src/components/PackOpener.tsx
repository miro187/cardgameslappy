import React, { useState } from 'react'
import { Package } from 'lucide-react'
import Card from './Card'
import { CardType } from '../types'

interface PackOpenerProps {
  addPackedCards: (cards: CardType[]) => void
  gold: number
  setGold: (gold: number) => void
}

const PackOpener: React.FC<PackOpenerProps> = ({ addPackedCards, gold, setGold }) => {
  const [openedCards, setOpenedCards] = useState<CardType[]>([])

  const packPrices = {
    standard: 500,
    premium: 1000,
    ultimate: 2000
  }

  const generateBalancedStats = (rating: number): CardType['stats'] & { bestStat: string } => {
    const statNames = ['shooting', 'checking', 'puckControl', 'passing', 'speed', 'endurance']
    const baseValue = Math.floor(rating / 6)
    const remainder = rating % 6

    // Initialize stats with base values
    const stats = Object.fromEntries(statNames.map(stat => [stat, baseValue])) as CardType['stats']

    // Distribute the remainder
    for (let i = 0; i < remainder; i++) {
      const randomStat = statNames[Math.floor(Math.random() * statNames.length)]
      stats[randomStat as keyof CardType['stats']]++
    }

    // Determine the best stat
    let bestStat = statNames[0]
    let maxValue = stats[bestStat as keyof CardType['stats']]

    for (const stat of statNames) {
      if (stats[stat as keyof CardType['stats']] > maxValue) {
        bestStat = stat
        maxValue = stats[stat as keyof CardType['stats']]
      }
    }

    // Boost the best stat
    const boost = Math.floor(rating * 0.1) // 10% boost
    stats[bestStat as keyof CardType['stats']] += boost

    // Reduce other stats to maintain the overall rating
    const totalReduction = boost
    const statsToReduce = statNames.filter(stat => stat !== bestStat)
    for (let i = 0; i < totalReduction; i++) {
      const statToReduce = statsToReduce[Math.floor(Math.random() * statsToReduce.length)]
      if (stats[statToReduce as keyof CardType['stats']] > 1) {
        stats[statToReduce as keyof CardType['stats']]--
      }
    }

    return { ...stats, bestStat }
  }

  const generateRandomCard = (packType: string): CardType => {
    const rarities = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary']
    const teams = ['Maple Leafs', 'Canadiens', 'Bruins', 'Rangers', 'Blackhawks', 'Red Wings']
    const names = ['Wayne Gretzky', 'Mario Lemieux', 'Bobby Orr', 'Gordie Howe', 'Sidney Crosby', 'Alexander Ovechkin']

    let rarity: string
    let rating: number

    switch (packType) {
      case 'standard':
        rarity = rarities[Math.floor(Math.random() * 3)]
        rating = Math.floor(Math.random() * 20) + 60
        break
      case 'premium':
        rarity = rarities[Math.floor(Math.random() * 4)]
        rating = Math.floor(Math.random() * 20) + 70
        break
      case 'ultimate':
        rarity = rarities[Math.floor(Math.random() * 5)]
        rating = Math.floor(Math.random() * 20) + 80
        break
      default:
        rarity = rarities[0]
        rating = 60
    }

    const { bestStat, ...stats } = generateBalancedStats(rating)

    return {
      rating,
      name: names[Math.floor(Math.random() * names.length)],
      rarity,
      team: teams[Math.floor(Math.random() * teams.length)],
      stats,
      bestStat
    }
  }

  const openPack = (packType: 'standard' | 'premium' | 'ultimate') => {
    const price = packPrices[packType]
    if (gold < price) {
      alert("Not enough gold to open this pack!")
      return
    }

    const newCards = Array(5).fill(null).map(() => generateRandomCard(packType))
    setOpenedCards(newCards)
    addPackedCards(newCards)
    setGold(gold - price)
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Pack Opener</h1>
      <div className="flex justify-around mb-6">
        <button
          onClick={() => openPack('standard')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          disabled={gold < packPrices.standard}
        >
          Open Standard Pack (500 <Package className="inline" size={16} />)
        </button>
        <button
          onClick={() => openPack('premium')}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
          disabled={gold < packPrices.premium}
        >
          Open Premium Pack (1000 <Package className="inline" size={16} />)
        </button>
        <button
          onClick={() => openPack('ultimate')}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          disabled={gold < packPrices.ultimate}
        >
          Open Ultimate Pack (2000 <Package className="inline" size={16} />)
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {openedCards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  )
}

export default PackOpener