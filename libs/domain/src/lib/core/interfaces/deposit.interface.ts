import {PeriodUnit} from "./term.interface";

export enum DepositCollectOptionType {
  // при заключении контракта
  CONCLUSION = 'CONCLUSION',
  // частями - 2 платежа
  PARTIAL = 'PARTIAL',
  // отсутствует
  ABSENT = 'ABSENT',
  // отсутствует с доплатой
  ABSENT_WITH_EXTRA_CHARGE = 'ABSENT_WITH_EXTRA_CHARGE'
}

export enum DepositReturnType {
  // удерживается полностью при разрыве контракта
  FULLY_WITHHELD_UPON_CONTRACT_TERMINATION = 'FULLY_WITHHELD_UPON_CONTRACT_TERMINATION',
  // не удерживается
  NO_WITHHELD = 'NO_WITHHELD',
  // депозит будет возвращен в случае предупреждения за 1 мес
  REFOUND_IN_CASE_OF_1_MONTH_NOTICE = 'REFOUND_IN_CASE_OF_1_MONTH_NOTICE',
  // пересчет на стоимость каждого месяца
  RECALCULATE_PRICE = 'RECALCULATE_PRICE'
}

export type DepositCollectOption = {
  type: DepositCollectOptionType;
  isEnabled: boolean;
  priceAffect: number;
  label?: string;
}

export interface DepositProps {
  isEnabled: boolean;
  collectOptions?: DepositCollectOption[]
  returnPeriod?: number;
  returnPeriodUnit?: PeriodUnit;
  value?: number;
  returnType?: DepositReturnType;
}
