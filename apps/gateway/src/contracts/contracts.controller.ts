import {Body, Controller, Get, Param, Post, StreamableFile, Response} from "@nestjs/common";
import {BaseOperationResponse} from "@bigdeal/common";
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

  @Get(':id/export')
  async exportContract(
    @Param('id') id: Application.SearchContractByIdDto['contractId'],
    @Response({ passthrough: true }) res
  ) {

    const file = await this.contractsService.exportContract(id);

    res.set({
      'Content-Type': 'application/pdf',
    });
    // @ts-ignore
    return new StreamableFile(file);
  }

}
