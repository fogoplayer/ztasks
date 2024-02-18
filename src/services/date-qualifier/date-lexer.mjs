/*
// Grammar:
D = SINGLE | OFFSET DURATION_MULT TIME | FREQUENCY DURATION_MULT TIME BOUNDS
SINGLE = today | tomorrow | yesterday
OFFSET = in | Ɛ
FREQUENCY = every | next | previous
# other = 2, a = 1
DURATION_MULT = other | NUMBER | a | an | Ɛ
  NUMBER = <number>
TIME = DAYSPECIFIER | TIMEDURATIONSPECIFIER AGO | DAYSPECIFIER AT TIMESPECIFIER
  DAYSPECIFIER =  WEEKDAY | DATE | day(s) | week(s) | month(s) | year(s)
    DATE = MONTHSTRING DAY | MONTHNUM / DAY | DAY
      # union the two months?
      MONTHSTRING = jan | mar | may | jun | july | aug | nov | dec | february | april | sept | october
      MONTHNUM = NUMBER
      DAY = NUMBER | two | five | eight | fourteen | third | sixth | ninth | fifteenth
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
    HOUR = NUMBER
    MIN = NUMBER
BOUNDS = STARTBOUNDS_WITH_TIME ENDBOUNDS_WITH_TIME
  STARTBOUNDS_WITH_TIME = STARTBOUNDS TIME | Ɛ
    STARTBOUNDS = after | starting | from
  ENDBOUNDS_WITH_TIME = ENDBOUNDS TIME | Ɛ
    ENDBOUNDS = until | ending | before | ago | to
  EXCEPTIONS =  except TIME | except TIME OR TIME | Ɛ
  AGO = ago | Ɛ
*/

/** @typedef {(token: string) => string} LexemeProcessor */
/** @typedef {(token: string) => LexemeValue | null} DefaultHelper */

export const Lexeme = {
  SINGLE: Symbol("SINGLE"),
  OFFSET: Symbol("OFFSET"),
  FREQUENCY: Symbol("FREQUENCY"),
  DURATION_MULT: Symbol("DURATION_MULT"),
  NUMBER: Symbol("NUMBER"),
  DAY_SPECIFIER: Symbol("DAY_SPECIFIER"),
  MONTH: Symbol("MONTH"),
  DAY: Symbol("DAY"),
  WEEKDAY: Symbol("WEEKDAY"),
  OR: Symbol("OR"),
  TIME_DURATION_SPECIFIER: Symbol("TIME_DURATION_SPECIFIER"),
  AT: Symbol("AT"),
  HOUR: Symbol("HOUR"),
  MIN: Symbol("MIN"),
  START_BOUNDS: Symbol("START_BOUNDS"),
  END_BOUNDS: Symbol("END_BOUNDS"),
  EXCEPT: Symbol("EXCEPT"),
};

export class LexemeValue {
  /**
   *
   * @param {typeof Lexeme[keyof Lexeme]} type
   * @param {string | number | null} value
   */
  constructor(type, value = null) {
    this.type = type;
    this.value = value;
  }
}

/**
 *
 * @param {string} token
 * @returns {LexemeValue[]}
 */
