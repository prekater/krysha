import {IValueObject} from "../../core/value-object";
import {PenaltyProps, PenaltyType} from "../interfaces/penalty.interface";
import {UncompletedPenaltyException} from "../exceptions/uncompleted-penalty.exception";

export class Penalty implements IValueObject {

  private constructor(private props: PenaltyProps) {
  }

  get value() {
    return this.props.value
  }
  get currency() {
    return this.props.currency
  }

  get start() {
    return this.props.start
  }

  get type () {
    return this.props.type
  }

  toObject() {
    return {...this.props}
  }
  static create(props: PenaltyProps) {
    Penalty.validate(props)
    return new Penalty(props)
  }


  static validate(props: PenaltyProps) {

    if (
      typeof  props.value === 'number' && props.value >=0 &&
      (Object.values(PenaltyType).includes(props.type)) &&
      props.start > 0
    ) return true;

    throw new UncompletedPenaltyException()
  }
}
