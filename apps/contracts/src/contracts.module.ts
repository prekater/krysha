import {Module} from "@nestjs/common"
import {MongooseModule} from "@nestjs/mongoose";
import {CqrsModule} from "@nestjs/cqrs";
import {Infra} from "@bigdeal/infra";
import {ConfigModule} from "@nestjs/config";
import {AddContractCommand} from "./commands/add-contract.command";
import {AddContractController} from "./controllers/add-contract.controller";

@Module({
    imports: [
      MongooseModule.forRoot(
        `${process.env.MONGO_URL}`,
        {
          useNewUrlParser: true,
        },
      ),
      CqrsModule,
      Infra.ContractPersistenceModule,
      Infra.OfferPersistenceModule,
      ConfigModule.forRoot({isGlobal: true})
    ],
    providers: [
      AddContractCommand,
    ],
    controllers: [
      AddContractController,
    ],
    exports: [],
})
export class ContractsModule{}
