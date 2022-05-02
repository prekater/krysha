import {Domain} from "../entities/offer.entity";

export interface IOfferRepository {
  persist( offer: Domain.Offer): Promise<void>
  getAllByAuthorId( authorId: Domain.Offer['authorId']): Promise<Domain.Offer[]>
  getById( id: Domain.Offer['ID']): Promise<Domain.Offer>
}
