
//todo: validate with class-validator

import {Domain} from "@bigdeal/domain";

export type CreateContractDto =  {
  offerId: string;
  termId: string;
  rentalStart: string;
  rentalEnd: string;
  renter: string;
  landlord: string;
  depositOption: Domain.DepositCollectOptionType;
  paymentStartOption: Domain.PaymentStart;
  paymentTypeOption: Domain.PaymentType;
}
