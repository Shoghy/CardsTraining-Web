import styles from "./AlertElement.module.css";

export interface AlertButton{
  text: string
  onClick: (closeAlert: () => void) => unknown
}

export interface AlertElementProps{
  title: string
  message?: string
  buttons?: AlertButton[]
}

export default function AlertElemet({title, message}: AlertElementProps){
  return (
    <div className={styles.alert}>
      <h1 className={styles.alertTitle}>{title}</h1>
      {
        message
        &&
        <p className={styles.alertMessage}>
          {message}
        </p>
      }
    </div>
  );
}