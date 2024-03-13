import { Model } from "@nozbe/watermelondb";
import { children, date, field, text } from "@nozbe/watermelondb/decorators";

export default class DeckModel extends Model{
  static table = "decks";
  static associations = {
    cards: { type: "has_many", foreignKey:  "deckUID" }
  };

  /**@type {string} */
  @text("name") name;

  /**@type {number} */
  @field("amountOfCards") amountOfCards;

  /**@type {string | null} */
  @text("imgURL") imgURL;

  /**@type {Date | null} */
  @date("lastTimePracticed") lastTimePracticed;

  /**@type {import("@nozbe/watermelondb").Query<import("./CardModel").default>} */
  @children("cards") cards;
}