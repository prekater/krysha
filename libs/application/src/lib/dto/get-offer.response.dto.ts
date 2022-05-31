import {Infra} from "@bigdeal/infra";

export type GetOfferResponseDto = {
  ID: string;
  payment: Infra.PaymentContent;
  meta: Infra.MetaContent;
  address: Infra.AddressContent;
  options: Infra.OptionsContent,
  terms: Array<Infra.TermContent & { ID: string }>
}
