import {IValueObject} from "../value-object";
import {Email} from "./email.value-object";
import {UserDataProps} from "../interfaces/user-data.interface";
import {UncompletedUserDataException} from "../../contract/exceptions/uncompleted-user-data.exception";
import {Validator} from "../validator";

export class UserData implements IValueObject {

  get fullname() {
    return this.props.fullname
  }

  get email(): string {
    return this.props.email.toString()
  }

  private constructor(private readonly props: UserDataProps) {
  }

  static validate(props: UserDataProps) {


    const schema = {
      fullname: props.fullname.length === 0,
      email: props.email instanceof Email,
    }

    const errors = Validator.validateAgainstSchema(schema)

    if (Object.keys(errors).length > 0) {
      throw new UncompletedUserDataException(JSON.stringify(errors))
    }
    return true;
  }

  static create(props: UserDataProps) {

    return new UserData(props)
  }

  toObject(): UserDataProps {
    return {...this.props}
  }
}
