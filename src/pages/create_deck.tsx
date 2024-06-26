import { useState } from "react";
import styles from "@/assets/css/pages/create_deck.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDatabase } from "@/utils/AppContext";
import DeckModel from "@/model/DeckModel";
import StyledButton from "../components/StyledButton";

export function Component() {
  const navigate = useNavigate();
  const database = useDatabase();
  const [deckName, setDeckName] = useState("");

  async function SaveAction() {
    const name = deckName.trim();
    if(!name) return;

    await database.write(async () => {
      await database.get<DeckModel>(DeckModel.table)
        .create((deck) => {
          deck.name = name;
          deck.amountOfCards = 0;
          deck.imgURL = null;
          deck.lastTimePracticed = null;
        });
    });
    setDeckName("");
  }

  return (
    <div className={styles.backGround}>
      <div className={styles.deckForm}>
        <label
          htmlFor="deck-name"
          className={styles.label}
        >
          Deck name:
        </label>
        <input
          type="text"
          id="deck-name"
          value={deckName}
          onChange={(e) => setDeckName(e.currentTarget.value)}
          className={styles.input}
        />
        <div className={styles.btnContainer}>
          <StyledButton
            look="yellow"
            onClick={() => navigate("/")}
          >
            <FontAwesomeIcon
              icon={faChevronCircleLeft}
              fontSize="0.7em"
            />
            Back
          </StyledButton>
          <StyledButton
            look="green"
            className={`${styles.btn} ${styles.btnSave}`}
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
    </div>
  );
}