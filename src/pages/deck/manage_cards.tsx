import BasicButton from "@/components/BasicButton";
import { useNavigate, useParams } from "react-router-dom";

export default function CardsManager(){
  const navigate = useNavigate();
  const params = useParams();
  const deckId = params.deckId as string;

  return (
    <div>
      <BasicButton onClick={() => navigate(`/deck/${deckId}/create-card`)}>
        Add card
      </BasicButton>
    </div>
  );
}