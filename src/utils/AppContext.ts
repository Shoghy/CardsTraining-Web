import { Database } from "@nozbe/watermelondb";
import LokiJSAdapter from "@nozbe/watermelondb/adapters/lokijs";
import { createContext } from "react";

export interface IAppContext{
  localDB:{
    database: Database
    adapter: LokiJSAdapter
  }
}

export const AppContext = createContext<IAppContext>({} as never);