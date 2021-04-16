export const EJapaneseCalendar = {
  REIWA: "R",
  HEISEI: "H",
  SHOWA: "S",
  TAISHO: "T",
  MEIJI: "M",
} as const;
export type EJapaneseCalendar = typeof EJapaneseCalendar[keyof typeof EJapaneseCalendar];

export const EJapaneseCalendarKanji = {
  [EJapaneseCalendar.MEIJI]: "明治",
  [EJapaneseCalendar.TAISHO]: "大正",
  [EJapaneseCalendar.SHOWA]: "昭和",
  [EJapaneseCalendar.HEISEI]: "平成",
  [EJapaneseCalendar.REIWA]: "令和",
} as const;
export type EJapaneseCalendarKanji = typeof EJapaneseCalendarKanji[keyof typeof EJapaneseCalendarKanji];
