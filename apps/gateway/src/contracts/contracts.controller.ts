import {Body, Controller, Get, Param, Post, StreamableFile, Response, Query} from "@nestjs/common";
import {BaseOperationResponse} from "@bigdeal/common";
import {Application} from "@bigdeal/application";
import {ContractsService} from "./contracts.service";
import {ExportContractDto} from "../../../../libs/application/src/lib/dto/export-contract.dto";


@Controller('api/contracts')
export class ContractsController {

  constructor(private contractsService: ContractsService) {
  }

  @Post()
  async createContract(@Body() createContractDto: Application.CreateContractDto): Promise<BaseOperationResponse> {

    return await this.contractsService.createContract(createContractDto)
  }

  @Post(':id/export')
  async exportContract(
    @Param('id') contractId: Application.SearchContractByIdDto['contractId'],
    @Body() userData: Omit<Application.ExportContractDto, 'contractId'>,
    @Response({ passthrough: true }) res
  ) {

    const file = await this.contractsService.exportContract({
      contractId,
      ...userData
    });

    res.set({
      'Content-Type': 'application/pdf',
    });
    // @ts-ignore
    return new StreamableFile(file);
  }

}
