import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Database } from "@nozbe/watermelondb";
import LokiJSAdapter from "@nozbe/watermelondb/adapters/lokijs";
import schema from "./model/schema";
import migrations from "./model/migrations";
import DeckModel from "./model/DeckModel";
import CardModel from "./model/CardModel";
import CardRecordModel from "./model/CardRecordModel";
import { useState } from "react";
import { AppContext, IAppContext } from "./utils/AppContext";
import DeckSelector from "@/pages/index";
import CreateDeck from "./pages/create_deck";
import DeckPage from "./pages/deck/index";
import CardsManager from "./pages/deck/manage_cards";
import CreateCard from "./pages/deck/create_card";

const router = createBrowserRouter([
  {
    path: "/",
    Component: DeckSelector,
  },
  {
    path: "create-deck",
    Component: CreateDeck,
  },
  {
    path: "deck/:deckId",
    Component: DeckPage,
  },
  {
    path: "deck/:deckId/manage-cards",
    Component: CardsManager,
  },
  {
    path: "deck/:deckId/create-card",
    Component: CreateCard,
  },
]);

export default function App() {
  const [appContext] = useState<IAppContext>({
    localDB: SetUpDatabase()
  });

  return (
    <AppContext.Provider value={appContext}>
      <RouterProvider router={router}/>
    </AppContext.Provider>
  );
}

const dbName = "CardsTraining";

function SetUpDatabase(){
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