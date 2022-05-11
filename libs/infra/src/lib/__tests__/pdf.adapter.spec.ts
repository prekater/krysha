import {ContractContentAdapter} from "../exporter/adapters/contractContentAdapter";
import {makeContract} from "@bigdeal/test-utils";
import {Language} from "@bigdeal/common";

describe(ContractContentAdapter, () => {

  const contract = makeContract()

  describe('ru', () => {

    const contentAdapter = new ContractContentAdapter(contract, Language.RU)

    it('should be defined', function () {
      expect(contentAdapter).toBeDefined()
    });

    it('should correctly create term content', async function () {

      const content = await contentAdapter.makeTerms()

      expect(content).toEqual({
        title: 'Условия аренды',
        rentalPeriod: 'Период аренды: __1__ (от 1 до 3) месяцев',
        pricePerMonth: 'Стоимость в месяц: 100000 рублей',
        deposit: "Депозит: 100000 рублей",
        depositCollectType: "При заезде: Оплата депозита сразу",
        depositReturnType: "В случае разрыва контракта: Депозит возвращается при уведомлении за 1 месяц",
      })
    });


  })


});
