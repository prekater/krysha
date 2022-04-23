import {IValueObject} from "../core/value-object";
import {Currency} from "./currency";

export class Price implements IValueObject {

  value: number;

  currency: Currency;
}
