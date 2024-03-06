import DeckButton from "@/components/DeckButton";
import DynamicGrid from "@/components/DynamicGrid";
import DeckModel from "@/model/DeckModel";
import { useEffect, useState } from "react";
import { StyleSheet, View} from "react-native";
import { SetUp } from "./_layout";

export default function MainPage(){
  const [decks, setDecks] = useState<DeckModel[]>([]);

  async function GetAllDecks(){
    const {database} = await SetUp();
    const decks = await database.get("decks").query().fetch() as DeckModel[];
    setDecks(decks);
  }

  useEffect(() => {
    GetAllDecks();
  }, []);

  return (
    <View style={styles.backGroud}>
      <DynamicGrid
        data={decks}
        style={styles.container}
        renderItem={({item}) => (
          <DeckButton
            amountOfCards={item.amountOfCards}
            id={item.id}
            name={item.name}
            imgURL={item.imgURL}
            lastTimePracticed={item.lastTimePracticed}
          />
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