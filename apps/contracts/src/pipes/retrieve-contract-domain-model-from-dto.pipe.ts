import {ArgumentMetadata, Injectable, NotFoundException, PipeTransform} from "@nestjs/common";
import {Domain} from "@bigdeal/domain";
import {Infra} from "@bigdeal/infra";
import {SearchContractByIdDto} from "../../../../libs/application/src/lib/dto/search-contract-by-id.dto";

@Injectable()
export class RetrieveContractDomainModelById implements PipeTransform {


  constructor(
    private readonly contractRepository: Infra.ContractRepository) {
  }

  async transform(value: SearchContractByIdDto, {metatype}: ArgumentMetadata): Promise<Domain.Contract> {

    const contract = await this.contractRepository.getById(value.contractId)
    if (!contract) throw new NotFoundException()

    return contract
  }

}
