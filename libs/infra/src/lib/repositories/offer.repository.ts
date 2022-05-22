import {Model} from "mongoose";
import {Injectable, Logger} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Mappers} from "@bigdeal/mappers";
import {Domain} from "@bigdeal/domain";
import * as Infra from "../schemas/offer.schema";
import {BaseOperationResponse} from "@bigdeal/common";

@Injectable()
export class OfferRepository implements Domain.IOfferRepository {

  private readonly logger = new Logger(OfferRepository.name);

  constructor(
    @InjectModel(Infra.Offer.name)
    private readonly offers: Model<Infra.Offer>,
  ) {
  }


  public async persist(offer: Domain.Offer): Promise<BaseOperationResponse> {

    try {
      const persistenceViewOffer = Mappers.Offer.fromDomainModelToPersistenceModel(offer)

      await this.offers.updateOne({ID: persistenceViewOffer.ID}, persistenceViewOffer, {upsert: true})
      return {result: true, resourceId: offer.ID.toString()}
    } catch (e) {
      this.logger.error(e.message)
      console.error(e.stack)
      return {result: false}
    }
  }

  public async getAllByAuthorId(authorId: Domain.Offer['authorId']): Promise<Domain.Offer[]> {

    try {
      const offersDbView = await this.offers.find({authorId}).lean().exec();

      return offersDbView.map(
        o => Mappers.Offer.fromObjectToDomainModel(o)
      )
    } catch (e) {
      this.logger.error(e.message)
      console.error(e.stack)
      return []
    }


  }

  public async getById(ID: string): Promise<Domain.Offer> {

    try {
      const offerDbView = await this.offers
        .findOne({ID})
        .lean()
        .exec();

      return Mappers.Offer.fromObjectToDomainModel(offerDbView)
    } catch (e) {
      this.logger.error(e.message)
      console.error(e.stack)
      return null
    }

  }
}
