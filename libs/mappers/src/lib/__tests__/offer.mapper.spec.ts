import {Mappers} from "../../";

import * as uuid from 'uuid'
import {makeOffer, offerObjectMock} from "@bigdeal/test-utils";
jest.mock('uuid')

describe(Mappers.Offer, () => {

  it('should convert from domain to persitence model', function () {

    jest.spyOn(uuid, 'v4').mockReturnValue('test')
    expect.assertions(1)
    const offer = makeOffer()
    const persistenceOffer = Mappers
      .Offer
      .fromDomainModelToPersistenceModel(offer)
    expect(persistenceOffer).toEqual(offerObjectMock);
  })

  it('should convert from plain object to domain model', function () {

    expect.assertions(1)
    jest.spyOn(uuid, 'v4').mockReturnValue('test')

    const offer = makeOffer()

    const domainOffer = Mappers.Offer.fromObjectToDomainModel(offerObjectMock)

    expect(domainOffer).toEqual(offer)

  });

});
