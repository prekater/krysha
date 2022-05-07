import {Domain} from "@bigdeal/domain";

export interface IExporter {
  export(contract: Domain.Contract);
}
