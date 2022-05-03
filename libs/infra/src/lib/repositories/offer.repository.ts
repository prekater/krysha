import {Model} from "mongoose";
import {Injectable, Logger} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Mappers} from "@bigdeal/mappers";
import {Domain, IOfferRepository} from "@bigdeal/domain";
import {Infra} from "../schemas/offer.schema";

@Injectable()
export class OfferRepository implements IOfferRepository{

  private readonly logger = new Logger(OfferRepository.name);

  constructor(
    @InjectModel(Infra.Offer.name)
    private readonly offers: Model<Infra.Offer>,
  ) {
  }


  public async persist(offer: Domain.Offer): Promise<void> {

    try {
      const persistenceViewOffer = Mappers.Offer.fromDomainModelToPersistenceModel(offer)

      await this.offers.updateOne({ID: persistenceViewOffer.ID},persistenceViewOffer, {upsert: true})
    }
   catch (e) {
     this.logger.error(e.message)
     console.error(e.stack)
   }
  }

  public async getAllByAuthorId(authorId: Domain.Offer['authorId']): Promise<Domain.Offer[]> {

    try {
      const offersDbView = await this.offers.find({authorId}).lean().exec();

      return offersDbView.map(
        o => Mappers.Offer.fromObjectToDomainModel(o)
      )
    }
    catch (e) {
      this.logger.error(e.message)
      console.error(e.stack)
      return []
    }


  }

  public async getById(ID: Domain.Offer['ID']): Promise<Domain.Offer> {

    try {
      const offerDbView = await this.offers
        .findOne({ID})
        .lean()
        .exec();

      return Mappers.Offer.fromObjectToDomainModel(offerDbView)
    }
    catch (e) {
      this.logger.error(e.message)
      console.error(e.stack)
      return null
    }

  }
}
