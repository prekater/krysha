import {SearchContractByIdDto} from "./search-contract-by-id.dto";
import {Domain} from '@bigdeal/domain'

export type UserDto  = Omit<Domain.UserDataProps, 'email'> & {
  email: string;
}
export class ExportContractDto extends SearchContractByIdDto {
  user1: UserDto;
  user2: UserDto;
}
