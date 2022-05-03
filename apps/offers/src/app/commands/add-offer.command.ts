import {Domain} from "@bigdeal/domain";

export class AddOfferCommand {
  constructor(
    public readonly offer: Domain.Offer
  ) {
  }
}
