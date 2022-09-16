import {Domain} from "@bigdeal/domain";
import {Language} from "@bigdeal/common";
import * as commonTranslates from "../tpl/common";

export abstract class AbstractContentAdapter {

  protected translates = commonTranslates;

  constructor(
    protected readonly resource: any,
    protected readonly language: Language
  ) {
  }

  protected getIncludeStatus(status: boolean) {

    return this.translates.includeCheckbox[this.language][status.toString()]
  }

  protected getTranslatedPriceUnit(unit: Domain.PriceUnit): string {

    return this.translates.priceUnit[this.language][unit]
  }

  protected getTranslatedPeriodUnit(unit: Domain.PeriodUnit, single = false): string {

    return single ? this.translates.periodUnitSingle[this.language][unit] : this.translates.periodUnit[this.language][unit]
  }

  protected getTranslatedDepositCollectType(type: Domain.DepositCollectOptionType): string {
    return this.translates.depositCollectType[this.language][type]
  }

  protected getTranslatedDepositReturnType(type: Domain.DepositReturnType): string {
    return this.translates.depositReturnType[this.language][type]
  }


  protected getTranslatedPaymentType(type: Domain.PaymentType): string {
    return this.translates.paymentType[this.language][type]
  }


  protected getTranslatedPropertyType(type: Domain.PropertyType): string {
    return this.translates.propertyType[this.language][type]
  }


  abstract makeContent(): Promise<Record<string, any>>


}
