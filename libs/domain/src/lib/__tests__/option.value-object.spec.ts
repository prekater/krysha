import {makeOption} from "@bigdeal/test-utils";
import {Domain} from "@bigdeal/domain";
import {UncompletedOptionException} from "../offer/exceptions/uncompleted-option.exception";

describe(Domain.Option, () => {


  it('should be defined', function () {

    const option = makeOption()

    expect.assertions(2)
    expect(option).toBeDefined()
    expect(option).toBeInstanceOf(Domain.Option)
  });


  describe('Validation', () => {

    it('should call validate on instance creation', function () {
      expect.assertions(1)
      jest.spyOn(Domain.Option, 'validate')

      makeOption()
      expect(Domain.Option.validate).toHaveBeenCalled()
    });


    it('should throw exception when fields not filled(check all)', async function () {
      const cases = {
        emptyTitle: {title: ''},
        incorrectIsEnabled: {isEnabled: 'hello'}
      }
      const casesList = Object.values(cases)
      expect.assertions(casesList.length)

      for (const testCase of casesList) {
        try {
          const option = makeOption(testCase as any)

        } catch (e) {
          expect(e).toBeInstanceOf(UncompletedOptionException)
        }
      }

    });
  })


});
