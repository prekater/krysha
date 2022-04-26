import {IValueObject} from "../../core/value-object";
import {PaymentProps} from "../interfaces/payment.interface";

export class Payment implements IValueObject {

  private constructor(private props: PaymentProps) {
  }

  get penalty() {
    return this.props.penalty
  }
  get paymentStart() {
    return this.props.paymentStart
  }
  get type() {
    return this.props.type
  }
  static create(props: PaymentProps) {
    return new Payment(props)
  }
}
