import {Module} from "@nestjs/common"
import {OfferRepository} from "../repositories/offer.repository";
import {MongooseModule} from "@nestjs/mongoose";
import {Infra} from "../schemas/offer.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Infra.Offer.name, schema: Infra.OfferSchema},
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
