import {Prop, raw, Schema as MongooseSchema, SchemaFactory} from "@nestjs/mongoose";
import {Domain} from "@bigdeal/domain";
import * as mongoose from "mongoose";

@MongooseSchema({versionKey: false, timestamps: true, autoIndex: true, autoCreate: true})
export class Contract {
  @Prop()
  ID: string;

  @Prop()
  authorId: string;

  @Prop(raw({
    type: mongoose.Schema.Types.Mixed,
  }))
  rentalPeriod: Domain.RentalPeriodProps<string>

  @Prop(raw({
    type: mongoose.Schema.Types.Mixed,
  }))
  term: (
    Omit<Domain.Term['props'], 'deposit'>
    & { ID: string, deposit: Domain.Deposit['props'] }
    )

  @Prop(raw({
    type: [mongoose.Schema.Types.Mixed]
  }))
  options: Domain.Option['props'][]

  @Prop(
    raw({
      type: mongoose.Schema.Types.Mixed
    })
  )
  payment: Domain.Payment['props'];

  @Prop(
    raw({
      type: mongoose.Schema.Types.Mixed
    })
  )
  address: Domain.Address['props'];

  @Prop(raw({
    type: mongoose.Schema.Types.String,
    enum: Object.values(Domain.PropertyType),
    default: Domain.PropertyType.UNDEFINED
  }))
  propertyType: Domain.PropertyType;
}

export const ContractSchema = SchemaFactory.createForClass(Contract);

