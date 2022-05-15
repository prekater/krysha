import {
  Domain,
} from "@bigdeal/domain";
import {Mappers} from "@bigdeal/mappers";

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
        penalty: Domain.PenaltyType.ABSENT,
        type: Domain.PaymentType.ONE_PAYMENT
      }),
      propertyType: Domain.PropertyType.ONE_ROOM,
      terms: makeTerms(),
      type: Domain.OfferType.DRAFT,
      ...defaults
    }
  )
}

export function makeOptions(): Domain.Option[] {
  return ['Электричество', 'Вода', 'Кондиционер']
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
  collectType: Domain.DepositCollectType.CONCLUSION,
  returnType: Domain.DepositReturnType.REFOUND_IN_CASE_OF_1_MONTH_NOTICE,
  value: 100000,
  ...defaults
})

export const makePayment = (defaults: Partial<Domain.Payment> = {}) => Domain.Payment.create({
  paymentStart: Domain.PaymentStart.START_OF_RENT,
  penalty: Domain.PenaltyType.ABSENT,
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

export const makeTerm = (defaults: Partial<Domain.Term> = {}) => Domain.Term.create({
  deposit: Domain.Deposit.create({
    collectType: Domain.DepositCollectType.CONCLUSION,
    returnType: Domain.DepositReturnType.REFOUND_IN_CASE_OF_1_MONTH_NOTICE,
    value: 45000
  }),
  periodFrom: 6,
  periodTo: 12,
  periodUnit: Domain.PeriodUnit.MONTH,
  price: 90000,
  priceUnit: Domain.PriceUnit.RUB,
  ...defaults
})

export function makeTerms(): Domain.Term[] {
  return [
    Domain.Term.create({
      deposit: Domain.Deposit.create({
        collectType: Domain.DepositCollectType.CONCLUSION,
        returnType: Domain.DepositReturnType.REFOUND_IN_CASE_OF_1_MONTH_NOTICE,
        value: 100000
      }),
      periodFrom: 1,
      periodTo: 3,
      periodUnit: Domain.PeriodUnit.MONTH,
      price: 100000,
      priceUnit: Domain.PriceUnit.RUB
    }),
    Domain.Term.create({
      deposit: Domain.Deposit.create({
        collectType: Domain.DepositCollectType.CONCLUSION,
        returnType: Domain.DepositReturnType.REFOUND_IN_CASE_OF_1_MONTH_NOTICE,
        value: 90000
      }),
      periodFrom: 3,
      periodTo: 6,
      periodUnit: Domain.PeriodUnit.MONTH,
      price: 90000,
      priceUnit: Domain.PriceUnit.RUB
    }),
    Domain.Term.create({
      deposit: Domain.Deposit.create({
        collectType: Domain.DepositCollectType.CONCLUSION,
        returnType: Domain.DepositReturnType.REFOUND_IN_CASE_OF_1_MONTH_NOTICE,
        value: 45000
      }),
      periodFrom: 6,
      periodTo: 12,
      periodUnit: Domain.PeriodUnit.MONTH,
      price: 90000,
      priceUnit: Domain.PriceUnit.RUB
    }),
  ]
}

export const offerObjectMock = {
  // @ts-ignore
  ID: 'test',
  address: {city: 'Москва', flat: '222', house: '56', street: 'улица Свободы'},
  payment: {
    paymentStart: Domain.PaymentStart.START_OF_RENT,
    penalty: Domain.PenaltyType.ABSENT,
    type: Domain.PaymentType.ONE_PAYMENT
  },
  propertyType: Domain.PropertyType.ONE_ROOM,
  // @ts-ignore

  authorId: 'test',
  options: [
    {isEnabled: true, title: 'Электричество'},
    {isEnabled: true, title: 'Вода'},
    {isEnabled: true, title: 'Кондиционер'}
  ],
  terms: [
    {
      deposit: {
        collectType: Domain.DepositCollectType.CONCLUSION,
        returnType: Domain.DepositReturnType.REFOUND_IN_CASE_OF_1_MONTH_NOTICE,
        value: 100000,
      },
      periodFrom: 1,
      periodTo: 3,
      periodUnit: Domain.PeriodUnit.MONTH,
      price: 100000,
      priceUnit: Domain.PriceUnit.RUB,
      // @ts-ignore
      ID: 'test'
    },
    {
      deposit: {
        collectType: Domain.DepositCollectType.CONCLUSION,
        returnType: Domain.DepositReturnType.REFOUND_IN_CASE_OF_1_MONTH_NOTICE,
        value: 90000,
      },
      periodFrom: 3,
      periodTo: 6,
      periodUnit: Domain.PeriodUnit.MONTH,
      price: 90000,
      priceUnit: Domain.PriceUnit.RUB,
      // @ts-ignore
      ID: 'test'
    },
    {
      deposit: {
        collectType: Domain.DepositCollectType.CONCLUSION,
        returnType: Domain.DepositReturnType.REFOUND_IN_CASE_OF_1_MONTH_NOTICE,
        value: 45000,
      },
      periodFrom: 6,
      periodTo: 12,
      periodUnit: Domain.PeriodUnit.MONTH,
      price: 90000,
      priceUnit: Domain.PriceUnit.RUB,
      // @ts-ignore
      ID: 'test'
    }
  ],
  type: Domain.OfferType.DRAFT
}

export const contractObjectMock =  {
  ID: 'test',
  rentalPeriod: 2,
  address: { city: 'Москва', flat: '222', house: '56', street: 'улица Свободы' },
  payment: {
    paymentStart: 'START_OF_RENT',
    penalty: 'ABSENT',
    type: 'ONE_PAYMENT'
  },
  propertyType: 'ONE_ROOM',
  authorId: 'test',
  options: [
    { isEnabled: true, title: 'Электричество' },
    { isEnabled: true, title: 'Вода' },
    { isEnabled: true, title: 'Кондиционер' }
  ],
  term: {
    deposit: {
      collectType: 'CONCLUSION',
      returnType: 'REFOUND_IN_CASE_OF_1_MONTH_NOTICE',
      value: 100000
    },
    periodFrom: 1,
    periodTo: 3,
    periodUnit: 'MONTH',
    price: 100000,
    priceUnit: 'RUB',
    ID: 'test',
  }
}


export const makeContract = (termId: string = null) => {

  const offer = makeOffer()
  termId = termId || offer.terms[0].ID.toString()

  return Mappers.Contract.fromOfferToDomainModel(offer, termId, 2)
}
