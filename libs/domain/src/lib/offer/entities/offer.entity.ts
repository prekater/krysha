import {IAggregateRoot, UniqueEntityID} from "@bigdeal/domain";
import {AggregateRoot} from "@nestjs/cqrs";
import {OfferProps, OfferType} from "../interfaces/offer.interface";
import {IEntity} from "../../core/entity";


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
  //   // если все поля заполнены, то можно опубликовать
  publish() {}
}









