import {Domain} from "../entities/offer.entity";

export class OfferPublishedEvent {
  constructor(
    public readonly offer: Domain.Offer,
  ) {}
}
