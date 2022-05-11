import {Domain} from "@bigdeal/domain";

export const periodUnit = {

  ru: {
    [Domain.PeriodUnit.DAY]: 'дней',
    [Domain.PeriodUnit.MONTH]: 'месяцев',
    [Domain.PeriodUnit.YEAR]: 'лет',
  }
}
export const priceUnit = {

  ru: {
    [Domain.PriceUnit.RUB]: 'рублей',
    [Domain.PriceUnit.USD]: 'долларов',
    [Domain.PriceUnit.EUR]: 'евро',
  }
}

export const depositCollectType = {
  ru: {
    [Domain.DepositCollectType.PARTIAL]: 'депозит частями: 2 раза в месяц',
    [Domain.DepositCollectType.ABSENT]: 'депозит отсутствует',
    [Domain.DepositCollectType.CONCLUSION]: 'Оплата депозита сразу',
    //todo: extend deposit contract (add extra charge  default 0 )
    [Domain.DepositCollectType.ABSENT_WITH_EXTRA_CHARGE]: 'Без депозита, каждый месяц стоит дороже',
  }
}
export const depositReturnType = {
  ru: {
    [Domain.DepositReturnType.REFOUND_IN_CASE_OF_1_MONTH_NOTICE]: 'Депозит возвращается при уведомлении за 1 месяц',
    [Domain.DepositReturnType.FULLY_WITHHELD_UPON_CONTRACT_TERMINATION]: 'Депозит удерживается полностью при разрыве контракта',
    //todo: recalculate logic
    [Domain.DepositReturnType.RECALCULATE_PRICE]: 'Стоимость месяца пересчитывается',
  }
}


