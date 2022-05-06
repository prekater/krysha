import {AggregateRoot} from "@nestjs/cqrs";
import {IEntity} from "../../core/entity";
import {OfferProps, OfferType, PropertyType} from "../interfaces/offer.interface";
import {IAggregateRoot} from "../../core/aggregate-root";
import {UniqueEntityID} from "../../core/unique-entity";
import {Address} from "../value-objects/address.value-object";
import {Payment} from "../value-objects/payment.value-object";
import {UncompletedOfferException} from "../exceptions/uncompleted-offer.exception";
import {OfferPublishedEvent} from "../events/offer-published.event";
import {Option} from "../value-objects/option.value-object";
import {Term} from "./term.entity";


export namespace Domain {
  export class Offer extends AggregateRoot implements IEntity, IAggregateRoot {

    get authorId() {
      return this.props.authorId
    }

    get address() {
      return this.props.address
    }

    get type() {
      return this.props.type
    }

    get options(): Option[] {
      return this.props.options
    }

    // todo: make collection
    get terms(): Term[] {
      return this.props.terms
    }

    get propertyType(): PropertyType {
      return this.props.propertyType
    }

    get payment(): Payment {
      return this.props.payment
    }


    private props: OfferProps;

    private constructor(props: OfferProps, readonly ID: UniqueEntityID) {
      super()
      props.type = props.type || OfferType.DRAFT

      this.props = props;
    }

    static create(offerProps: OfferProps, ID = null): Offer {

      Domain.Offer.validate(offerProps)

      return new Offer(offerProps, new UniqueEntityID(ID))
    }

    static validate(props: OfferProps): boolean {

      if (
        !(Object.values(OfferType).includes(props.type)) ||
        !(props.address instanceof Address) ||
        !(Object.values(PropertyType).includes(props.propertyType)) ||
        props.terms.length === 0 || !props.terms.every(t => t instanceof Term) ||
        ! (props.options.every(t => t instanceof Option)) ||
        !props.authorId ||
        !(props.payment instanceof Payment)
      ) {
        throw new UncompletedOfferException()
      }
      return true;
    }

    public publish(): void {

      this.props.type = OfferType.PUBLISHED
      this.apply(new OfferPublishedEvent(this))
    }
  }

}









