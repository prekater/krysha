import {Injectable} from "@nestjs/common"
import {Application} from "@bigdeal/application";
import {
  ClientProxyTCP,
  CREATE_CONTRACT_COMMAND,
  GET_CONTRACT_BY_ID_QUERY
} from "@bigdeal/messaging";

@Injectable()
export class ContractsService {
  private readonly contractsClient = this.proxy.getClientProxyContractsInstance()

  constructor(
    private readonly proxy: ClientProxyTCP
  ) {}

  async createContract(createContractDto: Application.CreateContractDto) {

    return await this.contractsClient.send(CREATE_CONTRACT_COMMAND, createContractDto).toPromise();
  }

  async getById(ID: Application.SearchContractByIdDto['contractId']) {
    return await this.contractsClient.send(GET_CONTRACT_BY_ID_QUERY, {ID}).toPromise();
  }
}
