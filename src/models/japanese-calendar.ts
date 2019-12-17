import { EJapaneseCalendar } from "../enums/japanese-calendar-era.enum";
import { IJapaneseCalendar } from "../interfaces/i-japanese-calendar";

export const japaneseCalendars: IJapaneseCalendar[] = [
  {
    era: {
      short: EJapaneseCalendar.MEIJI,
      long: "明治"
    },
    startDate: new Date(1868, 9, 23),
    endDate: new Date(1912, 6, 30)
  },
  {
    era: {
      short: EJapaneseCalendar.TAISHO,
      long: "大正"
    },
    startDate: new Date(1912, 6, 30),
    endDate: new Date(1926, 11, 25)
  },
  {
    era: {
      short: EJapaneseCalendar.SHOWA,
      long: "昭和"
    },
    startDate: new Date(1926, 11, 25),
    endDate: new Date(1989, 0, 7)
  },
  {
    era: {
      short: EJapaneseCalendar.HEISEI,
      long: "平成"
    },
    startDate: new Date(1989, 0, 8),
    endDate: new Date(2019, 3, 30)
  },
  {
    era: {
      short: EJapaneseCalendar.REIWA,
      long: "令和"
    },
    startDate: new Date(2019, 4, 1),
    endDate: null
  }
];
