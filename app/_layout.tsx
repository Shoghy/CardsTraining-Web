import { Platform } from "react-native";
import { Database, DatabaseAdapter } from "@nozbe/watermelondb";
import schema from "@/model/schema";
import migrations from "@/model/migrations";
import { Slot } from "expo-router";
import DeckModel from "@/model/DeckModel";
import CardModel from "@/model/CardModel";
import CardRecordModel from "@/model/CardRecordModel";
import { sleep } from "@/utils/functions";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

export default function Layout(){
  const [fontsLoaded] = useFonts({
    ...AntDesign.font
  });

  if(!fontsLoaded) return <></>;
  
  return (
    <>
      <StatusBar style="light" backgroundColor="rgba(0,0,0,0.7)"/>
      <Slot/>
    </>
  );
}

let adapter: DatabaseAdapter;
let database: Database;
let alreadyRunning: boolean = false;
const dbName = "CardsTraining";

export async function SetUp(){
  if(alreadyRunning){
    while(!adapter || !database){
      await sleep(1);
    }
    return {database, adapter};
  }

  alreadyRunning = true;
  if(database && adapter) return {database, adapter};

  if(Platform.OS === "web"){
    const lokijs = await import("@nozbe/watermelondb/adapters/lokijs");
    adapter = new lokijs.default({
      dbName,
      schema,
      migrations,
      useWebWorker: false,
      useIncrementalIndexedDB: true,
      onQuotaExceededError: (error) => {
        console.log("Ocurrió un error", error);
      },
      onSetUpError: (error) => {
        console.log("Ocurrió un error", error);
      }
    });
  }else{
    const sqlite = await import("@nozbe/watermelondb/adapters/sqlite");
    adapter = new sqlite.default({
      dbName,
      schema,
      migrations,
      jsi: Platform.OS === "ios",
      onSetUpError: error => {
        console.log("Ocurrió un error", error);
      }
    });
  }

  database = new Database({
    adapter,
    modelClasses: [
      DeckModel,
      CardModel,
      CardRecordModel
    ]
  });

  return {database, adapter};
}

SetUp();