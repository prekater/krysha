export enum PenaltyType {
  ABSENT = 'ABSENT',
  ABSENT_WITH_EXTRA_CHARGE = 'ABSENT_WITH_EXTRA_CHARGE',
  FIX_FOR_EVERY_DAY = 'FIX_FOR_EVERY_DAY',

}
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
  penalty: PenaltyType;
}
