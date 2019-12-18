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

  describe("format() のテスト", () => {
    let date: Warera;

    describe("共通のテスト", () => {
      beforeEach(() => {
        date = Warera.createFromDate(new Date(1964, 0, 1));
      });

      it('yyyyが入力された時、"1964"が返ること', () => {
        expect(date.format("YYYY")).toBe("1964");
      });

      it('WWWが入力された時、"昭和"が返ること', () => {
        expect(date.format("WWW")).toBe("昭和");
      });

      it('Wが入力された時、"S"が返ること', () => {
        expect(date.format("W")).toBe("S");
      });

      it('kkMが入力された時、"壱"が返ること', () => {
        expect(date.format("kkM")).toBe("一");
      });

      it('ddMが入力された時、"壱"が返ること', () => {
        expect(date.format("ddM")).toBe("壱");
      });

      it('MMが入力された時、"01"が返ること', () => {
        expect(date.format("MM")).toBe("01");
      });

      it('Mが入力された時、"1"が返ること', () => {
        expect(date.format("M")).toBe("1");
      });

      it('kkDが入力された時、"壱"が返ること', () => {
        expect(date.format("kkD")).toBe("一");
      });

      it('ddDが入力された時、"壱"が返ること', () => {
        expect(date.format("ddD")).toBe("壱");
      });

      it('DDが入力された時、"01"が返ること', () => {
        expect(date.format("DD")).toBe("01");
      });

      it('Dが入力された時、"1"が返ること', () => {
        expect(date.format("D")).toBe("1");
      });

      it("関係のない文字列はそのまま返ること", () => {
        expect(date.format("hoge")).toBe("hoge");
      });
    });

    describe("元年ではない時", () => {
      beforeEach(() => {
        date = Warera.createFromDate(new Date(2019, 3, 1));
      });

      it('kkyが入力された時、"三十一"が返ること', () => {
        expect(date.format("kky")).toBe("三十一");
      });

      it('kyが入力された時、"三一"が返ること', () => {
        expect(date.format("ky")).toBe("三一");
      });

      it('ddyが入力された時、"参拾壱"が返ること', () => {
        expect(date.format("ddy")).toBe("参拾壱");
      });

      it('dyが入力された時、"参壱"が返ること', () => {
        expect(date.format("dy")).toBe("参壱");
      });

      it('yyが入力された時、"31"が返ること', () => {
        expect(date.format("yy")).toBe("31");
      });

      it('yが入力された時、"31"が返ること', () => {
        expect(date.format("y")).toBe("31");
      });
    });

    describe("元年の時", () => {
      beforeEach(() => {
        date = Warera.createFromDate(new Date(2019, 4, 1));
      });

      it('kkyが入力された時、"元"が返ること', () => {
        expect(date.format("kky")).toBe("元");
      });

      it("kkyが入力され、かつ1年を元年に変換するフラグが偽の時、一が返ること", () => {
        expect(date.format("kky", false)).toBe("一");
      });

      it('kyが入力された時、"元"が返ること', () => {
        expect(date.format("ky")).toBe("元");
      });

      it("kyが入力され、かつ1年を元年に変換するフラグが偽の時、一が返ること", () => {
        expect(date.format("ky", false)).toBe("一");
      });

      it('ddyが入力された時、"元"が返ること', () => {
        expect(date.format("ddy")).toBe("元");
      });

      it("ddyが入力され、かつ1年を元年に変換するフラグが偽の時、壱が返ること", () => {
        expect(date.format("ddy", false)).toBe("壱");
      });

      it('dyが入力された時、"元"が返ること', () => {
        expect(date.format("dy")).toBe("元");
      });

      it("dyが入力され、かつ1年を元年に変換するフラグが偽の時、壱が返ること", () => {
        expect(date.format("dy", false)).toBe("壱");
      });

      it('yyが入力された時、"元"が返ること', () => {
        expect(date.format("yy")).toBe("元");
      });

      it('yyが入力され、かつ1年を元年に変換するフラグが偽の時、"01"が返ること', () => {
        expect(date.format("yy", false)).toBe("01");
      });

      it('yが入力された時、"元"が返ること', () => {
        expect(date.format("y")).toBe("元");
      });

      it('yが入力され、かつ1年を元年に変換するフラグが偽の時、"1"が返ること', () => {
        expect(date.format("y", false)).toBe("1");
      });
    });

    describe("実使用テスト", () => {
      describe("令和元年", () => {
        beforeEach(() => {
          date = Warera.createFromDate(new Date(2019, 4, 1));
        });

        it("YYYY-MM-DD -> 2019-05-01 であること", () => {
          expect(date.format("YYYY-MM-DD")).toBe("2019-05-01");
        });

        it("WWWy-MM-DD -> 令和元-05-01 であること", () => {
          expect(date.format("WWWy-MM-DD")).toBe("令和元-05-01");
        });

        it("Wyy-MM-DD(元年変換なし) -> R01-05-01 であること", () => {
          expect(date.format("Wyy-MM-DD", false)).toBe("R01-05-01");
        });

        it("Wy-MM-DD(元年変換なし) -> R1-05-01 であること", () => {
          expect(date.format("Wy-MM-DD", false)).toBe("R1-05-01");
        });

        it("WWWy-M-D(元年変換なし) -> 令和1-5-1 であること", () => {
          expect(date.format("WWWy-M-D", false)).toBe("令和1-5-1");
        });

        it("WWWkky-M-D -> 令和元-5-1 であること", () => {
          expect(date.format("WWWkky-M-D")).toBe("令和元-5-1");
        });

        it("WWWky-M-D -> 令和元-5-1 であること", () => {
          expect(date.format("WWWky-M-D")).toBe("令和元-5-1");
        });

        it("WWWddy-M-D -> 令和元-5-1 であること", () => {
          expect(date.format("WWWddy-M-D")).toBe("令和元-5-1");
        });

        it("WWWdy-M-D -> 令和元-5-1 であること", () => {
          expect(date.format("WWWdy-M-D")).toBe("令和元-5-1");
        });
      });

      describe("平成31年", () => {
        beforeEach(() => {
          date = Warera.createFromDate(new Date(2019, 3, 1));
        });

        it("WWWkky-MM-DD -> 平成三十一-04-01 であること", () => {
          expect(date.format("WWWkky-MM-DD", false)).toBe("平成三十一-04-01");
        });

        it("WWWky-MM-DD -> 平成三一-04-01 であること", () => {
          expect(date.format("WWWky-MM-DD", false)).toBe("平成三一-04-01");
        });

        it("WWWddy-MM-DD -> 平成参拾壱-04-01 であること", () => {
          expect(date.format("WWWddy-MM-DD", false)).toBe("平成参拾壱-04-01");
        });

        it("WWWdy-MM-DD -> 平成参壱-04-01 であること", () => {
          expect(date.format("WWWdy-MM-DD", false)).toBe("平成参壱-04-01");
        });
      });

      describe("2桁月日の場合", () => {
        beforeEach(() => {
          date = Warera.createFromDate(new Date(2019, 11, 12));
        });

        it("WWWy-kkM-kkD -> 令和元-十二-十二 であること", () => {
          expect(date.format("WWWy-kkM-kkD")).toBe("令和元-十二-十二");
        });

        it("WWWy-kM-kD -> 令和元-一二-一二 であること", () => {
          expect(date.format("WWWy-kM-kD")).toBe("令和元-一二-一二");
        });

        it("WWWy-ddM-ddD -> 令和元-拾弐-拾弐 であること", () => {
          expect(date.format("WWWy-ddM-ddD")).toBe("令和元-拾弐-拾弐");
        });

        it("WWWy-dM-dD -> 令和元-壱弐-壱弐 であること", () => {
          expect(date.format("WWWy-dM-dD")).toBe("令和元-壱弐-壱弐");
        });

        it("WWWy-MM-DD -> 令和元-12-12 であること", () => {
          expect(date.format("WWWy-MM-DD")).toBe("令和元-12-12");
        });

        it("WWWy-M-D -> 令和元-12-12 であること", () => {
          expect(date.format("WWWy-M-D")).toBe("令和元-12-12");
        });
      });
    });

    describe("異常系のテスト", () => {
      beforeEach(() => {
        date = Warera.createFromDate(new Date(2019, 4, 1));
      });

      it("patternにundefinedが入力された時、例外が発生すること", () => {
        expect(() => date.format(<any>undefined)).toThrowError();
      });

      it("patternにnullが入力された時、例外が発生すること", () => {
        expect(() => date.format(<any>null)).toThrowError();
      });

      it("patternにオブジェクトが入力された時、例外が発生すること", () => {
        expect(() => date.format(<any>{})).toThrowError();
      });

      it("patternに配列が入力された時、例外が発生すること", () => {
        expect(() => date.format(<any>[])).toThrowError();
      });

      it("patternに真偽値が入力された時、例外が発生すること", () => {
        expect(() => date.format(<any>true)).toThrowError();
      });

      it("replaceToGanForFirstYearにnullが入力された時、例外が発生すること", () => {
        expect(() => date.format("YYYY", <any>null)).toThrowError();
      });

      it("replaceToGanForFirstYearにオブジェクトが入力された時、例外が発生すること", () => {
        expect(() => date.format("YYYY", <any>{})).toThrowError();
      });

      it("replaceToGanForFirstYearに配列が入力された時、例外が発生すること", () => {
        expect(() => date.format("YYYY", <any>[])).toThrowError();
      });

      it("replaceToGanForFirstYearに文字列が入力された時、例外が発生すること", () => {
        expect(() => date.format("YYYY", <any>"true")).toThrowError();
      });
    });
  });
});
