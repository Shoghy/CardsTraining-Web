interface IDeck{
  id: string
  name: string
  amountOfCards: number
  lastTimePracticed: Date | null
  imgURL: string | null
}

interface ICard{
  id: string
  deckUID: string
  statement: string
  answer: string
  description: string
  hint: string | null
  lastTimePracticed: Date | null
  score: number
  /** Amount of times this card was answered right */
  timesRight: number
  /** Amount of times this card was answered worng */
  timesWrong: number
}

interface ICardRecord{
  id: string
  cardUID: string
  answeredCorrect: boolean
  wasHintUsed: boolean
  datetime: Date
  /** Time left if the user was practicing with a timer */
  timeLeft: number | null
  /** Timer time */
  maxTime: number | null
}