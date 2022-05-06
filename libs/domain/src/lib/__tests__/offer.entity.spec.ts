import {makeOffer} from "./mocks/offer.mocks";
import {Domain} from "../offer/entities/offer.entity";
import {UncompletedOfferException} from "../offer/exceptions/uncompleted-offer.exception";
import {OfferType} from "../offer/interfaces/offer.interface";
import {OfferPublishedEvent} from "../offer/events/offer-published.event";
import {PaymentStart, PaymentType, PenaltyType} from "@bigdeal/domain";

jest.mock('../offer/events/offer-published.event')
describe(Domain.Offer, () => {


  it('should be defined', function () {
    const offer = makeOffer()

    expect.assertions(2)
    expect(offer).toBeDefined()
    expect(offer).toBeInstanceOf(Domain.Offer)
  });


  describe('Validation', () => {

    it('should call validate on instance creation', function () {

      expect.assertions(1)
      Domain.Offer.validate = jest.fn()

      makeOffer()
      expect(Domain.Offer.validate).toHaveBeenCalled()
    });
    it('should correctly create instance', function () {

      expect.assertions(1)
      const offer = makeOffer()

      expect(offer).toBeInstanceOf(Domain.Offer)
    });
    it('should throw exception when fields not filled(check all)', async function () {
      const cases = {
        incorrectOfferType: {type: 'incorrect'},
        incorrectAddress: {address: {flat: 'helloWorld'}},
        incorrectPropertyType: {propertyType: 'incorrect'},
        emptyTerms: {terms: [{price: 100}]},
        incorrectTerms: {terms: [{price: 100}]},
        incorrectOptions: {options: [{title: 'hello', isEnabled: true}]},
        incorrectAuthorId: {authorId: null},
        incorrectPayment: {type: 'PaymentType', paymentStart: 'PaymentStart', penalty: 'PenaltyType'},
      }
      const casesList = Object.values(cases)
      expect.assertions(casesList.length)


      for (const testCase of casesList) {
        try {
          makeOffer(testCase as any)
        } catch (e) {
          expect(e).toBeInstanceOf(UncompletedOfferException)
        }
      }

    });
  })

  describe('Publish', () => {

    it('should publish correct contract', function () {

      expect.assertions(3)


      const offer = makeOffer()

      offer.apply = jest.fn()

      offer.publish()

      expect(offer.type).toEqual(OfferType.PUBLISHED)
      expect(offer.apply).toHaveBeenCalledWith(expect.any(OfferPublishedEvent))
      expect(OfferPublishedEvent).toHaveBeenCalledWith(offer)
    });

  })

});
