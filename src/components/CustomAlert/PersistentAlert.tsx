import ReactDOM from "react-dom/client";
import AlertElemet, { AlertElementProps } from "./AlertElement";

export interface PersistentAlertButton{
  text: string
  onClick: (closeAlert: () => void) => unknown
}

export interface PersistentAlertProps extends Omit<AlertElementProps, "buttons" | "xButton">{
  dissmesable?: boolean
  buttons?: PersistentAlertButton[]
  xButton?: (closeAlert: () => void) => unknown
  xButtonClose?: boolean
}

export default function PersistentAlert(
  {dissmesable, buttons, xButton, xButtonClose = true, ...props}: PersistentAlertProps
){
  const mprops: AlertElementProps = props;
  const backGround = document.createElement("div");
  backGround.classList.add("alertBackground");
  document.body.appendChild(backGround);

  const root = ReactDOM.createRoot(backGround);

  function CloseAlert(){
    root.unmount();
    backGround.remove();
  }

  if(xButtonClose){
    mprops.xButton = () => CloseAlert();
  }

  if(xButton){
    mprops.xButton = () => {
      xButton(CloseAlert);
    };
  }

  if(buttons){
    mprops.buttons = [];
    for(let i = 0; i < buttons.length; ++i){
      const btn = buttons[i];

      mprops.buttons.push({
        text: btn.text,
        onClick: () => btn.onClick(CloseAlert)
      });
    }
  }

  if(dissmesable){
    backGround.onclick = () => CloseAlert();
  }

  root.render(
    <AlertElemet
      {...mprops}
    />
  );
}