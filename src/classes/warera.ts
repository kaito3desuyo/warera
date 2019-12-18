import { IJapaneseCalendar } from "../interfaces/i-japanese-calendar";
import { IJapaneseCalendarDate } from "../interfaces/i-japanese-calendar-date";
import { IWareraInput } from "../interfaces/i-warera-input";
import { japaneseCalendars } from "../models/japanese-calendar";
import { WareraUtil } from "./warera-util";

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
    if (!date.era || !date.year || !date.month || !date.day) {
      throw new Error("Invalid argument.");
    }

    const dateOfJapaneseCalendar: IJapaneseCalendarDate = Warera._parseIWareraInputToIJapaneseCalendarDate(
      date
    );

    if (!Warera._isValidDateOfJapaneseCalendar(dateOfJapaneseCalendar)) {
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
   * Warera Inputオブジェクトを和暦日付オブジェクトにパースする
   * @param input
   */
  private static _parseIWareraInputToIJapaneseCalendarDate(
    input: IWareraInput
  ): IJapaneseCalendarDate {
    const calendar = Warera._findCalendarByEra(input.era);
    if (!calendar) {
      throw new Error("Invalid era name.");
    }

    return {
      era: calendar.era,
      year: input.year,
      month: input.month,
      day: input.day
    };
  }

  /**
   * 正しい和暦による日付か？
   * @param date
   */
  private static _isValidDateOfJapaneseCalendar(
    date: IJapaneseCalendarDate
  ): boolean {
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

  /**
   * 指定した形式でフォーマットする
   * @param pattern
   * @param replaceToGanForFirstYear
   */
  format(pattern: string, replaceToGanForFirstYear = true): string {
    if (
      typeof pattern !== "string" ||
      typeof replaceToGanForFirstYear !== "boolean"
    ) {
      throw new TypeError("Invalid argument.");
    }

    let returnStr: string = pattern;
    let date: {
      gregorian: Date;
      japanese: IJapaneseCalendarDate;
    } = {
      gregorian: this.getDate() as Date,
      japanese: this.getJapaneseCalendarDate()
    };

    // 西暦年
    returnStr = returnStr.replace("YYYY", String(date.gregorian.getFullYear()));

    // 和暦元号
    returnStr = returnStr.replace("WWW", date.japanese.era.long);
    returnStr = returnStr.replace("W", date.japanese.era.short);

    // 和暦年
    // 漢数字（例：平成二十一年）
    returnStr = returnStr.replace(
      "kky",
      date.japanese.year === 1 && replaceToGanForFirstYear
        ? "元"
        : WareraUtil.parseNumericToKanjiNumeral(date.japanese.year)
    );

    // 漢数字（例：平成二一年）
    returnStr = returnStr.replace(
      "ky",
      date.japanese.year === 1 && replaceToGanForFirstYear
        ? "元"
        : WareraUtil.parseNumericToKanjiNumeral(date.japanese.year, false, true)
    );

    // 大字（例：平成弐拾壱年）
    returnStr = returnStr.replace(
      "ddy",
      date.japanese.year === 1 && replaceToGanForFirstYear
        ? "元"
        : WareraUtil.parseNumericToKanjiNumeral(date.japanese.year, true)
    );

    // 大字（例：平成弐壱年）
    returnStr = returnStr.replace(
      "dy",
      date.japanese.year === 1 && replaceToGanForFirstYear
        ? "元"
        : WareraUtil.parseNumericToKanjiNumeral(date.japanese.year, true, true)
    );

    // アラビア数字（例：平成08年）
    returnStr = returnStr.replace(
      "yy",
      date.japanese.year === 1 && replaceToGanForFirstYear
        ? "元"
        : String(date.japanese.year).padStart(2, "0")
    );

    // アラビア数字（例：平成8年）
    returnStr = returnStr.replace(
      "y",
      date.japanese.year === 1 && replaceToGanForFirstYear
        ? "元"
        : String(date.japanese.year)
    );

    // 月
    // 漢数字（例：十二月）
    returnStr = returnStr.replace(
      "kkM",
      WareraUtil.parseNumericToKanjiNumeral(date.japanese.month)
    );
    // 漢数字（例：一二月）
    returnStr = returnStr.replace(
      "kM",
      WareraUtil.parseNumericToKanjiNumeral(date.japanese.month, false, true)
    );
    // 大字（例：拾弐月）
    returnStr = returnStr.replace(
      "ddM",
      WareraUtil.parseNumericToKanjiNumeral(date.japanese.month, true)
    );
    // 大字（例：壱弐月）
    returnStr = returnStr.replace(
      "dM",
      WareraUtil.parseNumericToKanjiNumeral(date.japanese.month, true, true)
    );
    // アラビア数字（例：08月）
    returnStr = returnStr.replace(
      "MM",
      String(date.japanese.month).padStart(2, "0")
    );
    // アラビア数字（例：8月）
    returnStr = returnStr.replace("M", String(date.japanese.month));

    // 日
    // 漢数字（例：十二日）
    returnStr = returnStr.replace(
      "kkD",
      WareraUtil.parseNumericToKanjiNumeral(date.japanese.day)
    );
    // 漢数字（例：一二日）
    returnStr = returnStr.replace(
      "kD",
      WareraUtil.parseNumericToKanjiNumeral(date.japanese.day, false, true)
    );
    // 大字（例：拾弐日）
    returnStr = returnStr.replace(
      "ddD",
      WareraUtil.parseNumericToKanjiNumeral(date.japanese.day, true)
    );
    // 大字（例：壱弐日）
    returnStr = returnStr.replace(
      "dD",
      WareraUtil.parseNumericToKanjiNumeral(date.japanese.day, true, true)
    );
    // アラビア数字（例：08日）
    returnStr = returnStr.replace(
      "DD",
      String(date.japanese.day).padStart(2, "0")
    );
    // アラビア数字（例：8日）
    returnStr = returnStr.replace("D", String(date.japanese.day));

    return returnStr;
  }
}
