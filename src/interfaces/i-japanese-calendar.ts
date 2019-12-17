export interface IJapaneseCalendar {
  era: {
    long: string;
    short: string;
  };
  startDate: Date;
  endDate: Date | null;
}
