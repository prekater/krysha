import {Injectable} from "@nestjs/common"
import {Application} from "@bigdeal/application";
import {
  ClientProxyTCP,
  ADD_CONTRACT_COMMAND,
  EXPORT_CONTRACT_QUERY,
  GET_CONTRACT_BY_ID_QUERY
} from "@bigdeal/messaging";

@Injectable()
export class ContractsService {
  private readonly contractsClient = this.proxy.getClientProxyContractsInstance()

  constructor(
    private readonly proxy: ClientProxyTCP
  ) {}

  async addContract(addContractDto: Application.AddContractDto) {
    return await this.contractsClient.send(ADD_CONTRACT_COMMAND, addContractDto).toPromise();
  }

  async exportContract(ID: Application.SearchContractByIdDto['contractId']) {
    return await this.contractsClient.send(EXPORT_CONTRACT_QUERY, {ID}).toPromise();
  }

  async getById(ID: Application.SearchContractByIdDto['contractId']) {
    return await this.contractsClient.send(GET_CONTRACT_BY_ID_QUERY, {ID}).toPromise();
  }
}
