import {Module} from "@nestjs/common"
import {ProxyTCPModule} from "@bigdeal/messaging";
import {ContractsController} from "./contracts.controller";
import {ContractsService} from "./contracts.service";

@Module({
    imports: [
      ProxyTCPModule,

    ],
    providers: [
      ContractsService,
    ],
    controllers: [ContractsController],
})
export class ContractsGatewayModule {}
