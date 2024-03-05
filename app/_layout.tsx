import { Platform } from "react-native";
import { Database, DatabaseAdapter } from "@nozbe/watermelondb";
import schema from "@/model/schema";
import migrations from "@/model/migrations";
import { Slot } from "expo-router";

export default function Layout(){
  return <Slot/>;
}

function checkIfUserIsLoggedIn(): boolean {
  return false;
}

let adapter: DatabaseAdapter;
let database: Database;
async function SetUp(){
  if(database && adapter) return {database, adapter};

  if(Platform.OS === "web"){
    const lokijs = await import("@nozbe/watermelondb/adapters/lokijs");
    adapter = new lokijs.default({
      schema,
      migrations,
      useWebWorker: false,
      useIncrementalIndexedDB: true,
      onQuotaExceededError: (error) => {
        console.log("Ocurrió un error", error);
      },
      onSetUpError: (error) => {
        console.log("Ocurrió un error", error);
      },
      extraIncrementalIDBOptions: {
        onDidOverwrite: () => {},
        onversionchange: () => {
          if (checkIfUserIsLoggedIn()) {
            window.location.reload();
          }
        },
      }
    });
  }else{
    const sqlite = await import("@nozbe/watermelondb/adapters/sqlite");
    adapter = new sqlite.default({
      schema,
      migrations,
      jsi: true,
      onSetUpError: error => {
        console.log("Ocurrió un error", error);
      }
    });
  }

  database = new Database({
    adapter,
    modelClasses: [],
  });

  return {database, adapter};
}

SetUp();