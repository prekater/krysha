import * as util from 'util'
import {AbstractContentAdapter} from "./interfaces/content.adapter.abstract";

export class ContractMetaAdapter extends AbstractContentAdapter {

  private makePropertyType(tpl: string) {

    return util.format(
      tpl,
      this.getTranslatedPropertyType(this.contract.propertyType)
    )
  }


  public async makeContent(): Promise<Record<string, string>> {

    const {meta: {propertyType}} = await import(`./tpl/meta/${this.language}`)

    return {
      propertyType: this.makePropertyType(propertyType),
    }
  }


}
