import {ArgumentMetadata, BadRequestException, Injectable, NotFoundException, PipeTransform} from "@nestjs/common";
import {Domain} from "@bigdeal/domain";
import {Infra} from "@bigdeal/infra";
import {Application} from "@bigdeal/application";
import {Mappers} from "@bigdeal/mappers";

@Injectable()
export class RetrieveContractDomainModelById implements PipeTransform {

  constructor(
    private readonly contractRepository: Infra.ContractRepository) {
  }

  async transform(value: Application.ExportContractDto, {metatype}: ArgumentMetadata): Promise<Domain.Contract> {

    const contract = await this.contractRepository.getById(value.contractId)
    if (!contract) throw new NotFoundException()

    try {
      const landlord = Mappers.UserData.fromObjectToDomainModel(value.landlord)
      const employer = Mappers.UserData.fromObjectToDomainModel(value.employer)

      contract.fillUsersData({
        landlord,
        employer
      })


    } catch (e) {
      console.error(e.message, e)
      throw new BadRequestException(e.message)
    }

    return contract
  }

}
