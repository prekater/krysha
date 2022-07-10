import {IValueObject} from "../value-object";
import {
  DepositCollectOptionType,
  DepositProps,
} from "../interfaces/deposit.interface";
import {UncompletedDepositException} from "../../offer/exceptions/uncompleted-deposit.exception";
import * as _ from 'lodash'
import {Validator} from "../validator";

export class Deposit implements IValueObject {

  private constructor(private props: DepositProps) {
  }

  get isEnabled(): boolean {
    return this.props.isEnabled
  }

  get value() {
    return this.props.value
  }

  get priceAffect(): number {
    return this.collectOptions.reduce(
      (sum, option) => sum + option.priceAffect, 0
    )
  }

  get collectOptions() {
    return this.props.collectOptions
  }


  get returnType() {
    return this.props.returnType
  }

  get returnPeriod() {
    return this.props.returnPeriod
  }

  get returnPeriodUnit() {
    return this.props.returnPeriodUnit
  }

  public enableCollectOption(option: DepositCollectOptionType) {
    const depositOption = this.collectOptions.find(o => o.type === option)

    if (depositOption) {
      this.collectOptions.forEach(o => {
        o.isEnabled = false
      })
      depositOption.isEnabled = true
    }
  }

  toObject() {
    return {...this.props}
  }

  static create(props: DepositProps) {
    props.value = Number(props.value)
    props.returnPeriod = Number(props.returnPeriod) || 0

    Deposit.validate(props)
    return new Deposit(props)
  }

  static validate(props: DepositProps) {

    const schema = {
      isEnabled_or_correct_value: !props.isEnabled || props.value >= 0 && props.returnPeriod >= 0,
      // returnPeriodUnit: Object.values(PeriodUnit).includes(props.returnPeriodUnit),
      // depositReturnType: Object.values(DepositReturnType).includes(props.returnType),
      collectOptions: props.collectOptions.every(o => Object.values(DepositCollectOptionType).includes(o.type)),
      collectOptionsUniqueness: _.uniqBy(props.collectOptions, 'type').length === props.collectOptions.length
      //todo: split deposit rules for options for offer/contract

      // props.collectOptions.filter(o => o.isEnabled).length <= 1 &&
    }
    const errors = Validator.validateAgainstSchema(schema)

    if (Object.keys(errors).length === 0) return true

    throw new UncompletedDepositException(JSON.stringify(errors))
  }
}
