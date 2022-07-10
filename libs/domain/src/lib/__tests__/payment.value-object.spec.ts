import {makePayment} from "@bigdeal/test-utils";
import {Domain} from "@bigdeal/domain";
import {
  UncompletedPaymentException
} from "../offer/exceptions/uncompleted-payment.exception";

describe(Domain.Payment, () => {


  it('should be defined', function () {

    const payment = makePayment()

    expect.assertions(2)
    expect(payment).toBeDefined()
    expect(payment).toBeInstanceOf(Domain.Payment)
  });


  describe('Validation', () => {

    it('should call validate on instance creation', function () {
      expect.assertions(1)
      jest.spyOn(Domain.Payment, 'validate')

      makePayment()
      expect(Domain.Payment.validate).toHaveBeenCalled()
    });


    it('should throw exception when fields not filled(check all)', async function () {
      const cases = {
        incorrectPaymentStartOptions: {paymentStartOptions: [{type: 'wefew'}]},
        incorrectPaymentTypeOptions: {paymentTypeOptions: [{type: 'wefew', priceAffect: 1000}]},
        incorrectPaymentTypeOptions2: {paymentTypeOptions: [{type: 'START_OF_MONTH'}]},
      }
      const casesList = Object.values(cases)
      expect.assertions(casesList.length)

      for (const testCase of casesList) {
        try {
          const payment = makePayment(testCase as any)
          console.debug(testCase)

        } catch (e) {
          expect(e).toBeInstanceOf(UncompletedPaymentException)
        }
      }

    });
  })


});
