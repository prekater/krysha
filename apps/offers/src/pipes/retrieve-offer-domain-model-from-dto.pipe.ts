import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from "@nestjs/common";
import {Domain} from "@bigdeal/domain";
import {Infra} from "@bigdeal/infra";
import {Mappers} from "@bigdeal/mappers";

@Injectable()
export class RetrieveOfferDomainModelFromDtoPipe implements PipeTransform{

  async transform(value: Infra.Offer, { metatype }: ArgumentMetadata): Promise<Domain.Offer> {


    try {
      const domainOffer = Mappers.Offer.fromObjectToDomainModel(value)
      return domainOffer
    }
    catch (e) {
      console.error(e.message, e)
      throw new BadRequestException(e.message)
    }

  }


}
