import * as util from 'util'
import {AbstractContentAdapter} from "./interfaces/content.adapter.abstract";
import {Domain} from "@bigdeal/domain";


export type PenaltyOptions = { penaltyAbsent: string; penaltyFix: string }
export type PaymentRulesOptions = {
  paymentFromMonthStartRules: string;
  paymentFromRentalStartRules: string;
}

export class PaymentAdapter extends AbstractContentAdapter {

  private makePenalty(tpl: PenaltyOptions): string {

    switch (this.contract.payment.penalty.type) {

      case Domain.PenaltyType.FIX_FOR_EVERY_DAY:

        return util.format(
          tpl.penaltyFix,
          this.contract.payment.penalty.value,
          this.getTranslatedPriceUnit(this.contract.payment.penalty.currency),
          this.contract.payment.penalty.start
        )
      case Domain.PenaltyType.ABSENT:
        return util.format(
          tpl.penaltyAbsent,
        )
        break;
    }


  }


  private makeType(tpl: string) {
    return util.format(
      tpl,
      this.getTranslatedPaymentType(this.contract.payment.type)
    )
  }

  private makePaymentStart(tpl: string) {

    const date = this.contract.payment.paymentStart === Domain.PaymentStart.START_OF_MONTH
      ? 1
      : this.contract.rentalPeriod.rentalStart.format('D')

    return util.format(
      tpl,
      date
    )
  }

  private makePaymentRules(options: PaymentRulesOptions) {
    const tpl = this.contract.payment.paymentStart === Domain.PaymentStart.START_OF_MONTH
      ? options.paymentFromMonthStartRules
      : options.paymentFromRentalStartRules

    return tpl;

  }


  public async makeContent(): Promise<Record<string, string>> {

    const {
      payment: {
        paymentStart,
        paymentType,
        penaltyFix,
        penaltyAbsent,
        paymentFromMonthStartRules,
        paymentFromRentalStartRules
      }
    } = await import(`./tpl/payment/${this.language}`)

    return {
      paymentStart: this.makePaymentStart(paymentStart),
      paymentType: this.makeType(paymentType),
      penalty: this.makePenalty({penaltyFix, penaltyAbsent}),
      paymentRules: this.makePaymentRules({
        paymentFromMonthStartRules,
        paymentFromRentalStartRules
      })
    }
  }


}
