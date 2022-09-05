import {IValueObject} from "../value-object";
import {EmailProps} from "../interfaces/email.interface";
import {Validator} from "../validator";
import {IncrorrectEmailException} from "../../contract/exceptions/incrorrect-email.exception";

export class Email implements IValueObject {

  toString(): string {
    return this.props.value
  }

  private constructor(private readonly props: EmailProps) {
  }

  static validate(props: EmailProps) {
    const schema = {
      value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(props.value),
    }

    const errors = Validator.validateAgainstSchema(schema)

    if (Object.keys(errors).length > 0) {
      throw new IncrorrectEmailException(JSON.stringify(errors))
    }
    return true;
  }

  static create(props: EmailProps): Email {

    return new Email(props)
  }

  toObject(): EmailProps {
    return {...this.props}
  }

}
