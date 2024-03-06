import { Model } from "@nozbe/watermelondb";
import { date, field, immutableRelation } from "@nozbe/watermelondb/decorators";

export default class CardRecordModel extends Model{
  static table = "cardsRecords";
  static associations = {
    cards: { type: "belongs_to", key: "cardUID" }
  };

  /**@type {boolean} */
  @field("answeredCorrect") answeredCorrect;

  /**@type {boolean} */
  @field("wasHintUsed") wasHintUsed;

  /**@type {Date} */
  @date("datetime") datetime;

  /**@type {number | null} */
  @field("timeLeft") timeLeft;

  /**@type {number | null} */
  @field("maxTime") maxTime;

  /**@type {import("./CardModel").default} */
  @immutableRelation("cards", "cardUID") cardUID;
}