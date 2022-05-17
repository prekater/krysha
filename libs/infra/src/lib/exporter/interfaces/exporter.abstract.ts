import {Injectable} from "@nestjs/common";
import {Domain} from "@bigdeal/domain";
import {Transport} from "./transport.abstract";
import {Stream} from "stream";
import {Language} from "@bigdeal/common";

@Injectable()
export abstract class Exporter implements Domain.IExporter {

  constructor(
    protected transport: Transport,
    ) {
  }

  protected abstract createDocumentFromContract(contract: Domain.Contract, language: Language): Promise<Stream>;

  public async export(contract: Domain.Contract, language: Language  = Language.RU) {

    const file = await this.createDocumentFromContract(contract, language)

    return await this.transport.deliver(file)
  }


}
