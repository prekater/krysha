import {Contract} from "../entities/contract.entity";
import {BaseOperationResponse} from "@bigdeal/common";

export interface IContractRepository {
  persist( contract: Contract): Promise<BaseOperationResponse>
  getAllByAuthorId( authorId: Contract['authorId']): Promise<Contract[]>
  getById( id: string): Promise<Contract>
}
