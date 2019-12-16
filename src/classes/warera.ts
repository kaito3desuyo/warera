import { IDateOfJapaneseCalendar } from "../interfaces/i-date-of-japanese-calendar";
import { IJapaneseCalendarModel } from "../interfaces/i-japanese-calendar-model";
import { calendars } from "../models/japanese-calendar-model";

export class Warera {
  private _value: IDateOfJapaneseCalendar;

  private constructor(value: IDateOfJapaneseCalendar) {
    if (!Warera.isValidDateOfJapaneseCalendar(value)) {
      throw new Error("正しい和暦による日付ではありません");
    }
    this._value = value;
  }

  static create(date: IDateOfJapaneseCalendar): Warera {
    return new Warera(date);
  }

  /**
   * Dateクラスから和暦によるクラスを生成
   * @param date
   */
  static createFromDate(date: Date): Warera {
    const dateOfJapaneseCalendar = Warera._parseDateToDateOfJapaneseCalendar(
      date
    );

    if (!dateOfJapaneseCalendar) {
      throw new Error("対応範囲外の日付です");
    }

    return new Warera(dateOfJapaneseCalendar);
  }

  /**
   * 正しい和暦による日付か？
   * @param date
   */
  static isValidDateOfJapaneseCalendar(date: IDateOfJapaneseCalendar): boolean {
    return (
      Warera._isValidYear(date) &&
      Warera._isValidMonth(date) &&
      Warera._isValidDay(date) &&
      Warera._isValidDateInJapaneseCalendar(date)
    );
  }

  /**
   * 正しい年か？
   * @param date
   */
  private static _isValidYear(date: IDateOfJapaneseCalendar): boolean {
    return date.year >= 1;
  }

  /**
   * 正しい月か？
   * @param date
   */
  private static _isValidMonth(date: IDateOfJapaneseCalendar): boolean {
    return date.month >= 1 && date.month <= 12;
  }

  /**
   * 正しい日か？
   * @param date
   */
  private static _isValidDay(date: IDateOfJapaneseCalendar): boolean {
    return date.day >= 1 && date.day <= 31;
  }

  /**
   * 和暦カレンダーの中に存在する日付か？
   * @param date
   */
  private static _isValidDateInJapaneseCalendar(
    date: IDateOfJapaneseCalendar
  ): boolean {
    const calendar = Warera._findCalendarByDateOfJapaneseCalendar(date);
    if (!calendar) {
      return false;
    }

    const startDate = calendar.startDate;
    const checkDate = Warera._parseDateOfJapaneseCalendarToDate(date);
    const endDate = calendar.endDate;

    if (!checkDate) {
      return false;
    }

    if (checkDate < startDate || (endDate && checkDate > endDate)) {
      return false;
    }

    return true;
  }

  /**
   * 和暦カレンダーから年号を指定して取得する
   * @param date
   */
  private static _findCalendarByDateOfJapaneseCalendar(
    date: IDateOfJapaneseCalendar
  ): IJapaneseCalendarModel | null {
    if (!date.era || !date.year || !date.month || !date.day) {
      return null;
    }
    return calendars.find(o => o.era.short === date.era) || null;
  }

  /**
   * 和暦による日付からDateクラスへ変換する
   * @param date
   */
  private static _parseDateOfJapaneseCalendarToDate(
    date: IDateOfJapaneseCalendar
  ): Date | null {
    const calendar = Warera._findCalendarByDateOfJapaneseCalendar(date);
    if (!calendar) {
      return null;
    }

    return new Date(
      calendar.startDate.getFullYear() + date.year - 1,
      date.month - 1,
      date.day
    );
  }

  /**
   * Dateクラスから和暦による日付に変換する
   * @param date
   */
  private static _parseDateToDateOfJapaneseCalendar(
    date: Date
  ): IDateOfJapaneseCalendar | null {
    const targetDate = date;

    const calendar = calendars.find(o => {
      return (
        (!o.startDate || o.startDate <= targetDate) &&
        (!o.endDate || targetDate <= o.endDate)
      );
    });

    if (!calendar) {
      return null;
    }

    return {
      era: calendar.era.short,
      year: targetDate.getFullYear() - calendar.startDate.getFullYear() + 1,
      month: targetDate.getMonth() + 1,
      day: targetDate.getDate()
    };
  }

  /**
   * 和暦による日付を返す
   */
  get value(): IDateOfJapaneseCalendar {
    return this._value;
  }
}
