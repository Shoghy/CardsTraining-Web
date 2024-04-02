import BasicButton from "../BasicButton";
import ListEnumerator from "../ListEnumerator";
import styles from "./AlertElement.module.css";

export interface AlertButton{
  text: string
  onClick: () => unknown
}

export interface AlertElementProps{
  title: string
  message?: string
  buttons?: AlertButton[]
}

export default function AlertElemet({title, message, buttons}: AlertElementProps){

  function ButtonRenderer({item}: {item: AlertButton, index: number}){
    return (
      <BasicButton
        onClick={() => item.onClick()}
        className={styles.alertButton}
      >
        {item.text}
      </BasicButton>
    );
  }

  return (
    <div className={styles.alert}>
      <h1 className={styles.alertTitle}>{title}</h1>
      {
        message
        &&
        <div className={styles.alertMessage}>
          <div>
            <span>
              {message}
            </span>
          </div>
        </div>
      }
      {
        buttons
        &&
        <div className={styles.alertFooter}>
          <ListEnumerator
            data={buttons}
            renderItem={ButtonRenderer}
          />
        </div>
      }
    </div>
  );
}