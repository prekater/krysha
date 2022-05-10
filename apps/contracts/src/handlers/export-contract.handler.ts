import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {Infra} from "@bigdeal/infra";
import {BaseOperationResponse} from "@bigdeal/common";
import {ExportContractCommand} from "../commands/export-contract.command";

@CommandHandler(ExportContractCommand)
export class AddContractHandler implements ICommandHandler<ExportContractCommand> {
  constructor(
    private readonly exporter: Infra.Exporter
  ) {
  }

  async execute(command: ExportContractCommand): Promise<BaseOperationResponse> {
    const {contract} = command

    return await this.exporter.export(contract);
  }
}
