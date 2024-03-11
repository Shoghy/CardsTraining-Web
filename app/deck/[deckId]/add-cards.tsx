import { SetUp } from "@/app/_layout";
import { useCTextInput } from "@/components/CTextInput";
import { useCustomAlert } from "@/components/CustomAlert";
import LoadingModal from "@/components/LoadingModal";
import CardModel from "@/model/CardModel";
import DeckModel from "@/model/DeckModel";
import { GoBackOr } from "@/utils/custom_router";
import { AntDesign } from "@expo/vector-icons";
import { useGlobalSearchParams } from "expo-router";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AddCards(){
  const { deckId } = useGlobalSearchParams<{deckId: string}>();
  const statement = useCTextInput();
  const answer = useCTextInput();
  const description = useCTextInput();
  const hint = useCTextInput();
  const alert = useCustomAlert({title: ""});
  const loading = LoadingModal();

  async function SaveCard(){
    loading.open();
    if(!statement.value || !answer.value || !description.value){
      alert.openWith({
        title: "Error",
        text: "All fields except for hint are required."
      });
      loading.close();
      return;
    }

    const { database } = await SetUp();

    const deck = await database.get<DeckModel>(DeckModel.table).find(deckId);

    await database.write(async () => {
      await database.get<CardModel>(CardModel.table).create((card) => {
        card.statement = statement.value;
        card.answer = answer.value;
        card.description = description.value;
        card.hint = hint.value ? hint.value : null;
        card.deckUID.set(deck);
        card.lastTimePracticed = null;
        card.score = 0;
        card.timesRight = 0;
        card.timesWrong = 0;
      });

      await deck.update(() => {
        deck.amountOfCards += 1;
      });
    });

    statement.setValue("");
    answer.setValue("");
    description.setValue("");
    hint.setValue("");
  
    loading.close();
  }

  return (
    <View style={styles.backGround}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Card:
          </Text>
          <TouchableOpacity onPress={() => SaveCard()}>
            <AntDesign name="save" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          <Text>Statement</Text>
          <statement.Element/>
        </View>
        <View>
          <Text>Answer</Text>
          <answer.Element/>
        </View>
        <View>
          <Text>Description</Text>
          <description.Element
            multiline
            numberOfLines={3}
          />
        </View>
        <View>
          <Text>Hint</Text>
          <hint.Element
            multiline
            numberOfLines={3}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.goBackBtn}
        onPress={() => GoBackOr(`/deck/${deckId}`)}
      >
        <Text>Go Back</Text>
      </TouchableOpacity>
      <alert.Element/>
      <loading.Element/>
    </View>
  );
}

const styles = StyleSheet.create({
  backGround:{
    paddingTop: (StatusBar.currentHeight ?? 0) + 20,
    height: "100%",
    backgroundColor: "green",
    paddingHorizontal: 20,
  },
  card:{
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    gap: 10
  },
  header:{
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title:{
    fontWeight: "bold",
    fontSize: 20
  },
  goBackBtn:{
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    backgroundColor: "white"
  }
});