export function lexDateString(token) {
  const tokens = token.toLowerCase().split(/\s/g);
  let lexemes = [];

  for (const token of tokens) {
    let lexeme;

    switch (token) {
      case "today":
      case "tomorrow":
      case "yesterday":
        lexeme = new LexemeValue(Lexeme.SINGLE, token);
        lexemes.push(lexeme);
        break;

      case "in":
        lexeme = new LexemeValue(Lexeme.OFFSET);
        lexemes.push(lexeme);
        break;

      case "every":
      case "next":
      case "previous":
        lexeme = new LexemeValue(Lexeme.FREQUENCY, token);
        lexemes.push(lexeme);
        break;

      case "other":
      case "a":
      case "an":
        lexeme = new LexemeValue(Lexeme.NUMBER, lexDurationMult(token));
        lexemes.push(lexeme);
        break;

      case "day":
      case "days":
      case "week":
      case "weeks":
      case "month":
      case "months":
      case "year":
      case "years":
        lexeme = new LexemeValue(Lexeme.DAY_SPECIFIER, removePlurals(token));
        lexemes.push(lexeme);
        break;

      case "sunday":
      case "sun":
      case "su":
      case "monday":
      case "mon":
      case "m":
      case "tuesday":
      case "tue":
      case "tu":
      case "wednesday":
      case "wed":
      case "w":
      case "thursday":
      case "thu":
      case "th":
      case "friday":
      case "fri":
      case "f":
      case "saturday":
      case "sat":
      case "sa":
        lexeme = new LexemeValue(Lexeme.WEEKDAY, lexWeekday(token));
        lexemes.push(lexeme);
        break;

      case "minute":
      case "minutes":
      case "hour":
      case "hours":
        lexeme = new LexemeValue(Lexeme.TIME_DURATION_SPECIFIER, removePlurals(token));
        lexemes.push(lexeme);
        break;

      case "at":
        lexeme = new LexemeValue(Lexeme.AT);
        lexemes.push(lexeme);
        break;

      case "after":
      case "starting":
      case "from":
        lexeme = new LexemeValue(Lexeme.START_BOUNDS);
        lexemes.push(lexeme);
        break;

      case "until":
      case "ending":
      case "before":
      case "to":
        lexeme = new LexemeValue(Lexeme.END_BOUNDS);
        lexemes.push(lexeme);
        break;

      case "except":
        lexeme = new LexemeValue(Lexeme.EXCEPT);
        lexemes.push(lexeme);
        break;

      default:
        // numbers
        lexeme = lexDefault(token);
        // months
        // numbers
        break;
    }

    lexemes.push(lexeme);
  }

  return lexemes;
}

/** @type {LexemeProcessor} */
export function lexDurationMult(token) {
  switch (token) {
    case "a":
    case "an":
      return "1";

    case "other":
      return "2";

    default:
      return token;
  }
}

/** @type {LexemeProcessor} */
export function removePlurals(token) {
  const standardizedToken = token[token.length - 1] === "s" ? token.slice(0, -1) : token;
  return standardizedToken;
}

/** @type {LexemeProcessor} */
export function lexWeekday(token) {
  switch (token) {
    case "sunday":
    case "sun":
    case "su":
      return "sunday";

    case "monday":
    case "mon":
    case "m":
      return "monday";

    case "tuesday":
    case "tue":
    case "tu":
      return "tuesday";

    case "wednesday":
    case "wed":
    case "w":
      return "wednesday";

    case "thursday":
    case "thu":
    case "th":
      return "thursday";

    case "friday":
    case "fri":
    case "f":
      return "friday";

    case "saturday":
    case "sat":
    case "sa":
      return "saturday";

    default:
      throw new Error(`Lexer Error: ${token}`);
  }
}

/** @type {(token: string) => LexemeValue} */
export function lexDefault(token) {
  const lexeme = lexNumber(token) || lexMonth(token);
  if (lexeme) return lexeme;
  throw new Error();
}

