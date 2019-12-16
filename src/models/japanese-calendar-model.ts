import { IJapaneseCalendarModel } from "../interfaces/i-japanese-calendar-model";

export const calendars: IJapaneseCalendarModel[] = [
  {
    era: {
      short: "M",
      long: "明治"
    },
    startDate: new Date(1868, 9, 23),
    endDate: new Date(1912, 6, 30)
  },
  {
    era: {
      short: "T",
      long: "大正"
    },
    startDate: new Date(1912, 6, 30),
    endDate: new Date(1926, 11, 25)
  },
  {
    era: {
      short: "S",
      long: "昭和"
    },
    startDate: new Date(1926, 11, 25),
    endDate: new Date(1989, 0, 7)
  },
  {
    era: {
      short: "H",
      long: "平成"
    },
    startDate: new Date(1989, 0, 8),
    endDate: new Date(2019, 3, 30)
  },
  {
    era: {
      short: "R",
      long: "令和"
    },
    startDate: new Date(2019, 4, 1),
    endDate: null
  }
];
