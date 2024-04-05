import { NormalPracticeState, State } from "@/states/normal_practice_state";
import styles from "@/assets/css/pages/normal_practice.module.css";
import StyledButton from "@/components/StyledButton";

export function Component(){
  const manager = new NormalPracticeState();
  const {
    answer,
    setAnswer,
    card,
  } = manager;

  if(manager.state === State.LOADING) return <>Loading</>;

  return (
    <div className={styles.backGround}>
      <center className={styles.marginWrapper}>
        <div className={styles.card}>
          <div className={styles.scrolleable}>
            <span>{card.statement}</span>
          </div>
        </div>
      </center>
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
    </div>
  );
}
