import {Module} from "@nestjs/common"
import {ContractsGatewayModule} from "./contracts/contracts-gateway.module";
import {OffersGatewayModule} from "./offers/offers-gateway.module";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    ContractsGatewayModule,
    OffersGatewayModule
  ],
  providers: [],
  controllers: [],
  exports: [],
})
export class AppModule {
}
