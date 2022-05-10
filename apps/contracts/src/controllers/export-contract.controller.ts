import {Controller, UsePipes} from '@nestjs/common';
import {MessagePattern} from "@nestjs/microservices";
import {CommandBus} from "@nestjs/cqrs";
import {
  IController,
  BaseOperationResponse,
} from "@bigdeal/common";
import {ADD_CONTRACT_COMMAND, EXPORT_CONTRACT_COMMAND} from "@bigdeal/messaging";
import {AddContractCommand} from "../commands/add-contract.command";
import {Domain} from "@bigdeal/domain";

import {RetrieveContractDomainModelFromOffer} from "../pipes/retrieve-contract-domain-model-by-id.pipe";
import {RetrieveContractDomainModelById} from "../pipes/retrieve-contract-domain-model-from-dto.pipe";


@Controller()
export class ExportContractController implements IController<Domain.Contract, BaseOperationResponse> {

  constructor(
    private readonly commandBus: CommandBus,
    ) {
  }

  @UsePipes(RetrieveContractDomainModelById)
  @MessagePattern(EXPORT_CONTRACT_COMMAND)
  async handle(contract: Domain.Contract): Promise<BaseOperationResponse> {
    return await this.commandBus.execute(new AddContractCommand(contract));
  }

}



