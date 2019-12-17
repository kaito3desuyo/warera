import { Warera } from "./classes/warera";
import { IWareraInput } from "./interfaces/i-warera-input";

function warera(date: IWareraInput | Date): Warera {
  if (date instanceof Date) {
    return Warera.createFromDate(date);
  } else (date instanceof Object) {
    return Warera.createFromWareraInput(date);
  }
}

export default warera;
