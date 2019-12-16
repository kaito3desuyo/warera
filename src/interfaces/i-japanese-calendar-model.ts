export interface IJapaneseCalendarModel {
  era: {
    short: string;
    long: string;
  };
  startDate: Date;
  endDate: Date | null;
}
