import {Domain} from "@bigdeal/domain";
import {Transport} from "./transport.abstract";
import {WriteStream} from "fs";

export abstract class Exporter implements Domain.IExporter {

  protected constructor(protected transport: Transport) {
  }

  public abstract createDocumentFromContract(contract: Domain.Contract): Promise<WriteStream>;

  public async export(contract: Domain.Contract) {

    const file = await this.createDocumentFromContract(contract)

    return await this.transport.deliver(file)
  }


}
