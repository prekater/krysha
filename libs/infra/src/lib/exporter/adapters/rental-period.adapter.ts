import * as util from 'util'
import {AbstractContentAdapter} from "./interfaces/content.adapter.abstract";
import {DATE_FORMAT} from "@bigdeal/common";

export class RentalPeriodAdapter extends AbstractContentAdapter {


  private getDuration(): number {
    return this.contract.rentalPeriod.duration(this.contract.term.periodUnit)

  }

  public async makeContent(): Promise<Record<string, string>> {
    const {rentalPeriod: tpl} = await import(`./tpl/rental-period/${this.language}`)

    return {
      rentalPeriod: util.format(
        tpl.content,
        this.getDuration(),
        this.getTranslatedPeriodUnit(this.contract.term.periodUnit),
        this.contract.rentalPeriod.rentalStart.format(DATE_FORMAT),
        this.contract.rentalPeriod.rentalEnd.format(DATE_FORMAT),
      )
    }
  }


}
