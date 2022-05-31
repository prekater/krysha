import {IValueObject} from "../value-object";
import {PaymentProps, PaymentStart, PaymentType} from "../interfaces/payment.interface";
import {UncompletedPaymentException} from "../../offer/exceptions/uncompleted-payment.exception";
import {Penalty} from "./penalty.value-object";
import {Validator} from "../validator";

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

    const schema = {
      paymentStart: Object.values(PaymentStart).includes(props.paymentStart),
      paymentType: Object.values(PaymentType).includes(props.type),
      penalty: props.penalty instanceof Penalty
    }
    const errors = Validator.validateAgainstSchema(schema)

    if (Object.keys(errors).length === 0) return true

    throw new UncompletedPaymentException(JSON.stringify(errors))
  }
}
