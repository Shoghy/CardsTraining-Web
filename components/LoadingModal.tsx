import { useMemo, useState } from "react";
import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native";

export interface SelfLoadingModal{
  Element: () => React.JSX.Element
  isOpen: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  open: (text?: string) => void
  close: () => void
  toggle: () => void
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>
}

export default function LoadingModal(open: boolean = false, text: string = ""){
  const _object: SelfLoadingModal = useMemo(() => {
    return {
      Element,
      isOpen: open,
      setOpen: () => {},
      open: () => {},
      close: () => {},
      toggle: () => {},
      text,
      setText: () => {},
    };
  }, []);

  function Element(){
    const [open, setOpen] = useState(_object.isOpen);
    const [text, setText] = useState(_object.text);
    _object.isOpen = open;
    _object.setOpen = setOpen;
    _object.open = (text = "") => {
      setOpen(true);
      setText(text);
    };
    _object.close = () => setOpen(false);
    _object.toggle = () => setOpen((c) => !c);
    _object.text = text;
    _object.setText = setText;

    return (
      <Modal
        visible={open}
        transparent
        animationType="fade"
      >
        <View style={styles.backGround}>
          <ActivityIndicator size={50}/>
          {
            text ? 
              <Text style={styles.text}>
                {text}
              </Text>
              : <></>
          }
        </View>
      </Modal>
    );
  }

  return _object;
}

const styles = StyleSheet.create({
  backGround:{
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 20
  },
  text:{
    color: "white"
  }
});