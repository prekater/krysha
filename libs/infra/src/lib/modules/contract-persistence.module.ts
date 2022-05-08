import {Module} from "@nestjs/common"
import {MongooseModule} from "@nestjs/mongoose";
import {Contract, ContractSchema} from "../schemas/contract.schema";
import {ContractRepository} from "../repositories/contract.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Contract.name, schema: ContractSchema},
    ]),
  ],
  providers: [
    ContractRepository
  ],
  exports: [
    ContractRepository
  ],
})
export class ContractPersistenceModule {
}
