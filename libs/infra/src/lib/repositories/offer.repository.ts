import {Model} from "mongoose";
import {Injectable, Logger} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Infra} from "../schemas/offer.schema";

@Injectable()
export class OfferRepository {

  private readonly logger = new Logger(OfferRepository.name);


  constructor(
    @InjectModel(Infra.Offer.name)
    private readonly offers: Model<Infra.Offer>,
  ) {
  }
}
