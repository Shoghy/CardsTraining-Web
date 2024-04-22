import { NormalPracticeState, State } from "@/states/normal_practice_state";
import styles from "@/assets/css/pages/normal_practice.module.css";
import StyledButton from "@/components/StyledButton";

export function Component(){
  const manager = NormalPracticeState();

  const {
    answer,
    setAnswer,
    displayedText,
    state,
    NextCard,
  } = manager;

  if(state === State.LOADING) return <>Loading</>;

  const cardClass = [styles.card];
  if(state === State.ANSWERED_RIGHT){
    cardClass.push(styles.rightAnswer);
  }else if(state === State.ANSWERED_WRONG){
    cardClass.push(styles.wrongAnswer);
  }

  return (
    <div className={styles.backGround}>
      <center className={styles.marginWrapper}>
        <div className={cardClass.join(" ")}>
          <div className={styles.scrolleable}>
            <span>{displayedText}</span>
          </div>
        </div>
      </center>
      {
        state === State.AWAITING_ANSWER
        &&
        <>
          <input
            className={styles.input}
            placeholder="Write one of the posible answers here"
            value={answer}
            onChange={(e) => setAnswer(e.currentTarget.value)}
          />
          <StyledButton
            look="yellow"
            disabled={!answer}
            onClick={() => manager.OnAnswer()}
          >
            Answer
          </StyledButton>
        </>
      }
      {
        state !== State.AWAITING_ANSWER
        &&
        <StyledButton
          look="yellow"
          onClick={() => NextCard()}
        >
          Next card
        </StyledButton>
      }
    </div>
  );
}
