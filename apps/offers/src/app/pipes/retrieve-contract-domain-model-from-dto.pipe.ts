import {ArgumentMetadata, BadRequestException, Injectable, NotFoundException, PipeTransform} from "@nestjs/common";
import {Domain} from "@bigdeal/domain";
import {Infra} from "@bigdeal/infra";
import {AddContractDto} from "../dto/add-contract.dto";

@Injectable()
export class RetrieveContractDomainModelFromDtoPipe implements PipeTransform {


  constructor(
    private readonly offerRepository: Infra.OfferRepository) {
  }

  async transform(value: AddContractDto, {metatype}: ArgumentMetadata): Promise<Domain.Contract> {

    const offer = await this.offerRepository.getById(value.offerId)
    if (!offer) throw new NotFoundException()

    try {
      return Domain.Contract.fromOffer(offer, value.termId)
    } catch (e) {
      throw new BadRequestException()
    }

  }

}
