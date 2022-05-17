import {Domain} from "@bigdeal/domain";
import {makeContract} from "@bigdeal/test-utils";
import {UncompletedContractException} from "../contract/exceptions/uncompleted-contract.exception";
import {IExporter} from "../contract/interfaces/exporter.interface";

describe(Domain.Contract, () => {

  describe('Init', () => {
    it('should create contract from offer', function () {
      expect.assertions(2)

      const contract = makeContract()
      expect(contract).toBeDefined()
      expect(contract).toBeInstanceOf(Domain.Contract)
    });

  })

  describe('Validation', () => {
    it('should throw exception because of incorrect contract', function () {

      expect.assertions(1)

      try {
        const contract = makeContract('hello')
        console.debug(contract)
      } catch (e) {
        expect(e).toBeInstanceOf(UncompletedContractException)
      }

    });
  })

  describe('Export', () => {
    it('should call export method', async function () {

      expect.assertions(1)
      const mockExporter: IExporter = {
        export: jest.fn().mockResolvedValue(true)
      }

      const contract = makeContract()
      await contract.export(mockExporter)

      expect(mockExporter.export).toHaveBeenCalledWith(contract)
    });
  })


});
