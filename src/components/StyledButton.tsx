import BasicButton, { BasicButtonProps } from "./BasicButton";
import styles from "@/assets/css/components/StyledButton.module.css";

export interface StyledButton extends BasicButtonProps{
  look?: "green" | "blue" | "yellow" | "red"
}

export default function StyledButton({
  className = "",
  look = "blue",
  ...prop
}: StyledButton){
  return (
    <BasicButton
      className={`${styles.btn} ${styles[look]} ${className}`}
      {...prop}
    />
  );
}