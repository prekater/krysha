import {Injectable} from "@nestjs/common"
import {
  ClientProxyTCP,
  ADD_OFFER_COMMAND,
  GET_OFFER_QUERY
} from "@bigdeal/messaging";
import {Infra} from "@bigdeal/infra";

@Injectable()
export class OffersService {
  private readonly offersClient = this.proxy.getClientProxyOffersInstance()

  constructor(
    private readonly proxy: ClientProxyTCP
  ) {}

  async addOffer(offer: Infra.Offer) {
    return await this.offersClient.send(ADD_OFFER_COMMAND, offer).toPromise();
  }


  async getById(ID: string) {
    return await this.offersClient.send(GET_OFFER_QUERY, {ID}).toPromise();
  }
}
