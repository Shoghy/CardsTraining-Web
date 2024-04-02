import BasicButton from "@/components/BasicButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import styles from "@/assets/css/pages/manage_cards.module.css";
import ListEnumerator from "@/components/ListEnumerator";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import CardModel from "@/model/CardModel";
import { AppContext } from "@/utils/AppContext";
import DeckModel from "@/model/DeckModel";

export default function CardsManager(){
  const navigate = useNavigate();
  const params = useParams();
  const deckId = params.deckId as string;

  const { localDB: { database } } = useContext(AppContext);

  const [cards, setCards] = useState<CardModel[]>([]);

  async function GetAllCards(){
    const deck = await database
      .get<DeckModel>(DeckModel.table)
      .find(deckId);

    deck.cards.observe().subscribe((cards) => {
      setCards(cards);
    });
  }

  useEffect(() => {
    GetAllCards();
  }, []);

  return (
    <div className={styles.backGround}>
      <div className={styles.header}>
        <BasicButton>
          Back
        </BasicButton>
        <BasicButton onClick={() => navigate(`/deck/${deckId}/create-card`)}>
          <FontAwesomeIcon icon={faPlusSquare} fontSize={"2.5em"} color="white"/>
        </BasicButton>
      </div>
      <div className={styles.cardScroller}>
        <div className={styles.cardContainer}>
          <ListEnumerator
            data={cards}
            renderItem={({item}) => <div>{item.statement}</div>}
            emptyListElement={<h1>You don't have any cards in this deck</h1>}
            keyStractor={({item}) => item.id}
          />
        </div>
      </div>
    </div>
  );
}