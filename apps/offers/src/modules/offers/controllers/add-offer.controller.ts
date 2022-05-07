import {Controller, UsePipes} from '@nestjs/common';
import {MessagePattern} from "@nestjs/microservices";
import {CommandBus} from "@nestjs/cqrs";
import {
  IController,
  BaseOperationResponse,
} from "@bigdeal/common";
import {ADD_OFFER_COMMAND} from "@bigdeal/messaging";
import {Domain} from "@bigdeal/domain";
import {AddOfferCommand} from "../commands/add-offer.command";
import {OfferDraftStatusPipe} from "../pipes/add-offer-validation-pipe.service";
import {RetrieveOfferDomainModelFromDtoPipe} from "../pipes/retrieve-offer-domain-model-from-dto.pipe";


@Controller()
export class AddOfferController implements IController<Domain.Offer, BaseOperationResponse> {

  constructor(private readonly commandBus: CommandBus) {
  }

  @UsePipes(
    OfferDraftStatusPipe,
    RetrieveOfferDomainModelFromDtoPipe
  )
  @MessagePattern(ADD_OFFER_COMMAND)
  async handle(offer: Domain.Offer): Promise<BaseOperationResponse> {
    return await this.commandBus.execute(new AddOfferCommand(offer));
  }

}



