import CardModel from "@/model/CardModel";
import BasicButton from "./BasicButton";
import styles from "@/assets/css/components/CardButton.module.css";
import EllipsisText from "./EllipsisText";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CardButton({card}: {card: CardModel}){
  const navigate = useNavigate();
  const [url, setURL] = useState<string>();

  function Action(){
    if(!url) return;
    navigate(url);
  }

  async function SetURL(){
    const cardID = card.id;
    const deck = await card.deck;
    const deckID = deck.id;

    setURL(`/deck/${deckID}/card/${cardID}/edit`);
  }

  useEffect(() => {
    SetURL();
  }, []);

  return (
    <BasicButton
      className={styles.backGround}
      onClick={() => Action()}
    >
      <EllipsisText className={styles.statement}>
        {card.statement}
      </EllipsisText>
      <EllipsisText className={styles.description}>
        {card.description}
      </EllipsisText>
      <div className={styles.practiceInfo}>
        <span>{card.timesWrong}</span>
        <span>{card.timesRight + card.timesWrong}</span>
        <span>{card.timesRight}</span>
      </div>
    </BasicButton>
  );
}