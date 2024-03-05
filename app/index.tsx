import DeckButton from "@/components/DeckButton";
import DynamicGrid from "@/components/DynamicGrid";
import { StyleSheet, View} from "react-native";

export default function MainPage(){
  const arr = new Array<Deck>(200).fill({
    name: "Hola mundo",
    cardsCant: 0,
    lastTimePractice: new Date(),
    uid: "No"
  });

  return (
    <View style={styles.backGroud}>
      <DynamicGrid
        data={arr}
        style={styles.container}
        renderItem={({item}) => (
          <DeckButton {...item}/>
        )}
        gap={10}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backGroud:{
    flexDirection: "row",
    height: "100%",
    backgroundColor: "green"
  },
  container:{
    height: "80%",
    width: "100%",
    marginVertical: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 10
  }
});