# warera

A lightweight Javascript/Typescript library for mutual conversion Japanese Calendar Date and Gregorian Calendar Date

## Documentation

```
$ npm i warera
```

### Gregorian Calendar to Japanese Calendar

```
date.getJapaneseCalendarDate()
```

#### Example

```
const date = warera(new Date(2019, 4, 1)); // 2019-05-01

console.log(date.getJapaneseCalendarDate());
//  is return value as...
//
//  {
//      era: {
//          long: '令和',
//          short: 'R
//      },
//      year: 1,
//      month: 5,
//      day: 1
//  }
```

### Japanese Calendar to Gregorian Calendar

```
getDate()
```

#### Example

```
const date = warera({era: 'R', year: 1, month: 5, day: 1});
// or
const date = warera({era: '令和', year: 1, month: 5, day: 1});

console.log(date.getDate())
// is return value as Date class (Wed May 01 2019 00:00:00 GMT+0900)
```

### Formatter

```
date.format(pattern: string, replaceToGanForFirstYear: boolean);
```

#### Example

```
const date = warera({era: 'R', year: 1, month: 5, day: 1});
date.format('WWWkky年kkM月kkD日') // '令和元年五月一日'
```

#### Arguments

##### 'pattern'

| Input | Example | Description                                              |
| :---- | :------ | :------------------------------------------------------- |
| YYYY  | 2019    | Gregorian calendar 4 digit year                          |
| WWW   | 令和    | Japanese calendar era (Full name of kanji)               |
| W     | R       | Japanese calendar era (Alphabet)                         |
| kky   | 二十一  | Japanese calendar year (Japanese numeral long)           |
| ky    | 二一    | Japanese calendar year (Japanese numeral short)          |
| ddy   | 弐拾壱  | Japanese calendar year (Japanese numeral long old char)  |
| dy    | 弐壱    | Japanese calendar year (Japanese numeral short old char) |
| yy    | 01      | Japanese calendar year (Arabic numeral padded by 0)      |
| y     | 1       | Japanese calendar year (Arabic numeral)                  |
| kkM   | 二十一  | Month (Japanese numeral long)                            |
| kM    | 二一    | Month (Japanese numeral short)                           |
| ddM   | 弐拾壱  | Month (Japanese numeral long old char)                   |
| dM    | 弐壱    | Month (Japanese numeral short old char)                  |
| MM    | 01      | Month (Arabic numeral padded by 0)                       |
| M     | 1       | Month (Arabic numeral)                                   |
| kkD   | 二十一  | Day (Japanese numeral long)                              |
| kD    | 二一    | Day (Japanese numeral short)                             |
| ddD   | 弐拾壱  | Day (Japanese numeral long old char)                     |
| dD    | 弐壱    | Day (Japanese numeral short old char)                    |
| DD    | 01      | Day (Arabic numeral padded by 0)                         |
| D     | 1       | Day (Arabic numeral)                                     |

##### 'replaceToGanForFirstYear'

In Japan, the first year when the era begins is sometimes called the "元年".  
"元年" meaning "first year".

When 'replaceToGanForFirstYear' true,

```
const date = warera({era: 'R', year: 1, month: 5, day: 1});
date.format('WWWkky年kkM月kkD日') // '令和元年五月一日'
```

When false,

```
const date = warera({era: 'R', year: 1, month: 5, day: 1});
date.format('WWWkky年kkM月kkD日') // '令和一年五月一日'
```

## What's 'warera' ?

'warera' is coined word by 'wareki' (meaning Japanese Calendar) and 'era'!
