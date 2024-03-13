import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Database } from "@nozbe/watermelondb";
import LokiJSAdapter from "@nozbe/watermelondb/adapters/lokijs";
import schema from "./model/schema";
import migrations from "./model/migrations";
import DeckModel from "./model/DeckModel";
import CardModel from "./model/CardModel";
import CardRecordModel from "./model/CardRecordModel";
import { useEffect, useState } from "react";
import { AppContext, IAppContext } from "./utils/AppContext";

export default function App() {
  const [appContext, setAppContext] = useState<IAppContext>();

  async function SetUpAppContext(){
    const localDB = await SetUpDatabase();
    setAppContext({
      localDB
    });
  }

  useEffect(() => {
    SetUpAppContext();
  }, []);

  if(!appContext) return <></>;

  return (
    <AppContext.Provider value={appContext}>
      <BrowserRouter>
        <Routes>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

const dbName = "CardsTraining";

async function SetUpDatabase(){
  const adapter = new LokiJSAdapter({
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

  const database = new Database({
    adapter,
    modelClasses: [
      DeckModel,
      CardModel,
      CardRecordModel
    ]
  });

  return {database, adapter};
}