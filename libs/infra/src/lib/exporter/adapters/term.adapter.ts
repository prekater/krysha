import * as util from 'util'
import {AbstractContentAdapter} from "./interfaces/content.adapter.abstract";

export class TermAdapter extends AbstractContentAdapter{

  private makeRentalPeriodContent(tpl): string {


    return util.format(
      tpl,
      //todo: create actual contract period field
      this.contract.term.periodFrom,
      this.contract.term.periodFrom,
      this.contract.term.periodTo,
      this.getTranslatedPeriodUnit(this.contract.term.periodUnit),
    )
  }

  private makeTermTitle(tpl: string): string {

    return util.format(tpl)
  }

  private makePricePerMonth(tpl: string): string {

    return util.format(
      tpl,
      this.contract.term.price,
      this.getTranslatedPriceUnit(this.contract.term.priceUnit)
    )
  }

  private makeDeposit(tpl: string): string {
    return util.format(
      tpl,
      this.contract.term.deposit.value.toString(),
      this.getTranslatedPriceUnit(this.contract.term.priceUnit)
    )
  }
  private makeDepositCollectType(tpl: string): string {
    return util.format(
      tpl,
      this.getTranslatedDepositCollectType(this.contract.term.deposit.collectType)
    )
  }
  private makeDepositReturnType(tpl: string): string {
    return util.format(
      tpl,
      this.getTranslatedDepositReturnType(this.contract.term.deposit.returnType)
    )
  }

  private makeDepositReturnPeriod(tpl: string): string {

    return util.format(
      tpl,
      this.contract.term.deposit.returnPeriod.toString(),
      this.getTranslatedPeriodUnit(this.contract.term.deposit.returnPeriodUnit)
    )
  }

  public async makeContent(): Promise<Record<string, string>> {
    const {term: termTranslates} = await import(`./tpl/term/${this.language}`)

    return {
      title: this.makeTermTitle(termTranslates.title),
      rentalPeriod: this.makeRentalPeriodContent(termTranslates.rentalPeriod),
      pricePerMonth: this.makePricePerMonth(termTranslates.pricePerMonth),
      deposit: this.makeDeposit(termTranslates.deposit),
      depositCollectType: this.makeDepositCollectType(termTranslates.depositCollectType),
      depositReturnType: this.makeDepositReturnType(termTranslates.depositReturnType),
      depositReturnPeriod: this.makeDepositReturnPeriod(termTranslates.depositReturnPeriod),
    }
  }




}
