import {Controller, UsePipes} from '@nestjs/common';
import {MessagePattern} from "@nestjs/microservices";
import {CommandBus} from "@nestjs/cqrs";
import {
  IController,
  BaseOperationResponse,
} from "@bigdeal/common";
import {EXPORT_CONTRACT_QUERY} from "@bigdeal/messaging";
import {Domain} from "@bigdeal/domain";
import {RetrieveContractDomainModelById} from "../pipes/retrieve-contract-domain-model-from-dto.pipe";
import {ExportContractCommand} from "../commands/export-contract.command";


@Controller()
export class ExportContractController implements IController<Domain.Contract, BaseOperationResponse> {

  constructor(
    private readonly commandBus: CommandBus,
    ) {
  }

  @UsePipes(RetrieveContractDomainModelById)
  @MessagePattern(EXPORT_CONTRACT_QUERY)
  async handle(contract: Domain.Contract): Promise<BaseOperationResponse> {
    return await this.commandBus.execute(new ExportContractCommand(contract));
  }

}



