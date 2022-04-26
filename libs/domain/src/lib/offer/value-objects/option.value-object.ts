import {IValueObject} from "../../core/value-object";
import {OptionProps} from "../interfaces/option.interface";

export class Option implements IValueObject {

  private constructor(private props: OptionProps) {
  }

  get title() {
    return this.props.title
  }
  get isEnabled() {
    return this.props.isEnabled;
  }
  static create(props: OptionProps) {
    return new Option(props)
  }
}
