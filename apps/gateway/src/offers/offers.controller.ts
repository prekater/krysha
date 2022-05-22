import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {BaseOperationResponse} from "@bigdeal/common";
import {Infra} from "@bigdeal/infra";
import {OffersService} from "./offers.service";


@Controller('api/offers')
export class OffersController {

  constructor(private offersService: OffersService) {
  }

  @Post()
  async addOffer(@Body() offer: Infra.Offer): Promise<BaseOperationResponse> {
    return await this.offersService.addOffer(offer)
  }

  @Get(':id')
  async getOffer(@Param('id') id: string): Promise<Infra.Contract> {
    return await this.offersService.getById(id);
  }

}
