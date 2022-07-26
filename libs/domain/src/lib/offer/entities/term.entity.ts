import * as _ from 'lodash'
import {UniqueEntityID} from "../../core/unique-entity";
import {PeriodUnit, PriceUnit, TermProps} from "../../core/interfaces/term.interface";
import {IEntity} from "../../core/entity";
import {Deposit} from "../../core/value-objects/deposit.value-object";
import {UncompletedTermException} from "../exceptions/uncompleted-term.exception";
import {TerminationRule} from "../../core/value-objects/termination-rule.value-object";
import {Validator} from "../../core/validator";

export class Term implements IEntity {

  get price() {
    return Number(this.props.price) - Number(this.deposit.priceAffect)
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
    return this.props.terminationRules.sort((a, b) => a.period - b.period)
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

    const schema = {
      deposit: props.deposit instanceof Deposit,
      price: typeof props.price === 'number' && props.price >= 0,
      periodUnit: Object.values(PeriodUnit).includes(props.periodUnit),
      priceUnit: Object.values(PriceUnit).includes(props.priceUnit),
      periodFrom: props.periodFrom >= 0,
      periodTo: props.periodTo >= props.periodFrom,
      terminationRules: props.terminationRules.every(r => r instanceof TerminationRule) &&
        _.uniqBy(props.terminationRules, 'period').length === props.terminationRules.length
    }
    const errors = Validator.validateAgainstSchema(schema)

    if (Object.keys(errors).length === 0) return true

    throw new UncompletedTermException(JSON.stringify(errors))
  }

  static create(props: TermProps, ID: string = null) {
    props.price = Number(props.price)
    props.periodTo = Number(props.periodTo)
    props.periodFrom = Number(props.periodFrom)
    Term.validate(props)
    return new Term(props, new UniqueEntityID(ID))
  }

  public isRentalPeriodCorrect(rentalPeriod: number): boolean {

    return typeof rentalPeriod === 'number' &&
      rentalPeriod >= this.periodFrom &&
      rentalPeriod <= this.periodTo
  }

}
