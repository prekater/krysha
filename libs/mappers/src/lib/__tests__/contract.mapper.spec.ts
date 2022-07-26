
import * as uuid from 'uuid'
import {makeContract, contractObjectMock} from "@bigdeal/test-utils";
import {Mappers} from "../../";
import * as moment from "moment";
import {DATE_FORMAT} from "@bigdeal/common";
jest.mock('uuid')

describe(Mappers.Contract, () => {

  it('should convert from domain to persistence model', function () {

    jest.spyOn(uuid, 'v4').mockReturnValue('test')
    expect.assertions(1)
    const contract = makeContract()
    const persistenceContract = Mappers
      .Contract
      .fromDomainModelToPersistenceModel(contract)


    expect(persistenceContract).toEqual({
      ...contractObjectMock,
      date: moment().format(DATE_FORMAT)
    });
  })

  it('should convert from plain object to domain model', function () {

    expect.assertions(1)
    jest.spyOn(uuid, 'v4').mockReturnValue('test')

    const contract = makeContract()

    const domainContract = Mappers.Contract.fromObjectToDomainModel({
      ...contractObjectMock, date: moment().format(DATE_FORMAT)
    } as any)

    expect(domainContract).toEqual(contract)
  });

});
