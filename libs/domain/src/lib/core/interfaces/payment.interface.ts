import {Penalty} from "../value-objects/penalty.value-object";

export enum PaymentStart {
  START_OF_MONTH = 'START_OF_MONTH',
  START_OF_RENT = 'START_OF_RENT',
}

export enum PaymentType {
  ONE_PAYMENT = 'ONE_PAYMENT',
  TWO_PAYMENTS = 'TWO_PAYMENTS',
}

export type PaymentStartOption = {
  type: PaymentStart;
  isEnabled: boolean;
  label?: string;
}

export type PaymentTypeOption = {
  type: PaymentType;
  isEnabled: boolean;
  priceAffect: number;
  label?: string;
}

export interface PaymentProps {
  paymentStartOptions: PaymentStartOption[];
  paymentTypeOptions: PaymentTypeOption[];
  penalty?: Penalty;
}
