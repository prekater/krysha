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

export const includeCheckbox = {
  ru: {
    'true': 'Включено',
    'false': 'Выключено',
  }
}

export const penaltyType = {
  ru: {
    [Domain.PenaltyType.ABSENT]: 'Отсутствует',
    [Domain.PenaltyType.ABSENT_WITH_EXTRA_CHARGE]: 'Отсутствует c доплатой',
    [Domain.PenaltyType.FIX_FOR_EVERY_DAY]: 'Доплата за каждый просроченный день',
  }
}

export const paymentStart = {
  ru: {
    [Domain.PaymentStart.START_OF_MONTH]: 'первого числа каждого месяца',
    [Domain.PaymentStart.START_OF_RENT]: 'в дату начала аренды',
  }
}

export const paymentType = {
  ru: {
    [Domain.PaymentType.ONE_PAYMENT]: 'Одним платежом',
    [Domain.PaymentType.TWO_PAYMENTS]: 'Двумя платежами',
  }
}

export const propertyType = {

  ru: {
    [Domain.PropertyType.ONE_ROOM]: 'Однокомнатная',
    [Domain.PropertyType.TWO_ROOM]: 'Двухкомнатная',
    [Domain.PropertyType.THREE_ROOM]: 'Трехкомнатная',
    [Domain.PropertyType.FOUR_ROOM]: 'Четырехкомнатная',
    [Domain.PropertyType.FIVE_ROOM]: 'Пятикомнатная',
    [Domain.PropertyType.STUDIO]: 'Студия',
  }
}
