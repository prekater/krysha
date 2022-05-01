import {IValueObject} from "../../core/value-object";
import {AddressProps} from "../interfaces/address.interface";

export class Address implements IValueObject{

  private props: AddressProps;

  private constructor(props: AddressProps) {
    this.props = props
  }

  get flat() {
    return this.props.flat
  }
  get house () {
    return this.props.house
  }
  get city () {
    return this.props.city
  }
  get street () {
    return this.props.street
  }


  toString() {
    return `City: ${this.city}, Street: ${this.street}, House: ${this.house}, Flat: ${this.flat}`
  }

  toObject() {
    return this.props
  }
  static create(props: AddressProps) {
    return new Address(props)
  }

}
