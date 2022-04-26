import {IValueObject} from "../../core/value-object";
import {PeriodUnit, TermProps} from "../interfaces/term.interface";

// 1 per contract
export class Term implements IValueObject{

  private props: TermProps;

  private constructor(props: TermProps) {
    props.periodUnit = props.periodUnit || PeriodUnit.DAY

    this.props = props
  }

  get price() {
    return this.props.price
  }

  static create(props: TermProps) {
    return new Term(props)
  }

}
