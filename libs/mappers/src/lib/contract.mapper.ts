import {Infra} from "@bigdeal/infra";
import {Domain} from "@bigdeal/domain";
import * as _ from 'lodash'
import * as moment from 'moment'
import {DATE_FORMAT} from "@bigdeal/common";
import {TerminationRule} from "../../../domain/src/lib/core/value-objects/termination-rule.value-object";

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
      propertyType: model.propertyType,
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
  ) {
    const term = offer.terms.find(t => t.ID.toString() === termId)

    const rentalPeriod = new Domain.RentalPeriod({
      rentalStart: moment(rentalStart, DATE_FORMAT),
      rentalEnd: moment(rentalEnd, DATE_FORMAT)
    })
    const props: Domain.ContractProps = Object.assign({},
      _.pick(
        offer,
        ['authorId', 'options', 'payment', 'propertyType', 'address']
      ),
      {term, rentalPeriod}
    )

    return Domain.Contract.create(props)
  }

  static fromObjectToDomainModel(model: Infra.Contract): Domain.Contract {

    if (!model) return null;
    const options = model.options.map(o => Option.create(o))

    model.term.deposit = Deposit.create(model.term.deposit);
    const terminationRules = model.term.terminationRules.map(r => TerminationRule.create(r))
    const term = Term.create({..._.omit(model.term, 'ID'), terminationRules }, model.term.ID)

    const penalty = Penalty.create(model.payment.penalty)

    const payment = Payment.create({...model.payment, penalty } )

    return Domain.Contract.create({
      address: Address.create(model.address),
      authorId: model.authorId,
      payment,
      propertyType: model.propertyType,
      options,
      term,
      rentalPeriod: Domain.RentalPeriod.create({
        rentalStart: moment(model.rentalPeriod.rentalStart, DATE_FORMAT),
        rentalEnd: moment(model.rentalPeriod.rentalEnd, DATE_FORMAT)
      })
    }, model.ID)
  }
}

