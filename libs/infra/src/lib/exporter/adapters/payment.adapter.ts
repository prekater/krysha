import * as util from 'util'
import {AbstractContentAdapter} from "./interfaces/content.adapter.abstract";

export class PaymentAdapter extends AbstractContentAdapter {

  private makePenalty(tpl: string): string {

    return util.format(
      tpl,
      this.getTranslatedPenaltyType(this.contract.payment.penalty)
    )
  }

  private makeType(tpl: string) {
    return util.format(
      tpl,
      this.getTranslatedPaymentType(this.contract.payment.type)
    )
  }

  private makePaymentStart(tpl: string) {
    return util.format(
      tpl,
      this.getTranslatedPaymentStart(this.contract.payment.paymentStart)
    )
  }


  public async makeContent(): Promise<Record<string, string>> {

    const {payment: {paymentStart, paymentType, penalty}} = await import(`./tpl/payment/${this.language}`)

    return {
      paymentStart: this.makePaymentStart(paymentStart),
      paymentType: this.makeType(paymentType),
      penalty: this.makePenalty(penalty),
    }
  }


}
