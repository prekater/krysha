import {makeOffer} from "./mocks/offer.mocks";
import {Domain} from "../offer/entities/offer.entity";
import {UncompletedOfferException} from "../offer/exceptions/uncompleted-offer.exception";
import {OfferType} from "../offer/interfaces/offer.interface";
import {OfferPublishedEvent} from "../offer/events/offer-published.event";

jest.mock('../offer/events/offer-published.event')
describe(Domain.Offer, () => {


  it('should be defined', function () {
    const offer = makeOffer()

    expect.assertions(2)
    expect(offer).toBeDefined()
    expect(offer).toBeInstanceOf(Domain.Offer)
  });


  describe('Validation', () => {
    it('should correctly validate', function () {

      expect.assertions(1)
      const offer = makeOffer()

      const result = offer.validate()

      expect(result).toBeTruthy()

    });
    it('should throw exception when fields not filled(check all)', async function () {

      expect.assertions(1)

      const offer = makeOffer()

      // @ts-ignore
      offer['ID'] = null

      try {
        offer.validate()
      } catch (e) {
        expect(e).toBeInstanceOf(UncompletedOfferException)

      }
    });
  })

  describe('Publish', () => {

    it('should publish correct contract', function () {

      expect.assertions(4)

      const offer = makeOffer()

      offer.validate = jest.fn()
      offer.apply = jest.fn()

      offer.publish()

      expect(offer.validate).toHaveBeenCalled()
      expect(offer.type).toEqual(OfferType.PUBLISHED)
      expect(offer.apply).toHaveBeenCalledWith(expect.any(OfferPublishedEvent))
      expect(OfferPublishedEvent).toHaveBeenCalledWith(offer)
    });

  })

});
