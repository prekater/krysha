import * as _ from 'lodash'
import {UniqueEntityID} from "../../core/unique-entity";
import {PeriodUnit, PriceUnit, TermProps} from "../../core/interfaces/term.interface";
import {IEntity} from "../../core/entity";
import {Deposit} from "../../core/value-objects/deposit.value-object";
import {UncompletedTermException} from "../exceptions/uncompleted-term.exception";
import {TerminationRule} from "../../core/value-objects/termination-rule.value-object";

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

  get terminationRules() {
    return this.props.terminationRules.sort((a, b) => a.value - b.value)
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
      props.periodTo >= props.periodFrom &&
      props.terminationRules.every(r => r instanceof TerminationRule) &&
      _.uniq(props.terminationRules, 'period').length === props.terminationRules.length
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
