import styles from "@/assets/css/pages/create_card.module.css";
import { faChevronCircleLeft, faFloppyDisk, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StyledButton from "../../components/StyledButton";
import CreateEditDeleteState from "@/states/create_edit_delete_card_state";

export default function CreateCard() {
  const manager = new CreateEditDeleteState();
  const {
    statement,
    setStatement,
    answer,
    setAnswer,
    description,
    setDescription,
    hint,
    setHint,
    alert,
  } = manager;

  return (
    <div className={styles.backGround}>
      <div className={styles.cardForm}>
        <div className={styles.cardField}>
          <label htmlFor="statement">
            Statement:
          </label>
          <input
            type="text"
            id="statement"
            placeholder='What does "学生" means?'
            value={statement}
            onChange={(e) => setStatement(e.currentTarget.value)}
          />
        </div>
        <div className={styles.cardField}>
          <label htmlFor="answer">
            Answer:
          </label>
          <input
            type="text"
            id="answer"
            placeholder="Student|Learner"
            value={answer}
            onChange={(e) => setAnswer(e.currentTarget.value)}
          />
        </div>
        <div className={styles.cardField}>
          <label htmlFor="description">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            placeholder="Here add a description of the statement. I also recommend you to add a mnemonic, so it will be easier for you to remember."
            rows={5}
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
        </div>
        <div className={styles.cardField}>
          <label htmlFor="hint">
            Hint:
          </label>
          <input
            type="text"
            id="hint"
            placeholder="がくせい"
            value={hint}
            onChange={(e) => setHint(e.currentTarget.value)}
          />
        </div>
        <div className={styles.cardFooter}>
          <StyledButton
            look="yellow"
            onClick={() => manager.navigate(`/deck/${manager.deckId}/manage-cards`)}
          >
            <FontAwesomeIcon
              icon={faChevronCircleLeft}
              fontSize="0.7em"
            />
            Back
          </StyledButton>
          {
            manager.cardId
            &&
            <StyledButton
              look="red"
              onClick={
                () => alert.openWith({
                  title: "Are you sure?",
                  message: "Do you really want to delete this card?",
                  xButton: () => {
                    alert.close();
                  },
                  buttons: [{
                    text: "Yes",
                    onClick: () => manager.DeleteCard()
                  }]
                })
              }
            >
              <FontAwesomeIcon
                icon={faTrash}
                fontSize="0.7em"
              />
              Delete
            </StyledButton>
          }
          <StyledButton
            look="green"
            onClick={() => manager.SaveAction()}
          >
            <FontAwesomeIcon
              icon={faFloppyDisk}
              fontSize="0.7em"
            />
            Save
          </StyledButton>
        </div>
      </div>
      <alert.Element />
    </div>
  );
}