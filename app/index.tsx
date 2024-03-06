import DeckButton from "@/components/DeckButton";
import DynamicGrid from "@/components/DynamicGrid";
import { StyleSheet, View} from "react-native";

export default function MainPage(){
  const arr = new Array<IDeck>(50).fill({
    name: "Hola mundo",
    amountOfCards: 0,
    lastTimePracticed: new Date(),
    id: "No"
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
        keyExtractor={(_, i) => `${i}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backGroud:{
    flexDirection: "row",
    height: "100%",
    backgroundColor: "green",
    alignItems: "center"
  },
  container:{
    height: "80%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 10
  }
});