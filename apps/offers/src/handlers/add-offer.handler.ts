import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {Infra} from "@bigdeal/infra";
import {BaseOperationResponse} from "@bigdeal/common";
import {AddOfferCommand} from "../commands/add-offer.command";

@CommandHandler(AddOfferCommand)
export class AddOfferHandler implements ICommandHandler<AddOfferCommand> {
  constructor(private repository: Infra.OfferRepository) {}

  async execute(command: AddOfferCommand): Promise<BaseOperationResponse> {
    const {offer} = command;

    const result = await this.repository.persist(offer);

    return result
  }

}
