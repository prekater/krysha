import {Term} from "../entities/term.entity";
import { Option } from '../../core/value-objects/option.value-object'
import {Payment} from "../../core/value-objects/payment.value-object";
import {Address} from "../../core/value-objects/address.value-object";
import {TerminationRule} from "../../core/value-objects/termination-rule.value-object";

export enum OfferType {
  PUBLISHED= 'PUBLISHED',
  DRAFT = 'DRAFT',
  PAUSED = 'PAUSED'
}

export enum PropertyType {
  STUDIO = 'STUDIO',
  ONE_ROOM = 'ONE_ROOM',
  TWO_ROOM = 'TWO_ROOM',
  THREE_ROOM = 'THREE_ROOM',
  FOUR_ROOM = 'FOUR_ROOM',
  FIVE_ROOM = 'FIVE_ROOM',
  UNDEFINED = 'UNDEFINED'

}
export type OfferProps =  {
  type: OfferType;
  authorId: string;
  terms: Term[]
  options: Option[]
  payment: Payment;

  address: Address;
  meta: {
    propertyType: PropertyType;
  }
}
