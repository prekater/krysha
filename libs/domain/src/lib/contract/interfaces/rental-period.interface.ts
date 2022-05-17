import {Moment} from "moment";

export interface RentalPeriodProps<T = Moment | string> {
  rentalStart: T;
  rentalEnd: T;
}

