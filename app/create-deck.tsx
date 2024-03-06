import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CreateDeck(){
  return (
    <View style={styles.backGround}>
      <View style={styles.deckForm}>
        <Text style={styles.label}>
          Deck name:
        </Text>
        <TextInput
          style={styles.input}
          maxLength={50}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.buttons}>
          <Text style={styles.buttonsText}>
            Cancel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}>
          <Text style={styles.buttonsText}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  backGround: {
    backgroundColor: "green",
    height: "100%",
    paddingVertical: 50,
    alignItems: "center"
  },
  deckForm:{
    width: "80%",
    maxWidth: 400,
    aspectRatio: 1,
    backgroundColor: "white",
    transform: [{rotateZ: "-5deg"}],
    borderRadius: 10,
    padding: 20,
    shadowColor: "rgba(0,0,0,0.3)",
    shadowRadius: 10,
    shadowOffset: {
      width: 10,
      height: 10
    }
  },
  label:{
    fontSize: 20,
    fontWeight: "bold"
  },
  input:{
    borderColor: "black",
    borderWidth: 2,
    fontSize: 20,
    borderRadius: 10,
    padding: 5,
    marginTop: 10,
  },
  footer:{
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    maxWidth: 400,
  },
  buttons:{
    padding: 10,
    borderColor: "rgb(176, 233, 20)",
    borderWidth: 2,
    borderRadius: 10,
  },
  buttonsText:{
    color: "rgb(176, 233, 20)",
    fontWeight: "bold"
  }
});