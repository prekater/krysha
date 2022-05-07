import {Module} from "@nestjs/common"
import {OfferRepository} from "../repositories/offer.repository";
import {MongooseModule} from "@nestjs/mongoose";
import {Offer, OfferSchema} from "../schemas/offer.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Offer.name, schema: OfferSchema},
    ]),
  ],
  providers: [
    OfferRepository
  ],
  exports: [
    OfferRepository
  ],
})
export class OfferPersistenceModule {
}
