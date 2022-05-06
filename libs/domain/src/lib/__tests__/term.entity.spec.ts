import {makeTerm} from "./mocks/offer.mocks";
import {Term} from "@bigdeal/domain";
import {UncompletedTermException} from "../offer/exceptions/uncompleted-term.exception";

describe(Term, () => {


  it('should be defined', function () {

    const deposit = makeTerm()

    expect.assertions(2)
    expect(deposit).toBeDefined()
    expect(deposit).toBeInstanceOf(Term)
  });


  describe('Validation', () => {

    it('should call validate on instance creation', function () {
      expect.assertions(1)
      jest.spyOn(Term, 'validate')

      makeTerm()
      expect(Term.validate).toHaveBeenCalled()
    });


    it('should throw exception when fields not filled(check all)', async function () {
      const cases = {
        incorrectDeposit: {deposit: 'wefew'},
        incorrectPrice1: {price: 'swef'},
        incorrectPrice2: {price: -1},
        incorrectPeriodFrom: {periodFrom: -1},
        incorrectPeriodTo: {periodTo: -1},
        incorrectPeriodRange: {periodFrom: 2, periodTo: 1},
      }
      const casesList = Object.values(cases)
      expect.assertions(casesList.length)

      for (const testCase of casesList) {
        try {
          const term = makeTerm(testCase as any)
          console.debug(testCase)
        } catch (e) {
          expect(e).toBeInstanceOf(UncompletedTermException)
        }
      }

    });
  })


});
