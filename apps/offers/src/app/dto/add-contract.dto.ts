import {Domain} from "@bigdeal/domain";

export type AddContractDto =  {
  offerId: Domain.Offer["ID"];
  termId: string;
}
