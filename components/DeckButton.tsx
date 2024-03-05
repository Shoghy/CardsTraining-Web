import moment from "moment";
import { StyleSheet, ImageBackground, TouchableOpacity, Text, View } from "react-native";

export default function DeckButton({
  name, lastTimePractice, cardsCant
}: Deck){
  let date: string;
  if(lastTimePractice === null){
    date = "Null";
  }else{
    date = moment(lastTimePractice).format("DD MMM YYYY");
  }
  return (
    <TouchableOpacity
      style={styles.backGround}
    >
      <ImageBackground
        style={styles.container}
      >
        <Text style={styles.title}>
          {name}
        </Text>
        <View style={styles.bottom}>
          <Text
            numberOfLines={1}
            style={styles.dateText}
          >
            {date}
          </Text>
          <Text
            numberOfLines={1}
          >
            {cardsCant}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backGround:{
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  container:{
    width: "100%",
    height: "100%",
    flexDirection: "column",
    padding: 7
  },
  title:{
    flex: 0.5,
    overflow: "hidden",
    fontSize: 20,
    fontWeight: "700"
  },
  bottom:{
    marginTop: "auto",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  dateText:{
    flex: 0.7
  }
});