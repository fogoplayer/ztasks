/** @typedef {{ [key: string]: string[] }} GrammarDict */

const GRAMMAR = `
# 
D = SINGLE | OFFSET DURATION_MULT TIME | FREQUENCY DURATION_MULT TIME BOUNDS
SINGLE = today | tomorrow | yesterday
OFFSET = in | Ɛ
FREQUENCY = every | next | previous
# other = 2, a = 1
DURATION_MULT = other | ${intRange(1, 10)} | a\\an | Ɛ
TIME = DAYSPECIFIER | TIMEDURATIONSPECIFIER | DAYSPECIFIER AT TIMESPECIFIER
  DAYSPECIFIER =  WEEKDAY | DATE | day(s)\\week(s)\\month(s)\\year(s)
      DATE = MONTHSTRING DAY | MONTHNUM / DAY | DAY
        # union the two months?
        MONTHSTRING = jan\\mar\\may\\jun\\july\\aug\\nov\\dec | february\\april\\sept\\october
        MONTHNUM = ${intRange(1, 12)}
        DAY = ${intRange(1, 28)} | two\\five\\eight\\fourteen | third\\sixth\\ninth\\fifteenth
    WEEKDAY = SUN\\MON\\TUE\\WED\\THU\\FRI\\SAT 
              # | WEEKDAY OR WEEKDAY
      SUN = sunday\\sun\\s
      MON = monday\\mon\\m
      TUE = tuesday\\tue\\tu
      WED = wednesday\\wed\\w
      THU = thursday\\thu\\th
      FRI = friday\\fri\\f
      SAT = saturday\\sat\\s
      OR = , | ", " | or
  TIMEDURATIONSPECIFIER =  minute(s)\\hour(s) 
  AT = at | Ɛ
  TIMESPECIFIER = HOUR | HOUR : MIN
    HOUR = ${intRange(0, 23)}
    MIN = ${intRange(0, 59)}
BOUNDS = STARTBOUNDS_WITH_TIME ENDBOUNDS_WITH_TIME
  STARTBOUNDS_WITH_TIME = STARTBOUNDS <time> | Ɛ
    STARTBOUNDS = after\\starting\\from
  ENDBOUNDS_WITH_TIME = ENDBOUNDS <time> | Ɛ
    ENDBOUNDS = until\\ending\\before\\ago\\except\\to
  

# Reminders
# before
# after
`;

function intRange(start, end, step = 1) {
  const range = [];
  for (let i = start; step > 0 ? i <= end : i >= end; i += step) range.push(i);
  return range.join("\\");
}

console.log(GRAMMAR);
// justDates();
// export function justDates() {
//   const grammar = parseGrammar(GRAMMAR);
//   substitute("DATE", grammar);
// }

generateDueDateStrings();

export function generateDueDateStrings() {
  const grammar = parseGrammar(GRAMMAR);
  substitute("D", grammar);
}

/**
 *
 * @param {string} grammar
 * @returns {GrammarDict}
 */
function parseGrammar(grammar) {
  /** @type {GrammarDict} */
  const definitions = {};

  // Parse the grammar
  grammar.split("\n").forEach((row) => {
    if (!row.trim()) return;
    if (row.trim()[0] === "#") return;
    let [key, joinedVal] = row.split("=");
    key = key.trim();
    const val = joinedVal.split("|").map((v) => v.trim());
    definitions[key] = val;
  });

  return definitions;
}

/**
 *
 * @param {string} toParse
 * @param {GrammarDict} grammar
 * @param {string} accumulator
 */
function substitute(toParse, grammar, accumulator = "") {
  const tokens = toParse.split(" ");

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    const picklist = token.split("\\");
    if (picklist.length > 1) {
      token = picklist.reduce((prev, curr, i) => {
        if (prev) return prev;
        if (Math.random() < 1 / picklist.length) return curr;
        if (i === picklist.length - 1) return curr;
      }, "");
    }
    if (grammar[token]) {
      const options = grammar[token];
      for (const option of options) {
        substitute([option, ...tokens.slice(i + 1)].join(" "), grammar, accumulator);
      }
      break; // we'll process the rest of the string in the recursive call
    } else {
      if (token === "Ɛ") continue;

      accumulator += token + " ";
    }
  }
  if (toParse === toParse.toLowerCase()) {
    console.log(accumulator);
    return;
  }
}
