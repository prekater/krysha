import {UniqueEntityID} from "../../core/unique-entity";
import {PeriodUnit, PriceUnit, TermProps} from "../interfaces/term.interface";
import {IEntity} from "../../core/entity";
import {Deposit} from "../value-objects/deposit.value-object";
import {UncompletedTermException} from "../exceptions/uncompleted-term.exception";

// 1 per contract
export class Term implements IEntity {
  get price() {
    return this.props.price
  }

  get periodUnit() {
    return this.props.periodUnit
  }

  get deposit() {
    return this.props.deposit
  }

  get priceUnit() {
    return this.props.priceUnit
  }

  get periodFrom() {
    return this.props.periodFrom
  }

  get periodTo() {
    return this.props.periodTo
  }

  ID: UniqueEntityID;
  private props: TermProps;

  private constructor(props: TermProps, ID: UniqueEntityID) {

    this.ID = ID
    props.periodUnit = props.periodUnit || PeriodUnit.DAY
    props.priceUnit = props.priceUnit || PriceUnit.RUB

    this.props = props
  }


  toObject() {
    return {
      ...this.props,
      ID: this.ID.toString(),
      deposit: this.props.deposit.toObject()
    }
  }

  static validate(props: TermProps) {

    if (
      props.deposit instanceof Deposit &&
      typeof props.price === 'number' &&
      props.price >= 0 &&
      props.periodFrom >= 0 &&
      props.periodTo >= props.periodFrom
    ) return true

    throw new UncompletedTermException()
  }

  static create(props: TermProps, ID: string = null) {

    Term.validate(props)
    return new Term(props, new UniqueEntityID(ID))
  }

  public isRentalPeriodCorrect(rentalPeriod: number): boolean {

    return typeof rentalPeriod === 'number' &&
      rentalPeriod >= this.periodFrom &&
      rentalPeriod <= this.periodTo
  }

}
