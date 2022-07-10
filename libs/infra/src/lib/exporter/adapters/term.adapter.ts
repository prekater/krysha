import * as util from 'util'
import {AbstractContentAdapter} from "./interfaces/content.adapter.abstract";
import {Domain} from "@bigdeal/domain";
import {Language} from "@bigdeal/common";
import {DepositCollectOptionType} from "../../../../../domain/src/lib/core/interfaces/deposit.interface";

export type TermContent = {
  title: string;
  periodUnit: string;
  rentalPeriod: string;
  pricePerMonth: string;
  deposit: string;
  depositCollectType: string;
  depositCollectTypeOptions: Domain.DepositCollectOption[];
  depositReturnType: string;
  depositReturnPeriod: string;
  terminationRules: string;
}

export class TermAdapter extends AbstractContentAdapter {

  protected readonly resource: Domain.Term;

  constructor(resource: Domain.Term, language: Language) {
    super(resource, language);
  }

  private makeRentalPeriodContent(tpl): string {

    return util.format(
      tpl,
      //todo: create actual contract period field
      this.resource.periodFrom,
      this.resource.periodFrom,
      this.resource.periodTo,
      this.getTranslatedPeriodUnit(this.resource.periodUnit),
    )
  }

  private makeTermTitle(tpl: string): string {

    return util.format(tpl)
  }

  private makePricePerMonth(tpl: string): string {

    return util.format(
      tpl,
      this.resource.price,
      this.getTranslatedPriceUnit(this.resource.priceUnit)
    )
  }

  private makeDeposit(tpl: string): string {
    return util.format(
      tpl,
      this.resource.deposit.value.toString(),
      this.getTranslatedPriceUnit(this.resource.priceUnit)
    )
  }

  private makeDepositCollectType(tpl: string): string {

    let type = this.resource.deposit.isEnabled ? Domain.DepositCollectOptionType.CONCLUSION : Domain.DepositCollectOptionType.ABSENT
    let value = 0
    let args: any[] = [tpl]

    const option = this.resource.deposit.collectOptions.find(o => o.isEnabled)
    if (option) {
      type = option.type
      value = option.priceAffect
    }
    args.push (this.getTranslatedDepositCollectType(type))
    if (type === DepositCollectOptionType.ABSENT_WITH_EXTRA_CHARGE) {
      args = args.concat([value, this.getTranslatedPriceUnit(this.resource.priceUnit)])
    }
    return util.format(...args)
  }

  private makeDepositCollectTypeOptions(tpl: string) {

    return this.resource.deposit.collectOptions.map(o => ({
      ...o, label: util.format(
        tpl,
        this.getTranslatedDepositCollectType(o.type),
        ...(o.type === DepositCollectOptionType.ABSENT_WITH_EXTRA_CHARGE ?
            [o.priceAffect, this.getTranslatedPriceUnit(this.resource.priceUnit)] :
            []
        )
      )
    }))
  }

  private makeDepositReturnType(tpl: string): string {
    return util.format(
      tpl,
      this.getTranslatedDepositReturnType(this.resource.deposit.returnType)
    )
  }

  private makeTerminationRules(tpl: string): string {
    return this.resource.terminationRules.map(r =>
      util.format(
        tpl,
        r.period,
        this.getTranslatedPeriodUnit(r.periodUnit),
        r.value,
        this.getTranslatedPriceUnit(r.currency)
      )
    )
      .join('; ')
  }

  private getPeriodUnitContent() {
    return this.getTranslatedPeriodUnit(this.resource.periodUnit)
  }

  private makeDepositReturnPeriod(tpl: string): string {

    return util.format(
      tpl,
      this.resource.deposit.returnPeriod.toString(),
      this.getTranslatedPeriodUnit(this.resource.deposit.returnPeriodUnit)
    )
  }

  public async makeContent(): Promise<TermContent> {
    const {term: termTranslates} = await import(`./tpl/term/${this.language}`)

    return {
      title: this.makeTermTitle(termTranslates.title),
      periodUnit: this.getPeriodUnitContent(),
      rentalPeriod: this.makeRentalPeriodContent(termTranslates.rentalPeriod),
      pricePerMonth: this.makePricePerMonth(termTranslates.pricePerMonth),
      deposit: this.makeDeposit(termTranslates.deposit),
      depositCollectType: this.makeDepositCollectType(termTranslates.depositCollectType),
      depositCollectTypeOptions: this.makeDepositCollectTypeOptions(termTranslates.depositCollectType),
      depositReturnType: this.makeDepositReturnType(termTranslates.depositReturnType),
      depositReturnPeriod: this.makeDepositReturnPeriod(termTranslates.depositReturnPeriod),
      terminationRules: this.makeTerminationRules(termTranslates.terminationRule)
    }
  }


}
