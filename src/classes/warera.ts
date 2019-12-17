import { IJapaneseCalendar } from "../interfaces/i-japanese-calendar";
import { IJapaneseCalendarDate } from "../interfaces/i-japanese-calendar-date";
import { IWareraInput } from "../interfaces/i-warera-input";
import { japaneseCalendars } from "../models/japanese-calendar";

export class Warera {
  private readonly _value: IJapaneseCalendarDate;

  private constructor(value: IJapaneseCalendarDate) {
    this._value = value;
  }

  /**
   * Warera InputオブジェクトからWareraクラスを生成
   * @param date
   */
  static createFromWareraInput(date: IWareraInput): Warera {
    const calendar = Warera._findCalendarByEra(date.era);
    if (!calendar) {
      throw new Error("Invalid era name.");
    }

    const dateOfJapaneseCalendar: IJapaneseCalendarDate = {
      era: calendar.era,
      year: date.year,
      month: date.month,
      day: date.day
    };
    if (!Warera.isValidDateOfJapaneseCalendar(dateOfJapaneseCalendar)) {
      throw new Error("Invalid japanese calendar date.");
    }

    return new Warera(dateOfJapaneseCalendar);
  }

  /**
   * DateクラスからWareraクラスを生成
   * @param date
   */
  static createFromDate(date: Date): Warera {
    const dateOfJapaneseCalendar = Warera._parseDateToDateOfJapaneseCalendar(
      date
    );

    if (!dateOfJapaneseCalendar) {
      throw new Error("Date is out of range.");
    }

    return new Warera(dateOfJapaneseCalendar);
  }

  /**
   * 正しい和暦による日付か？
   * @param date
   */
  static isValidDateOfJapaneseCalendar(date: IJapaneseCalendarDate): boolean {
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
  private static _isValidYear(date: IJapaneseCalendarDate): boolean {
    return date.year >= 1;
  }

  /**
   * 正しい月か？
   * @param date
   */
  private static _isValidMonth(date: IJapaneseCalendarDate): boolean {
    return date.month >= 1 && date.month <= 12;
  }

  /**
   * 正しい日か？
   * @param date
   */
  private static _isValidDay(date: IJapaneseCalendarDate): boolean {
    return date.day >= 1 && date.day <= 31;
  }

  /**
   * 和暦カレンダーの中に存在する日付か？
   * @param date
   */
  private static _isValidDateInJapaneseCalendar(
    date: IJapaneseCalendarDate
  ): boolean {
    const calendar = Warera._findCalendarByEra(date.era.long);
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
  private static _findCalendarByEra(era: string): IJapaneseCalendar | null {
    if (!era) {
      return null;
    }

    let calendar: IJapaneseCalendar | null = null;
    for (const o of japaneseCalendars) {
      if (o.era.short === era || o.era.long === era) {
        calendar = o;
        break;
      }
    }

    return calendar;
  }

  /**
   * 和暦カレンダーから西暦による日付を指定して取得する
   * @param date
   */
  private static _findCalendarByDate(date: Date): IJapaneseCalendar | null {
    let calendar: IJapaneseCalendar | null = null;
    for (const o of japaneseCalendars) {
      if (
        (!o.startDate || o.startDate <= date) &&
        (!o.endDate || date <= o.endDate)
      ) {
        calendar = o;
        break;
      }
    }

    return calendar;
  }

  /**
   * 和暦による日付からDateクラスへ変換する
   * @param date
   */
  private static _parseDateOfJapaneseCalendarToDate(
    date: IJapaneseCalendarDate
  ): Date | null {
    const calendar = Warera._findCalendarByEra(date.era.long);
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
  ): IJapaneseCalendarDate | null {
    const calendar: IJapaneseCalendar | null = this._findCalendarByDate(date);
    const era: { long: string; short: string } | null = calendar?.era || null;

    if (!calendar || !era) {
      return null;
    }

    return {
      era: era,
      year: date.getFullYear() - calendar.startDate.getFullYear() + 1,
      month: date.getMonth() + 1,
      day: date.getDate()
    };
  }

  /**
   * 和暦による日付を返す
   */
  getJapaneseCalendarDate(): IJapaneseCalendarDate {
    return this._value;
  }

  /**
   * 西暦による日付をDateクラスで返す
   */
  getDate(): Date | null {
    return Warera._parseDateOfJapaneseCalendarToDate(this._value);
  }

  /**
   * 和暦カレンダーを返す
   */
  getJapaneseCalendar(): IJapaneseCalendar | null {
    return Warera._findCalendarByEra(this._value.era.long);
  }
}
