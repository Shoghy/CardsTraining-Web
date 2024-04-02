import ReactDOM from "react-dom/client";
import AlertElemet, { AlertElementProps } from "./AlertElement";

export interface PersistentAlertButton{
  text: string
  onClick: (closeAlert: () => void) => unknown
}

export interface PersistentAlertProps extends Omit<AlertElementProps, "buttons">{
  dissmesable?: boolean
  buttons?: PersistentAlertButton[]
}

export default function PersistentAlert(
  {dissmesable, buttons, ...props}: PersistentAlertProps
){
  const backGround = document.createElement("div");
  backGround.classList.add("persistentAlert");
  document.body.appendChild(backGround);

  const root = ReactDOM.createRoot(backGround);

  function CloseAlert(){
    root.unmount();
    backGround.remove();
  }

  if(buttons){
    for(let i = 0; i < buttons.length; ++i){
      const btn = buttons[i];
      const func = btn.onClick;

      btn.onClick = () => {
        func(CloseAlert);
      };
    }
  }

  if(dissmesable){
    backGround.onclick = () => CloseAlert();
  }

  root.render(
    <AlertElemet
      buttons={buttons as never}
      {...props}
    />
  );
}