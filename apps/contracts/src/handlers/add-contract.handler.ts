import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {Infra} from "@bigdeal/infra";
import {AddContractCommand} from "../commands/add-contract.command";
import {BaseOperationResponse} from "@bigdeal/common";

@CommandHandler(AddContractCommand)
export class AddContractHandler implements ICommandHandler<AddContractCommand> {
  constructor(
    private readonly contractsRepo: Infra.ContractRepository
  ) {}

  async execute(command: AddContractCommand): Promise<BaseOperationResponse> {
    const { contract } = command

    const result = await this.contractsRepo.persist(contract)

    return result;
  }
}
