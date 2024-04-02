import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./index.module.css";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons/faPlusSquare";
import BasicButton from "@/components/BasicButton";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/utils/AppContext";
import DeckModel from "@/model/DeckModel";
import ListEnumerator from "@/components/ListEnumerator";
import DeckButton from "@/components/DeckButton";
import { useNavigate } from "react-router-dom";

export default function DeckSelector(){
  const {localDB: {database}} = useContext(AppContext);
  const [decks, setDecks] = useState<DeckModel[]>([]);
  const navigate = useNavigate();

  async function GetAllDecks(){
    const observer = database.
      get<DeckModel>(DeckModel.table)
      .query()
      .observe();
    observer.subscribe((decks) => {
      setDecks(decks);
    });
  }

  useEffect(() => {
    GetAllDecks();
  }, []);

  return (
    <div className={styles.backGround}>
      <div className={styles.header}>
        <span></span>
        <BasicButton onClick={() => navigate("/create-deck")}>
          <FontAwesomeIcon icon={faPlusSquare} fontSize={"2.5em"} color="white"/>
        </BasicButton>
      </div>
      <div className={styles["deck-scroller"]}>
        <div className={styles["deck-container"]}>
          <ListEnumerator
            data={decks}
            renderItem={({item}) => <DeckButton deck={item} />}
            emptyListElement={<h1>You don't have any decks</h1>}
            keyStractor={({item}) => item.id}
          />
        </div>
      </div>
    </div>
  );
}