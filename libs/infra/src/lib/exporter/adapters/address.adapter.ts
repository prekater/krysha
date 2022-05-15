import * as util from 'util'
import {AbstractContentAdapter} from "./interfaces/content.adapter.abstract";

export class AddressAdapter extends AbstractContentAdapter {

  private makeFlat(tpl: string) {

    return util.format(
      tpl,
      this.contract.address.flat
    )
  }

  private makeHouse(tpl: string) {
    return util.format(
      tpl,
      this.contract.address.house
    )
  }

  private makeCity(tpl: string) {
    return util.format(
      tpl,
      this.contract.address.city
    )
  }

  private makeStreet(tpl: string) {
    return util.format(
      tpl,
      this.contract.address.street
    )
  }

  public async makeContent(): Promise<Record<string, string>> {

    const {address: {house, flat, street, city}} = await import(`./tpl/address/${this.language}`)

    return {
      house: this.makeHouse(house),
      flat: this.makeFlat(flat),
      street: this.makeStreet(street),
      city: this.makeCity(city),
    }
  }


}
