import {Application} from "@bigdeal/application";
import {Domain} from "@bigdeal/domain";
import {Infra} from "@bigdeal/infra";
import {Language} from "@bigdeal/common";

export class OfferWebPresentator {


  static async map(offer: Domain.Offer, language = Language.RU): Promise<Application.GetOfferResponseDto> {

    const paymentContent = await (new Infra.PaymentAdapter(offer.payment, language)).makeContent()
    const payment = offer.payment.toObject()
    const address = await (new Infra.AddressAdapter(offer.address, language)).makeContent()
    const meta = await (new Infra.MetaAdapter(offer.meta, language)).makeContent()
    const optionsContent = await (new Infra.OptionAdapter(offer.options, language)).makeContent()
    const options = offer.options.map(o => o.toObject())
    const termsContent = await Promise.all(
      offer.terms.map(t => (new Infra.TermAdapter(t, language)).makeContent().then(data => ({...data, ID: t.ID.toString()})))
    )
    return {
      ID: offer.ID.toString(),
      payment,
      paymentContent,
      address,
      meta,
      options,
      optionsContent,
      termsContent,
      terms: offer.terms.map(t => t.toObject())
    };
  }
}
