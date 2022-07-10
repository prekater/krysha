import {PaymentType} from "../../core/interfaces/payment.interface";
import {IValueObject} from "../../core/value-object";
import {UncompletedPaymentException} from "../exceptions/uncompleted-payment.exception";
import {Penalty} from "../../core/value-objects/penalty.value-object";
import {PaymentConfiguratorProps} from "../interfaces/payment-configurator.interface";
import {Validator} from "../../core/validator";
import {PaymentStartOption} from "../entities/payment-start-option.entity";
import {PaymentTypeOption} from "../entities/payment-type-option.entity";


export class PaymentConfigurator implements IValueObject {

  private constructor(private props: PaymentConfiguratorProps) {
  }

  get penalty() {
    return this.props.penalty
  }


  get paymentTypeOptions(): PaymentStartOption[] {
    return this.props.paymentTypeOptions
  }
  get paymentStartOptions(): PaymentTypeOption[] {
    return this.props.paymentStartOptions
  }

  toObject() {
    return {...this.props, penalty: this.props.penalty.toObject()}
  }

  static create(props: PaymentConfiguratorProps) {
    PaymentConfigurator.validate(props)
    return new PaymentConfigurator(props)
  }


  static validate(props: PaymentConfiguratorProps) {
    const schema = {
      paymentStartOptions: props.paymentStartOptions.every(pso => pso instanceof PaymentStartOption),
      paymentTypeOptions: props.paymentTypeOptions.every(pto => Object.values(PaymentType).includes(pto.type)),
      penalty: props.penalty instanceof Penalty
    }
    const errors = Validator.validateAgainstSchema(schema)

    if (Object.keys(errors).length === 0) return true

    throw new UncompletedPaymentException(JSON.stringify(errors))
  }
}
