import {IValueObject} from "../../core/value-object";
import {DepositCollectType, DepositProps, DepositReturnType} from "../interfaces/deposit.interface";
import {NotImplementedException} from "../exceptions/not-implemented.exception";
import {UncompletedDepositException} from "../exceptions/uncompleted-deposit.exception";
import {PropertyType} from "../interfaces/offer.interface";

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
      Object.values(DepositReturnType).includes(props.returnType) &&
      Object.values(DepositCollectType).includes(props.collectType)
    ) return true

    throw new UncompletedDepositException()
  }
}
