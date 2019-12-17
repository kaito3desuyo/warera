# warera

A lightweight Javascript/Typescript library for mutual conversion Japanese Calendar Date and Gregorian Calendar Date

## Documentation

```
$ npm i warera
```

### Gregorian Calendar to Japanese Calendar

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
const date = warera({era: 'R', year: 1, month: 5, day: 1});
// or
const date = warera({era: '令和', year: 1, month: 5, day: 1});

console.log(date.getDate())
// is return value as Date class (Wed May 01 2019 00:00:00 GMT+0900)
```

## What's 'warera' ?

coined by 'wareki' (meaning Japanese Calendar) and 'era'
