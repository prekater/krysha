import {IsNotEmpty, IsOptional} from "class-validator";

export class AddOfferDto {

  @IsNotEmpty()
  singleViewImage?: string;

}
