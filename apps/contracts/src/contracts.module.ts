import {Module} from "@nestjs/common"
import {MongooseModule} from "@nestjs/mongoose";
import {CqrsModule} from "@nestjs/cqrs";
import {Infra} from "@bigdeal/infra";
import {ConfigModule} from "@nestjs/config";
import {CreateContractCommand} from "./commands/create-contract.command";
import {CreateContractController} from "./controllers/create-contract.controller";
import {CreateContractHandler} from "./handlers/create-contract.handler";
import {ExportContractController} from "./controllers/export-contract.controller";
import {ExportContractQuery} from "./queries/export-contract.query";
import {ExportContractHandler} from "./handlers/export-contract.handler";
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
      CreateContractCommand,
      CreateContractHandler,
      ExportContractQuery,
      ExportContractHandler,

      {
        provide: Infra.Exporter,
        useClass: Infra.PdfExporter
      },
      {
        provide: Infra.Transport,
        useClass: Infra.HelloSignTransport
      }
    ],
    controllers: [
      CreateContractController,
      ExportContractController
    ],
    exports: [],
})
export class ContractsModule{}
