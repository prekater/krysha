import {Domain} from '@bigdeal/domain'
import {Mappers} from "@bigdeal/mappers";
import * as _ from 'lodash'

export const makeOffer = (defaults: Partial<Domain.OfferProps> = {}) => {

  return Domain.Offer.create({
      address: Domain.Address.create({
        city: "Москва",
        flat: "222",
        house: "56",
        street: "улица Свободы"
      }),
      authorId: new Domain.UniqueEntityID().toString(),
      options: makeOptions(),
      payment: Domain.Payment.create({
        paymentStart: Domain.PaymentStart.START_OF_RENT,
        penalty: Domain.Penalty.create({
          currency: Domain.PriceUnit.RUB,
          start: 1,
          type: Domain.PenaltyType.FIX_FOR_EVERY_DAY,
          value: 300
        }),
        type: Domain.PaymentType.ONE_PAYMENT
      }),
      meta: {
        propertyType: Domain.PropertyType.ONE_ROOM,
      },
      terms: makeTerms(),
      type: Domain.OfferType.DRAFT,
      ...defaults
    }
  )
}

export function makeOptions(): Domain.Option[] {
  return ['Электричество', 'Вода', 'Отопление']
    .map((title) => Domain.Option.create({
      isEnabled: true,
      title
    }))
}

export const makeOption = (defaults: Partial<Domain.Option> = {}) => Domain.Option.create({
  isEnabled: true,
  title: 'Электричество',
  ...defaults
})

export const makeDeposit = (defaults: Partial<Domain.Deposit> = {}) => Domain.Deposit.create({
  returnPeriod: 2,
  returnPeriodUnit: Domain.PeriodUnit.DAY,
  collectType: Domain.DepositCollectType.CONCLUSION,
  returnType: Domain.DepositReturnType.REFOUND_IN_CASE_OF_1_MONTH_NOTICE,
  value: 100000,
  ...defaults
})

export const makePayment = (defaults: Partial<Domain.Payment> = {}) => Domain.Payment.create({
  paymentStart: Domain.PaymentStart.START_OF_RENT,
  penalty: Domain.Penalty.create({
    currency: Domain.PriceUnit.RUB,
    start: 1,
    type: Domain.PenaltyType.FIX_FOR_EVERY_DAY,
    value: 300
  }),
  type: Domain.PaymentType.ONE_PAYMENT,
  ...defaults
})

export const makeAddress = (defaults: Partial<Domain.Address> = {}) => Domain.Address.create({
  city: "Москва",
  flat: "222",
  house: "56",
  street: "улица Свободы",
  ...defaults
})

export const makeTerminationRule = (defaults: Partial<Domain.TerminationRule> = {}) => {

  return Domain.TerminationRule.create({
    period: 3,
    periodUnit: Domain.PeriodUnit.MONTH,
    value: 45000,
    currency: Domain.PriceUnit.RUB,
    ...defaults
  })
}
export const makeTerm = (defaults: Partial<Domain.Term> = {}) => Domain.Term.create({
  deposit: makeDeposit(),
  periodFrom: 6,
  periodTo: 12,
  periodUnit: Domain.PeriodUnit.MONTH,
  price: 90000,
  priceUnit: Domain.PriceUnit.RUB,
  terminationRules: [
    makeTerminationRule(),
    makeTerminationRule({value: 50000, period: 6})
  ],
  ...defaults,

})

export function makeTerms(): Domain.Term[] {
  return [
    Domain.Term.create({
      deposit: makeDeposit(),
      periodFrom: 1,
      periodTo: 3,
      periodUnit: Domain.PeriodUnit.MONTH,
      price: 100000,
      priceUnit: Domain.PriceUnit.RUB,
      terminationRules: [
        makeTerminationRule(),
        makeTerminationRule({value: 50000, period: 6})
      ].sort((a, b) => a.period - b.period),
    }),
    Domain.Term.create({
      deposit: makeDeposit({value: 90000}),
      periodFrom: 3,
      periodTo: 6,
      periodUnit: Domain.PeriodUnit.MONTH,
      price: 90000,
      priceUnit: Domain.PriceUnit.RUB,
      terminationRules: _.sortBy([
        makeTerminationRule(),
        makeTerminationRule({value: 30000, period: 9})
      ], 'period')
    }),
    Domain.Term.create({
      deposit: makeDeposit({value: 45000}),
      periodFrom: 6,
      periodTo: 12,
      periodUnit: Domain.PeriodUnit.MONTH,
      price: 90000,
      priceUnit: Domain.PriceUnit.RUB,
      terminationRules: [
        makeTerminationRule({value: 40000, period: 2}),
        makeTerminationRule(),
      ].sort((a, b) => a.period - b.period),

    }),
  ]
}

