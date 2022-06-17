import {IValueObject} from "../value-object";
import {PenaltyProps, PenaltyType} from "../interfaces/penalty.interface";
import {UncompletedPenaltyException} from "../../offer/exceptions/uncompleted-penalty.exception";

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

  get type() {
    return this.props.type
  }

  toObject() {
    return {...this.props}
  }

  static create(props: PenaltyProps) {
    props.value = Number(props.value)
    props.start = Number(props.start)

    Penalty.validate(props)
    return new Penalty(props)
  }

  static validate(props: PenaltyProps) {

    if (
      props.type === PenaltyType.ABSENT || (typeof props.value === 'number' && props.value >= 0 &&
      (Object.values(PenaltyType).includes(props.type)) &&
      typeof props.value === 'number' && props.start > 0)
    ) return true;

    throw new UncompletedPenaltyException()
  }
}
