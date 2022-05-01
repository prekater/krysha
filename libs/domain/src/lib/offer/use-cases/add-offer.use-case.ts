import {OfferProps} from "../interfaces/offer.interface";

export interface AddOffer {
  add(data: AddOffer.Params)
}

export namespace AddOffer {
  export type Params = OfferProps
}
