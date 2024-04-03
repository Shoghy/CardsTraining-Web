import { Database } from "@nozbe/watermelondb";
import LokiJSAdapter from "@nozbe/watermelondb/adapters/lokijs";
import { createContext, useContext } from "react";

export interface IAppContext{
  localDB:{
    database: Database
    adapter: LokiJSAdapter
  }
}

export const AppContext = createContext<IAppContext>({} as never);

export function useDatabase(){
  const {localDB: {database}} = useContext(AppContext);
  return database;
}