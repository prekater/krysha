import {UniqueEntityID} from "../../core/unique-entity";
import {IAggregateRoot} from "../../core/aggregate-root";
import {ContractProps} from "../interfaces/contract.interface";
import {IEntity} from "../../core/entity";
import { PropertyType} from "../../offer/interfaces/offer.interface";
import {Address} from "../../core/value-objects/address.value-object";
import {Term} from "../../offer/entities/term.entity";
import {Option} from "../../core/value-objects/option.value-object";
import {Payment} from "../../core/value-objects/payment.value-object";
import {UncompletedContractException} from "../exceptions/uncompleted-contract.exception";
import {RentalPeriod} from "../value-objects/rental-period.value-object";
import {Domain} from "@bigdeal/domain";
import {Validator} from "../../core/validator";

export class Contract implements IAggregateRoot, IEntity {

  get rentalPeriod() {
    return this.props.rentalPeriod
  }

  get authorId() {
    return this.props.authorId
  }

  get address() {
    return this.props.address
  }

  get term(): Term {
    return this.props.term
  }

  get propertyType(): PropertyType {
    return this.props.meta.propertyType
  }

  get meta(): ContractProps['meta'] {

    return this.props.meta
  }

  get payment(): Payment {
    return this.props.payment
  }

  get options(): Option[] {
    return this.props.options
  }

  get paymentDate(): number {
    return this.payment.paymentStart === Domain.PaymentStart.START_OF_MONTH ?
      1 :
      Number(this.rentalPeriod.rentalStart.format('D'))
  }

  get duration(): number {
    return this.rentalPeriod.duration(this.term.periodUnit)
  }

  private constructor(
    private readonly props: ContractProps,
    public readonly ID: UniqueEntityID = new UniqueEntityID()
  ) {
  }


  static create(props: ContractProps, ID: string = null) {

    Contract.validate(props)

    return new Contract(props, new UniqueEntityID(ID))
  }


  static validate(props: ContractProps): boolean {


    const schema = {
      address: props.address instanceof Address,
      rentalPeriod: props.rentalPeriod instanceof RentalPeriod,
      propertyType: Object.values(PropertyType).includes(props.meta.propertyType),
      term: props.term instanceof Term,
      options: props.options.every(t => t instanceof Option),
      authorId: !!props.authorId,
      payment: props.payment instanceof Payment
    }

    const errors = Validator.validateAgainstSchema(schema)

    if (Object.keys(errors).length > 0) {
      throw new UncompletedContractException(JSON.stringify(errors))
    }
    return true;

  }
}
