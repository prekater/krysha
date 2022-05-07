import {Offer} from "../entities/offer.entity";

export class OfferPublishedEvent {
  constructor(
    public readonly offer: Offer,
  ) {}
}
