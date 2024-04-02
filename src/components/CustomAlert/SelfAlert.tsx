import { useMemo, useState } from "react";
import AlertElemet, { AlertButton, AlertElementProps } from "./AlertElement";

export interface SelfAlertObject{
  Element: () => React.JSX.Element

  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>

  message?: string
  setMessage: React.Dispatch<React.SetStateAction<string | undefined>>

  buttons?: AlertButton[]
  setButtons: React.Dispatch<React.SetStateAction<AlertButton[] | undefined>>

  xButton?: () => unknown
  setXButton: React.Dispatch<React.SetStateAction<(() => unknown) | undefined>>

  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>

  open: () => void
  close: () => void
  toggle: () => void

  openWith: (props: AlertElementProps) => void
}

export default function SelfAlert(){
  const self: SelfAlertObject = useMemo(() => {
    function Element(){
      const [title, setTitle] = useState(self.title);
      self.title = title;
      self.setTitle = setTitle;

      const [message, setMessage] = useState(self.message);
      self.message = message;
      self.setMessage = setMessage;

      const [buttons, setButtons] = useState(self.buttons);
      self.buttons = buttons;
      self.setButtons = setButtons;

      const [xButton, setXButton] = useState<(() => unknown) | undefined>(self.xButton);
      self.xButton = xButton;
      self.setXButton = setXButton;

      const [isOpen, setIsOpen] = useState(self.isOpen);
      self.isOpen = isOpen;
      self.setIsOpen = setIsOpen;

      self.open = () => setIsOpen(true);
      self.close = () => setIsOpen(false);
      self.toggle = () => setIsOpen(!isOpen);

      self.openWith = (prop) => {
        setTitle(prop.title);
        setMessage(prop.message);
        setButtons(prop.buttons);
        setXButton(prop.xButton);
        setIsOpen(true);
      };

      if(!isOpen) return <></>;

      return (
        <div className="alertBackground">
          <AlertElemet
            title={title}
            message={message}
            buttons={buttons}
            xButton={xButton}
          />
        </div>
      );
    }

    return {
      Element,
      title: "",
      setTitle: () => {},
      setMessage: () => {},
      setButtons: () => {},
      setXButton: () => {},
      isOpen: false,
      setIsOpen: () => {},
      open: () => {},
      close: () => {},
      toggle: () => {},
      openWith: () => {},
    };
  }, []);

  return self;
}