/* global describe, it, expect */
import { Lexeme, LexemeValue, lexDateString } from "../src/services/date-qualifier/date-lexer.mjs";

describe("Lexing Base Data Types", () => {
  it("lexes singles", () => {
    expect(lexDateString("today")).toEqual([new LexemeValue(Lexeme.SINGLE, "today")]);
    expect(lexDateString("tomorrow")).toEqual([new LexemeValue(Lexeme.SINGLE, "tomorrow")]);
    expect(lexDateString("yesterday")).toEqual([new LexemeValue(Lexeme.SINGLE, "yesterday")]);
  });

  it("lexes offsets", () => {
    expect(lexDateString("in")).toEqual([new LexemeValue(Lexeme.OFFSET, "in")]);
  });

  it("lexes frequencies", () => {
    expect(lexDateString("every")).toEqual([new LexemeValue(Lexeme.FREQUENCY, "every")]);
    expect(lexDateString("next")).toEqual([new LexemeValue(Lexeme.FREQUENCY, "next")]);
    expect(lexDateString("previous")).toEqual([new LexemeValue(Lexeme.FREQUENCY, "previous")]);
  });

  it("lexes numbers", () => {
    expect(lexDateString("1")).toEqual([new LexemeValue(Lexeme.NUMBER, 1)]);
    expect(lexDateString("two")).toEqual([new LexemeValue(Lexeme.NUMBER, 2)]);
    expect(lexDateString("third")).toEqual([new LexemeValue(Lexeme.NUMBER, 3)]);

    expect(lexDateString("forty-two")).toEqual([new LexemeValue(Lexeme.NUMBER, 42)]);
    expect(lexDateString("42")).toEqual([new LexemeValue(Lexeme.NUMBER, 42)]);

    expect(lexDateString("a")).toEqual([new LexemeValue(Lexeme.NUMBER, 1)]);
    expect(lexDateString("an")).toEqual([new LexemeValue(Lexeme.NUMBER, 1)]);
    expect(lexDateString("other")).toEqual([new LexemeValue(Lexeme.NUMBER, 2)]);
  });

  it("lexes day specifiers", () => {
    expect(lexDateString("day")).toEqual([new LexemeValue(Lexeme.DAY_SPECIFIER, "day")]);
    expect(lexDateString("days")).toEqual([new LexemeValue(Lexeme.DAY_SPECIFIER, "day")]);
    expect(lexDateString("week")).toEqual([new LexemeValue(Lexeme.DAY_SPECIFIER, "week")]);
    expect(lexDateString("weeks")).toEqual([new LexemeValue(Lexeme.DAY_SPECIFIER, "week")]);
    expect(lexDateString("month")).toEqual([new LexemeValue(Lexeme.DAY_SPECIFIER, "month")]);
    expect(lexDateString("months")).toEqual([new LexemeValue(Lexeme.DAY_SPECIFIER, "month")]);
    expect(lexDateString("year")).toEqual([new LexemeValue(Lexeme.DAY_SPECIFIER, "year")]);
    expect(lexDateString("years")).toEqual([new LexemeValue(Lexeme.DAY_SPECIFIER, "year")]);
  });

  it("lexes months", () => {
    expect(lexDateString("january")).toEqual([new LexemeValue(Lexeme.MONTH, 1)]);
    expect(lexDateString("jan")).toEqual([new LexemeValue(Lexeme.MONTH, 1)]);
    expect(lexDateString("september")).toEqual([new LexemeValue(Lexeme.MONTH, 9)]);
    expect(lexDateString("sept")).toEqual([new LexemeValue(Lexeme.MONTH, 9)]);
    expect(lexDateString("sep")).toEqual([new LexemeValue(Lexeme.MONTH, 9)]);
  });

  it("lexes or's", () => {
    expect(lexDateString("or")).toEqual([new LexemeValue(Lexeme.OR)]);
    expect(lexDateString(",")).toEqual([new LexemeValue(Lexeme.OR)]);
    expect(lexDateString(", ")).toEqual([new LexemeValue(Lexeme.OR)]);
  });

  it("lexes time duration specifiers", () => {
    expect(lexDateString("minute")).toEqual([new LexemeValue(Lexeme.TIME_DURATION_SPECIFIER, "minute")]);
    expect(lexDateString("minutes")).toEqual([new LexemeValue(Lexeme.TIME_DURATION_SPECIFIER, "minute")]);
    expect(lexDateString("hour")).toEqual([new LexemeValue(Lexeme.TIME_DURATION_SPECIFIER, "hour")]);
    expect(lexDateString("hours")).toEqual([new LexemeValue(Lexeme.TIME_DURATION_SPECIFIER, "hour")]);
  });

  it("lexes at's", () => {
    expect(lexDateString("at")).toEqual([new LexemeValue(Lexeme.AT)]);
  });

  it("lexes start bounds", () => {
    expect(lexDateString("after")).toEqual([new LexemeValue(Lexeme.START_BOUNDS)]);
    expect(lexDateString("starting")).toEqual([new LexemeValue(Lexeme.START_BOUNDS)]);
    expect(lexDateString("from")).toEqual([new LexemeValue(Lexeme.START_BOUNDS)]);
  });

  it("lexes end bounds", () => {
    expect(lexDateString("until")).toEqual([new LexemeValue(Lexeme.END_BOUNDS)]);
    expect(lexDateString("ending")).toEqual([new LexemeValue(Lexeme.END_BOUNDS)]);
    expect(lexDateString("before")).toEqual([new LexemeValue(Lexeme.END_BOUNDS)]);
    expect(lexDateString("ago")).toEqual([new LexemeValue(Lexeme.END_BOUNDS)]);
    expect(lexDateString("to")).toEqual([new LexemeValue(Lexeme.END_BOUNDS)]);
  });

  it("lexes exceptions", () => {
    expect(lexDateString("except")).toEqual([new LexemeValue(Lexeme.EXCEPT)]);
  });
});

describe("Lexing Date Qualifiers", () => {
  it("lexes basic recurring events", () => {
    expect(lexDateString("every day")).toEqual([
      new LexemeValue(Lexeme.FREQUENCY, "every"),
      new LexemeValue(Lexeme.DAY_SPECIFIER, "day"),
    ]);
    expect(lexDateString("every other day")).toEqual([
      new LexemeValue(Lexeme.FREQUENCY, "every"),
      new LexemeValue(Lexeme.NUMBER, 2),
      new LexemeValue(Lexeme.DAY_SPECIFIER, "day"),
    ]);
    expect(lexDateString("every 2 days")).toEqual([
      new LexemeValue(Lexeme.FREQUENCY, "every"),
      new LexemeValue(Lexeme.NUMBER, 2),
      new LexemeValue(Lexeme.DAY_SPECIFIER, "day"),
    ]);
    expect(lexDateString("every 3 months")).toEqual([
      new LexemeValue(Lexeme.FREQUENCY, "every"),
      new LexemeValue(Lexeme.NUMBER, 3),
      new LexemeValue(Lexeme.DAY_SPECIFIER, "month"),
    ]);
  });
});
