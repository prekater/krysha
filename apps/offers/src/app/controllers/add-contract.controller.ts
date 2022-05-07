import {Controller, UsePipes} from '@nestjs/common';
import {MessagePattern} from "@nestjs/microservices";
import {CommandBus} from "@nestjs/cqrs";
import {
  IController,
  BaseOperationResponse,
} from "@bigdeal/common";
import {CONVERT_OFFER_COMMAND} from "@bigdeal/messaging";
import {AddContractCommand} from "../commands/add-contract.command";
import {Domain} from "@bigdeal/domain";
import {RetrieveContractDomainModelFromDto} from "../pipes/retrieve-contract-domain-model-from-dto.service";


@Controller()
export class AddContractController implements IController<Domain.Contract, BaseOperationResponse> {

  constructor(
    private readonly commandBus: CommandBus,
    ) {
  }

  @UsePipes(RetrieveContractDomainModelFromDto)
  @MessagePattern(CONVERT_OFFER_COMMAND)
  async handle(contract: Domain.Contract): Promise<BaseOperationResponse> {
    return await this.commandBus.execute(new AddContractCommand(contract));
  }

}



