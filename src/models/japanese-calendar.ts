import {
  EJapaneseCalendar,
  EJapaneseCalendarKanji,
} from "../enums/japanese-calendar-era.enum";
import { IJapaneseCalendar } from "../interfaces/i-japanese-calendar";

export const japaneseCalendars: IJapaneseCalendar[] = [
  {
    era: {
      short: EJapaneseCalendar.MEIJI,
      long: EJapaneseCalendarKanji[EJapaneseCalendar.MEIJI],
    },
    startDate: new Date(1868, 9, 23),
    endDate: new Date(1912, 6, 30),
  },
  {
    era: {
      short: EJapaneseCalendar.TAISHO,
      long: EJapaneseCalendarKanji[EJapaneseCalendar.TAISHO],
    },
    startDate: new Date(1912, 6, 30),
    endDate: new Date(1926, 11, 25),
  },
  {
    era: {
      short: EJapaneseCalendar.SHOWA,
      long: EJapaneseCalendarKanji[EJapaneseCalendar.SHOWA],
    },
    startDate: new Date(1926, 11, 25),
    endDate: new Date(1989, 0, 7),
  },
  {
    era: {
      short: EJapaneseCalendar.HEISEI,
      long: EJapaneseCalendarKanji[EJapaneseCalendar.HEISEI],
    },
    startDate: new Date(1989, 0, 8),
    endDate: new Date(2019, 3, 30),
  },
  {
    era: {
      short: EJapaneseCalendar.REIWA,
      long: EJapaneseCalendarKanji[EJapaneseCalendar.REIWA],
    },
    startDate: new Date(2019, 4, 1),
    endDate: null,
  },
];
