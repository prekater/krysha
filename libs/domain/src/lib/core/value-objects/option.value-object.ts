import {IValueObject} from "../value-object";
import {OptionProps} from "../interfaces/option.interface";
import {UncompletedOptionException} from "../../offer/exceptions/uncompleted-option.exception";

export class Option implements IValueObject {

  private constructor(private props: OptionProps) {
  }

  get title() {
    return this.props.title
  }

  get isEnabled() {
    return this.props.isEnabled;
  }

  toObject() {
    return {...this.props}
  }

  static create(props: OptionProps) {
    Option.validate(props)
    return new Option(props)
  }

  static validate(props: OptionProps) {
    if (props.title.length > 0 && typeof props.isEnabled === 'boolean') return true;
    throw new UncompletedOptionException()
  }
}
