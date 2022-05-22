import {Controller} from '@nestjs/common';
import {MessagePattern} from "@nestjs/microservices";
import {QueryBus} from "@nestjs/cqrs";
import {
  IController,
} from "@bigdeal/common";
import {GET_OFFER_BY_ID_QUERY} from "@bigdeal/messaging";
import {GetOfferQuery} from "../queries/get-offer.query";
import {Infra} from "@bigdeal/infra";
import {Mappers} from "@bigdeal/mappers";


type Payload = {
  ID: string
}

@Controller()
export class GetOfferController implements IController<Payload, Infra.Offer> {

  constructor(private readonly queryBus: QueryBus) {
  }

  @MessagePattern(GET_OFFER_BY_ID_QUERY)
  async handle(payload: Payload): Promise<Infra.Offer> {
    const response = await this.queryBus.execute(new GetOfferQuery(payload.ID));

    return Mappers.Offer.fromDomainModelToPersistenceModel(response)
  }

}



