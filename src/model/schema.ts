import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "decks",
      columns: [
        { name: "name", type: "string" },
        { name: "amountOfCards", type: "number" },
        { name: "imgURL", type: "string", isOptional: true },
        { name: "lastTimePracticed", type: "number", isOptional: true }
      ]
    }),
    tableSchema({
      name: "cards",
      columns: [
        { name: "deckUID", type: "string" },
        { name: "statement", type: "string" },
        { name: "answer", type: "string" },
        { name: "description", type: "string" },
        { name: "hint", type: "string", isOptional: true },
        { name: "lastTimePracticed", type: "number", isOptional: true },
        { name: "wasLastAnswerCorrect", type: "boolean", isOptional: true },
        { name: "timesRight", type: "number" },
        { name: "timesWrong", type: "number" },
      ]
    }),
    tableSchema({
      name: "cardsRecords",
      columns: [
        { name: "cardUID", type: "string" },
        { name: "answeredCorrect", type: "boolean" },
        { name: "wasHintUsed", type: "boolean" },
        { name: "datetime", type: "number" },
        { name: "timeLeft", type: "number", isOptional: true },
        { name: "maxTime", type: "number", isOptional: true },
      ]
    })
  ]
});