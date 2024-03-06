import { Model } from "@nozbe/watermelondb";
import { date, field, text, immutableRelation, children } from "@nozbe/watermelondb/decorators";

export default class CardModel extends Model{
  static table = "cards";
  static associations = {
    cardsRecords: { type: "has_many", foreignKey:  "cardUID" },
    decks: { type: "belongs_to", key: "deckUID" }
  };

  /**@type {string} */
  @text("statement") statement;

  /**@type {string} */
  @text("answer") answer;

  /**@type {string} */
  @text("description") description;

  /**@type {string | null} */
  @text("hint") hint;

  /**@type {Date | null} */
  @date("lastTimePracticed") lastTimePracticed;

  /**@type {number} */
  @field("score") score;

  /**@type {number} */
  @field("timesRight") timesRight;

  /**@type {number} */
  @field("timesWrong") timesWrong;

  /**@type {import("./DeckModel").default} */
  @immutableRelation("decks", "deckUID") deckUID;

  /**@type {import("./CardRecordModel").default[]} */
  @children("cardsRecords") cardsRecords;

}