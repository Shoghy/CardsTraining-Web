import BasicButton from "@/components/BasicButton";
import custom_router, { GoBackOr } from "@/utils/custom_router";
import { useGlobalSearchParams } from "expo-router";
import { useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";

export default function DeckPage(){
  const { deckId } = useGlobalSearchParams<{deckId: string}>();
  const [hasCards, setHasCards] = useState(false);

  return (
    <View style={styles.backGround}>
      <BasicButton
        style={styles.button}
        disabled={!hasCards}
      >
        <Text style={styles.buttonText}>
          Normal practice
        </Text>
      </BasicButton>
      <BasicButton
        style={styles.button}
        disabled={!hasCards}
      >
        <Text style={styles.buttonText}>
          Practice against time
        </Text>
      </BasicButton>
      <BasicButton
        style={styles.button}
        disabled={!hasCards}
      >
        <Text style={styles.buttonText}>
          Custom practice
        </Text>
      </BasicButton>
      <BasicButton
        style={styles.button}
        disabled={!hasCards}
      >
        <Text style={styles.buttonText}>
          Metrics
        </Text>
      </BasicButton>
      <BasicButton
        style={styles.button}
        disabled={!hasCards}
      >
        <Text style={styles.buttonText}>
          Manage cards
        </Text>
      </BasicButton>
      <BasicButton
        style={styles.button}
        onPress={
          () => custom_router.push(`./${deckId}/add-cards`)
        }
      >
        <Text style={styles.buttonText}>
          Add cards
        </Text>
      </BasicButton>
      <BasicButton
        style={styles.button}
        onPress={() => GoBackOr("/")}
      >
        <Text style={styles.buttonText}>
          Back
        </Text>
      </BasicButton>
    </View>
  );
}

const styles = StyleSheet.create({
  backGround:{
    paddingTop: (StatusBar.currentHeight ?? 0) + 20,
    height: "100%",
    backgroundColor: "green",
    paddingHorizontal: 20,
    gap: 10
  },
  button:{
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: "center"
  },
  buttonText:{
    fontSize: 20,
    fontWeight: "700"
  }
});