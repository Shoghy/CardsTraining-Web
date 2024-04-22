import CardModel from "@/model/CardModel";
import CardRecordModel from "@/model/CardRecordModel";
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
  END_TRAINING,
}

const MAX_CARDS_PER_PRACTICE = 15;
export function NormalPracticeState(){
  const params = useParams();
  const deckId = params.deckId as string;

  const database = useDatabase();

  const [cards, setCards] = useState<CardModel[]>([]);
  const [state, setState] = useState(State.LOADING);
  const [answer, setAnswer] = useState("");
  const [displayedText, setDisplayedText] = useState("");

  const card = useMemo(() => {
    const card = cards[0];
    setDisplayedText(card?.statement ?? "");
    return card;
  }, [cards]);

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
      cardAndPosibility.length > 0
      &&
      selectedCards.length < MAX_CARDS_PER_PRACTICE;
      ++index
    ){
      const data = cardAndPosibility[index];
      currentValue += data.posibility;

      if(currentValue < randomNumber) continue;

      selectedCards.push(data.card);
      cardAndPosibility.splice(index, 1);

      index = -1;
      maxPosibilityNumber -= data.posibility;
      randomNumber = RandomFloat(Number.EPSILON, maxPosibilityNumber);
      currentValue = 0;
    }

    setDisplayedText(selectedCards[0].statement);
    setCards(selectedCards);
    setState(State.AWAITING_ANSWER);
  }

  async function OnAnswer(){
    let state = State.ANSWERED_WRONG;
    const answers: string[] = JSON.parse(card.answer);

    for(let i = 0; i < answers.length; ++i){
      const ans = answers[i];

      if(ans.toLowerCase() === answer.toLowerCase()){
        state = State.ANSWERED_RIGHT;
        break;
      }

      if(ans.length < 5) continue;

      if(textSimilarity(ans.toLowerCase(), answer.toLowerCase()) >= 0.8){
        state = State.ANSWERED_RIGHT;
        break;
      }
    }
    const now = new Date();
    await database.write(async () => {
      await card.update((c) => {
        if(state === State.ANSWERED_RIGHT){
          c.timesRight += 1;
          c.wasLastAnswerCorrect = true;
        }else{
          c.timesWrong += 1;
          c.wasLastAnswerCorrect = false;
        }
        c.lastTimePracticed = now;
      });

      await database.get<CardRecordModel>(CardRecordModel.table)
        .create((record) => {
          record.answeredCorrect = state === State.ANSWERED_RIGHT;
          record.wasHintUsed = false;
          record.datetime = now;
          record.timeLeft = null;
          record.maxTime = null;
          record.card.set(card);
        });
    });

    setState(state);
    setDisplayedText(card.description);
  }

  function NextCard(){
    setCards((c) => {
      const clone = [...c];
      clone.shift();
      if(clone.length === 0){
        setState(State.END_TRAINING);
      }
      return clone;
    });
    setState(State.AWAITING_ANSWER);
    setAnswer("");
  }

  return {
    answer,
    setAnswer,
    card,
    state,
    OnAnswer,
    displayedText,
    NextCard,
  };
}