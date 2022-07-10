import {Domain} from "@bigdeal/domain";
import * as util from 'util'
import {AbstractContentAdapter} from "./interfaces/content.adapter.abstract";


export type PaymentContent = {
  paymentTypeOnePayment: string;
  paymentTypeTwoPayments: string;
  paymentRules: string;
  paymentType: string;
  penalty: string;
}
export type PenaltyOptions = { penaltyAbsent: string; penaltyFix: string }
export type PaymentRulesOptions = {
  paymentFromMonthStartRules: string;
  paymentFromRentalStartRules: string;
}

export class PaymentAdapter extends AbstractContentAdapter {

  protected readonly resource: Domain.Payment;

  private makePenalty(tpl: PenaltyOptions): string {

    switch (this.resource.penalty?.type) {

      case Domain.PenaltyType.FIX_FOR_EVERY_DAY:

        return util.format(
          tpl.penaltyFix,
          this.resource.penalty.value,
          this.getTranslatedPriceUnit(this.resource.penalty.currency),
          this.resource.penalty.start
        )
      default:
        return util.format(tpl.penaltyAbsent)
    }
  }


  private makeType(tpl: string) {
    return util.format(
      tpl,
      this.getTranslatedPaymentType(this.resource.type)
    )
  }


  private makePaymentRules(options: PaymentRulesOptions) {
    const tpl = this.resource.paymentStart === Domain.PaymentStart.START_OF_MONTH
      ? options.paymentFromMonthStartRules
      : options.paymentFromRentalStartRules

    return tpl;
  }

  private makePaymentTypeOptions(tplOnePayment: string, tplTwoPayment: string, priceForTwoPayments: number) {

    return {
      paymentTypeOnePayment: util.format(tplOnePayment),
      paymentTypeTwoPayments: util.format(tplTwoPayment, priceForTwoPayments),
    }

  }


  public async makeContent(): Promise<PaymentContent> {

    const {
      payment: {
        paymentType,
        penaltyFix,
        penaltyAbsent,
        paymentFromMonthStartRules,
        paymentFromRentalStartRules,
        paymentTypeTwoPayments,
        paymentTypeOnePayment
      }
    } = await import(`./tpl/payment/${this.language}`)

    return {
      ...this.makePaymentTypeOptions(paymentTypeOnePayment, paymentTypeTwoPayments, this.resource.priceAffect),
      paymentType: this.makeType(paymentType),
      penalty: this.makePenalty({penaltyFix, penaltyAbsent}),
      paymentRules: this.makePaymentRules({
        paymentFromMonthStartRules,
        paymentFromRentalStartRules
      })
    }
  }


}
