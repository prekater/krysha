import {Injectable} from "@nestjs/common";
import {Domain} from "@bigdeal/domain";
import {Transport} from "./transport.abstract";
import {Stream} from "stream";

@Injectable()
export abstract class Exporter implements Domain.IExporter {

  constructor(protected transport: Transport) {
  }

  protected abstract createDocumentFromContract(contract: Domain.Contract): Promise<Stream>;

  public async export(contract: Domain.Contract) {

    const file = await this.createDocumentFromContract(contract)


    return await this.transport.deliver(file)
  }


}
