import {Infra} from "@bigdeal/infra";

export type GetOfferResponseDto = {
  ID: string;
  paymentContent: Infra.PaymentContent;
  meta: Infra.MetaContent;
  address: Infra.AddressContent;
  optionsContent: Infra.OptionsContent,
  options: Infra.Offer['options'],
  termsContent: Array<Infra.TermContent & { ID: string }>,
  terms: Infra.Offer['terms']
  payment: Infra.Offer['payment']
}
