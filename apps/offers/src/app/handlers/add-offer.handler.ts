import {OfferRepository} from "@bigdeal/infra";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {AddOfferCommand} from "../commands/add-offer.command";
import {AddOffer} from "@bigdeal/domain";

@CommandHandler(AddOfferCommand)
export class AddOfferHandler implements ICommandHandler<AddOfferCommand> {
  constructor(private repository: OfferRepository) {}

  async execute(command: AddOfferCommand): Promise<void> {
    const { offer } = command;

    await this.repository.persist(offer);
  }
}
