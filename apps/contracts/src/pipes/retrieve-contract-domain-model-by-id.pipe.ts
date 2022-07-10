import {ArgumentMetadata, BadRequestException, Injectable, NotFoundException, PipeTransform} from "@nestjs/common";
import {Domain} from "@bigdeal/domain";
import {Infra} from "@bigdeal/infra";
import {Mappers} from "@bigdeal/mappers";
import {Application} from "@bigdeal/application";

@Injectable()
export class RetrieveContractDomainModelFromOffer implements PipeTransform {

  constructor(
    private readonly offerRepository: Infra.OfferRepository) {
  }

  async transform(value: Application.CreateContractDto, {metatype}: ArgumentMetadata): Promise<Domain.Contract> {

    const offer = await this.offerRepository.getById(value.offerId)
    if (!offer) throw new NotFoundException()

    try {
      return Mappers.Contract.fromOfferToDomainModel(
        offer,
        value.termId,
        value.rentalStart,
        value.rentalEnd,
        value.depositOption,
        value.paymentStartOption,
        value.paymentTypeOption,
      )
    } catch (e) {
      console.log(e)

      throw new BadRequestException()
    }

  }

}
