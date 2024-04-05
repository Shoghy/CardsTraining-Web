import { NormalPracticeState, State } from "@/states/normal_practice_state";
import styles from "@/assets/css/pages/normal_practice.module.css";

export function Component(){
  const manager = new NormalPracticeState();

  if(manager.state === State.LOADING) return <>Loading</>;
  const card = manager.cards[0];

  return (
    <div className={styles.backGround}>
      <div className={styles.card}>
        <div className={styles.scrolleable}>
          <span>{card.statement}</span>
        </div>
      </div>
    </div>
  );
}
