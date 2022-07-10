import {PaymentStartOptionProps} from "../interfaces/payment-configurator.interface";
import {PaymentStart} from "../../core/interfaces/payment.interface";
import {Validator} from "../../core/validator";
import {UncompletedPaymentOptionException} from "../exceptions/uncompleted-payment-option.exception";
import {IEntity} from "../../core/entity";
import {UniqueEntityID} from "../../core/unique-entity";

export class PaymentStartOption implements IEntity {

  private constructor(props: PaymentStartOptionProps, ID: UniqueEntityID) {
  }
  static create(props:PaymentStartOptionProps, ID: string = null) {
    PaymentStartOption.validate(props)
    return new PaymentStartOption(props, new UniqueEntityID(ID))
  }

  static validate(props: PaymentStartOptionProps) {

    const schema = {
      type: Object.values(PaymentStart).includes(props.type),
      priceAffect: typeof props.priceAffect === 'number'
    }
    const errors = Validator.validateAgainstSchema(schema)
    if (Object.keys(errors).length === 0) return true

    throw new UncompletedPaymentOptionException(JSON.stringify(errors))

  }

}
