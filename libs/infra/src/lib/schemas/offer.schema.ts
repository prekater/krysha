import {Prop, raw, Schema as MongooseSchema, SchemaFactory} from "@nestjs/mongoose";
import {Address, Deposit, OfferType, Option, Payment, PropertyType, Term} from "@bigdeal/domain";
import * as mongoose from "mongoose";

export namespace Infra {

  @MongooseSchema({versionKey: false, timestamps: true, autoIndex: true, autoCreate: true})
  export class Offer {
    @Prop()
    ID: string;

    @Prop()
    authorId: string;

    @Prop(raw({
      type: mongoose.Schema.Types.String,
      enum: Object.values(OfferType),
      default: OfferType.DRAFT,
    }))
    type: OfferType;

    @Prop(raw({
      type: [mongoose.Schema.Types.Mixed]
    }))
    terms: (
      Omit<Term['props'], 'deposit'>
      & { ID: string, deposit: Deposit['props'] }
      )[]

    @Prop(raw({
      type: [mongoose.Schema.Types.Mixed]
    }))
    options: Option['props'][]

    @Prop(
      raw({
        type: mongoose.Schema.Types.Mixed
      })
    )
    payment: Payment['props'];

    @Prop(
      raw({
        type: mongoose.Schema.Types.Mixed
      })
    )
    address: Address['props'];

    @Prop(raw({
      type: mongoose.Schema.Types.String,
      enum: Object.values(PropertyType),
      default: PropertyType.UNDEFINED
    }))
    propertyType: PropertyType;
  }

  export const OfferSchema = SchemaFactory.createForClass(Offer);
}

