import {makeDeposit} from "@bigdeal/test-utils";
import {Domain} from "@bigdeal/domain";
import {UncompletedDepositException} from "../offer/exceptions/uncompleted-deposit.exception";

describe(Domain.Deposit, () => {


  it('should be defined', function () {

    const deposit = makeDeposit()

    expect.assertions(2)
    expect(deposit).toBeDefined()
    expect(deposit).toBeInstanceOf(Domain.Deposit)
  });


  describe('Validation', () => {

    it('should call validate on instance creation', function () {
      expect.assertions(1)
      jest.spyOn(Domain.Deposit, 'validate')

      makeDeposit()
      expect(Domain.Deposit.validate).toHaveBeenCalled()
    });


    it('should throw exception when fields not filled(check all)', async function () {
      const cases = {
        incorrectValue1: {value: 'wefew'},
        incorrectValue2: {value: -1},
        incorrectRT: {returnType: 'hello' },
        incorrectCT: {collectType: 'hello' }
      }
      const casesList = Object.values(cases)
      expect.assertions(casesList.length)

      for (const testCase of casesList) {
        try {
          const deposit = makeDeposit(testCase as any)

        } catch (e) {
          expect(e).toBeInstanceOf(UncompletedDepositException)
        }
      }

    });
  })


});
