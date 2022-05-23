import {Controller, UsePipes} from '@nestjs/common';
import {MessagePattern} from "@nestjs/microservices";
import {QueryBus} from "@nestjs/cqrs";
import {
  IController,
} from "@bigdeal/common";
import {EXPORT_CONTRACT_QUERY} from "@bigdeal/messaging";
import {Domain} from "@bigdeal/domain";
import {RetrieveContractDomainModelById} from "../pipes/retrieve-contract-domain-model-from-dto.pipe";
import {ExportContractQuery} from "../queries/export-contract.query";
import {Observable} from "rxjs";
import {Application} from "@bigdeal/application";


@Controller()
export class ExportContractController implements IController<Domain.Contract, Buffer> {

  constructor(
    private readonly queryBus: QueryBus,
  ) {
  }

  @UsePipes(RetrieveContractDomainModelById)
  @MessagePattern(EXPORT_CONTRACT_QUERY)
  async handle(contract: Domain.Contract): Promise<Buffer> {

    const stream = await this.queryBus.execute(new ExportContractQuery(contract));

    return await Application.FileTransportAdapter.fromStreamToBuffer(stream)
  }

}



