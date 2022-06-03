import {IValueObject} from "../value-object";
import {UncompletedTerminationRulesException} from "../../contract/exceptions/uncompleted-termination-rules.exception";
import {TerminationRuleProps} from "../interfaces/termination-rule.interface";
import {PeriodUnit, PriceUnit} from "../interfaces/term.interface";

export class TerminationRule implements IValueObject {


  get value() {
    return this.props.value
  }

  get periodUnit() {
    return this.props.periodUnit
  }

  get period() {
    return this.props.period
  }

  get currency() {
    return this.props.currency
  }

  constructor(private readonly props: TerminationRuleProps) {
  }

  static validate(props: TerminationRuleProps) {

    if (
      typeof props.value !== 'number' ||
      typeof props.period !== 'number' ||
      props.value < 1 ||
      props.period < 1 ||
      !(Object.values(PeriodUnit).includes(props.periodUnit)) ||
      !(Object.values(PriceUnit).includes(props.currency))
    )
      throw new UncompletedTerminationRulesException()

    return true;
  }

  static create(props: TerminationRuleProps) {
    props.value = Number(props.value)
    props.period = Number(props.period)

    TerminationRule.validate(props)
    return new TerminationRule(props)
  }

  toObject(): TerminationRuleProps {
    return {...this.props}
  }
}
