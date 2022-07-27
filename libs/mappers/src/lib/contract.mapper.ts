import {Infra} from "@bigdeal/infra";
import {Domain} from "@bigdeal/domain";
import {DATE_FORMAT} from "@bigdeal/common";
import * as _ from 'lodash'
import * as moment from 'moment'

const {Address, Deposit, Payment, Option, Term, Penalty} = Domain

export class Contract {

  static fromDomainModelToPersistenceModel(model: Domain.Contract): Infra.Contract {

    if (!model) return null;

    const term = {...model.term.toObject(), terminationRules: model.term.terminationRules.map(r => r.toObject())}
    const options = model.options.map(o => o.toObject())

    return {
      ID: model.ID.toString(),
      address: model.address.toObject(),
      payment: model.payment.toObject(),
      date: model.date,
      meta: {
        propertyType: model.propertyType,
      },
      authorId: model.authorId,
      options,
      term,
      rentalPeriod: model.rentalPeriod.toObject()
    }
  }

  static fromOfferToDomainModel(
    offer: Domain.Offer,
    termId: string,
    rentalStart: string,
    rentalEnd: string,
    depositCollectOption: Domain.DepositCollectOptionType,
    paymentStartOption: Domain.PaymentStart,
    paymentTypeOption: Domain.PaymentType
  ) {
    const term = offer.terms.find(t => t.ID.toString() === termId)

    const rentalPeriod = Domain.RentalPeriod.create({
      rentalStart: moment(rentalStart, DATE_FORMAT),
      rentalEnd: moment(rentalEnd, DATE_FORMAT),
    })

    term?.deposit.enableCollectOption(depositCollectOption)
    //TODO: if enabled in the offer
    offer.payment.enablePaymentTypeOption(paymentTypeOption)
    offer.payment.enablePaymentStartOption(paymentStartOption)

    const props: Domain.ContractProps = Object.assign({
        date: moment().format(DATE_FORMAT)
      },
      _.pick(
        offer,
        ['authorId', 'options', 'payment', 'meta', 'address']
      ),
      {term, rentalPeriod}
    )

    return Domain.Contract.create(props)
  }

  static fromObjectToDomainModel(model: Infra.Contract): Domain.Contract {

    if (!model) return null;
    const options = model.options.map(o => Option.create(o))

    const terminationRules = model.term.terminationRules.map(r => Domain.TerminationRule.create(r))
    const term = Term.create({
      ..._.omit({
        ...model.term,
        deposit: Deposit.create(model.term.deposit)
      }, 'ID'), terminationRules
    }, model.term.ID)

    const penalty = model.payment.penalty && Penalty.create(model.payment.penalty)

    const payment = Payment.create({...model.payment, penalty})

    return Domain.Contract.create({
      address: Address.create(model.address),
      date: model.date,
      authorId: model.authorId,
      payment,
      meta: {
        propertyType: model.meta.propertyType
      },
      options,
      term,
      rentalPeriod: Domain.RentalPeriod.create({
        rentalStart: moment(model.rentalPeriod.rentalStart, DATE_FORMAT),
        rentalEnd: moment(model.rentalPeriod.rentalEnd, DATE_FORMAT),
      })
    }, model.ID)
  }
}

