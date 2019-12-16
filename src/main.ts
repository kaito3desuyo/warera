import { IDateOfJapaneseCalendar } from "./interfaces/i-date-of-japanese-calendar";

function warera(date: IDateOfJapaneseCalendar | Date): string {
  return "hoge";
  /*
  if (date instanceof Date) {
    return Warera.createFromDate(date);
  } else {
    return Warera.create(date);
  }
   */
}

export default warera;
