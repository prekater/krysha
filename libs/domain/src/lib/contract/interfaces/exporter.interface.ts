import {Domain} from "@bigdeal/domain";
import {Language} from "@bigdeal/common";

export interface IExporter {
  export(contract: Domain.Contract, language?: Language);
}
