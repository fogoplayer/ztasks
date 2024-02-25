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

  it("lexes weekdays", () => {
    expect(lexDateString("Sunday")).toEqual([new LexemeValue(Lexeme.WEEKDAY, "sunday")]);
    expect(lexDateString("sun")).toEqual([new LexemeValue(Lexeme.WEEKDAY, "sunday")]);
    expect(lexDateString("su")).toEqual([new LexemeValue(Lexeme.WEEKDAY, "sunday")]);
    expect(lexDateString("monday")).toEqual([new LexemeValue(Lexeme.WEEKDAY, "monday")]);
    expect(lexDateString("Monday")).toEqual([new LexemeValue(Lexeme.WEEKDAY, "monday")]);
    expect(lexDateString("mon")).toEqual([new LexemeValue(Lexeme.WEEKDAY, "monday")]);
    expect(lexDateString("m")).toEqual([new LexemeValue(Lexeme.WEEKDAY, "monday")]);
    expect(lexDateString("tuesday")).toEqual([new LexemeValue(Lexeme.WEEKDAY, "tuesday")]);
    expect(lexDateString("tues")).toEqual([new LexemeValue(Lexeme.WEEKDAY, "tuesday")]);
    expect(lexDateString("tue")).toEqual([new LexemeValue(Lexeme.WEEKDAY, "tuesday")]);
    expect(lexDateString("tu")).toEqual([new LexemeValue(Lexeme.WEEKDAY, "tuesday")]);
    expect(lexDateString("wednesday")).toEqual([new LexemeValue(Lexeme.WEEKDAY, "wednesday")]);
    expect(lexDateString("wed")).toEqual([new LexemeValue(Lexeme.WEEKDAY, "wednesday")]);
    expect(lexDateString("w")).toEqual([new LexemeValue(Lexeme.WEEKDAY, "wednesday")]);
    expect(lexDateString("thursday")).toEqual([new LexemeValue(Lexeme.WEEKDAY, "thursday")]);
    expect(lexDateString("thurs")).toEqual([new LexemeValue(Lexeme.WEEKDAY, "thursday")]);
    expect(lexDateString("thur")).toEqual([new LexemeValue(Lexeme.WEEKDAY, "thursday")]);
    expect(lexDateString("thu")).toEqual([new LexemeValue(Lexeme.WEEKDAY, "thursday")]);
    expect(lexDateString("th")).toEqual([new LexemeValue(Lexeme.WEEKDAY, "thursday")]);
    expect(lexDateString("friday")).toEqual([new LexemeValue(Lexeme.WEEKDAY, "friday")]);
    expect(lexDateString("fri")).toEqual([new LexemeValue(Lexeme.WEEKDAY, "friday")]);
    expect(lexDateString("f")).toEqual([new LexemeValue(Lexeme.WEEKDAY, "friday")]);
    expect(lexDateString("saturday")).toEqual([new LexemeValue(Lexeme.WEEKDAY, "saturday")]);
    expect(lexDateString("sat")).toEqual([new LexemeValue(Lexeme.WEEKDAY, "saturday")]);
    expect(lexDateString("sa")).toEqual([new LexemeValue(Lexeme.WEEKDAY, "saturday")]);
  });

  it("lexes or's", () => {
    expect(lexDateString("or")).toEqual([new LexemeValue(Lexeme.OR)]);
    expect(lexDateString(",")).toEqual([new LexemeValue(Lexeme.OR)]);
    expect(lexDateString(", ")).toEqual([new LexemeValue(Lexeme.OR)]);
  });

  it("lexes at's", () => {
    expect(lexDateString("at")).toEqual([new LexemeValue(Lexeme.AT)]);
  });

  it("lexes time duration specifiers", () => {
    expect(lexDateString("minute")).toEqual([new LexemeValue(Lexeme.TIME_DURATION_SPECIFIER, "minute")]);
    expect(lexDateString("minutes")).toEqual([new LexemeValue(Lexeme.TIME_DURATION_SPECIFIER, "minute")]);
    expect(lexDateString("hour")).toEqual([new LexemeValue(Lexeme.TIME_DURATION_SPECIFIER, "hour")]);
    expect(lexDateString("hours")).toEqual([new LexemeValue(Lexeme.TIME_DURATION_SPECIFIER, "hour")]);
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

describe("Lexing Basic Dates and Times", () => {
  it("lexes absolute dates", () => {
    expect(lexDateString("Jan 4")).toEqual([new LexemeValue(Lexeme.MONTH, 1), new LexemeValue(Lexeme.NUMBER, 4)]);
    expect(lexDateString("2/4")).toEqual([new LexemeValue(Lexeme.NUMBER, 2), new LexemeValue(Lexeme.NUMBER, 4)]);
    expect(lexDateString("19")).toEqual([new LexemeValue(Lexeme.NUMBER, 19)]);
  });

  it("lexes absolute ", () => {
    expect(lexDateString("8:00")).toEqual([new LexemeValue(Lexeme.NUMBER, 8), new LexemeValue(Lexeme.NUMBER, 0)]);
    expect(lexDateString("8")).toEqual([new LexemeValue(Lexeme.NUMBER, 8)]);
  });
});

describe("Lexing Compound Days and Times", () => {
  it("lexes 'every' dates", () => {
    expect(lexDateString("every 2 weeks")).toEqual([
      new LexemeValue(Lexeme.FREQUENCY, "every"),
      new LexemeValue(Lexeme.NUMBER, 2),
      new LexemeValue(Lexeme.DAY_SPECIFIER, "week"),
    ]);
    expect(lexDateString("every other month")).toEqual([
      new LexemeValue(Lexeme.FREQUENCY, "every"),
      new LexemeValue(Lexeme.NUMBER, 2),
      new LexemeValue(Lexeme.DAY_SPECIFIER, "month"),
    ]);
    expect(lexDateString("every 3rd day")).toEqual([
      new LexemeValue(Lexeme.FREQUENCY, "every"),
      new LexemeValue(Lexeme.NUMBER, 3),
      new LexemeValue(Lexeme.DAY_SPECIFIER, "day"),
    ]);
    expect(lexDateString("every sunday")).toEqual([
      new LexemeValue(Lexeme.FREQUENCY, "every"),
      new LexemeValue(Lexeme.WEEKDAY, "sunday"),
    ]);
    expect(lexDateString("every 3 tuesdays")).toEqual([
      new LexemeValue(Lexeme.FREQUENCY, "every"),
      new LexemeValue(Lexeme.NUMBER, 3),
      new LexemeValue(Lexeme.WEEKDAY, "tuesday"),
    ]);
    expect(lexDateString("every other tuesday")).toEqual([
      new LexemeValue(Lexeme.FREQUENCY, "every"),
      new LexemeValue(Lexeme.NUMBER, 2),
      new LexemeValue(Lexeme.WEEKDAY, "tuesday"),
    ]);
  });

  it("lexes 'every' times", () => {
    expect(lexDateString("every 2 hours")).toEqual([
      new LexemeValue(Lexeme.FREQUENCY, "every"),
      new LexemeValue(Lexeme.NUMBER, 2),
      new LexemeValue(Lexeme.TIME_DURATION_SPECIFIER, "hour"),
    ]);
    expect(lexDateString("every other minute")).toEqual([
      new LexemeValue(Lexeme.FREQUENCY, "every"),
      new LexemeValue(Lexeme.NUMBER, 2),
      new LexemeValue(Lexeme.TIME_DURATION_SPECIFIER, "minute"),
    ]);
    expect(lexDateString("every 8:00")).toEqual([
      new LexemeValue(Lexeme.FREQUENCY, "every"),
      new LexemeValue(Lexeme.NUMBER, 8),
      new LexemeValue(Lexeme.NUMBER, 0),
    ]);
  });
});
