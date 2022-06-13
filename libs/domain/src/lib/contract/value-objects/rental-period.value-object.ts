import {DATE_FORMAT} from "@bigdeal/common";
import {Moment as IMoment} from "moment";
import * as moment from 'moment'
import {IValueObject} from "../../core/value-object";
import {RentalPeriodProps} from "../interfaces/rental-period.interface";
import {UncompletedRentalPeriodException} from "../exceptions/uncompleted-rental-period.exception";
import {PeriodUnit} from "../../core/interfaces/term.interface";

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

  constructor(private readonly props: RentalPeriodProps<IMoment>) {
  }

  static validate(props: RentalPeriodProps<IMoment>) {

    console.log(moment().diff(props.rentalStart), props.rentalEnd.diff(props.rentalStart))
    if (moment().diff(props.rentalStart) <= 0 &&
      props.rentalEnd.diff(props.rentalStart) > 0) return true

    throw new UncompletedRentalPeriodException()
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
