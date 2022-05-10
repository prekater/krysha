import {Domain} from "@bigdeal/domain";

export class ExportContractCommand {
  constructor(public contract: Domain.Contract) {
  }
}
