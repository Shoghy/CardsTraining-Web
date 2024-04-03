import { useEffect, useState } from "react";
import styles from "@/assets/css/pages/create_card.module.css";
import { faChevronCircleLeft, faFloppyDisk, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import SelfAlert from "@/components/CustomAlert/SelfAlert";
import { useDatabase } from "@/utils/AppContext";
import CardModel from "@/model/CardModel";
import DeckModel from "@/model/DeckModel";
import { sleep } from "@/utils/functions";
import StyledButton from "../../components/StyledButton";

interface CardFillableData{
  statement: string
  answer: string
  description: string
  hint: string
}

export default function CreateCard() {
  const navigate = useNavigate();
  const params = useParams();
  const deckId = params.deckId as string;
  const cardId = params.cardId;

  const database = useDatabase();

  const alert = SelfAlert();

  const [statement, setStatement] = useState("");
  const [answer, setAnswer] = useState("");
  const [description, setDescription] = useState("");
  const [hint, setHint] = useState("");

  function EmptyFields(){
    setStatement("");
    setAnswer("");
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
          card.score = 0;
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
    const tAnswer = answer.trim();
    const tDescription = description.trim();
    const tHint = hint.trim();

    if (!tStatement || !tAnswer || !tDescription) {
      alert.openWith({
        title: "Error",
        message: "You must fill the statement, answer and description fields.",
        xButton: () => {
          alert.close();
        },
      });
      return;
    }

    if(!cardId){
      CreateCard({
        statement: tStatement,
        answer: tAnswer,
        description: tDescription,
        hint: tHint,
      });
      return;
    }
    UpdateCard({
      statement: tStatement,
      answer: tAnswer,
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

  useEffect(() => {
    if(cardId === undefined) return;
    (async () => {
      const card = await database.get<CardModel>(CardModel.table).find(cardId);
      setStatement(card.statement);
      setAnswer(card.answer);
      setDescription(card.description);
      setHint(card.hint ?? "");
    })();
  }, []);

  return (
    <div className={styles.backGround}>
      <div className={styles.cardForm}>
        <div className={styles.cardField}>
          <label htmlFor="statement">
            Statement:
          </label>
          <input
            type="text"
            id="statement"
            placeholder='What does "学生" means?'
            value={statement}
            onChange={(e) => setStatement(e.currentTarget.value)}
          />
        </div>
        <div className={styles.cardField}>
          <label htmlFor="answer">
            Answer:
          </label>
          <input
            type="text"
            id="answer"
            placeholder="Student|Learner"
            value={answer}
            onChange={(e) => setAnswer(e.currentTarget.value)}
          />
        </div>
        <div className={styles.cardField}>
          <label htmlFor="description">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            placeholder="Here add a description of the statement. I also recommend you to add a mnemonic, so it will be easier for you to remember."
            rows={5}
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
        </div>
        <div className={styles.cardField}>
          <label htmlFor="hint">
            Hint:
          </label>
          <input
            type="text"
            id="hint"
            placeholder="がくせい"
            value={hint}
            onChange={(e) => setHint(e.currentTarget.value)}
          />
        </div>
        <div className={styles.cardFooter}>
          <StyledButton
            look="yellow"
            onClick={() => navigate(`/deck/${deckId}/manage-cards`)}
          >
            <FontAwesomeIcon
              icon={faChevronCircleLeft}
              fontSize="0.7em"
            />
            Back
          </StyledButton>
          {
            cardId
            &&
            <StyledButton
              look="red"
              onClick={
                () => alert.openWith({
                  title: "Are you sure?",
                  message: "Do you really want to delete this card?",
                  xButton: () => {
                    alert.close();
                  },
                  buttons: [{
                    text: "Yes",
                    onClick: DeleteCard
                  }]
                })
              }
            >
              <FontAwesomeIcon
                icon={faTrash}
                fontSize="0.7em"
              />
              Delete
            </StyledButton>
          }
          <StyledButton
            look="green"
            onClick={() => SaveAction()}
          >
            <FontAwesomeIcon
              icon={faFloppyDisk}
              fontSize="0.7em"
            />
            Save
          </StyledButton>
        </div>
      </div>
      <alert.Element />
    </div>
  );
}