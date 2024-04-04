import CardModel from "@/model/CardModel";
import DeckModel from "@/model/DeckModel";
import { useDatabase } from "@/utils/AppContext";
import { Database } from "@nozbe/watermelondb";
import { useEffect, useState } from "react";
import { Params, useParams } from "react-router-dom";

const MAX_CARDS_PER_PRACTICE = 15;
export class NormalPracticeState{
  readonly cards: CardModel[];
  readonly setCards: React.Dispatch<React.SetStateAction<CardModel[]>>;

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

    useEffect(() => {
      this.LoadCards();
    }, []);
  }

  private async LoadCards(){
    const deck = await this.database
      .get<DeckModel>(DeckModel.table)
      .find(this.deckId);

    const selectedCards: CardModel[] = [];
    const allCards = await deck.cards;
    for(
      let i = 0;

      i < allCards.length
      &&
      selectedCards.length < MAX_CARDS_PER_PRACTICE;

      ++i
    ){
      const card = allCards[i];

      if(card.wasLastAnswerCorrect === null){
        selectedCards.push(card);
        continue;
      }
      /**
       * Here will go some math funtions that, will
       * depending on the timesRight, timesWrong,
       * lastTimePracticed and wasLastAnswerCorrect
       * give the card a probability of being selected.
       * This probability should be higher if the user
       * has a lot of time without practicing the card
       * or the higher timesWrong is the higher the probability.
       * If wasLastAnswerCorrect is false, I think I will just
       * add a constant number to the probability, I also need
       * to do something with timesRight, so it just don't depend
       * on timesWrong.
       */
    }

    this.setCards(selectedCards);
  }
}