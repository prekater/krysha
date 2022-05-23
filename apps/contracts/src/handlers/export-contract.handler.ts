import { IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {Infra} from "@bigdeal/infra";
import {BaseOperationResponse} from "@bigdeal/common";
import {ExportContractQuery} from "../queries/export-contract.query";

@QueryHandler(ExportContractQuery)
export class ExportContractHandler implements IQueryHandler<ExportContractQuery> {
  constructor(
    private readonly exporter: Infra.Exporter
  ) {
  }

  async execute(query: ExportContractQuery): Promise<BaseOperationResponse> {
    const {contract} = query

    const stream =  await this.exporter.export(contract);

    return stream
  }
}
