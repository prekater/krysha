import {IValueObject} from "../value-object";
import {AddressProps} from "../interfaces/address.interface";
import {UncompletedAddressException} from "../../offer/exceptions/uncompleted-address.exception";
import {OfferType, PropertyType} from "../../offer/interfaces/offer.interface";
import {Term} from "../../offer/entities/term.entity";
import {Option} from "./option.value-object";
import {Payment} from "./payment.value-object";
import {Validator} from "../validator";
import {UncompletedOfferException} from "../../offer/exceptions/uncompleted-offer.exception";

export class Address implements IValueObject {

  private props: AddressProps;

  private constructor(props: AddressProps) {
    this.props = props
  }

  get flat() {
    return this.props.flat
  }

  get house() {
    return this.props.house
  }

  get city() {
    return this.props.city
  }

  get street() {
    return this.props.street
  }
  get cadastralNumber() {
    return this.props.cadastralNumber
  }


  toObject() {
    return { ...this.props }
  }

  static create(props: AddressProps) {
    Address.validate(props)
    return new Address(props)
  }

  static validate(props: AddressProps) {

    const schema = {
      city: props.city.length > 0,
      street: props.street.length > 0,
      house:  props.house.length > 0,
      flat:  props.flat.length > 0,
      cadastralNumber: props.cadastralNumber?.toString().length > 0,
    }

    const errors = Validator.validateAgainstSchema(schema)

    if (Object.keys(errors).length > 0) {
      throw new UncompletedAddressException(JSON.stringify(errors))
    }
    return true;
  }

}
