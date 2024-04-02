import { useState } from "react";
import styles from "./create_card.module.css";
import BasicButton from "@/components/BasicButton";
import { faChevronCircleLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateCard() {
  const navigate = useNavigate();
  const params = useParams();
  const deckId = params.deckId as string;

  const [statement, setStatement] = useState("");
  const [answer, setAnswer] = useState("");
  const [description, setDescription] = useState("");
  const [hint, setHint] = useState("");

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
          >
            <FontAwesomeIcon
              icon={faFloppyDisk}
              fontSize="0.7em"
            />
            Save
          </BasicButton>
        </div>
      </div>
    </div>
  );
}