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

  const generateRandomCard = (packType: string): CardType => {
    const names = [
      'Deng', 'EmTeeWii', 'DamnTheFish', 'MANU', 'Insecure', 'LALLAREN', 'Alpi', 'hýbaa', 'Lamelo_Ball', 'PP',
      'Rapid', 'Poke', 'Siemuar', 'Slog', 'Strig', 'Henze', 'LiAngelo_Ball', 'Sesy', 'Jeffsson', 'Cap',
      'justa', 'Al1xmeister', 'Gubbaba', 'Pata', 'Josh', 'Kony', 'bjorkz', 'darkheden', 'Alle', 'Raphael',
      'galaxy', 'DJMarkus', 'David', 'Jone', 'grumitos', 'MitchP', 'Buggeberra', 'Tomu', 'Fizzi', 'Matsoni',
      'Snakob', 'Invalid', 'Golgenator', 'Dustin', 'jarv', 'Iso', 'Mr._iLevi', 'Lwke', 'Dax33', 'Dimi',
      'FlickErszzz', 'Toby', 'Never_lucky', 'Radiant', 'tobbe', 'Mantis', 'Denni', 'RobJWA', 'Enkidu', 'adarap',
      'Callum', 'Daaan', 'Pudding', 'Spicy', 'Squidonge', 'Bjorne', 'Vald_Bacuum', 'uZed', 'Wallie', 'Xorx',
      'Gordosuper', 'Drazzy', 'Garous', 'Snowzee', 'Neocarter', 'Kitsune', 'Valco', 'LampPosted', 'Nowis', 'Simson',
      'Addzin', 'Sbeve', 'J0J0', 'Satchmoboy', 'Ikuz', 'L1mp', 'F14nk', 'Oalo', 'Samik', 'Bruch',
      'kimbaba', 'wawael', 'Ettan', 'Lorcan', 'Manp', 'Gaya', 'HorteGrote', 'Blixten_McQueen', 'Woody', 'engineer_gaming',
      'Virmantonio', 'Ganni', 'Saku', 'Dejv', 'Matsoni', 'Fizzi', 'Garous', 'MRBROE', 'FoxPolder', 'Z1NKK',
      'khosty', 'Shayku', 'Joakim_Lindstrom', 'Bench', 'SpookyIsMyName', 'Kasantin', 'Belo', 'Karlssonq', 'Assuass', 'tweek',
      'Maax', 'TeFarmeo', 'Geka', 'woozie', 'MiGiMo', 'Crisp', 'NaNo', 'IceIceIce', 'Tim', 'Esovan',
      'Cubone', 'DocFish', 'Bakou', 'Skolo_Bolo', 'Jonteler', 'Re1gn', 'Dakota', 'zent1x1', 'Joss', 'le_gars_Qc',
      'bsau', 'Meekrs', 'superNiki', 'drykai', 'Khosty', 'pazzo', 'riyadh', 'Alvin_Sandler', 'DASVO', '240',
      'Matikor', 'Slayxr', 'fooz', 'CrackJore233', 'brankoj123', 'Isajk', 'Plons', 'BUMPER', 'iNsEjN', 'nneo',
      'BuBbLZ', 'Astra', 'Ebro', 'Bob', 'Saften', 'Redy', 'Drose', 'Noel', 'Freezo', 'Van_Hilarious_Vestin',
      'sTinkiE', 'DarthDaevin', 'Gaggio', 'Thor', 'Stor', 'Dank', 'milano', 'rame', 'svexzy', 'Vyzeh',
      'Fred', 'dauniz', 'Luca', 'muumqv', 'LikeALeon', 'Ondra', 'fly', 'Bully', 'derdadash', 'NicK',
      'Seazle', 'Lavvenator', 'Fascho_Ferkel', 'Olematon', 'Thomas_Shelby', 'Samko', 'Slippy', 'ziiroust', 'ZsiiiS', 'Razorlives',
      'Saunakalja', 'Mash', 'fleeej', 'Addhall', 'Penguin_Legs', 'Iano', 'Kurt', 'chausie', 'Crebler', 'Greenmen',
      'moiz', 'adeus', 'Mr._Beginning', 'Suspicious_Capybara', 'DrY', 'Tesy', 'Fleckz', 'Fabachko', 'effortless', 'Flex',
      'Notcatfood', 'Ezhar', 'CurrySauceConnoisseur', 'Bonkerdonker', 'Masino', 'Erveon'
    ]

    const rarities = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary']
    const editions = ['S8 Chall Player', 'S9 Bronze Medalist', 'S10 Pro Player', 'S11 All-Star', 'S12 MVP']
    const teams = ['Ice Breakers', 'Puck Masters', 'Slapshot Kings', 'Frozen Fury', 'Arctic Wolves', 'Polar Bears', 'Glacier Giants']

    let rarityChances
    switch (packType) {
      case 'premium':
        rarityChances = [0.4, 0.3, 0.2, 0.08, 0.02]
        break
      case 'ultimate':
        rarityChances = [0.2, 0.3, 0.3, 0.15, 0.05]
        break
      default: // standard
        rarityChances = [0.5, 0.3, 0.15, 0.04, 0.01]
    }

    const rarity = rarities[weightedRandomIndex(rarityChances)]

    // Adjust rating based on rarity
    let rating
    switch (rarity) {
      case 'Common':
        rating = Math.floor(Math.random() * 11) + 60 // 60-70
        break
      case 'Uncommon':
        rating = Math.floor(Math.random() * 11) + 71 // 71-81
        break
      case 'Rare':
        rating = Math.floor(Math.random() * 6) + 82 // 82-87
        break
      case 'Epic':
        rating = Math.floor(Math.random() * 3) + 88 // 88-90
        break
      case 'Legendary':
        rating = Math.floor(Math.random() * 5) + 91 // 91-95
        break
      default:
        rating = Math.floor(Math.random() * 36) + 60 // 60-95 (fallback)
    }

    return {
      rating,
      name: names[Math.floor(Math.random() * names.length)],
      cardId: `${rarity.charAt(0)}${Math.floor(Math.random() * 1000)}`,
      rarity,
      edition: editions[Math.floor(Math.random() * editions.length)],
      team: teams[Math.floor(Math.random() * teams.length)],
      prints: Math.floor(Math.random() * 1000) + 1
    }
  }

  const weightedRandomIndex = (weights: number[]): number => {
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)
    let random = Math.random() * totalWeight
    for (let i = 0; i < weights.length; i++) {
      if (random < weights[i]) return i
      random -= weights[i]
    }
    return weights.length - 1
  }

  const openPack = (packType: 'standard' | 'premium' | 'ultimate') => {
    const price = packPrices[packType]
    if (gold < price) {
      alert("Not enough gold to open this pack!")
      return
    }

    const cardCount = packType === 'ultimate' ? 7 : 5
    const newCards = Array(cardCount).fill(null).map(() => generateRandomCard(packType))
    setOpenedCards(newCards)
    addPackedCards(newCards)
    setGold(gold - price)
  }

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-8">Pack Opener</h1>
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => openPack('standard')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          disabled={gold < packPrices.standard}
        >
          <Package className="mr-2" />
          Standard Pack (500 Gold)
        </button>
        <button
          onClick={() => openPack('premium')}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          disabled={gold < packPrices.premium}
        >
          <Package className="mr-2" />
          Premium Pack (1000 Gold)
        </button>
        <button
          onClick={() => openPack('ultimate')}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          disabled={gold < packPrices.ultimate}
        >
          <Package className="mr-2" />
          Ultimate Pack (2000 Gold)
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