import {Module} from "@nestjs/common"
import {ContractsGatewayModule} from "./contracts/contracts-gateway.module";
import {OffersGatewayModule} from "./offers/offers-gateway.module";

@Module({
  imports: [
    ContractsGatewayModule,
    OffersGatewayModule
  ],
  providers: [],
  controllers: [],
  exports: [],
})
export class AppModule {
}
