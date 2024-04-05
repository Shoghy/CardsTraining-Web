import { useNavigate, useParams } from "react-router-dom";
import styles from "@/assets/css/pages/deck.module.css";
import BasicButton from "@/components/BasicButton";
import { useEffect, useState } from "react";
import { useDatabase } from "@/utils/AppContext";
import DeckModel from "@/model/DeckModel";

export function Component() {
  const navigate = useNavigate();
  const params = useParams();
  const deckId = params.deckId as string;

  const database = useDatabase();

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
        onClick={() => navigate(`/deck/${deckId}/normal-practice`)}
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
      <BasicButton
        className={styles.btn}
        onClick={() => navigate("manage-cards")}
      >
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