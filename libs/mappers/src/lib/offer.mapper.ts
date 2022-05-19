import {Infra} from "@bigdeal/infra";
import {Domain} from "@bigdeal/domain";
import * as _ from 'lodash'

const {Address, Deposit, Payment, Option, Term, Penalty, TerminationRule} = Domain

export class Offer {

  static fromDomainModelToPersistenceModel(model: Domain.Offer): Infra.Offer {

    if (!model) return null;

    const terms = model.terms.map(t => ({
      ...(t.toObject()),
      terminationRules: _.sortBy(t.terminationRules, 'period')
        .map(r => r.toObject())
    }))

    console.log(terms[0].terminationRules, terms[1].terminationRules)

    const options = model.options.map(o => o.toObject())

    return {
      ID: model.ID.toString(),
      address: model.address.toObject(),
      payment: model.payment.toObject(),
      propertyType: model.propertyType,
      authorId: model.authorId,
      options,
      terms,
      type: model.type,

    }
  }

  static fromObjectToDomainModel(model: Infra.Offer): Domain.Offer {

    if (!model) return null;
    const options = model.options.map(o => (
      Option.create(o)
    ))
    const terms = model.terms.map(({ID, ...props}) => {
      props.deposit = Deposit.create(props.deposit)

      props.terminationRules =
        _.sortBy(props.terminationRules, 'period')
        .map(r => TerminationRule.create(r))

      return Term.create(props as Domain.TermProps, ID)
    })

    const penalty = Penalty.create(model.payment.penalty)

    const payment = Payment.create({...model.payment, penalty})

    return Domain.Offer.create({
      address: Address.create(model.address),
      authorId: model.authorId,
      payment,
      propertyType: model.propertyType,
      options,
      terms,
      type: model.type
    }, model.ID)
  }
}

