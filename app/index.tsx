import { ScrollView, StyleSheet, View } from "react-native";

export default function MainPage(){
  const arr = new Array<number>(15).fill(0);
  return (
    <View style={styles.backGroud}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {arr.map((_, i) => <View key={i} style={styles.deck}/>)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backGroud:{
    flexDirection: "row",
    height: "100%"
  },
  container:{
    height: "80%",
    width: "100%",
    marginVertical: "auto",
    backgroundColor: "#000",
    padding: 10,
  },
  contentContainer:{
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10
  },
  deck:{
    backgroundColor: "#f00",
    flex: 1,
    flexBasis: "35%",
    aspectRatio: 1,
    maxWidth: 200,
    minWidth: 100
  }
});