import { LexemeValue } from "./date-lexer.mjs";

/*
// Grammar:
D = SINGLE | OFFSET DURATION_MULT TIME | FREQUENCY DURATION_MULT TIME BOUNDS
SINGLE = today | tomorrow | yesterday
OFFSET = in | Ɛ
FREQUENCY = every | next | previous
# other = 2, a = 1
DURATION_MULT = other | <number> | a | an | Ɛ
TIME = DAYSPECIFIER | TIMEDURATIONSPECIFIER AGO | DAYSPECIFIER AT TIMESPECIFIER
  DAYSPECIFIER =  WEEKDAY | DATE | day(s) | week(s) | month(s) | year(s)
    DATE = MONTHSTRING DAY | MONTHNUM / DAY | DAY
      # union the two months?
      MONTHSTRING = jan | mar | may | jun | july | aug | nov | dec | february | april | sept | october
      MONTHNUM = <number>
      DAY = <number> | two | five | eight | fourteen | third | sixth | ninth | fifteenth
    WEEKDAY = SUN | MON | TUE | WED | THU | FRI | SAT | WEEKDAY OR WEEKDAY
      SUN = sunday | sun | s
      MON = monday | mon | m
      TUE = tuesday | tue | tu
      WED = wednesday | wed | w
      THU = thursday | thu | th
      FRI = friday | fri | f
      SAT = saturday | sat | s
      OR = , | ", " | or
  TIMEDURATIONSPECIFIER =  minute(s) | hour(s)
  AT = at | Ɛ
  TIMESPECIFIER = HOUR | HOUR : MIN
    HOUR = <number>
    MIN = <number>
BOUNDS = STARTBOUNDS_WITH_TIME ENDBOUNDS_WITH_TIME
  STARTBOUNDS_WITH_TIME = STARTBOUNDS TIME | Ɛ
    STARTBOUNDS = after | starting | from
  ENDBOUNDS_WITH_TIME = ENDBOUNDS TIME | Ɛ
    ENDBOUNDS = until | ending | before | to
  EXCEPTIONS =  except TIME | except TIME OR TIME | Ɛ
  AGO = ago | Ɛ
*/

/**
 * @typedef {{
 *  (toParse: LexemeValue[]) : [any[], LexemeValue[]]
 * }} ParserHelper
 */

export function parseDateString(input) {
  return lexDateStringInner(input.split(/\s/g));
}

/** @type {ParserHelper} */
export function parseDateStringInner(input) {
  let tokens = input.split(/\s/g);
  lexSingle(tokens);
  return [[], []];
}

/** @type {ParserHelper} */
export function parseSingle(input) {
  return [[], []];
}

/** @type {ParserHelper} */
export function parseOffset(input) {
  return [[], []];
}

/** @type {ParserHelper} */
export function parseFrequency(input) {
  return [[], []];
}

/** @type {ParserHelper} */
export function parseDuration(input) {
  return [[], []];
}

/** @type {ParserHelper} */
export function parseTime(input) {
  return [[], []];
}

/** @type {ParserHelper} */
export function parseDaySpecifier(input) {
  return [[], []];
}

/** @type {ParserHelper} */
export function parseDate(input) {
  return [[], []];
}

/** @type {ParserHelper} */
export function parseMonthString(input) {
  return [[], []];
}

/** @type {ParserHelper} */
export function parseMonthNum(input) {
  return [[], []];
}

/** @type {ParserHelper} */
export function parseDay(input) {
  return [[], []];
}

/** @type {ParserHelper} */
export function parseWeekday(input) {
  return [[], []];
}

/** @type {ParserHelper} */
export function parseOr(input) {
  return [[], []];
}

/** @type {ParserHelper} */
export function parseTimeDurationSpecifier(input) {
  return [[], []];
}

/** @type {ParserHelper} */
export function parseAt(input) {
  return [[], []];
}

/** @type {ParserHelper} */
export function parseTimeSpecifier(input) {
  return [[], []];
}

/** @type {ParserHelper} */
export function parseBounds(input) {
  return [[], []];
}

/** @type {ParserHelper} */
export function parseStartBounds(input) {
  return [[], []];
}

/** @type {ParserHelper} */
export function parseEndBounds(input) {
  return [[], []];
}
