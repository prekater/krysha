import {Module} from "@nestjs/common"
import {OffersModule} from "./modules/offers/offers.module";
import {ContractsModule} from "./modules/contracts/contracts.module";

@Module({
    imports: [
      OffersModule,
      ContractsModule
    ],
    providers: [],
    controllers: [],
    exports: [],
})
export class AppModule{}
