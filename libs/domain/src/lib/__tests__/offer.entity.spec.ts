import {makeOffer} from "./mocks/offer.mocks";
import {Offer} from "../offer/entities/offer.entity";
import {UncompletedOfferException} from "../offer/exceptions/uncompleted-offer.exception";

describe('Test Offer', () => {


  it('should be defined', function () {
    const offer = makeOffer()

    expect.assertions(2)
    expect(offer).toBeDefined()
    expect(offer).toBeInstanceOf(Offer)
  });


  describe('Validation', () => {
    it('should correctly validate', function () {

      expect.assertions(1)
      const offer = makeOffer()

      const result = offer.validate()

      expect(result).toBeTruthy()

    });
    it('should throw exception when fields nor filled(check all)', async function () {

      expect.assertions(1)

      const offer = makeOffer()

      offer['props']['ID'] = null

      try {
        offer.validate()
      } catch (e) {
        expect(e).toBeInstanceOf(UncompletedOfferException)

      }

    });
  })

  describe('Publish', () => {

    it('should publish correct contract', function () {

    });
    it('should throw exception if validation havent been passed', function () {

    });
  })


});
