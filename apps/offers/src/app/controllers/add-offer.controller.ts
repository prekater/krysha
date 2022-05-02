import {Controller, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {CommandBus} from "@nestjs/cqrs";
import {
  IController,
  BaseOperationResponse,
  RetrieveOfferDomainModelFromDtoPipe
} from "@bigdeal/common";
import {AddOfferDto} from "../dto/add-offer.dto";


@Controller('offers')
export class AddOfferController implements IController<AddOfferDto, BaseOperationResponse>{


  constructor(private commandBus: CommandBus) {}


  @UsePipes(
    ValidationPipe,
    RetrieveOfferDomainModelFromDtoPipe
  )
  @Post()
  handle(addOfferDto: AddOfferDto): Promise<BaseOperationResponse> {

    return;
  }

}



