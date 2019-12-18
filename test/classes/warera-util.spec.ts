import { WareraUtil } from "../../src/classes/warera-util";

describe("Class:WareraUtil", () => {
  describe("parseNumericToKanjiNumeral() のテスト", () => {
    describe("正常系", () => {
      describe("漢数字・複雑な変換時", () => {
        it("0を入力した時、〇が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(0)).toBe("〇");
        });

        it("1を入力した時、一が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(1)).toBe("一");
        });

        it("2を入力した時、二が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(2)).toBe("二");
        });

        it("3を入力した時、三が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(3)).toBe("三");
        });

        it("4を入力した時、四が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(4)).toBe("四");
        });

        it("5を入力した時、五が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(5)).toBe("五");
        });

        it("6を入力した時、六が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(6)).toBe("六");
        });

        it("7を入力した時、七が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(7)).toBe("七");
        });

        it("8を入力した時、八が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(8)).toBe("八");
        });

        it("9を入力した時、九が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(9)).toBe("九");
        });

        it("10を入力した時、十が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(10)).toBe("十");
        });

        it("11を入力した時、十一が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(11)).toBe("十一");
        });

        it("100を入力した時、百が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(100)).toBe("百");
        });

        it("111を入力した時、百十一が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(111)).toBe("百十一");
        });

        it("1000を入力した時、千が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(1000)).toBe("千");
        });

        it("1111を入力した時、千百十一が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(1111)).toBe("千百十一");
        });

        it("10000を入力した時、一万が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(10000)).toBe("一万");
        });

        it("11111を入力した時、一万千百十一が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(11111)).toBe(
            "一万千百十一"
          );
        });

        it("100000を入力した時、十万が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(100000)).toBe("十万");
        });

        it("111111を入力した時、十一万千百十一が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(111111)).toBe(
            "十一万千百十一"
          );
        });

        it("1000000を入力した時、百万が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(1000000)).toBe("百万");
        });

        it("1111111を入力した時、百十一万千百十一が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(1111111)).toBe(
            "百十一万千百十一"
          );
        });

        it("10000000を入力した時、千万が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(10000000)).toBe("千万");
        });

        it("11111111を入力した時、千百十一万千百十一が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(11111111)).toBe(
            "千百十一万千百十一"
          );
        });

        it("100000000を入力した時、一億が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(100000000)).toBe("一億");
        });

        it("111111111を入力した時、一億千百十一万千百十一が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(111111111)).toBe(
            "一億千百十一万千百十一"
          );
        });

        it("1234567890を入力した時、十二億三千四百五十六万七千八百九十が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(1234567890)).toBe(
            "十二億三千四百五十六万七千八百九十"
          );
        });

        it("1000000000000を入力した時、一兆が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(1000000000000)).toBe(
            "一兆"
          );
        });

        it("9007199254740991を入力した時、九千七兆千九百九十二億五千四百七十四万九百九十一が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(9007199254740991)).toBe(
            "九千七兆千九百九十二億五千四百七十四万九百九十一"
          );
        });

        it("-1を入力した時、マイナス一が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(-1)).toBe("マイナス一");
        });

        it("-1234567890を入力した時、マイナス十二億三千四百五十六万七千八百九十が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(-1234567890)).toBe(
            "マイナス十二億三千四百五十六万七千八百九十"
          );
        });
      });

      describe("漢数字・シンプルな変換時", () => {
        it("0を入力した時、〇が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(0, false, true)).toBe(
            "〇"
          );
        });

        it("10を入力した時、一〇が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(10, false, true)).toBe(
            "一〇"
          );
        });

        it("100を入力した時、一〇〇が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(100, false, true)).toBe(
            "一〇〇"
          );
        });

        it("1000を入力した時、一〇〇〇が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(1000, false, true)).toBe(
            "一〇〇〇"
          );
        });

        it("10000を入力した時、一〇〇〇〇が返ること", () => {
          expect(
            WareraUtil.parseNumericToKanjiNumeral(10000, false, true)
          ).toBe("一〇〇〇〇");
        });

        it("100000を入力した時、一〇〇〇〇〇が返ること", () => {
          expect(
            WareraUtil.parseNumericToKanjiNumeral(100000, false, true)
          ).toBe("一〇〇〇〇〇");
        });

        it("1234567890を入力した時、一二三四五六七八九〇が返ること", () => {
          expect(
            WareraUtil.parseNumericToKanjiNumeral(1234567890, false, true)
          ).toBe("一二三四五六七八九〇");
        });
      });

      describe("大字・複雑な変換時", () => {
        it("0を入力した時、零が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(0, true)).toBe("零");
        });

        it("1を入力した時、壱が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(1, true)).toBe("壱");
        });

        it("2を入力した時、弐が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(2, true)).toBe("弐");
        });

        it("3を入力した時、参が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(3, true)).toBe("参");
        });

        it("4を入力した時、肆が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(4, true)).toBe("肆");
        });

        it("5を入力した時、伍が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(5, true)).toBe("伍");
        });

        it("6を入力した時、陸が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(6, true)).toBe("陸");
        });

        it("7を入力した時、漆が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(7, true)).toBe("漆");
        });

        it("8を入力した時、捌が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(8, true)).toBe("捌");
        });

        it("9を入力した時、玖が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(9, true)).toBe("玖");
        });

        it("10を入力した時、拾が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(10, true)).toBe("拾");
        });

        it("11を入力した時、拾壱が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(11, true)).toBe("拾壱");
        });

        it("100を入力した時、佰が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(100, true)).toBe("佰");
        });

        it("111を入力した時、佰拾壱が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(111, true)).toBe(
            "佰拾壱"
          );
        });

        it("1000を入力した時、仟が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(1000, true)).toBe("仟");
        });

        it("1111を入力した時、仟佰拾壱が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(1111, true)).toBe(
            "仟佰拾壱"
          );
        });

        it("10000を入力した時、壱萬が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(10000, true)).toBe(
            "壱萬"
          );
        });

        it("11111を入力した時、壱萬仟佰拾壱が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(11111, true)).toBe(
            "壱萬仟佰拾壱"
          );
        });

        it("100000を入力した時、拾萬が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(100000, true)).toBe(
            "拾萬"
          );
        });

        it("111111を入力した時、拾壱萬仟佰拾壱が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(111111, true)).toBe(
            "拾壱萬仟佰拾壱"
          );
        });

        it("1000000を入力した時、佰萬が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(1000000, true)).toBe(
            "佰萬"
          );
        });

        it("1111111を入力した時、佰拾壱萬仟佰拾壱が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(1111111, true)).toBe(
            "佰拾壱萬仟佰拾壱"
          );
        });

        it("10000000を入力した時、仟萬が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(10000000, true)).toBe(
            "仟萬"
          );
        });

        it("11111111を入力した時、仟佰拾壱萬仟佰拾壱が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(11111111, true)).toBe(
            "仟佰拾壱萬仟佰拾壱"
          );
        });

        it("100000000を入力した時、壱億が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(100000000, true)).toBe(
            "壱億"
          );
        });

        it("111111111を入力した時、壱億仟佰拾壱萬仟佰拾壱が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(111111111, true)).toBe(
            "壱億仟佰拾壱萬仟佰拾壱"
          );
        });

        it("1234567890を入力した時、拾弐億参仟肆佰伍拾陸萬漆仟捌佰玖拾が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(1234567890, true)).toBe(
            "拾弐億参仟肆佰伍拾陸萬漆仟捌佰玖拾"
          );
        });

        it("1000000000000を入力した時、壱兆が返ること", () => {
          expect(
            WareraUtil.parseNumericToKanjiNumeral(1000000000000, true)
          ).toBe("壱兆");
        });

        it("9007199254740991を入力した時、玖仟漆兆仟玖佰玖拾弐億伍仟肆佰漆拾肆萬玖佰玖拾壱が返ること", () => {
          expect(
            WareraUtil.parseNumericToKanjiNumeral(9007199254740991, true)
          ).toBe("玖仟漆兆仟玖佰玖拾弐億伍仟肆佰漆拾肆萬玖佰玖拾壱");
        });

        it("-1を入力した時、マイナス壱が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(-1, true)).toBe(
            "マイナス壱"
          );
        });

        it("-1234567890を入力した時、マイナス拾弐億参仟肆佰伍拾陸萬漆仟捌佰玖拾が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(-1234567890, true)).toBe(
            "マイナス拾弐億参仟肆佰伍拾陸萬漆仟捌佰玖拾"
          );
        });
      });

      describe("大字・シンプルな変換時", () => {
        it("0を入力した時、零が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(0, true, true)).toBe(
            "零"
          );
        });

        it("10を入力した時、壱零が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(10, true, true)).toBe(
            "壱零"
          );
        });

        it("100を入力した時、壱零零が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(100, true, true)).toBe(
            "壱零零"
          );
        });

        it("1000を入力した時、壱零零零が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(1000, true, true)).toBe(
            "壱零零零"
          );
        });

        it("10000を入力した時、壱零零零零が返ること", () => {
          expect(WareraUtil.parseNumericToKanjiNumeral(10000, true, true)).toBe(
            "壱零零零零"
          );
        });

        it("100000を入力した時、壱零零零零零が返ること", () => {
          expect(
            WareraUtil.parseNumericToKanjiNumeral(100000, true, true)
          ).toBe("壱零零零零零");
        });

        it("1234567890を入力した時、壱二三四五六七八九零が返ること", () => {
          expect(
            WareraUtil.parseNumericToKanjiNumeral(1234567890, true, true)
          ).toBe("壱弐参肆伍陸漆捌玖零");
        });
      });
    });

    describe("異常系", () => {
      it("半角数字以外の文字が入力された時、例外が発生すること", () => {
        expect(() =>
          WareraUtil.parseNumericToKanjiNumeral(<any>"1a")
        ).toThrowError();
      });

      it("巨大すぎる数字が入力された時、例外が発生すること", () => {
        expect(() =>
          WareraUtil.parseNumericToKanjiNumeral(9007199254740991 + 1)
        ).toThrowError();
      });

      it("小数が入力された時、例外が発生すること", () => {
        expect(() =>
          WareraUtil.parseNumericToKanjiNumeral(1.0523)
        ).toThrowError();
      });

      it("undefinedが入力された時、空文字が返ること", () => {
        expect(WareraUtil.parseNumericToKanjiNumeral(<any>undefined)).toBe("");
      });

      it("nullが入力された時、空文字が返ること", () => {
        expect(WareraUtil.parseNumericToKanjiNumeral(<any>null)).toBe("");
      });

      it("空文字が入力された時、空文字が返ること", () => {
        expect(WareraUtil.parseNumericToKanjiNumeral("")).toBe("");
      });
    });
  });
});
