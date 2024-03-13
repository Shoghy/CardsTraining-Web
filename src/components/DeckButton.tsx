import DeckModel from "@/model/DeckModel";
import BasicButton from "./BasicButton";
import moment from "moment";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DeckButton.module.css";

export default function DeckButton({ deck: {
  lastTimePracticed, id, name, amountOfCards
} }: {deck: DeckModel}){
  const navigate = useNavigate();

  const dateString = useMemo(() => {
    if (!lastTimePracticed) {
      return "N/A";
    } else {
      return moment(lastTimePracticed).format("DD MMM YYYY");
    }
  }, [lastTimePracticed]);

  function OnClick() {
    navigate(`/deck/${id}`);
  }

  return (
    <BasicButton
      onClick={() => OnClick()}
      className={styles.backGround}
    >
      <div className={styles.container}>
        <h2 className={styles.title}>
          {name}
        </h2>
        <div className={styles.bottom}>
          <span>{dateString}</span>
          <span>{amountOfCards}</span>
        </div>
      </div>
    </BasicButton>
  );
}