import {OfferProps} from "../interfaces/offer.interface";

export interface UpdateOffer {
  update(data: UpdateOffer.Params)
}

export namespace UpdateOffer {
  export type Params = Partial<OfferProps>
}
