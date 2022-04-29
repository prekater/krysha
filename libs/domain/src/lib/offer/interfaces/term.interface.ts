import {Deposit} from "../value-objects/deposit.value-object";
import {UniqueEntityID} from "@bigdeal/domain";

export enum PeriodUnit {
  DAY = 'DAY',
  MONTH = 'MONTH',
  YEAR = 'YEAR'

}
export enum PriceUnit {
  RUB = 'RUB',
  EUR = 'EUR',
  USD = 'USD',
}

export interface TermProps {

  price: number;
  priceUnit: PriceUnit;

  periodFrom: number;
  periodTo: number;
  periodUnit: PeriodUnit;

  deposit: Deposit;
}

