import {PeriodUnit, PriceUnit} from "./common";

export type TerminationRule = {
  period: number,
  periodUnit: PeriodUnit,
  value: number,
  currency: PriceUnit,
}
