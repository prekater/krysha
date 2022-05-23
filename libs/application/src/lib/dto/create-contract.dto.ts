
//todo: validate with class-validator
export type CreateContractDto =  {
  offerId: string;
  termId: string;
  rentalStart: string;
  rentalEnd: string;
  renter: string;
  landlord: string;
}
