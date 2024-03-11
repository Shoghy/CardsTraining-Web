import { AntDesign } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { GestureResponderEvent, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface AlertButton{
  text: string
  onPress?: (e: GestureResponderEvent) => unknown
}

export interface CustomAlertProps {
  visible?: boolean
  title: string
  text?: string
  onXPress?: (e: GestureResponderEvent) => unknown
  buttons?: AlertButton[]
}

export default function CustomAlert({
  visible, title, text,
  onXPress, buttons = []
}: CustomAlertProps) {

  function AlertBody() {
    if (!text) return <></>;

    return (
      <ScrollView style={styles.body}>
        <Text style={styles.text}>
          {text}
        </Text>
      </ScrollView>
    );
  }

  function XButton(){
    if(!onXPress) return <></>;

    return (
      <TouchableOpacity
        onPress={onXPress}
      >
        <AntDesign name="closesquare" size={24} color="black" />
      </TouchableOpacity>
    );
  }

  function Buttons(){
    if(buttons.length === 0) return <></>;

    return (
      <View style={styles.bottom}>
        {buttons.map((v, i) => (
          <TouchableOpacity
            key={i}
            style={styles.button}
            onPress={v.onPress}
          >
            <Text>{v.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.backGround}>
        <View style={styles.alert}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {title}
            </Text>
            <XButton/>
          </View>
          <AlertBody/>
          <Buttons/>
        </View>
      </View>
    </Modal>
  );
}

export interface SelfCustomAlert{
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  buttons?: AlertButton[]
  setButtons: React.Dispatch<React.SetStateAction<AlertButton[] | undefined>>
  showXButton: boolean
  setShowXButton: React.Dispatch<React.SetStateAction<boolean>>
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  text?: string
  setText: React.Dispatch<React.SetStateAction<string | undefined>>
  readonly Element: (props: {
    onXPress?: (e: GestureResponderEvent) => unknown
  }) => React.JSX.Element
  open: () => void
  close: () => void
  toggle: () => void
  openWith(args: Omit<UseCustomAlertArgs, "visible">): void
  openAndMerge(args: Omit<UseCustomAlertArgs, "visible">): void
}

export interface UseCustomAlertArgs{
  title?: string
  showXButton?: boolean
  visible?: boolean
  text?: string
  buttons?: AlertButton[]
}

export function useCustomAlert({
  title = "", visible = false,
  showXButton = true, text, buttons
}: UseCustomAlertArgs){
  const self: SelfCustomAlert = useMemo(() => {
    return {
      Element,
      title,
      visible,
      showXButton,
      text,
      buttons
    } as never;
  }, []);

  function Element({onXPress}: {onXPress?: (e: GestureResponderEvent) => unknown}){
    const [title, setTitle] = useState(self.title);
    self.title = title;
    self.setTitle = setTitle;
  
    const [buttons, setButtons] = useState(self.buttons);
    self.buttons = buttons;
    self.setButtons = setButtons;

    const [showXButton, setShowXButton] = useState(self.showXButton);
    self.showXButton = showXButton;
    self.setShowXButton = setShowXButton;

    const [visible, setVisible] = useState(self.visible);
    self.visible = visible;
    self.setVisible = setVisible;
    self.open = () => setVisible(true);
    self.close = () => setVisible(false);
    self.toggle = () => setVisible((c) => !c);
    self.openWith = ({title = "", ...args}: Omit<UseCustomAlertArgs, "visible">) => {
      setTitle(title);
      setButtons(args.buttons);
      setShowXButton(args.showXButton ? args.showXButton : true);
      setText(args.text);
      setVisible(true);
    };
    self.openAndMerge = ({...args}: Omit<UseCustomAlertArgs, "visible">) => {
      if("buttons" in args){
        setButtons(args.buttons);
      }
      if("showXButton" in args){
        setShowXButton(!!args.showXButton);
      }
      if("text" in args){
        setText(args.text);
      }
      if(typeof args.text === "string"){
        setTitle(args.text);
      }
      setVisible(true);
    };

    const [text, setText] = useState(self.text);
    self.text = text;
    self.setText = setText;

    function XButtonAction(){
      if(!showXButton) return undefined;

      function Action(e: GestureResponderEvent){
        if(onXPress){
          onXPress(e);
        }

        setVisible(false);
      }
  
      return Action;
    }

    return (
      <CustomAlert
        title={title}
        buttons={buttons}
        onXPress={XButtonAction()}
        visible={visible}
        text={text}
      />
    );
  }

  return self;
}

const styles = StyleSheet.create({
  backGround: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  alert: {
    width: "100%",
    maxWidth: 550,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    gap: 13,
    maxHeight: "100%"
  },
  header:{
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 30,
    alignItems: "flex-start"
  },
  title: {
    fontSize: 22,
    fontWeight: "bold"
  },
  body: {
    maxHeight: "100%"
  },
  text:{
    fontSize: 16
  },
  bottom:{
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 10
  },
  button:{
    borderColor: "black",
    borderWidth: 1,
    minWidth: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 5
  }
});