import {Infra} from "@bigdeal/infra";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {AddContractCommand} from "../commands/add-contract.command";

@CommandHandler(AddContractCommand)
export class AddContractHandler implements ICommandHandler<AddContractCommand> {
  constructor(
    private readonly exporter: Infra.Exporter
  ) {}

  async execute(command: AddContractCommand): Promise<void> {

    const { contract } = command

    await contract.export(this.exporter)

  }
}
