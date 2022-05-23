import {Injectable} from "@nestjs/common"
import {Application} from "@bigdeal/application";
import {
  ClientProxyTCP,
  CREATE_CONTRACT_COMMAND,
  EXPORT_CONTRACT_QUERY,
} from "@bigdeal/messaging";
import * as Stream from "stream";
import {interval, lastValueFrom} from 'rxjs';

@Injectable()
export class ContractsService {
  private readonly contractsClient = this.proxy.getClientProxyContractsInstance()

  constructor(
    private readonly proxy: ClientProxyTCP
  ) {
  }

  async createContract(createContractDto: Application.CreateContractDto) {

    return await this.contractsClient.send(CREATE_CONTRACT_COMMAND, createContractDto).toPromise();
  }

  async exportContract(ID: Application.SearchContractByIdDto['contractId']): Promise<Buffer> {
    const bufferObject = await this.contractsClient.send(EXPORT_CONTRACT_QUERY, {contractId: ID}).toPromise()

    return Application.FileTransportAdapter.fromObjectToBuffer(bufferObject)
  }
}
