import {useField} from "react-final-form-hooks";

export const usePayments = (form) =>
{
  return ['paymentStart', 'paymentType', 'penalty.currency', 'penalty.start', 'penalty.value', 'penalty.type']
    .map(key => useField(`payment.${key}`, form))
}
