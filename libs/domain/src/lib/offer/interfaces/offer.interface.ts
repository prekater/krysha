import {UniqueEntityID} from "../../core/unique-entity";
import {Term} from "../value-objects/term.value-object";
import { Option } from '../value-objects/option.value-object'
import {Payment} from "../value-objects/payment.value-object";
import {Address} from "../value-objects/address.value-object";

export enum OfferType {
  PUBLISHED,
  DRAFT,
  PAUSED
}

export enum PropertyType {
  STUDIO = 'STUDIO',
  ONE_ROOM = 'ONE_ROOM',
  TWO_ROOM = 'TWO_ROOM',
  THREE_ROOM = 'THREE_ROOM',
  FOUR_ROOM = 'FOUR_ROOM',
  FIVE_ROOM = 'FIVE_ROOM',

}
export type OfferProps =  {
  ID: UniqueEntityID;
  type: OfferType;
  authorId: string;
  terms: Term[]
  options: Option[]
  payment: Payment;
  propertyType: PropertyType;
  address: Address;
}
