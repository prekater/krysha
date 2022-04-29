import {OfferProps, OfferType, PropertyType} from "../../offer/interfaces/offer.interface";
import {Offer} from "../../offer/entities/offer.entity";
import {UniqueEntityID} from "../../core/unique-entity";
import {Address} from "../../offer/value-objects/address.value-object";
import {Payment} from "../../offer/value-objects/payment.value-object";
import {Option} from "../../offer/value-objects/option.value-object";
import {PaymentStart, PaymentType, PenaltyType} from "../../offer/interfaces/payment.interface";
import {Term} from "../../offer/value-objects/term.value-object";
import {Deposit} from "../../offer/value-objects/deposit.value-object";
import {DepositCollectType, DepositReturnType} from "../../offer/interfaces/deposit.interface";
import {PeriodUnit, PriceUnit} from "../../offer/interfaces/term.interface";

export const makeOffer = (defaults: OfferProps) => {

  return  Offer.create({
      ID: new UniqueEntityID(),
      address: Address.create({
        city: "Москва",
        flat: "222",
        house: "56",
        street: "улица Свободы"
      }),
      authorId: new UniqueEntityID().toString(),
      options: makeOptions(),
      payment: Payment.create({
        paymentStart: PaymentStart.START_OF_RENT,
        penalty: PenaltyType.ABSENT,
        type: PaymentType.ONE_PAYMENT
      }),
      propertyType: PropertyType.ONE_ROOM,
      terms: makeTerms(),
      type: OfferType.DRAFT,
      ...defaults
    }
  )
}

export function makeOptions(): Option[] {
  return ['Электричество', 'Вода', 'Кондиционер']
    .map((title) => Option.create({
      isEnabled: true,
      title
    }))
}


export function makeTerms(): Term[] {
  return [
    Term.create({
      deposit: Deposit.create({
        collectType: DepositCollectType.CONCLUSION,
        returnType: DepositReturnType.REFOUND_IN_CASE_OF_1_MONTH_NOTICE,
        value: 100000
      }),
      periodFrom: 1,
      periodTo: 3,
      periodUnit: PeriodUnit.MONTH,
      price: 100000,
      priceUnit: PriceUnit.RUB
    }),
    Term.create({
      deposit: Deposit.create({
        collectType: DepositCollectType.CONCLUSION,
        returnType: DepositReturnType.REFOUND_IN_CASE_OF_1_MONTH_NOTICE,
        value: 90000
      }),
      periodFrom: 3,
      periodTo: 6,
      periodUnit: PeriodUnit.MONTH,
      price: 90000,
      priceUnit: PriceUnit.RUB
    }),
    Term.create({
      deposit: Deposit.create({
        collectType: DepositCollectType.CONCLUSION,
        returnType: DepositReturnType.REFOUND_IN_CASE_OF_1_MONTH_NOTICE,
        value: 45000
      }),
      periodFrom: 6,
      periodTo: 12,
      periodUnit: PeriodUnit.MONTH,
      price: 90000,
      priceUnit: PriceUnit.RUB
    }),
  ]
}
