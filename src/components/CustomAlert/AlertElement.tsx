import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BasicButton from "../BasicButton";
import ListEnumerator from "../ListEnumerator";
import styles from "@/assets/css/components/AlertElement.module.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import StyledButton from "../StyledButton";

export interface AlertButton{
  text: string
  onClick: () => unknown
}

export interface AlertElementProps{
  title: string
  message?: string
  buttons?: AlertButton[]
  xButton?: () => unknown
}

export default function AlertElemet({
  title,
  message,
  buttons,
  xButton,
}: AlertElementProps){

  function ButtonRenderer({item}: {item: AlertButton, index: number}){
    return (
      <StyledButton
        onClick={() => item.onClick()}
        className={styles.alertButton}
      >
        {item.text}
      </StyledButton>
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
      {
        xButton
        &&
        <BasicButton
          className={styles.alertXButton}
          onClick={() => xButton()}
        >
          <FontAwesomeIcon icon={faTimes}/>
        </BasicButton>
      }
    </div>
  );
}