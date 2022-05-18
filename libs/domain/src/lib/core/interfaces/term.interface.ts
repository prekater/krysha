import {Deposit} from "../value-objects/deposit.value-object";
import {TerminationRule} from "../value-objects/termination-rule.value-object";

export enum PeriodUnit {
  DAY = 'days',
  MONTH = 'months',
  YEAR = 'years'

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

  terminationRules: TerminationRule[]

}

