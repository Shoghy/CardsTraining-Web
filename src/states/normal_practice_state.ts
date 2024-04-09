import CardModel from "@/model/CardModel";
import DeckModel from "@/model/DeckModel";
import { useDatabase } from "@/utils/AppContext";
import { textSimilarity } from "@/utils/functions";
import { RandomFloat } from "@/utils/random";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

interface CardAndPosibility{
  card: CardModel
  posibility: number
}

export enum State{
  LOADING,
  AWAITING_ANSWER,
  ANSWERED_RIGHT,
  ANSWERED_WRONG,
}

const MAX_CARDS_PER_PRACTICE = 15;
export function NormalPracticeState(){
  const params = useParams();
  const deckId = params.deckId as string;

  const database = useDatabase();

  const [cards, setCards] = useState<CardModel[]>([]);
  const [state, setState] = useState(State.LOADING);
  const [answer, setAnswer] = useState("");

  const card = useMemo(() => cards[0], [cards]);

  useEffect(() => {
    LoadCards();
  }, []);

  async function LoadCards(){
    const deck = await database
      .get<DeckModel>(DeckModel.table)
      .find(deckId);

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

    setCards(selectedCards);
    setState(State.AWAITING_ANSWER);
  }

  function OnAnswer(){
    const answers: string[] = JSON.parse(card.answer);

    for(let i = 0; i < answers.length; ++i){
      const ans = answers[i];

      if(ans === answer){
        setState(State.ANSWERED_RIGHT);
        return;
      }

      if(ans.length < 5) continue;

      if(textSimilarity(ans, answer) >= 0.8){
        setState(State.ANSWERED_RIGHT);
        return;
      }
    }
    setState(State.ANSWERED_WRONG);
  }

  return {
    answer,
    setAnswer,
    card,
    state,
    OnAnswer,
  };
}