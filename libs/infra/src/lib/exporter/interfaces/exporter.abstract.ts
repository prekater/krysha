import {Injectable} from "@nestjs/common";
import {Domain} from "@bigdeal/domain";
import {Transport} from "./transport.abstract";
import {Stream} from "stream";
import {Language} from "@bigdeal/common";
import {TermAdapter} from "../adapters/term.adapter";
import {AddressAdapter} from "../adapters/address.adapter";
import {MetaAdapter} from "../adapters/meta.adapter";
import {OptionAdapter} from "../adapters/option.adapter";
import {PaymentAdapter} from "../adapters/payment.adapter";
import {RentalPeriodAdapter} from "../adapters/rental-period.adapter";

@Injectable()
export abstract class Exporter implements Domain.IExporter {

  constructor(
    protected transport: Transport,
  ) {
  }

  protected async getContentParts(contract: Domain.Contract, language: Language) {


    const terms = await (new TermAdapter(contract.term, language)).makeContent()
    const address = await (new AddressAdapter(contract.address, language)).makeContent()
    const meta = await (new MetaAdapter(contract.meta, language)).makeContent()
    const options = await (new OptionAdapter(contract.options, language)).makeContent()
    const payments = await (new PaymentAdapter(contract.payment, language)).makeContent()
    const rentalPeriod = await (new RentalPeriodAdapter(contract.rentalPeriod, language)).makeContent()

    return {
      terms,
      address,
      meta,
      options,
      payments,
      rentalPeriod
    }
  }


  protected abstract createDocumentFromContract(contract: Domain.Contract, language: Language): Promise<Stream>;

  public async export(contract: Domain.Contract, language: Language = Language.RU) {

    const file = await this.createDocumentFromContract(contract, language)

    return await this.transport.deliver(file, contract)
  }


}
