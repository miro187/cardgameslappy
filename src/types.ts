export interface CardType {
  rating: number
  name: string
  cardId: string
  rarity: string
  edition: string
  team: string
  prints: number
}

export interface UserType {
  username: string
  packedCards: CardType[]
  activeTeam: CardType[]
  gold: number
}