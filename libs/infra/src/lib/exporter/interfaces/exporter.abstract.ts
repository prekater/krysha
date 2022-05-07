import {Domain} from "@bigdeal/domain";

export abstract class Exporter implements Domain.IExporter {
  public abstract export(contract: Domain.Contract);
}
