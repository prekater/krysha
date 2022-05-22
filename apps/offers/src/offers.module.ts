import {Infra} from "@bigdeal/infra";
import {Module} from '@nestjs/common';
import {AddOfferController} from "./controllers/add-offer.controller";
import {ConfigModule} from "@nestjs/config";
import {AddOfferCommand} from "./commands/add-offer.command";
import {AddOfferHandler} from "./handlers/add-offer.handler";
import {MongooseModule} from "@nestjs/mongoose";
import {CqrsModule} from "@nestjs/cqrs";


@Module({
  imports: [
    MongooseModule.forRoot(
      `${process.env.MONGO_URL}`,
      {
        useNewUrlParser: true,
      },
    ),
    CqrsModule,
    Infra.OfferPersistenceModule,
    ConfigModule.forRoot({isGlobal: true})
  ],
  controllers: [AddOfferController],
  providers: [
    AddOfferCommand,
    AddOfferHandler
  ],
})
export class OffersModule {
}
