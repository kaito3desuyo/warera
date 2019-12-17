import { Warera } from "../../src/classes/warera";
import { EJapaneseCalendar } from "../../src/enums/japanese-calendar-era.enum";

describe("Class:Warera", () => {
  describe("static createFromWareraInput() のテスト", () => {
    it("正しいIWareraInputオブジェクトが入力された時、正しいWareraクラスが返ること", () => {
      const date = Warera.createFromWareraInput({
        era: "R",
        year: 1,
        month: 5,
        day: 1
      });

      expect(date).toBeInstanceOf(Warera);
    });

    it("誤った年号が入力された時、例外が発生すること", () => {
      expect(() =>
        Warera.createFromWareraInput({
          era: "Y",
          year: 1,
          month: 5,
          day: 1
        })
      ).toThrowError();
    });

    it("年号は正しいが、その年号の範囲外の日付が入力された時、例外が発生すること", () => {
      expect(() =>
        Warera.createFromWareraInput({
          era: "R",
          year: 1,
          month: 1,
          day: 1
        })
      ).toThrowError();
    });

    it("正しくない年が入力された時、例外が発生すること", () => {
      expect(() =>
        Warera.createFromWareraInput({
          era: "R",
          year: -1,
          month: 5,
          day: 1
        })
      ).toThrowError();
    });

    it("正しくない月が入力された時、例外が発生すること", () => {
      expect(() =>
        Warera.createFromWareraInput({
          era: "R",
          year: 1,
          month: 0,
          day: 1
        })
      ).toThrowError();
      expect(() =>
        Warera.createFromWareraInput({
          era: "R",
          year: 1,
          month: 13,
          day: 1
        })
      ).toThrowError();
    });

    it("正しくない日が入力された時、例外が発生すること", () => {
      expect(() =>
        Warera.createFromWareraInput({
          era: "R",
          year: 1,
          month: 5,
          day: 0
        })
      ).toThrowError();
      expect(() =>
        Warera.createFromWareraInput({
          era: "R",
          year: 1,
          month: 5,
          day: 32
        })
      ).toThrowError();
    });
  });

  describe("static createFromDate() のテスト", () => {
    it("正しいDateクラスが入力された時、正しいWareraクラスが返ること", () => {
      const date = Warera.createFromDate(new Date(2019, 4, 1));
      expect(date).toBeInstanceOf(Warera);
    });

    it("対応範囲外のDateクラスが入力された時、例外が発生すること", () => {
      expect(() => Warera.createFromDate(new Date(1600, 0, 1))).toThrowError();
    });
  });

  describe("getJapaneseCalendarDate() のテスト", () => {
    it("正しいIJapaneseCalendarDateオブジェクトが返ること", () => {
      const date = Warera.createFromDate(new Date(2019, 4, 1));
      expect(date.getJapaneseCalendarDate()).toEqual({
        era: {
          long: "令和",
          short: "R"
        },
        year: 1,
        month: 5,
        day: 1
      });
    });
  });

  describe("getDate() のテスト", () => {
    const date = Warera.createFromDate(new Date(2019, 4, 1));
    it("2019/05/01で初期化した時、Dateクラスが返ること", () => {
      expect(date.getDate()).toBeInstanceOf(Date);
    });

    it("2019/05/01で初期化した時、返すDateクラスは2019/05/01であること", () => {
      expect(date.getDate()).toEqual(new Date(2019, 4, 1));
    });
  });

  describe("getJapaneseCalendar() のテスト", () => {
    const date = Warera.createFromDate(new Date(2019, 4, 1));
    it("2019/05/01で初期化した時、令和の和暦カレンダーが返ること", () => {
      expect(date.getJapaneseCalendar()).toEqual({
        era: {
          short: EJapaneseCalendar.REIWA,
          long: "令和"
        },
        startDate: new Date(2019, 4, 1),
        endDate: null
      });
    });
  });
});
