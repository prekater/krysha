import {PeriodUnit} from "./common";

export enum DepositCollectType {
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
  // депозит будет возвращен в случае предупреждения за 1 мес
  REFOUND_IN_CASE_OF_1_MONTH_NOTICE = 'REFOUND_IN_CASE_OF_1_MONTH_NOTICE',
  // пересчет на стоимость каждого месяца
  RECALCULATE_PRICE = 'RECALCULATE_PRICE'

}

export interface Deposit {

  returnPeriod: number;
  returnPeriodUnit: PeriodUnit;

  value: number;

  collectType: DepositCollectType;
  returnType: DepositReturnType;
}