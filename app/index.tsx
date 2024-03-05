import DynamicGrid from "@/components/DynamicGrid";
import { StyleSheet, View } from "react-native";

export default function MainPage(){
  const arr = new Array<number>(200).fill(0);

  return (
    <View style={styles.backGroud}>
      <DynamicGrid
        data={arr}
        style={styles.container}
        renderItem={() => <View></View>}
        gap={10}
      />
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
    padding: 10
  },
});