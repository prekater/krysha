import {Penalty} from "../../core/value-objects/penalty.value-object";
import {PaymentStart, PaymentType} from "../../core/interfaces/payment.interface";

export type PaymentOptionProps<T> = {
  id: string;
  type: T;
  priceAffect: number;
  label?: string;
}
export type PaymentStartOptionProps = PaymentOptionProps<PaymentStart>
export type PaymentTypeOptionProps = PaymentOptionProps<PaymentType>


export interface PaymentConfiguratorProps {
  penalty: Penalty;
  paymentTypeOptions: PaymentTypeOptionProps[];
  paymentStartOptions: PaymentStartOptionProps[];
}
