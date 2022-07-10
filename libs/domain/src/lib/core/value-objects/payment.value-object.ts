import {IValueObject} from "../value-object";
import {PaymentProps, PaymentStart, PaymentType} from "../interfaces/payment.interface";
import {UncompletedPaymentException} from "../../offer/exceptions/uncompleted-payment.exception";
import {Validator} from "../validator";
import {DepositCollectOptionType} from "../interfaces/deposit.interface";

export class Payment implements IValueObject {

  private constructor(private props: PaymentProps) {
  }

  get penalty() {
    return this.props.penalty
  }

  get paymentTypeOptions() {
    return this.props.paymentTypeOptions
  }
  get paymentStartOptions() {
    return this.props.paymentStartOptions
  }

  public enablePaymentTypeOption(option: PaymentType) {
    const pto = this.paymentTypeOptions.find(o => o.type === option)

    if (pto) {
      this.paymentTypeOptions.forEach(o => {
        o.isEnabled = false
      })
      pto.isEnabled = true
    }
  }
  public enablePaymentStartOption(option: PaymentStart) {
    const pso = this.paymentStartOptions.find(o => o.type === option)

    if (pso) {
      this.paymentStartOptions.forEach(o => {
        o.isEnabled = false
      })
      pso.isEnabled = true
    }
  }

  get priceAffect() {
    return this.props.paymentTypeOptions.find(pto => pto.isEnabled)?.priceAffect || 0
  }

  get paymentStart() {
    return this.props.paymentStartOptions.find(pso => pso.isEnabled)?.type
  }

  get type() {
    return this.props.paymentTypeOptions.find(pto => pto.isEnabled)?.type
  }

  toObject() {
    return {...this.props, penalty: this.props.penalty?.toObject() || null}
  }

  static create(props: PaymentProps) {
    props.paymentTypeOptions  = props.paymentTypeOptions.map((pto) => ({...pto, priceAffect: Number(pto.priceAffect)}))
    Payment.validate(props)
    return new Payment(props)
  }


  static validate(props: PaymentProps) {
    const schema = {
      paymentStartOptions: props.paymentStartOptions.every(po => Object.values(PaymentStart).includes(po.type)),
      paymentTypeOptions: props.paymentTypeOptions.every(po => Object.values(PaymentType).includes(po.type) && typeof po.priceAffect === 'number' ),
      // penalty: props.penalty instanceof Penalty
    }
    const errors = Validator.validateAgainstSchema(schema)

    if (Object.keys(errors).length === 0) return true

    throw new UncompletedPaymentException(JSON.stringify(errors))
  }
}
