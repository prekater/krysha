import * as util from 'util'
import {AbstractContentAdapter} from "./interfaces/content.adapter.abstract";
import {Domain} from "@bigdeal/domain";
import {Language} from "@bigdeal/common";

export type AddressContent = {
  house: string,
  flat: string;
  street: string;
  city: string;
}

export class AddressAdapter extends AbstractContentAdapter {

  protected readonly resource: Domain.Address;

  constructor(resource: Domain.Address, language: Language) {
    super(resource, language);
  }

  private makeFlat(tpl: string) {

    return util.format(
      tpl,
      this.resource.flat
    )
  }

  private makeHouse(tpl: string) {
    return util.format(
      tpl,
      this.resource.house
    )
  }

  private makeCity(tpl: string) {
    return util.format(
      tpl,
      this.resource.city
    )
  }

  private makeStreet(tpl: string) {
    return util.format(
      tpl,
      this.resource.street
    )
  }

  public async makeContent(): Promise<AddressContent> {

    const {address: {house, flat, street, city}} = await import(`./tpl/address/${this.language}`)

    return {
      house: this.makeHouse(house),
      flat: this.makeFlat(flat),
      street: this.makeStreet(street),
      city: this.makeCity(city),
    }
  }


}