/** @type {DefaultHelper} */
export function lexNumber(token) {
  const parsedInt = parseInt(token);
  if (!isNaN(parsedInt)) {
    return new LexemeValue(Lexeme.NUMBER, parsedInt);
  }

  switch (token) {
    case "one":
    case "first":
      return new LexemeValue(Lexeme.NUMBER, 1);

    case "two":
    case "second":
      return new LexemeValue(Lexeme.NUMBER, 2);

    case "three":
    case "third":
      return new LexemeValue(Lexeme.NUMBER, 3);

    case "four":
    case "fourth":
      return new LexemeValue(Lexeme.NUMBER, 4);

    case "five":
    case "fifth":
      return new LexemeValue(Lexeme.NUMBER, 5);

    case "six":
    case "sixth":
      return new LexemeValue(Lexeme.NUMBER, 6);

    case "seven":
    case "seventh":
      return new LexemeValue(Lexeme.NUMBER, 7);

    case "eight":
    case "eighth":
      return new LexemeValue(Lexeme.NUMBER, 8);

    case "nine":
    case "ninth":
      return new LexemeValue(Lexeme.NUMBER, 9);

    case "ten":
    case "tenth":
      return new LexemeValue(Lexeme.NUMBER, 10);

    case "eleven":
    case "eleventh":
      return new LexemeValue(Lexeme.NUMBER, 11);

    case "twelve":
    case "twelfth":
      return new LexemeValue(Lexeme.NUMBER, 12);

    case "thirteen":
    case "thirteenth":
      return new LexemeValue(Lexeme.NUMBER, 13);

    case "fourteen":
    case "fourteenth":
      return new LexemeValue(Lexeme.NUMBER, 14);

    case "fifteen":
    case "fifteenth":
      return new LexemeValue(Lexeme.NUMBER, 15);

    case "sixteen":
    case "sixteenth":
      return new LexemeValue(Lexeme.NUMBER, 16);

    case "seventeen":
    case "seventeenth":
      return new LexemeValue(Lexeme.NUMBER, 17);

    case "eighteen":
    case "eighteenth":
      return new LexemeValue(Lexeme.NUMBER, 18);

    case "nineteen":
    case "nineteenth":
      return new LexemeValue(Lexeme.NUMBER, 19);

    case "twenty":
    case "twentieth":
      return new LexemeValue(Lexeme.NUMBER, 20);

    case "twenty-one":
    case "twenty-first":
      return new LexemeValue(Lexeme.NUMBER, 21);

    case "twenty-two":
    case "twenty-second":
      return new LexemeValue(Lexeme.NUMBER, 22);

    case "twenty-three":
    case "twenty-third":
      return new LexemeValue(Lexeme.NUMBER, 23);

    case "twenty-four":
    case "twenty-fourth":
      return new LexemeValue(Lexeme.NUMBER, 24);

    case "twenty-five":
    case "twenty-fifth":
      return new LexemeValue(Lexeme.NUMBER, 25);

    case "twenty-six":
    case "twenty-sixth":
      return new LexemeValue(Lexeme.NUMBER, 26);

    case "twenty-seven":
    case "twenty-seventh":
      return new LexemeValue(Lexeme.NUMBER, 27);

    case "twenty-eight":
    case "twenty-eighth":
      return new LexemeValue(Lexeme.NUMBER, 28);

    case "twenty-nine":
    case "twenty-ninth":
      return new LexemeValue(Lexeme.NUMBER, 29);

    case "thirty":
    case "thirtieth":
      return new LexemeValue(Lexeme.NUMBER, 30);

    case "thirty-one":
    case "thirty-first":
      return new LexemeValue(Lexeme.NUMBER, 31);

    case "thirty-two":
    case "thirty-second":
      return new LexemeValue(Lexeme.NUMBER, 32);

    case "thirty-three":
    case "thirty-third":
      return new LexemeValue(Lexeme.NUMBER, 33);

    case "thirty-four":
    case "thirty-fourth":
      return new LexemeValue(Lexeme.NUMBER, 34);

    case "thirty-five":
    case "thirty-fifth":
      return new LexemeValue(Lexeme.NUMBER, 35);

    case "thirty-six":
    case "thirty-sixth":
      return new LexemeValue(Lexeme.NUMBER, 36);

    case "thirty-seven":
    case "thirty-seventh":
      return new LexemeValue(Lexeme.NUMBER, 37);

    case "thirty-eight":
    case "thirty-eighth":
      return new LexemeValue(Lexeme.NUMBER, 38);

    case "thirty-nine":
    case "thirty-ninth":
      return new LexemeValue(Lexeme.NUMBER, 39);

    case "forty":
    case "fortieth":
      return new LexemeValue(Lexeme.NUMBER, 40);

    case "forty-one":
    case "forty-first":
      return new LexemeValue(Lexeme.NUMBER, 41);

    case "forty-two":
    case "forty-second":
      return new LexemeValue(Lexeme.NUMBER, 42);

    case "forty-three":
    case "forty-third":
      return new LexemeValue(Lexeme.NUMBER, 43);

    case "forty-four":
    case "forty-fourth":
      return new LexemeValue(Lexeme.NUMBER, 44);

    case "forty-five":
    case "forty-fifth":
      return new LexemeValue(Lexeme.NUMBER, 45);

    case "forty-six":
    case "forty-sixth":
      return new LexemeValue(Lexeme.NUMBER, 46);

    case "forty-seven":
    case "forty-seventh":
      return new LexemeValue(Lexeme.NUMBER, 47);

    case "forty-eight":
    case "forty-eighth":
      return new LexemeValue(Lexeme.NUMBER, 48);

    case "forty-nine":
    case "forty-ninth":
      return new LexemeValue(Lexeme.NUMBER, 49);

    case "fifty":
    case "fiftieth":
      return new LexemeValue(Lexeme.NUMBER, 50);

    case "fifty-one":
    case "fifty-first":
      return new LexemeValue(Lexeme.NUMBER, 51);

    case "fifty-two":
    case "fifty-second":
      return new LexemeValue(Lexeme.NUMBER, 52);

    case "fifty-three":
    case "fifty-third":
      return new LexemeValue(Lexeme.NUMBER, 53);

    case "fifty-four":
    case "fifty-fourth":
      return new LexemeValue(Lexeme.NUMBER, 54);

    case "fifty-five":
    case "fifty-fifth":
      return new LexemeValue(Lexeme.NUMBER, 55);

    case "fifty-six":
    case "fifty-sixth":
      return new LexemeValue(Lexeme.NUMBER, 56);

    case "fifty-seven":
    case "fifty-seventh":
      return new LexemeValue(Lexeme.NUMBER, 57);

    case "fifty-eight":
    case "fifty-eighth":
      return new LexemeValue(Lexeme.NUMBER, 58);

    case "fifty-nine":
    case "fifty-ninth":
      return new LexemeValue(Lexeme.NUMBER, 59);

    default:
      return null;
  }
}

