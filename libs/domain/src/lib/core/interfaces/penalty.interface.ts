import {PriceUnit} from "./term.interface";

export enum PenaltyType {
  ABSENT = 'ABSENT',
  ABSENT_WITH_EXTRA_CHARGE = 'ABSENT_WITH_EXTRA_CHARGE',
  FIX_FOR_EVERY_DAY = 'FIX_FOR_EVERY_DAY',

}

export interface PenaltyProps {
  type: PenaltyType;
  currency: PriceUnit;
  value: number;
  start: number;
}
