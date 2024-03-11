import { SetUp } from "@/app/_layout";
import DeckModel from "@/model/DeckModel";
import { GoBackOr } from "@/utils/custom_router";
import { Slot, useGlobalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function Layout(){
  const { deckId } = useGlobalSearchParams<{deckId: string}>();
  const [deckExist, setDeckExist] = useState(false);

  async function CheckDeck(){
    const { database } = await SetUp();

    try{
      await database.get(DeckModel.table).find(deckId);
      setDeckExist(true);
    }catch(e){
      GoBackOr("/");
    }
  }

  useEffect(() => {
    CheckDeck();
  }, []);

  if(!deckExist) return <></>;

  return (
    <Slot/>
  );
}