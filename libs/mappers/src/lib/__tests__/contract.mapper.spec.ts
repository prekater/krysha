import {Mappers} from "../../";

import * as uuid from 'uuid'
import {makeContract, contractObjectMock} from "@bigdeal/test-utils";
jest.mock('uuid')

describe(Mappers.Contract, () => {

  it('should convert from domain to persistence model', function () {

    jest.spyOn(uuid, 'v4').mockReturnValue('test')
    expect.assertions(1)
    const contract = makeContract()
    const persistenceContract = Mappers
      .Contract
      .fromDomainModelToPersistenceModel(contract)

    expect(persistenceContract).toEqual(contractObjectMock);
  })

  it('should convert from plain object to domain model', function () {

    expect.assertions(1)
    jest.spyOn(uuid, 'v4').mockReturnValue('test')

    const contract = makeContract()

    const domainContract = Mappers.Contract.fromObjectToDomainModel(contractObjectMock as any)

    expect(domainContract).toEqual(contract)

  });

});
