import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {Infra} from "@bigdeal/infra";
import {BaseOperationResponse} from "@bigdeal/common";
import {CreateContractCommand} from "../commands/create-contract.command";

@CommandHandler(CreateContractCommand)
export class CreateContractHandler implements ICommandHandler<CreateContractCommand> {
  constructor(
    private readonly contractsRepo: Infra.ContractRepository
  ) {}

  async execute(command: CreateContractCommand): Promise<BaseOperationResponse> {
    const { contract } = command

    const result = await this.contractsRepo.persist(contract)

    return result;
  }
}
