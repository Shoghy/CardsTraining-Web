import { StyleSheet, ImageBackground } from "react-native";

export default function Deck(){
  return (
    <ImageBackground
      style={styles.container}
    >
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 0.5,
    aspectRatio: 1
  }
});