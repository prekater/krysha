import {makeContract} from "@bigdeal/test-utils";
import {Language} from "@bigdeal/common";
import {TermAdapter} from "../exporter/adapters/term.adapter";
import {AddressAdapter} from "../exporter/adapters/address.adapter";
import {AbstractContentAdapter} from "../exporter/adapters/interfaces/content.adapter.abstract";
import {OptionAdapter} from "../exporter/adapters/option.adapter";
import {PaymentAdapter} from "../exporter/adapters/payment.adapter";
import {ContractMetaAdapter} from "../exporter/adapters/contract-meta.adapter";

describe(AbstractContentAdapter, () => {

  const contract = makeContract()

  describe(Language.RU, () => {

    const termAdapter = new TermAdapter(contract, Language.RU)
    const addressAdapter = new AddressAdapter(contract, Language.RU)
    const optionAdapter = new OptionAdapter(contract, Language.RU)
    const paymentAdapter = new PaymentAdapter(contract, Language.RU)
    const metaAdapter = new ContractMetaAdapter(contract, Language.RU)


    it('should be defined', function () {
      expect.assertions(5)
      expect(termAdapter).toBeDefined()
      expect(addressAdapter).toBeDefined()
      expect(optionAdapter).toBeDefined()
      expect(paymentAdapter).toBeDefined()
      expect(metaAdapter).toBeDefined()
    })

    it('should correctly create term content', async function () {

      expect.assertions(1)
      const content = await termAdapter.makeContent()

      expect(content).toEqual({
        title: 'Условия аренды',
        rentalPeriod: 'Период аренды: __1__ (от 1 до 3) месяцев',
        pricePerMonth: 'Стоимость в месяц: 100000 рублей',
        deposit: "Депозит: 100000 рублей",
        depositCollectType: "При заезде: Оплата депозита сразу",
        depositReturnType: "В случае разрыва контракта: Депозит возвращается при уведомлении за 1 месяц",
      })
    });

    it('should correctly create address content', async function () {

      expect.assertions(1)

      const content = await addressAdapter.makeContent()

      expect(content).toEqual({
        "city": "Город: Москва",
        "flat": "Этаж: 222",
        "house": "Дом: 56",
        "street": "Улица: улица Свободы",
      })

    });

    it('should correctly create options content', async function () {

      expect.assertions(1)

      const content = await optionAdapter.makeContent()

      expect(content).toEqual({
        "option": `Электричество : Включено\nВода : Включено\nКондиционер : Включено`,
        "title": "Опции: ",
      })

    });

    it('should correctly create payment content', async function () {

      expect.assertions(1)

      const content = await paymentAdapter.makeContent()

      expect(content).toEqual({
        "paymentStart": "Дата оплаты: В дату начала аренды",
        "paymentType": "Тип оплаты: Одним платежом",
        "penalty": "Штраф за просрочку платежа: Отсутствует",
      })

    });

    it('should correctly create property content', async function () {

      expect.assertions(1)

      const content = await metaAdapter.makeContent()

      expect(content).toEqual({
        "propertyType": "Тип жилья: Однокомнатная",
      })

    });

  })


});
