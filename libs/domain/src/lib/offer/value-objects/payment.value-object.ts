import {IValueObject} from "../../core/value-object";
import {PaymentProps, PaymentStart, PaymentType, PenaltyType} from "../interfaces/payment.interface";
import {NotImplementedException} from "../exceptions/not-implemented.exception";
import {UncompletedPaymentException} from "../exceptions/uncompleted-payment.exception";
import {OfferType} from "../interfaces/offer.interface";

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
    return {...this.props}
  }
  static create(props: PaymentProps) {
    Payment.validate(props)
    return new Payment(props)
  }


  static validate(props: PaymentProps) {
    if (
      (Object.values(PaymentStart).includes(props.paymentStart)) &&
      (Object.values(PaymentType).includes(props.type)) &&
      (Object.values(PenaltyType).includes(props.penalty))
    ) return true

    throw new UncompletedPaymentException()
  }
}
