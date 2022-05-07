import {Infra} from "@bigdeal/infra";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {AddOfferCommand} from "../commands/add-offer.command";

@CommandHandler(AddOfferCommand)
export class AddOfferHandler implements ICommandHandler<AddOfferCommand> {
  constructor(private repository: Infra.OfferRepository) {}

  async execute(command: AddOfferCommand): Promise<void> {
    const { offer } = command;

    await this.repository.persist(offer);
  }
}
