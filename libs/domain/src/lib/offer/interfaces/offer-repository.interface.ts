import {Offer} from "../../offer/entities/offer.entity";

export interface IOfferRepository {
  persist( offer: Offer): Promise<void>
  getAllByAuthorId( authorId: Offer['authorId']): Promise<Offer[]>
  getById( id: string): Promise<Offer>
}
