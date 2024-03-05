import DynamicGrid from "@/components/DynamicGrid";
import { StyleSheet, View, Text} from "react-native";

export default function MainPage(){
  const arr = new Array<number>(200).fill(0);

  return (
    <View style={styles.backGroud}>
      <DynamicGrid
        data={arr}
        style={styles.container}
        renderItem={() => (
          <Text
            style={styles.text}
          >
            Hola mundo como andan
          </Text>
        )}
        gap={10}
        cellStyle={styles.cell}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backGroud:{
    flexDirection: "row",
    height: "100%",
    backgroundColor: "green"
  },
  container:{
    height: "80%",
    width: "100%",
    marginVertical: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 10
  },
  cell:{
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "column"
  },
  text:{
    flex: 0.5,
    overflow: "hidden",
    fontSize: 17,
    fontWeight: "700",
    padding: 7
  }
});