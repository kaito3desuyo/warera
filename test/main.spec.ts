import { Warera } from "../src/classes/warera";
import warera from "../src/main";

describe("warera() のテスト", () => {
  it("IWareraInputオブジェクトを入力した時、Wareraクラスが返ること", () => {
    expect(
      warera({
        era: "R",
        year: 1,
        month: 5,
        day: 1
      })
    ).toBeInstanceOf(Warera);
  });

  it("Dateクラスを入力した時、Wareraクラスが返ること", () => {
    expect(warera(new Date(2019, 4, 1))).toBeInstanceOf(Warera);
  });

  it("謎のオブジェクトを入力した時、例外が発生すること", () => {
    expect(() => warera(<any>{ test: "hoge" })).toThrowError();
  });

  it("配列を入力した時、例外が発生すること", () => {
    expect(() => warera(<any>[])).toThrowError();
  });

  it("nullを入力した時、例外が発生すること", () => {
    expect(() => warera(<any>null)).toThrowError();
  });

  it("undefinedを入力した時、例外が発生すること", () => {
    expect(() => warera(<any>undefined)).toThrowError();
  });

  it("文字を入力した時、例外が発生すること", () => {
    expect(() => warera(<any>"hogehoge")).toThrowError();
  });

  it("数字を入力した時、例外が発生すること", () => {
    expect(() => warera(<any>10)).toThrowError();
  });
});
