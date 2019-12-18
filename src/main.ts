import { Warera } from "./classes/warera";
import { IWareraInput } from "./interfaces/i-warera-input";

export default function warera(date: IWareraInput | Date): Warera {
  if (date instanceof Date) {
    return Warera.createFromDate(date);
  } else if (date instanceof Object) {
    return Warera.createFromWareraInput(date);
  } else {
    throw new Error("Invalid argument.");
  }
}
