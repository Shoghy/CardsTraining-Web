import { useContext, useState } from "react";
import styles from "@/assets/css/pages/create_card.module.css";
import BasicButton from "@/components/BasicButton";
import { faChevronCircleLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import SelfAlert from "@/components/CustomAlert/SelfAlert";
import { AppContext } from "@/utils/AppContext";
import CardModel from "@/model/CardModel";
import DeckModel from "@/model/DeckModel";
import { sleep } from "@/utils/functions";

export default function CreateCard() {
  const navigate = useNavigate();
  const params = useParams();
  const deckId = params.deckId as string;

  const { localDB: { database } } = useContext(AppContext);

  const alert = SelfAlert();

  const [statement, setStatement] = useState("");
  const [answer, setAnswer] = useState("");
  const [description, setDescription] = useState("");
  const [hint, setHint] = useState("");

  async function SaveAction() {
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

    const deck = await database
      .get<DeckModel>(DeckModel.table)
      .find(deckId);

    await database.write(async () => {
      await database.get<CardModel>(CardModel.table)
        .create((card) => {
          card.statement = tStatement;
          card.answer = tAnswer;
          card.description = tDescription;
          card.hint = tHint ? tHint : null;
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

    setStatement("");
    setAnswer("");
    setDescription("");
    setHint("");

    alert.openWith({
      title: "success",
      message: "Card added successfully",
      xButton: () => {
        alert.close();
      },
    });

    await sleep(2500);

    if(!alert.isOpen) return;

    alert.close();
  }

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
          <BasicButton
            className={`${styles.btn} ${styles.btnBack}`}
            onClick={() => navigate(`/deck/${deckId}/manage-cards`)}
          >
            <FontAwesomeIcon
              icon={faChevronCircleLeft}
              fontSize="0.7em"
            />
            Back
          </BasicButton>
          <BasicButton
            className={`${styles.btn} ${styles.btnSave}`}
            onClick={() => SaveAction()}
          >
            <FontAwesomeIcon
              icon={faFloppyDisk}
              fontSize="0.7em"
            />
            Save
          </BasicButton>
        </div>
      </div>
      <alert.Element />
    </div>
  );
}