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
      const user1 = Mappers.UserData.fromObjectToDomainModel(value.user1)
      const user2 = Mappers.UserData.fromObjectToDomainModel(value.user2)

      contract.fillUsersData({
        user1,
        user2
      })


    } catch (e) {
      console.error(e.message, e)
      throw new BadRequestException(e.message)
    }

    return contract
  }

}
