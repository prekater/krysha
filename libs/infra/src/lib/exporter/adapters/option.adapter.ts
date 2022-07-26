import {Domain} from "@bigdeal/domain";
import * as util from 'util'
import {AbstractContentAdapter} from "./interfaces/content.adapter.abstract";

export type OptionsContent = {
  title: string;
  included: string;
  excluded: string;

}
export class OptionAdapter extends AbstractContentAdapter {

  protected readonly resource: Domain.Option[]

  public makeTitle(tpl: string): string {
    return util.format(tpl)
  }

  public makeIncludedOptions(tpl: string): string {
    return this
      .resource
      .filter( o => o.isEnabled)
      .map(o => util.format(
        tpl,
        o.title.toLocaleLowerCase(),
      ))
      .join('; ')
  }
  public makeExcludedOptions(tpl: string): string {
    return this
      .resource
      .filter( o => !o.isEnabled)
      .map(o => util.format(
        tpl,
        o.title.toLocaleLowerCase(),
      ))
      .join('; ')
  }

  public async makeContent(): Promise<OptionsContent> {

    const {option: {title, option}} = await import(`./tpl/option/${this.language}`)

    return {
      title,
      included: this.makeIncludedOptions(option),
      excluded: this.makeExcludedOptions(option),
    }
  }


}
