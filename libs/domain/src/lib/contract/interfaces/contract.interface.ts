import {Term} from "../../offer/entities/term.entity";
import {Option} from "../../offer/value-objects/option.value-object";
import {Payment} from "../../offer/value-objects/payment.value-object";
import {Address} from "../../offer/value-objects/address.value-object";
import {PropertyType} from "../../offer/interfaces/offer.interface";

export interface ContractProps {
  authorId: string;
  term: Term
  options: Option[]
  payment: Payment;
  propertyType: PropertyType;
  address: Address;
}
