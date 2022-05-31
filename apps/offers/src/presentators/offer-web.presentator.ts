import {Application} from "@bigdeal/application";
import {Domain} from "@bigdeal/domain";
import {Infra} from "@bigdeal/infra";
import {Language} from "@bigdeal/common";

export class OfferWebPresentator {


  static async map(offer: Domain.Offer, language = Language.RU): Promise<Application.GetOfferResponseDto> {

    const payment = await (new Infra.PaymentAdapter(offer.payment, language)).makeContent()
    const address = await (new Infra.AddressAdapter(offer.address, language)).makeContent()
    const meta = await (new Infra.MetaAdapter(offer.meta, language)).makeContent()
    const options = await (new Infra.OptionAdapter(offer.options, language)).makeContent()
    const terms = await Promise.all(
      offer.terms.map(t => (new Infra.TermAdapter(t, language)).makeContent().then(data => ({...data, ID: t.ID.toString()})))
    )
    return {

      ID: offer.ID.toString(),
      payment,
      address,
      meta,
      options,
      terms
    };
  }
}
