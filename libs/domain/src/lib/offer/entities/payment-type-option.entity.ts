import {PaymentTypeOptionProps} from "../interfaces/payment-configurator.interface";
import {PaymentStart, PaymentType} from "../../core/interfaces/payment.interface";
import {Validator} from "../../core/validator";
import {UncompletedPaymentOptionException} from "../exceptions/uncompleted-payment-option.exception";
import {IEntity} from "../../core/entity";
import {UniqueEntityID} from "../../core/unique-entity";

export class PaymentTypeOption implements IEntity {

  private constructor(props: PaymentTypeOptionProps, ID: UniqueEntityID) {
  }
  static create(props:PaymentTypeOptionProps, ID: string = null) {
    PaymentTypeOption.validate(props)
    return new PaymentTypeOption(props, new UniqueEntityID(ID))
  }

  static validate(props: PaymentTypeOptionProps) {

    const schema = {
      type: Object.values(PaymentType).includes(props.type),
      priceAffect: typeof props.priceAffect === 'number'
    }
    const errors = Validator.validateAgainstSchema(schema)
    if (Object.keys(errors).length === 0) return true

    throw new UncompletedPaymentOptionException(JSON.stringify(errors))

  }

}
