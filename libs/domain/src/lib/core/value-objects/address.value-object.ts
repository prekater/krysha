import {IValueObject} from "../value-object";
import {AddressProps} from "../interfaces/address.interface";
import {UncompletedAddressException} from "../../offer/exceptions/uncompleted-address.exception";

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

  toObject() {
    return { ...this.props }
  }

  static create(props: AddressProps) {
    Address.validate(props)
    return new Address(props)
  }

  static validate(props: AddressProps) {

    if (
      props.city.length > 0 &&
      props.street.length > 0 &&
      props.house.length > 0 &&
      props.flat.length > 0
    ) return true;

    throw new UncompletedAddressException()
  }

}
