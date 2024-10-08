export interface CardType {
  rating: number
  name: string
  rarity: string
  team: string
  stats: {
    shooting: number
    checking: number
    puckControl: number
    passing: number
    speed: number
    endurance: number
  }
  bestStat: string
}

export interface UserType {
  username: string
  packedCards: CardType[]
  activeTeam: CardType[]
  gold: number
}