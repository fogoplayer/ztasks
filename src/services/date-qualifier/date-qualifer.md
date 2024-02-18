## CFG

TODO: Grammar generator
TODO: Parser test suite

```
D = SINGLE | FREQUENCY
SINGLE = today | tomorrow | yesterday
FREQUENCY = every DURATION_MULT TIME | next DURATION_MULT TIME | in DURATION_MULT TIME | Ɛ DURATION_MULT TIME
DURATION_MULT = other | <number> | a | an | Ɛ
TIME = DURATION | WEEKDAY
DURATION = minute(s) | hour(s) | day(s) | week(s) | month(s) | year(s)
WEEKDAY = SUN | MON | TUE | WED | THU | FRI | SAT | WEEKDAY OR WEEKDAY
SUN = sunday | sun | s
MON = monday | mon | m
TUE = tuesday | tue | tu
WED = wednesday | wed | w
THU = thursday | thu | th
FRI = friday | fri | f
SAT = saturday | sat | s
OR = , | ", " | or
```

<!--
%%{init: {"flowchart": {"defaultRenderer": "elk"}} }%%
-->

## Due Dates

after
starting
until
ending
before
ago
from_now
dateObj

```mermaid
flowchart TD
  D-->every
  D-->in
  D-->next
  D-->fepsilon

  %% f frequency
  fepsilon[Ɛ]
  next[next\last]

  every-->other
  every-->mepsilon
  every-.->a
  every-->number
  in-->a
  in-->number
  next-->mepsilon
  fepsilon-->number
  fepsilon-->mepsilon

  %% m multiplicity
  mepsilon[Ɛ]
  a["a \ an"]

  other-->mod
  other-->m2epsilon
  mepsilon-->mod
  mepsilon-->m2epsilon
  number-->mod
  number-->m2epsilon
  a-->mod
  a-.->m2epsilon

  %% m2 modifiers
  mod["first \ last \ nth"]
  m2epsilon[Ɛ]

  mod-->duration
  mod-->weekdays
  m2epsilon-->duration
  m2epsilon-->weekdays

  %% t time?
  duration["minute(s) \ hour(s) \ day(s) \ week(s) \ month(s) \ year(s)"]
  weekdays["S\M\T\W\T\F\S (plurals, other forms)"]
  %% duration-->before
  %% duration-->bepsilon
  %% weekdays-->before
  %% weekdays-->bepsilon

  %% b before?
  %% before["before"]
  %% bepsilon[Ɛ]
```

## Reminders

```mermaid
flowchart TD
  R-->S

  S-->before
  S-->bepsilon

  %% b before?
  bepsilon[Ɛ]

```
