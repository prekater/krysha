import {Injectable} from "@nestjs/common"
import {Application} from "@bigdeal/application";
import {
  ClientProxyTCP,
  CREATE_CONTRACT_COMMAND,
  EXPORT_CONTRACT_QUERY,
} from "@bigdeal/messaging";

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

  async exportContract(data: Application.ExportContractDto): Promise<Buffer> {
    const bufferObject = await this.contractsClient.send(EXPORT_CONTRACT_QUERY, data).toPromise()

    return Application.FileTransportAdapter.fromObjectToBuffer(bufferObject)
  }
}
