import {Penalty} from "../value-objects/penalty.value-object";


export enum PaymentStart {
  START_OF_MONTH = 'START_OF_MONTH',
  START_OF_RENT = 'START_OF_RENT',
}

export enum PaymentType {
  ONE_PAYMENT = 'ONE_PAYMENT',
  TWO_PAYMENTS = 'TWO_PAYMENTS',
}

export interface PaymentProps {
  type: PaymentType;
  paymentStart: PaymentStart;
  penalty: Penalty;
}
