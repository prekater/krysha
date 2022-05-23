import {Body, Controller, Get, Param, Post, Res, StreamableFile, Response} from "@nestjs/common";
import {BaseOperationResponse} from "@bigdeal/common";
import {Application} from "@bigdeal/application";
import {ContractsService} from "./contracts.service";
import {createReadStream} from "fs";


@Controller('api/contracts')
export class ContractsController {

  constructor(private contractsService: ContractsService) {
  }

  @Post()
  async createContract(@Body() createContractDto: Application.CreateContractDto): Promise<BaseOperationResponse> {

    return await this.contractsService.createContract(createContractDto)
  }

  @Get(':id/export')
  async exportContract(
    @Param('id') id: Application.SearchContractByIdDto['contractId'],
  ) {

    const file = await this.contractsService.exportContract(id);

    return new StreamableFile(file as any);
  }


}
