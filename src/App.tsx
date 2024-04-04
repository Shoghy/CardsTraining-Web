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

const router = createBrowserRouter([
  {
    path: "/",
    lazy: () => import("@/pages/index"),
  },
  {
    path: "create-deck",
    lazy: () => import("@/pages/create_deck"),
  },
  {
    path: "deck/:deckId",
    lazy: () => import("@/pages/deck"),
  },
  {
    path: "deck/:deckId/manage-cards",
    lazy: () => import("@/pages/deck/manage_cards"),
  },
  {
    path: "deck/:deckId/create-card",
    lazy: () => import("@/pages/deck/create_edit_delete_card"),
  },
  {
    path: "deck/:deckId/card/:cardId/edit",
    lazy: () => import("@/pages/deck/create_edit_delete_card"),
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