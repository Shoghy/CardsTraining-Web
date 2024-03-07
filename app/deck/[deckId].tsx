import { useGlobalSearchParams } from "expo-router";
import { View } from "react-native";

export default function DeckPage(){
  const { deckId } = useGlobalSearchParams<{deckId: string}>();
  console.log(deckId);
  return (
    <View>
    </View>
  );
}