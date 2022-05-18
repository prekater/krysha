import {IValueObject} from "../../core/value-object";
import {DepositCollectType, DepositProps, DepositReturnType} from "../interfaces/deposit.interface";
import {UncompletedDepositException} from "../exceptions/uncompleted-deposit.exception";
import {PeriodUnit} from "../interfaces/term.interface";

export class Deposit implements IValueObject {

  private constructor(private props: DepositProps) {
  }

  get value() {
    return this.props.value
  }

  get collectType() {
    return this.props.collectType
  }

  get returnType() {
    return this.props.returnType
  }

  get returnPeriod() {
    return this.props.returnPeriod
  }

  get returnPeriodUnit() {
    return this.props.returnPeriodUnit
  }

  toObject() {
    return {...this.props}
  }


  static create(props: DepositProps) {
    Deposit.validate(props)
    return new Deposit(props)
  }

  static validate(props: DepositProps) {

    if (
      typeof props.value === 'number' &&
      props.value >= 0 &&
      Object.values(PeriodUnit).includes(props.returnPeriodUnit) &&
      typeof props.returnPeriod === 'number' && props.returnPeriod > 0 &&
      Object.values(DepositReturnType).includes(props.returnType) &&
      Object.values(DepositCollectType).includes(props.collectType)
    ) return true

    throw new UncompletedDepositException()
  }
}