/** @type {DefaultHelper} */
export function lexMonth(token) {
  switch (token) {
    case "jan":
    case "january":
      return new LexemeValue(Lexeme.MONTH, 1);

    case "feb":
    case "february":
      return new LexemeValue(Lexeme.MONTH, 2);

    case "mar":
    case "march":
      return new LexemeValue(Lexeme.MONTH, 3);

    case "apr":
    case "april":
      return new LexemeValue(Lexeme.MONTH, 4);

    case "may":
      return new LexemeValue(Lexeme.MONTH, 5);

    case "jun":
    case "june":
      return new LexemeValue(Lexeme.MONTH, 6);

    case "jul":
    case "july":
      return new LexemeValue(Lexeme.MONTH, 7);

    case "aug":
    case "august":
      return new LexemeValue(Lexeme.MONTH, 8);

    case "sep":
    case "sept":
    case "september":
      return new LexemeValue(Lexeme.MONTH, 9);

    case "oct":
    case "october":
      return new LexemeValue(Lexeme.MONTH, 10);

    case "nov":
    case "november":
      return new LexemeValue(Lexeme.MONTH, 11);

    case "dec":
    case "december":
      return new LexemeValue(Lexeme.MONTH, 12);

    default:
      return null;
  }
}

/** @type {LexemeProcessor} */
export function lexBounds(token) {
  return token;
}

/** @type {LexemeProcessor} */
export function lexStartBounds(token) {
  return token;
}

/** @type {LexemeProcessor} */
export function lexEndBounds(token) {
  return token;
}
