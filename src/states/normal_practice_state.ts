import CardModel from "@/model/CardModel";
import DeckModel from "@/model/DeckModel";
import { useDatabase } from "@/utils/AppContext";
import { RandomFloat } from "@/utils/random";
import { Database } from "@nozbe/watermelondb";
import moment from "moment";
import { useEffect, useState } from "react";
import { Params, useParams } from "react-router-dom";

interface CardAndPosibility{
  card: CardModel
  posibility: number
}

export enum State{
  LOADING,
  READY,
}

const MAX_CARDS_PER_PRACTICE = 15;
export class NormalPracticeState{
  readonly cards: CardModel[];
  readonly setCards: React.Dispatch<React.SetStateAction<CardModel[]>>;

  readonly state: State;
  readonly setState: React.Dispatch<React.SetStateAction<State>>;

  readonly database: Database;

  readonly params: Readonly<Params<string>>;
  readonly deckId: string;

  constructor(){
    this.params = useParams();
    this.deckId = this.params.deckId as string;

    const database = useDatabase();
    this.database = database;

    const [cards, setCards] = useState<CardModel[]>([]);
    this.cards = cards;
    this.setCards = setCards;

    const [state, setState] = useState(State.LOADING);
    this.state = state;
    this.setState = setState;

    useEffect(() => {
      this.LoadCards();
    }, []);
  }

  private async LoadCards(){
    const deck = await this.database
      .get<DeckModel>(DeckModel.table)
      .find(this.deckId);

    const cardAndPosibility: CardAndPosibility[] = [];
    const selectedCards: CardModel[] = [];
    const allCards = await deck.cards;
    let maxPosibilityNumber = 0;
    for(
      let i = 0;

      i < allCards.length
      &&
      selectedCards.length < MAX_CARDS_PER_PRACTICE;

      ++i
    ){
      const card = allCards[i];

      if(
        card.wasLastAnswerCorrect === null
        ||
        card.lastTimePracticed === null
      ){
        selectedCards.push(card);
        continue;
      }

      const total = card.timesRight + card.timesWrong;
      let posibility = 5;
      posibility += (card.timesWrong/total) * 200;

      const now = moment().utcOffset(0);
      const timePassed = now.diff(card.lastTimePracticed);
      posibility += timePassed/(1000 * 60 * 60);

      if(!card.wasLastAnswerCorrect){
        posibility += 40;
      }

      maxPosibilityNumber += posibility;

      cardAndPosibility.push({
        card,
        posibility,
      });
    }

    let randomNumber = RandomFloat(Number.EPSILON, maxPosibilityNumber);
    let currentValue = 0;
    for(
      let index = 0;

      index < cardAndPosibility.length
      &&
      selectedCards.length < MAX_CARDS_PER_PRACTICE;

      ++index
    ){
      const data = cardAndPosibility[index];
      currentValue += data.posibility;

      if(currentValue < randomNumber) continue;

      selectedCards.push(data.card);
      cardAndPosibility.splice(index, 0);

      index = -1;
      maxPosibilityNumber -= data.posibility;
      randomNumber = RandomFloat(Number.EPSILON, maxPosibilityNumber);
      currentValue = 0;
    }

    this.setCards(selectedCards);
    this.setState(State.READY);
  }
}