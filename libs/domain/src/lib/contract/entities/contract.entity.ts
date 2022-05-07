import * as _ from 'lodash'
import {UniqueEntityID} from "../../core/unique-entity";
import {IAggregateRoot} from "../../core/aggregate-root";
import {Offer} from "../../offer/entities/offer.entity";
import {ContractProps} from "../interfaces/contract.interface";
import {IEntity} from "../../core/entity";
import {IExporter} from "../interfaces/exporter.interface";
import {PropertyType} from "../../offer/interfaces/offer.interface";
import {Address} from "../../offer/value-objects/address.value-object";
import {Term} from "../../offer/entities/term.entity";
import {Option} from "../../offer/value-objects/option.value-object";
import {Payment} from "../../offer/value-objects/payment.value-object";
import {UncompletedContractException} from "../exceptions/uncompleted-contract.exception";


export class Contract implements IAggregateRoot, IEntity{

  private constructor(
    private readonly props: ContractProps,
    public readonly ID: UniqueEntityID = new UniqueEntityID()
  ) {
  }

  static fromOffer (offer: Offer, termId: string): Contract {

    const term = offer.terms.find(t => t.ID.toString() === termId)

    const props: ContractProps = Object.assign({},
      _.pick(offer, ['authorId', 'options', 'payment', 'propertyType', 'address']),
      {term}
    )

    return new Contract(props)
  }


  static validate(props: ContractProps): boolean {

    if (
      !(props.address instanceof Address) ||
      !(Object.values(PropertyType).includes(props.propertyType)) ||
      !(props.term instanceof Term) ||
      !(props.options.every(t => t instanceof Option)) ||
      !props.authorId ||
      !(props.payment instanceof Payment)
    ) {
      throw new UncompletedContractException()
    }
    return true;
  }

  async export(exporter: IExporter): Promise<any> {
    return await exporter.export(this)
  }
}
