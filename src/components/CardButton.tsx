import CardModel from "@/model/CardModel";
import BasicButton from "./BasicButton";
import styles from "@/assets/css/components/CardButton.module.css";
import EllipsisText from "./EllipsisText";

export default function CardButton({card}: {card: CardModel}){

  return (
    <BasicButton
      className={styles.backGround}
    >
      <EllipsisText className={styles.statement}>
        {card.statement}
      </EllipsisText>
      <EllipsisText className={styles.answer}>
        {card.answer}
      </EllipsisText>
      <div className={styles.practiceInfo}>
        <span>{card.timesWrong}</span>
        <span>{card.timesRight + card.timesWrong}</span>
        <span>{card.timesRight}</span>
      </div>
    </BasicButton>
  );
}