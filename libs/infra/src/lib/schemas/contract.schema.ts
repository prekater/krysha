import {Prop, raw, Schema as MongooseSchema, SchemaFactory} from "@nestjs/mongoose";
import {Domain} from "@bigdeal/domain";
import * as mongoose from "mongoose";
import * as moment from "moment";
import {DATE_FORMAT} from "@bigdeal/common";

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
    Omit<Domain.Term['props'], 'deposit' | 'terminationRules'>
    & {
    ID: string,
    deposit: Domain.Deposit['props'],
    terminationRules: Domain.TerminationRule['props'][]
  }
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
  payment: Omit<Domain.Payment['props'], 'penalty'> & { penalty?: Domain.Penalty['props'] };

  @Prop()
  date: string;


  @Prop(
    raw({
      type: mongoose.Schema.Types.Mixed
    })
  )
  address: Domain.Address['props'];

  @Prop(raw({
    type: mongoose.Schema.Types.Mixed,
    validate: {
      validator: function(v:  Domain.ContractProps['meta']) {
        return Object.values(Domain.PropertyType).includes(v.propertyType)
      },
      message: props => `meta is not a valid`
    },
  }))
  meta: Domain.ContractProps['meta'];
}

export const ContractSchema = SchemaFactory.createForClass(Contract);

