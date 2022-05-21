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
  async addContract(@Body() addContractDto: Application.AddContractDto): Promise<BaseOperationResponse> {
    return await this.contractsService.addContract(addContractDto)
  }

  @Get(':id')
  async findContract(@Param('id') id: Application.SearchContractByIdDto['contractId']): Promise<Infra.Contract> {
    return await this.contractsService.getById(id);
  }

  @Get(':id/export')
  async exportContract(@Param('id') id: Application.SearchContractByIdDto['contractId']): Promise<Infra.Contract> {
    return await this.contractsService.exportContract(id);
  }

}
