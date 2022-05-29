import {IValueObject} from "../value-object";
import {DepositCollectType, DepositProps, DepositReturnType} from "../interfaces/deposit.interface";
import {UncompletedDepositException} from "../../offer/exceptions/uncompleted-deposit.exception";
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
    props.value = Number(props.value)
    props.returnPeriod = Number(props.returnPeriod)

    Deposit.validate(props)
    return new Deposit(props)
  }

  static validate(props: DepositProps) {


    if (
      props.value >= 0 && props.returnPeriod > 0 &&
      Object.values(PeriodUnit).includes(props.returnPeriodUnit) &&
      Object.values(DepositReturnType).includes(props.returnType) &&
      Object.values(DepositCollectType).includes(props.collectType)
    ) return true

    throw new UncompletedDepositException()
  }
}
