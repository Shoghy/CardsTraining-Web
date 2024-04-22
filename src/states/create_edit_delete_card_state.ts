import SelfAlert from "@/components/CustomAlert/SelfAlert";
import CardModel from "@/model/CardModel";
import DeckModel from "@/model/DeckModel";
import { useDatabase } from "@/utils/AppContext";
import { sleep } from "@/utils/functions";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export interface CardFillableData{
  statement: string
  answer: string
  description: string
  hint: string
}

export default function CreateEditDeleteState(){
  const navigate = useNavigate();
  const params = useParams();
  const deckId = params.deckId as string;
  const cardId = params.cardId;

  const database = useDatabase();

  const [statement, setStatement] = useState("");
  const [answers, setAnswers] = useState([""]);
  const [description, setDescription] = useState("");
  const [hint, setHint] = useState("");

  const alert = SelfAlert();

  useEffect(() => {
    if(cardId === undefined) return;

    (async () => {
      const card = await database.get<CardModel>(CardModel.table).find(cardId);
      setStatement(card.statement);
      setAnswers(JSON.parse(card.answer));
      setDescription(card.description);
      setHint(card.hint ?? "");
    })();
  }, []);

  function EmptyFields(){
    setStatement("");
    setAnswers([""]);
    setDescription("");
    setHint("");
  }

  async function CreateCard(kargs: CardFillableData){
    const deck = await database
      .get<DeckModel>(DeckModel.table)
      .find(deckId);

    await database.write(async () => {
      await database.get<CardModel>(CardModel.table)
        .create((card) => {
          card.statement = kargs.statement;
          card.answer = kargs.answer;
          card.description = kargs.description;
          card.hint = kargs.hint ? kargs.hint : null;
          card.lastTimePracticed = null;
          card.wasLastAnswerCorrect = null;
          card.timesRight = 0;
          card.timesWrong = 0;
          card.deck.set(deck);
        });

      await deck.update((changes) => {
        changes.amountOfCards += 1;
      });
    });

    EmptyFields();

    alert.openWith({
      title: "Success",
      message: "Card added successfully",
      xButton: () => {
        alert.close();
      },
    });

    await sleep(2500);

    alert.close();
  }

  async function UpdateCard(kargs: CardFillableData){
    if(!cardId){
      throw new Error("You shouldn't see this");
    }

    const card = await database.get<CardModel>(CardModel.table).find(cardId);

    await database.write(async () => {
      card.update((card) => {
        card.statement = kargs.statement;
        card.answer = kargs.answer;
        card.description = kargs.description;
        card.hint = kargs.hint ? kargs.hint : null;
      });
    });

    alert.openWith({
      title: "Success",
      message: "Card updated successfully",
      xButton: () => {
        alert.close();
      },
    });

    await sleep(2500);

    alert.close();
  }

  function SaveAction() {
    const tStatement = statement.trim();
    const tAnswer: string[] = answers.map((s) => s.trim());
    const tDescription = description.trim();
    const tHint = hint.trim();

    if (!tStatement || !tDescription) {
      alert.openWith({
        title: "Error",
        message: "You must fill the statement and description fields.",
        xButton: () => {
          alert.close();
        },
      });
      return;
    }

    for(let i = 0; i < tAnswer.length; ++i){
      const answer = tAnswer[i];
      if(!answer){
        alert.openWith({
          title: "Error",
          message: "All answer should be filled, remove the ones empty or add something to them.",
          xButton: () => {
            alert.close();
          },
        });
        return;
      }
    }

    if(!cardId){
      CreateCard({
        statement: tStatement,
        answer: JSON.stringify(tAnswer),
        description: tDescription,
        hint: tHint,
      });
      return;
    }

    UpdateCard({
      statement: tStatement,
      answer: JSON.stringify(tAnswer),
      description: tDescription,
      hint: tHint,
    });
  }

  async function DeleteCard(){
    if(!cardId){
      throw new Error("You shouldn't see this");
    }

    const card = await database.get<CardModel>(CardModel.table).find(cardId);
    const deck = await card.deck;

    await database.write(async () => {
      await card.markAsDeleted();
      await deck.update(deck => {
        deck.amountOfCards -= 1;
      });
    });

    alert.openWith({
      title: "Success",
      message: "Card deleted successfully",
    });

    await sleep(2500);

    navigate(`/deck/${deckId}/manage-cards`);
  }

  return {
    DeleteCard,
    SaveAction,
    statement,
    setStatement,
    answers,
    setAnswers,
    description,
    setDescription,
    hint,
    setHint,
    alert,
    navigate,
    cardId,
    deckId,
  };
}