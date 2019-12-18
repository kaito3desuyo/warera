const numKanji = ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
const numKanjiDaiji = [
  "零",
  "壱",
  "弐",
  "参",
  "肆",
  "伍",
  "陸",
  "漆",
  "捌",
  "玖"
];

const unitKanji = [
  "十",
  "百",
  "千",
  "万",
  "億",
  "兆",
  "京",
  "垓",
  "𥝱",
  "穣",
  "溝",
  "澗",
  "正",
  "載",
  "極",
  "恒河沙",
  "阿僧祇",
  "那由他",
  "不可思議",
  "無量大数"
];
const unitKanjiDaiji = [
  "拾",
  "佰",
  "仟",
  "萬",
  "億",
  "兆",
  "京",
  "垓",
  "𥝱",
  "穣",
  "溝",
  "澗",
  "正",
  "載",
  "極",
  "恒河沙",
  "阿僧祇",
  "那由他",
  "不可思議",
  "無量大数"
];

const exponents = [
  1,
  2,
  3,
  4,
  8,
  12,
  16,
  20,
  24,
  28,
  32,
  36,
  40,
  44,
  48,
  52,
  56,
  60,
  64,
  68
];

export class WareraUtil {
  static parseNumericToKanjiNumeral(
    num: number | string,
    isDaiji = false,
    isSimple = false
  ): string {
    if (num === undefined || num === null || num === <any>"") {
      return "";
    }
    if (!/^-?[0-9]+$/g.test(String(num))) {
      throw new TypeError("Argument 'num' must be numeric character.");
    }
    if (!Number.isSafeInteger(Number(num))) {
      throw new RangeError("Argument 'num' must be safe integer.");
    }

    if (isSimple) {
      if (isDaiji) {
        return WareraUtil._simpleConversionNumericToKanjiNumeral(
          Number(num),
          numKanjiDaiji
        );
      } else {
        return WareraUtil._simpleConversionNumericToKanjiNumeral(
          Number(num),
          numKanji
        );
      }
    } else {
      if (isDaiji) {
        return WareraUtil._complicatedConversionNumericToKanjiNumeral(
          Number(num),
          numKanjiDaiji,
          unitKanjiDaiji
        );
      } else {
        return WareraUtil._complicatedConversionNumericToKanjiNumeral(
          Number(num),
          numKanji,
          unitKanji
        );
      }
    }
  }

  private static _simpleConversionNumericToKanjiNumeral(
    num: number,
    numKanjiArray: string[]
  ): string {
    const numStr = String(num).split("");
    let returnStringArray: string[] = [];
    for (let i = 0; i < numStr.length; i++) {
      returnStringArray.push(numKanjiArray[Number(numStr[i])]);
    }
    return returnStringArray.join("");
  }

  private static _complicatedConversionNumericToKanjiNumeral(
    num: number,
    numKanjiArray: string[],
    unitKanjiArray: string[]
  ): string {
    let returnString: string = "";
    if (num === 0) {
      return numKanjiArray[0];
    }
    if (num < 0) {
      returnString += "マイナス";
      num *= -1;
    }

    for (let i = exponents.length; i >= 0; --i) {
      const bias = Math.pow(10, exponents[i]);
      if (num >= bias) {
        const top = Math.floor(num / bias);
        if (top >= 10) {
          returnString += WareraUtil._complicatedConversionNumericToKanjiNumeral(
            top,
            numKanjiArray,
            unitKanjiArray
          );
        } else {
          if (top !== 1 || exponents[i] > 3) {
            returnString += numKanjiArray[top];
          }
        }
        returnString += unitKanjiArray[i];
        num -= top * bias;
      }
    }

    if (num !== 0) {
      returnString += numKanjiArray[num];
    }

    return returnString;
  }
}
