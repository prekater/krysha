import {Term} from "../../offer/entities/term.entity";
import {Option} from "../../core/value-objects/option.value-object";
import {Payment} from "../../core/value-objects/payment.value-object";
import {Address} from "../../core/value-objects/address.value-object";
import {PropertyType} from "../../offer/interfaces/offer.interface";
import {RentalPeriod} from "../value-objects/rental-period.value-object";

export interface ContractProps {
  authorId: string;
  term: Term
  options: Option[]
  payment: Payment;
  propertyType: PropertyType;
  address: Address;
  rentalPeriod: RentalPeriod;
}
