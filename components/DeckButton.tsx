import custom_router from "@/utils/custom_router";
import moment from "moment";
import { useMemo } from "react";
import { StyleSheet, ImageBackground, TouchableOpacity, Text, View } from "react-native";

export default function DeckButton({
  name, lastTimePracticed,
  amountOfCards, id, imgURL
}: IDeck) {

  const dateString = useMemo(() => {
    if (!lastTimePracticed) {
      return "N/A";
    } else {
      return moment(lastTimePracticed).format("DD MMM YYYY");
    }
  }, [lastTimePracticed]);

  function OnClick() {
    custom_router.push({
      pathname: "/deck/[deckId]",
      params: { deckId: id }
    });
  }

  return (
    <TouchableOpacity
      style={styles.backGround}
      onPress={() => OnClick()}
    >
      <ImageBackground
        style={styles.container}
        source={{uri: imgURL ? imgURL : undefined}}
      >
        <Text
          style={styles.title}
          numberOfLines={4}
        >
          {name}
        </Text>
        <View style={styles.bottom}>
          <Text
            numberOfLines={1}
            style={styles.dateText}
          >
            {dateString}
          </Text>
          <Text
            numberOfLines={1}
          >
            {amountOfCards}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backGround: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden"
  },
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    padding: 7
  },
  title: {
    flex: 1,
    overflow: "hidden",
    fontSize: 20,
    fontWeight: "700"
  },
  bottom: {
    marginTop: "auto",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  dateText: {
    flex: 0.7
  }
});