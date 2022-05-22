import {Module} from "@nestjs/common"
import {MongooseModule} from "@nestjs/mongoose";
import {CqrsModule} from "@nestjs/cqrs";
import {Infra} from "@bigdeal/infra";
import {ConfigModule} from "@nestjs/config";
import {AddContractCommand} from "./commands/add-contract.command";
import {ExportContractCommand} from "./commands/export-contract.command";
import {ExportContractController} from "./controllers/export-contract.controller";

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
      ConfigModule.forRoot({isGlobal: true})
    ],
    providers: [
      AddContractCommand,
      ExportContractCommand
    ],
    controllers: [
      AddContractCommand,
      ExportContractController
    ],
    exports: [],
})
export class ContractsModule{}
