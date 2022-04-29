import {makeOffer} from "./mocks/offer.mocks";
import {Offer} from "../offer/entities/offer.entity";

describe('Test Offer', () => {

  const offer = makeOffer()

  it('should be defined', function () {
    expect.assertions(2)
    expect(offer).toBeDefined()
    expect(offer).toBeInstanceOf(Offer)
  });


  describe('Validation', () => {
    it('should correctly validate', function () {

    });
    it('should throw exception when fields nor filled(check all)', function () {

    });
  })

  describe('Publish', () => {

    it('should publish correct contract', function () {

    });
    it('should throw exception if validation havent been passed', function () {

    });
  })


});
