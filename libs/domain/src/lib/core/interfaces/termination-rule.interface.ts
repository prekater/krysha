import {PeriodUnit, PriceUnit} from "./term.interface";

export interface TerminationRuleProps {
  period: number;
  value: number;
  periodUnit: PeriodUnit;
  currency: PriceUnit;
}

