import styles from "./BasicButton.module.css";

export interface BasicButtonProps extends React.HTMLAttributes<HTMLDivElement>{
  disabled?: boolean
}

export default function BasicButton({
  className, disabled = false, onClick,
  onClickCapture, onAuxClick, onAuxClickCapture,
  onDoubleClick, onDoubleClickCapture,
  onMouseDown, onMouseDownCapture, onMouseUp,
  onMouseUpCapture, ...props
}: BasicButtonProps){
  if(!className){
    className = "";
  }

  function CatchClick<E>(event: E, func?: (e: E) => void){
    if(disabled) return;

    if(func){
      func(event);
    }
  }

  return (
    <div
      data-disabled={disabled}
      className={`${styles.button} ${className}`}
      onClick={(e) => CatchClick(e, onClick)}
      onClickCapture={(e) => CatchClick(e, onClickCapture)}
      onAuxClick={(e) => CatchClick(e, onAuxClick)}
      onAuxClickCapture={(e) => CatchClick(e, onAuxClickCapture)}
      onDoubleClick={(e) => CatchClick(e, onDoubleClick)}
      onDoubleClickCapture={(e) => CatchClick(e, onDoubleClickCapture)}
      onMouseDown={(e) => CatchClick(e, onMouseDown)}
      onMouseDownCapture={(e) => CatchClick(e, onMouseDownCapture)}
      onMouseUp={(e) => CatchClick(e, onMouseUp)}
      onMouseUpCapture={(e) => CatchClick(e, onMouseUpCapture)}
      {...props}
    />
  );
}