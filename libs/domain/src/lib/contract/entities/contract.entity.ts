import {UniqueEntityID} from "../../core/unique-entity";
import {IAggregateRoot} from "../../core/aggregate-root";
import {ContractProps} from "../interfaces/contract.interface";
import {IEntity} from "../../core/entity";
import {PropertyType} from "../../offer/interfaces/offer.interface";
import {Address} from "../../core/value-objects/address.value-object";
import {Term} from "../../offer/entities/term.entity";
import {Option} from "../../core/value-objects/option.value-object";
import {Payment} from "../../core/value-objects/payment.value-object";
import {UncompletedContractException} from "../exceptions/uncompleted-contract.exception";
import {RentalPeriod} from "../value-objects/rental-period.value-object";

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
    return this.props.propertyType
  }

  get payment(): Payment {
    return this.props.payment
  }

  get options(): Option[] {
    return this.props.options
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

    if (
      !(props.address instanceof Address) ||
      !(Object.values(PropertyType).includes(props.propertyType)) ||
      !(props.rentalPeriod instanceof RentalPeriod) ||
      !(props.term instanceof Term) ||
      !(props.term.isRentalPeriodCorrect(props.rentalPeriod.duration(props.term.periodUnit))) ||
      !(props.options.every(t => t instanceof Option)) ||
      !props.authorId ||
      !(props.payment instanceof Payment)
    ) {

      throw new UncompletedContractException()
    }

    return true;
  }
}
