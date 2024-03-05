interface Deck{
  name: string
  amountOfCards: number
  lastTimePracticed?: Date
  uid: string | number
  imgURL?: string
}

interface Card{
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

interface CardRecord{
  answeredCorrect: boolean
  wasHintUsed: boolean
  datetime: Date
  /** Time left if the user was practicing with a timer */
  timeLeft?: number
  /** Timer time */
  maxTime?: number
}