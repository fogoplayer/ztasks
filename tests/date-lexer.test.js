/* global describe, it, expect */
import { Lexeme, LexemeValue, lexDateString } from "../src/services/date-qualifier/date-lexer.mjs";

// describe("Linting Base Data Types", () => {
//   it("lexes singles", () => {
//     expect(lexDateString("today")).toEqual([new LexemeValue(Lexeme.SINGLE, "today")]);
//     expect(lexDateString("tomorrow")).toEqual([new LexemeValue(Lexeme.SINGLE, "tomorrow")]);
//     expect(lexDateString("yesterday")).toEqual([new LexemeValue(Lexeme.SINGLE, "yesterday")]);
//   });

//   it("lexes offsets", () => {
//     expect(lexDateString("in")).toEqual([new LexemeValue(Lexeme.OFFSET, "in")]);
//   });

//   it("lexes frequencies", () => {
//     expect(lexDateString("every")).toEqual([new LexemeValue(Lexeme.FREQUENCY, "every")]);
//     expect(lexDateString("next")).toEqual([new LexemeValue(Lexeme.FREQUENCY, "next")]);
//     expect(lexDateString("previous")).toEqual([new LexemeValue(Lexeme.FREQUENCY, "previous")]);
//   });

//   it("lexes numbers", () => {
//     expect(lexDateString("1")).toEqual([new LexemeValue(Lexeme.NUMBER, 1)]);
//     expect(lexDateString("two")).toEqual([new LexemeValue(Lexeme.NUMBER, 2)]);
//     expect(lexDateString("third")).toEqual([new LexemeValue(Lexeme.NUMBER, 3)]);
//   });

//   it("lexes months", () => {
//     expect(lexDateString("january")).toEqual([new LexemeValue(Lexeme.MONTH, 1)]);
//     expect(lexDateString("jan")).toEqual([new LexemeValue(Lexeme.MONTH, 1)]);
//     expect(lexDateString("september")).toEqual([new LexemeValue(Lexeme.MONTH, 9)]);
//     expect(lexDateString("sept")).toEqual([new LexemeValue(Lexeme.MONTH, 9)]);
//     expect(lexDateString("sep")).toEqual([new LexemeValue(Lexeme.MONTH, 9)]);
//   });
// });

assertEqual(lexDateString("today"), [new LexemeValue(Lexeme.SINGLE, "today")]);
assertEqual(lexDateString("tomorrow"), [new LexemeValue(Lexeme.SINGLE, "tomorrow")]);
assertEqual(lexDateString("yesterday"), [new LexemeValue(Lexeme.SINGLE, "yesterday")]);

assertEqual(lexDateString("in"), [new LexemeValue(Lexeme.OFFSET, "in")]);

assertEqual(lexDateString("every"), [new LexemeValue(Lexeme.FREQUENCY, "every")]);
assertEqual(lexDateString("next"), [new LexemeValue(Lexeme.FREQUENCY, "next")]);
assertEqual(lexDateString("previous"), [new LexemeValue(Lexeme.FREQUENCY, "previous")]);

assertEqual(lexDateString("1"), [new LexemeValue(Lexeme.NUMBER, 1)]);
assertEqual(lexDateString("two"), [new LexemeValue(Lexeme.NUMBER, 2)]);
assertEqual(lexDateString("third"), [new LexemeValue(Lexeme.NUMBER, 3)]);

assertEqual(lexDateString("january"), [new LexemeValue(Lexeme.MONTH, 1)]);
assertEqual(lexDateString("jan"), [new LexemeValue(Lexeme.MONTH, 1)]);
assertEqual(lexDateString("september"), [new LexemeValue(Lexeme.MONTH, 9)]);

assertEqual(lexDateString("sep"), [new LexemeValue(Lexeme.MONTH, 9)]);

function assertEqual(a, b) {
  if (JSON.stringify(a) !== JSON.stringify(b)) console.log("mismatch:", a, b);
}
