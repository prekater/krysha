import {DATE_FORMAT} from "@bigdeal/common";
import {Moment as IMoment} from "moment";
import * as moment from 'moment'
import {IValueObject} from "../../core/value-object";
import {RentalPeriodProps} from "../interfaces/rental-period.interface";
import {UncompletedRentalPeriodException} from "../exceptions/uncompleted-rental-period.exception";
import {PeriodUnit} from "../../core/interfaces/term.interface";
import {Validator} from "../../core/validator";

export class RentalPeriod implements IValueObject {

  get rentalStart(): IMoment {
    return this.props.rentalStart
  }

  get rentalEnd(): IMoment {
    return this.props.rentalEnd
  }

  duration(unit: PeriodUnit) {

    // @ts-ignore
    return this.rentalEnd.diff(this.rentalStart, unit)
  }

  private constructor(private readonly props: RentalPeriodProps<IMoment>) {
  }

  static validate(props: RentalPeriodProps<IMoment>) {

    const schema = {
      rentalStart: props.rentalStart.isValid(),
      rentalEnd: props.rentalEnd.isValid(),
      // @ts-ignore
      rentalStartMoreThanNow: moment().diff(props.rentalStart) <= 0,
      rentalEndMoreThanStart: props.rentalEnd.diff(props.rentalStart) > 0
    }

    const errors = Validator.validateAgainstSchema(schema)
    if (Object.keys(errors).length > 0) {
      throw new UncompletedRentalPeriodException(JSON.stringify(errors))
    }
    return true;
  }

  static create(props: RentalPeriodProps<IMoment>) {
    RentalPeriod.validate(props)
    return new RentalPeriod(props)
  }

  toObject(): RentalPeriodProps<string> {
    return {
      rentalStart: this.rentalStart.format(DATE_FORMAT).toString(),
      rentalEnd: this.rentalEnd.format(DATE_FORMAT).toString(),
    }
  }
}
