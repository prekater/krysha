import {Controller, UsePipes} from '@nestjs/common';
import {MessagePattern} from "@nestjs/microservices";
import {CommandBus} from "@nestjs/cqrs";
import {
  IController,
  BaseOperationResponse,
} from "@bigdeal/common";
import {CREATE_CONTRACT_COMMAND} from "@bigdeal/messaging";
import {Domain} from "@bigdeal/domain";
import {CreateContractCommand} from "../commands/create-contract.command";
import {RetrieveContractDomainModelFromOffer} from "../pipes/retrieve-contract-domain-model-by-id.pipe";


@Controller()
export class CreateContractController implements IController<Domain.Contract, BaseOperationResponse> {

  constructor(
    private readonly commandBus: CommandBus,
    ) {
  }

  @UsePipes(RetrieveContractDomainModelFromOffer)
  @MessagePattern(CREATE_CONTRACT_COMMAND)
  async handle(contract: Domain.Contract): Promise<BaseOperationResponse> {
    return await this.commandBus.execute(new CreateContractCommand(contract));
  }

}



