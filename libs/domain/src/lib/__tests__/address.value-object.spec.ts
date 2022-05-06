import {Address} from "@bigdeal/domain";
import {makeAddress} from "./mocks/offer.mocks";
import {UncompletedAddressException} from "../offer/exceptions/uncompleted-address.exception";

describe(Address, () => {


  it('should be defined', function () {

    const address = makeAddress()

    expect.assertions(2)
    expect(address).toBeDefined()
    expect(address).toBeInstanceOf(Address)
  });


  describe('Validation', () => {

    it('should call validate on instance creation', function () {
      expect.assertions(1)
      jest.spyOn(Address, 'validate')

      makeAddress()
      expect(Address.validate).toHaveBeenCalled()
    });


    it('should throw exception when fields not filled(check all)', async function () {
      const cases = {
        incorrectCity: {city: ''},
        incorrectStreet: {street: ''},
        incorrectHouse: {house: '' },
        incorrectFlat: {flat: '' }
      }
      const casesList = Object.values(cases)
      expect.assertions(casesList.length)

      for (const testCase of casesList) {
        try {
          makeAddress(testCase as any)

        } catch (e) {
          expect(e).toBeInstanceOf(UncompletedAddressException)
        }
      }

    });
  })


});
