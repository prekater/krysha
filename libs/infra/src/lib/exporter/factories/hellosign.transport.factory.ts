import {HelloSignProvider} from "../providers/hellosign.provider";

export class HelloSignTransportFactory {

  static make(): HelloSignProvider {
    return new HelloSignProvider()
  }
}
