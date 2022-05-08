import {Model} from "mongoose";
import {Injectable, Logger} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Mappers} from "@bigdeal/mappers";
import {Domain} from "@bigdeal/domain";
import * as Infra from "../schemas/contract.schema";

@Injectable()
export class ContractRepository implements Domain.IContractRepository {

  private readonly logger = new Logger(ContractRepository.name);

  constructor(
    @InjectModel(Infra.Contract.name)
    private readonly contracts: Model<Infra.Contract>,
  ) {
  }


  public async persist(contract: Domain.Contract): Promise<void> {

    try {
      const persistenceViewContract = Mappers.Contract.fromDomainModelToPersistenceModel(contract)

      await this.contracts.updateOne({ID: persistenceViewContract.ID}, persistenceViewContract, {upsert: true})
    } catch (e) {
      this.logger.error(e.message)
      console.error(e.stack)
    }
  }

  public async getAllByAuthorId(authorId: Domain.Contract['authorId']): Promise<Domain.Contract[]> {

    try {
      const contractsDbView = await this.contracts.find({authorId}).lean().exec();

      return contractsDbView.map(o => Mappers.Contract.fromObjectToDomainModel(o))
    } catch (e) {
      this.logger.error(e.message)
      console.error(e.stack)
      return []
    }


  }

  public async getById(ID: string): Promise<Domain.Contract> {

    try {
      const contractDbView = await this.contracts
        .findOne({ID})
        .lean()
        .exec();

      return Mappers.Contract.fromObjectToDomainModel(contractDbView)
    } catch (e) {
      this.logger.error(e.message)
      console.error(e.stack)
      return null
    }

  }
}
