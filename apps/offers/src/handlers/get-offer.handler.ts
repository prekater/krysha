import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {Infra} from "@bigdeal/infra";
import {GetOfferQuery} from "../queries/get-offer.query";
import {Domain} from "@bigdeal/domain";

@QueryHandler(GetOfferQuery)
export class GetOfferHandler implements IQueryHandler<GetOfferQuery> {
  constructor(private repository: Infra.OfferRepository) {
  }

  async execute(query: GetOfferQuery): Promise<Domain.Offer> {
    const {ID} = query;

    const result = await this.repository.getById(ID);

    return result
  }

}
