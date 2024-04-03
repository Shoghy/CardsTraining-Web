import { useEffect, useMemo, useState } from "react";
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

      const [message, setMessage] = useState(self.message);
      self.message = message;

      const [buttons, setButtons] = useState(self.buttons);
      self.buttons = buttons;

      const [xButton, setXButton] = useState<(() => unknown) | undefined>(self.xButton);
      self.xButton = xButton;

      const [isOpen, setIsOpen] = useState(self.isOpen);
      self.isOpen = isOpen;

      useEffect(() => {
        self.setTitle = setTitle;
        self.setMessage = setMessage;
        self.setButtons = setButtons;
        self.setXButton = setXButton;
        self.setIsOpen = setIsOpen;

        self.open = () => setIsOpen(true);
        self.close = () => setIsOpen(false);
        self.toggle = () => setIsOpen((c) => !c);

        self.openWith = (prop) => {
          setXButton(() => prop.xButton);
          setTitle(() => prop.title);
          setMessage(() => prop.message);
          setButtons(() => prop.buttons);
          setIsOpen(() => true);
        };
      }, []);


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