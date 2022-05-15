import * as util from 'util'
import {AbstractContentAdapter} from "./interfaces/content.adapter.abstract";

export class OptionAdapter extends AbstractContentAdapter {


  public makeTitle(tpl: string): string {
    return util.format(tpl)
  }

  public makeOptions(tpl: string): string {

    return this.contract
      .options
      .map(o => util.format(
        tpl,
        o.title,
        this.getIncludeStatus(o.isEnabled)
      ))
      .join('\n')
  }

  public async makeContent(): Promise<Record<string, string>> {

    const {option: {title, option}} = await import(`./tpl/option/${this.language}`)

    return {
      title,
      option: this.makeOptions(option),
    }
  }


}
