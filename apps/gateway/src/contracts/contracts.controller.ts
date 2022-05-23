import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {BaseOperationResponse} from "@bigdeal/common";
import {Infra} from "@bigdeal/infra";
import {Application} from "@bigdeal/application";
import {ContractsService} from "./contracts.service";


@Controller('api/contracts')
export class ContractsController {

  constructor(private contractsService: ContractsService) {
  }

  @Post()
  async createContract(@Body() createContractDto: Application.CreateContractDto): Promise<BaseOperationResponse> {

    return await this.contractsService.createContract(createContractDto)
  }

  @Get(':id')
  async findContract(@Param('id') id: Application.SearchContractByIdDto['contractId']): Promise<Infra.Contract> {

    const contract =  await this.contractsService.getById(id);

    return contract
  }


}
