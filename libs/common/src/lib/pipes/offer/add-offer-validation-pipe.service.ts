import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {Infra} from "@bigdeal/infra";
import {OfferType} from "@bigdeal/domain";

@Injectable()

export class OfferDraftStatusPipe implements PipeTransform{

  async transform(value: Infra.Offer, { metatype }: ArgumentMetadata): Promise<Infra.Offer> {
    value.type = OfferType.DRAFT

    return value;
  }

}
