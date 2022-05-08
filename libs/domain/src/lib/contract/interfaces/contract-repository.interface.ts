import {Contract} from "../entities/contract.entity";

export interface IContractRepository {
  persist( contract: Contract): Promise<void>
  getAllByAuthorId( authorId: Contract['authorId']): Promise<Contract[]>
  getById( id: string): Promise<Contract>
}
