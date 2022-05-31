import * as util from 'util'
import {AbstractContentAdapter} from "./interfaces/content.adapter.abstract";
import {Domain} from "@bigdeal/domain";

export type MetaContent = {
  propertyType: string;

}

export class MetaAdapter extends AbstractContentAdapter {

  protected readonly resource: Domain.ContractProps['meta'];

  private makePropertyType(tpl: string) {

    return util.format(
      tpl,
      this.getTranslatedPropertyType(this.resource.propertyType)
    )
  }


  public async makeContent(): Promise<MetaContent> {

    const {meta: {propertyType}} = await import(`./tpl/meta/${this.language}`)

    return {
      propertyType: this.makePropertyType(propertyType),
    }
  }


}
