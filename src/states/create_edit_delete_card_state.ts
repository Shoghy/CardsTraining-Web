import SelfAlert, { SelfAlertObject } from "@/components/CustomAlert/SelfAlert";
import CardModel from "@/model/CardModel";
import DeckModel from "@/model/DeckModel";
import { useDatabase } from "@/utils/AppContext";
import { sleep } from "@/utils/functions";
import { Database } from "@nozbe/watermelondb";
import { useEffect, useState } from "react";
import { NavigateFunction, Params, useNavigate, useParams } from "react-router-dom";

export interface CardFillableData{
  statement: string
  answer: string
  description: string
  hint: string
}

export default class CreateEditDeleteState{
  readonly statement: string;
  readonly setStatement: React.Dispatch<React.SetStateAction<string>>;

  readonly answers: string[];
  readonly setAnswers: React.Dispatch<React.SetStateAction<string[]>>;

  readonly description: string;
  readonly setDescription: React.Dispatch<React.SetStateAction<string>>;

  readonly hint: string;
  readonly setHint: React.Dispatch<React.SetStateAction<string>>;

  readonly alert: SelfAlertObject;

  readonly navigate: NavigateFunction;
  readonly params: Readonly<Params<string>>;

  readonly deckId: string;
  readonly cardId: string | undefined;

  readonly database: Database;

  constructor(){
    this.navigate = useNavigate();
    this.params = useParams();
    this.deckId = this.params.deckId as string;
    this.cardId = this.params.cardId;

    this.database = useDatabase();

    const [statement, setStatement] = useState("");
    this.statement = statement;
    this.setStatement = setStatement;

    const [answer, setAnswer] = useState([""]);
    this.answers = answer;
    this.setAnswers = setAnswer;

    const [description, setDescription] = useState("");
    this.description = description;
    this.setDescription = setDescription;

    const [hint, setHint] = useState("");
    this.hint = hint;
    this.setHint = setHint;

    const alert = SelfAlert();
    this.alert = alert;

    useEffect(() => {
      if(this.cardId === undefined) return;
      const cardId = this.cardId;

      (async () => {
        const card = await this.database.get<CardModel>(CardModel.table).find(cardId);
        setStatement(card.statement);
        setAnswer(JSON.parse(card.answer));
        setDescription(card.description);
        setHint(card.hint ?? "");
      })();
    }, []);
  }

  EmptyFields(){
    this.setStatement("");
    this.setAnswers([""]);
    this.setDescription("");
    this.setHint("");
  }

  async CreateCard(kargs: CardFillableData){
    const {
      database,
      alert,
    } = this;
    const deck = await database
      .get<DeckModel>(DeckModel.table)
      .find(this.deckId);

    await database.write(async () => {
      await database.get<CardModel>(CardModel.table)
        .create((card) => {
          card.statement = kargs.statement;
          card.answer = kargs.answer;
          card.description = kargs.description;
          card.hint = kargs.hint ? kargs.hint : null;
          card.lastTimePracticed = null;
          card.score = 0;
          card.timesRight = 0;
          card.timesWrong = 0;
          card.deck.set(deck);
        });

      await deck.update((changes) => {
        changes.amountOfCards += 1;
      });
    });

    this.EmptyFields();

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

  async UpdateCard(kargs: CardFillableData){
    const {
      database,
      alert,
    } = this;
    if(!this.cardId){
      throw new Error("You shouldn't see this");
    }

    const card = await database.get<CardModel>(CardModel.table).find(this.cardId);

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

  SaveAction() {
    const tStatement = this.statement.trim();
    const tAnswer: string[] = this.answers.map((s) => s.trim());
    const tDescription = this.description.trim();
    const tHint = this.hint.trim();

    if (!tStatement || !tAnswer || !tDescription) {
      this.alert.openWith({
        title: "Error",
        message: "You must fill the statement, answer and description fields.",
        xButton: () => {
          this.alert.close();
        },
      });
      return;
    }

    if(!this.cardId){
      this.CreateCard({
        statement: tStatement,
        answer: JSON.stringify(tAnswer),
        description: tDescription,
        hint: tHint,
      });
      return;
    }
    this.UpdateCard({
      statement: tStatement,
      answer: JSON.stringify(tAnswer),
      description: tDescription,
      hint: tHint,
    });
  }

  async DeleteCard(){
    if(!this.cardId){
      throw new Error("You shouldn't see this");
    }

    const card = await this.database.get<CardModel>(CardModel.table).find(this.cardId);
    const deck = await card.deck;

    await this.database.write(async () => {
      await card.markAsDeleted();
      await deck.update(deck => {
        deck.amountOfCards -= 1;
      });
    });

    this.alert.openWith({
      title: "Success",
      message: "Card deleted successfully",
    });

    await sleep(2500);

    this.navigate(`/deck/${this.deckId}/manage-cards`);
  }
}