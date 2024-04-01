import { useNavigate, useParams } from "react-router-dom";
import styles from "./index.module.css";
import BasicButton from "@/components/BasicButton";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/utils/AppContext";
import DeckModel from "@/model/DeckModel";

export default function DeckPage() {
  const navigate = useNavigate();
  const params = useParams();
  const deckId = params.deckId as string;

  const { localDB: { database } } = useContext(AppContext);

  const [hasCards, setHasCards] = useState(false);

  async function CheckDeck() {
    const deck = await database.get<DeckModel>(DeckModel.table)
      .find(deckId);

    setHasCards(deck.amountOfCards > 0);
  }

  useEffect(() => {
    CheckDeck();
  }, []);

  return (
    <div className={styles.backGround}>
      <BasicButton
        className={styles.btn}
        disabled={!hasCards}
      >
        Normal Practice
      </BasicButton>
      <BasicButton
        className={styles.btn}
        disabled={!hasCards}
      >
        Practice against time
      </BasicButton>
      <BasicButton
        className={styles.btn}
        disabled={!hasCards}
      >
        Custom practice
      </BasicButton>
      <BasicButton
        className={styles.btn}
        disabled={!hasCards}
      >
        Practices statistics
      </BasicButton>
      <BasicButton className={styles.btn}>
        Manage cards
      </BasicButton>
      <BasicButton
        className={styles.btn}
        onClick={() => navigate("/")}
      >
        Back
      </BasicButton>
    </div>
  );
}