import {Domain} from "@bigdeal/domain";

export class CreateContractCommand {
  constructor(public contract: Domain.Contract) {
  }
}
