interface IDeck{
  id: string
  name: string
  amountOfCards: number
  lastTimePracticed?: Date
  imgURL?: string
}

interface ICard{
  id: string
  deckUID: string | number
  statement: string
  answer: string
  description: string
  hint?: string
  lastTimePracticed?: Date
  score: number
  /** Amount of times this card was answered right */
  timesRight: number
  /** Amount of times this card was answered worng */
  timesWrong: number
}

interface ICardRecord{
  id: string
  cardUID: string | number
  answeredCorrect: boolean
  wasHintUsed: boolean
  datetime: Date
  /** Time left if the user was practicing with a timer */
  timeLeft?: number
  /** Timer time */
  maxTime?: number
}