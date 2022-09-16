import {Domain} from "@bigdeal/domain";

export const periodUnit = {

  ru: {
    [Domain.PeriodUnit.DAY]: 'дней',
    [Domain.PeriodUnit.MONTH]: 'месяцев',
    [Domain.PeriodUnit.YEAR]: 'лет',
  }
}
export const periodUnitSingle = {

  ru: {
    [Domain.PeriodUnit.DAY]: 'день',
    [Domain.PeriodUnit.MONTH]: 'месяц',
    [Domain.PeriodUnit.YEAR]: 'год',
  }
}
export const priceUnit = {

  ru: {
    [Domain.PriceUnit.RUB]: 'руб.',
    [Domain.PriceUnit.USD]: 'долларов',
    [Domain.PriceUnit.EUR]: 'евро',
  }
}

export const depositCollectType = {
  ru: {
    [Domain.DepositCollectOptionType.PARTIAL]: 'депозит частями: 2 раза в месяц',
    [Domain.DepositCollectOptionType.CONCLUSION]: 'Оплата депозита сразу',
    [Domain.DepositCollectOptionType.ABSENT]: 'отсутствует',
    [Domain.DepositCollectOptionType.ABSENT_WITH_EXTRA_CHARGE]: `Без депозита, каждый месяц стоит дороже на`,
  }
}
export const depositReturnType = {
  ru: {
    [Domain.DepositReturnType.REFOUND_IN_CASE_OF_1_MONTH_NOTICE]: 'Депозит возвращается при уведомлении за 1 месяц',
    [Domain.DepositReturnType.FULLY_WITHHELD_UPON_CONTRACT_TERMINATION]: 'Депозит удерживается полностью при разрыве контракта',
    [Domain.DepositReturnType.NO_WITHHELD]: 'Депозит не удерживается',
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

export const paymentType = {
  ru: {
    [Domain.PaymentType.ONE_PAYMENT]: 'Одним платежом',
    [Domain.PaymentType.TWO_PAYMENTS]: 'Двумя платежами',
  }
}

export const propertyType = {

  ru: {
    [Domain.PropertyType.ONE_ROOM]: 'Однокомнатная квартира',
    [Domain.PropertyType.TWO_ROOM]: 'Двухкомнатная квартира',
    [Domain.PropertyType.THREE_ROOM]: 'Трехкомнатная квартира',
    [Domain.PropertyType.FOUR_ROOM]: 'Четырехкомнатная квартира',
    [Domain.PropertyType.FIVE_ROOM]: 'Пятикомнатная квартира',
    [Domain.PropertyType.STUDIO]: 'Студия',
  }
}
