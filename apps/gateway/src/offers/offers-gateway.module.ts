import {Module} from "@nestjs/common"
import {ProxyTCPModule} from "@bigdeal/messaging";
import {OffersController} from "./offers.controller";
import {OffersService} from "./offers.service";

@Module({
    imports: [
      ProxyTCPModule
    ],
    providers: [
      OffersService,
    ],
    controllers: [OffersController],
})
export class OffersGatewayModule {}