export const offerObjectMock = {
  // @ts-ignore
  ID: 'test',
  address: {city: 'Москва', flat: '222', house: '56', street: 'улица Свободы'},
  payment: {
    paymentStart: Domain.PaymentStart.START_OF_RENT,
    penalty: {
      currency: Domain.PriceUnit.RUB,
      start: 1,
      type: Domain.PenaltyType.FIX_FOR_EVERY_DAY,
      value: 300
    },
    type: Domain.PaymentType.ONE_PAYMENT
  },
  meta: {
    propertyType: Domain.PropertyType.ONE_ROOM,
  },
  // @ts-ignore
  authorId: 'test',
  options: [
    {isEnabled: true, title: 'Электричество'},
    {isEnabled: true, title: 'Вода'},
    {isEnabled: true, title: 'Отопление'}
  ],
  terms: [
    {
      deposit: {
        collectType: Domain.DepositCollectType.CONCLUSION,
        returnType: Domain.DepositReturnType.REFOUND_IN_CASE_OF_1_MONTH_NOTICE,
        value: 100000,
        returnPeriod: 2,
        returnPeriodUnit: Domain.PeriodUnit.DAY
      },
      periodFrom: 1,
      periodTo: 3,
      periodUnit: Domain.PeriodUnit.MONTH,
      price: 100000,
      priceUnit: Domain.PriceUnit.RUB,
      // @ts-ignore
      ID: 'test',
      terminationRules: [
        makeTerminationRule().toObject(),
        makeTerminationRule({value: 50000, period: 6}).toObject()
      ].sort((a, b) => a.period - b.period),
    },
    {
      deposit: {
        collectType: Domain.DepositCollectType.CONCLUSION,
        returnType: Domain.DepositReturnType.REFOUND_IN_CASE_OF_1_MONTH_NOTICE,
        value: 90000,
        returnPeriod: 2,
        returnPeriodUnit: Domain.PeriodUnit.DAY
      },
      periodFrom: 3,
      periodTo: 6,
      periodUnit: Domain.PeriodUnit.MONTH,
      price: 90000,
      priceUnit: Domain.PriceUnit.RUB,
      // @ts-ignore
      ID: 'test',
      terminationRules: _.sortBy([
        makeTerminationRule().toObject(),
        makeTerminationRule({value: 30000, period: 9}).toObject()
      ], 'period')
    },
    {
      deposit: {
        collectType: Domain.DepositCollectType.CONCLUSION,
        returnType: Domain.DepositReturnType.REFOUND_IN_CASE_OF_1_MONTH_NOTICE,
        value: 45000,
        returnPeriod: 2,
        returnPeriodUnit: Domain.PeriodUnit.DAY
      },
      periodFrom: 6,
      periodTo: 12,
      periodUnit: Domain.PeriodUnit.MONTH,
      price: 90000,
      priceUnit: Domain.PriceUnit.RUB,
      // @ts-ignore
      ID: 'test',
      terminationRules: [
        makeTerminationRule({value: 40000, period: 2}).toObject(),
        makeTerminationRule().toObject()
      ].sort((a, b) => a.period - b.period),
    }
  ],
  type: Domain.OfferType.DRAFT
}

export const contractObjectMock = {
  ID: 'test',
  rentalPeriod: {
    rentalStart: '12.06.2022',
    rentalEnd: '12.09.2022',
  },
  address: {city: 'Москва', flat: '222', house: '56', street: 'улица Свободы'},
  payment: {
    paymentStart: 'START_OF_RENT',
    penalty:
      {
        currency: 'RUB',
        start: 1,
        type: 'FIX_FOR_EVERY_DAY',
        value: 300
      },
    type: 'ONE_PAYMENT'
  },
  meta: {
    propertyType: "ONE_ROOM",
  },
  authorId: 'test',
  options: [
    {isEnabled: true, title: 'Электричество'},
    {isEnabled: true, title: 'Вода'},
    {isEnabled: true, title: 'Отопление'}
  ],
  term: {
    deposit: {
      collectType: 'CONCLUSION',
      returnType: 'REFOUND_IN_CASE_OF_1_MONTH_NOTICE',
      value: 100000,
      returnPeriod: 2,
      returnPeriodUnit: "days"
    },
    periodFrom: 1,
    periodTo: 3,
    periodUnit: 'months',
    price: 100000,
    priceUnit: 'RUB',
    ID: 'test',
    terminationRules: [
      {
        period: 3,
        periodUnit: Domain.PeriodUnit.MONTH,
        value: 45000,
        currency: Domain.PriceUnit.RUB,
      },
      {
        period: 6,
        periodUnit: Domain.PeriodUnit.MONTH,
        value: 50000,
        currency: Domain.PriceUnit.RUB,
      },
    ]
  }
}


export const makeContract = (termId: string = null) => {

  const offer = makeOffer()
  termId = termId || offer.terms[0].ID.toString()

  return Mappers.Contract.fromOfferToDomainModel(
    offer,
    termId,
    '12.06.2022',
    '12.09.2022',
  )
}

