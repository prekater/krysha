import {Language} from "@bigdeal/common";
import {Domain} from "@bigdeal/domain";
import * as util from 'util'
import * as commonTranslates from './tpl/common'

export class ContractContentAdapter {

  constructor(
    private readonly contract: Domain.Contract,
    private readonly language: Language
  ) {
  }

  getTranslatedPriceUnit(unit: Domain.PriceUnit): string {

    return commonTranslates.priceUnit[this.language][unit]
  }

  getTranslatedPeriodUnit(unit: Domain.PeriodUnit): string {

    return commonTranslates.periodUnit[this.language][unit]
  }

  getTranslatedDepositCollectType(type: Domain.DepositCollectType): string {
    return commonTranslates.depositCollectType[this.language][type]
  }
  getTranslatedDepositReturnType(type: Domain.DepositReturnType): string {
    return commonTranslates.depositReturnType[this.language][type]
  }


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

  public async makeTerms() {
    const {term: termTranslates} = await import(`./tpl/term/${this.language}`)


    return {
      title: this.makeTermTitle(termTranslates.title),
      rentalPeriod: this.makeRentalPeriodContent(termTranslates.rentalPeriod),
      pricePerMonth: this.makePricePerMonth(termTranslates.pricePerMonth),
      deposit: this.makeDeposit(termTranslates.deposit),
      depositCollectType: this.makeDepositCollectType(termTranslates.depositCollectType),
      depositReturnType: this.makeDepositReturnType(termTranslates.depositReturnType)
    }
  }


}
