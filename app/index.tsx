import DeckButton from "@/components/DeckButton";
import DynamicGrid from "@/components/DynamicGrid";
import DeckModel from "@/model/DeckModel";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { SetUp } from "./_layout";
import { AntDesign } from "@expo/vector-icons";

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
      <TouchableOpacity
        style={styles.header}
      >
        <AntDesign name="plussquareo" size={30} color={"#fff"} />
      </TouchableOpacity>
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
        ListEmptyComponent={<EmptyList/>}
      />
      <View style={styles.footer}/>
    </View>
  );
}

function EmptyList(){
  return (
    <View>
      <Text style={styles.noDecks}>
        You don't have any decks
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  backGroud:{
    flexDirection: "column",
    height: "100%",
    backgroundColor: "green",
    justifyContent: "flex-start"
  },
  container:{
    height: "80%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 10
  },
  noDecks:{
    fontSize: 25,
    fontWeight: "700",
    color: "white"
  },
  header:{
    height: "10%",
    flexDirection: "row-reverse",
    padding: 10,
    alignItems: "center"
  },
  footer:{
    height: "10%",
  }
});