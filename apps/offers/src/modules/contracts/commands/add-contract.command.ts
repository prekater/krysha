import {Domain} from "@bigdeal/domain";

export class AddContractCommand {
  constructor(public contract: Domain.Contract) {
  }
}
