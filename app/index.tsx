import { ScrollView, StyleSheet, View } from "react-native";

export default function MainPage(){
  return (
    <View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    height: "80%",
    width: "100%",
    marginVertical: "auto"
  },
  contentContainer:{
    flexDirection: "row",
    flexWrap: "wrap"
  }
});