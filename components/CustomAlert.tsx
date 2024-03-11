import { AntDesign } from "@expo/vector-icons";
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