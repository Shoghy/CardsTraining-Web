import { NormalPracticeState, State } from "@/states/normal_practice_state";
import styles from "@/assets/css/pages/normal_practice.module.css";
import StyledButton from "@/components/StyledButton";
import { useNavigate, useParams } from "react-router-dom";

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
  if(state === State.END_TRAINING){
    return <EndTraining/>;
  }

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

function EndTraining(){
  const navigate = useNavigate();
  const params = useParams();
  const deckId = params.deckId as string;

  return (
    <div className={styles.backGround}>
      <h1>
        Congratulations, you finished your training
      </h1>
      <StyledButton
        look="yellow"
        onClick={() => navigate(`/deck/${deckId}`)}
      >
        Go back
      </StyledButton>
    </div>
  );
}