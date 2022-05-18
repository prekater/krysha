import {IValueObject} from "../../core/value-object";
import {PaymentProps, PaymentStart, PaymentType} from "../interfaces/payment.interface";
import {UncompletedPaymentException} from "../exceptions/uncompleted-payment.exception";
import {Penalty} from "./penalty.value-object";

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

  toObject() {
    return {...this.props, penalty: this.props.penalty.toObject()}
  }
  static create(props: PaymentProps) {
    Payment.validate(props)
    return new Payment(props)
  }


  static validate(props: PaymentProps) {
    if (
      (Object.values(PaymentStart).includes(props.paymentStart)) &&
      (Object.values(PaymentType).includes(props.type)) &&
      props.penalty instanceof Penalty
    ) return true

    throw new UncompletedPaymentException()
  }
}
