import {IValueObject} from "../../core/value-object";
import {DepositProps} from "../interfaces/deposit.interface";

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
    return new Deposit(props)
  }
}
