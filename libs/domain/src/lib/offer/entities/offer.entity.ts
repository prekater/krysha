import {AggregateRoot} from "@nestjs/cqrs";
import {OfferProps, OfferType} from "../interfaces/offer.interface";
import {IAggregateRoot} from "../../core/aggregate-root";
import {UniqueEntityID} from "../../core/unique-entity";
import {IEntity} from "../../core/entity";
import {Address} from "../value-objects/address.value-object";
import {Payment} from "../value-objects/payment.value-object";
import {UncompletedOfferException} from "../exceptions/uncompleted-offer.exception";
import {OfferPublishedEvent} from "../events/offer-published.event";


export class Offer extends AggregateRoot implements IEntity, IAggregateRoot {

  private props: OfferProps;
  private constructor(props: OfferProps) {
    super()
    // todo check prototype pattern
    props.ID =  props.ID || new UniqueEntityID()
    props.type = props.type || OfferType.DRAFT

    this.props = props;
  }

  static create(offerProps: OfferProps): Offer {
    return new Offer(offerProps)
  }

  get type () {

    return this.props.type
  }

  validate(): boolean{


    if (
      !this.props.ID || !(this.props.ID instanceof  UniqueEntityID) ||
      !this.props.type ||
      !this.props.address || !(this.props.address instanceof Address) ||
      !this.props.propertyType ||
      this.props.terms.length === 0 ||
      !this.props.authorId ||
      !this.props.payment || !(this.props.payment instanceof Payment)
    )
    {
      throw new UncompletedOfferException()
    }
    return true;
  }

  public publish(): void {

    this.validate()
    this.props.type = OfferType.PUBLISHED
    this.apply(new OfferPublishedEvent(this))
  }
}









