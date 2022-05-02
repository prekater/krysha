import {Address, Domain, Option, Term, TermProps, Deposit, Payment} from "@bigdeal/domain";
import {Infra} from "@bigdeal/infra";


export namespace Mappers {
  export class Offer {

    static fromDomainModelToPersistenceModel(model: Domain.Offer): Infra.Offer {

      if ( !model ) return null;

      const terms = model.terms.map(t => t.toObject())
      const options = model.options.map(o => o.toObject())

      return {
        ID: model.ID.toString(),
        address: model.address.toObject(),
        payment: model.payment.toObject(),
        propertyType: model.propertyType,
        authorId: model.authorId,
        options,
        terms,
        type: model.type
      }
    }

    static fromPersistenceModelToDomainModel(model: Infra.Offer): Domain.Offer {

      if ( !model ) return null;
      const options = model.options.map( o => (
        Option.create(o)
      ))
      const terms = model.terms.map(({ID, ...props}) => {
        props.deposit = Deposit.create(props.deposit)

        return Term.create(props as TermProps, ID)
      })

      const payment = Payment.create(model.payment)

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

}
