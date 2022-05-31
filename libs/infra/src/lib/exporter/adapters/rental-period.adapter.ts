import * as util from 'util'
import {DATE_FORMAT} from "@bigdeal/common";
import {Domain} from "@bigdeal/domain";
import {AbstractContentAdapter} from "./interfaces/content.adapter.abstract";

export class RentalPeriodAdapter extends AbstractContentAdapter {


  protected readonly resource: Domain.RentalPeriod;



  public async makeContent(): Promise<Record<string, string>> {
    const {rentalPeriod: tpl} = await import(`./tpl/rental-period/${this.language}`)

    return {
      rentalPeriod: util.format(
        tpl.content,
        this.resource.rentalStart.format(DATE_FORMAT),
        this.resource.rentalEnd.format(DATE_FORMAT),
      )
    }
  }


}
