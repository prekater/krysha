import {makeContract} from "@bigdeal/test-utils";
import {Language} from "@bigdeal/common";
import {TermAdapter} from "../exporter/adapters/term.adapter";
import {AddressAdapter} from "../exporter/adapters/address.adapter";
import {AbstractContentAdapter} from "../exporter/adapters/interfaces/content.adapter.abstract";
import {OptionAdapter} from "../exporter/adapters/option.adapter";
import {PaymentAdapter} from "../exporter/adapters/payment.adapter";
import {MetaAdapter} from "../exporter/adapters/meta.adapter";
import {RentalPeriodAdapter} from "../exporter/adapters/rental-period.adapter";

describe(AbstractContentAdapter, () => {

  const contract = makeContract()

  describe(Language.RU, () => {

    const termAdapter = new TermAdapter(contract.term, Language.RU)
    const addressAdapter = new AddressAdapter(contract.address, Language.RU)
    const optionAdapter = new OptionAdapter(contract.options, Language.RU)
    const paymentAdapter = new PaymentAdapter(contract.payment, Language.RU)
    const metaAdapter = new MetaAdapter(contract.meta, Language.RU)
    const rentalPeriodAdapter = new RentalPeriodAdapter(contract.rentalPeriod, Language.RU)


    it('should be defined', function () {
      expect.assertions(6)
      expect(termAdapter).toBeDefined()
      expect(addressAdapter).toBeDefined()
      expect(optionAdapter).toBeDefined()
      expect(paymentAdapter).toBeDefined()
      expect(metaAdapter).toBeDefined()
      expect(rentalPeriodAdapter).toBeDefined()
    })

    it('should correctly create term content', async function () {

      expect.assertions(1)
      const content = await termAdapter.makeContent()

      expect(content).toEqual({
        title: 'Условия аренды',
        rentalPeriod: 'Период аренды: __1__ (от 1 до 3) месяцев',
        periodUnit: "месяцев",
        pricePerMonth: '100000 рублей',
        deposit: "100000 рублей",
        depositCollectType: "При заезде: Оплата депозита сразу",
        depositReturnType: "В случае разрыва контракта: Депозит возвращается при уведомлении за 1 месяц",
        depositReturnPeriod: "в течение 2 календарных дней",
        terminationRules: "найм на период 3 месяцев и менее по 45000 рублей в месяц; найм на период 6 месяцев и менее по 50000 рублей в месяц"

      })
    });

    it('should correctly create address content', async function () {

      expect.assertions(1)

      const content = await addressAdapter.makeContent()

      expect(content).toEqual({
        "city": "г. Москва",
        "flat": "кв. 222",
        "house": "д. 56",
        "street": "улица Свободы",
      })

    });

    it('should correctly create options content', async function () {

      expect.assertions(1)

      const content = await optionAdapter.makeContent()

      expect(content).toEqual({
        "option": "электричество; вода; отопление",
        "title": "Опции: ",
      })

    });

    it('should correctly create payment content', async function () {

      expect.assertions(1)

      const content = await paymentAdapter.makeContent()

      expect(content).toEqual({
        "paymentType": "Тип оплаты: Одним платежом",
        "penalty": "В случае задержки оплаты взимается 300 рублей в сутки с 1 календарного дня после числа оплаты",
        "paymentRules": "оплата за первый месяц найма в полном объеме",
      })

    });

    it('should correctly create property content', async function () {

      expect.assertions(1)

      const content = await metaAdapter.makeContent()

      expect(content).toEqual({
        "propertyType": "Тип жилья: Однокомнатная",
      })

    });

    it('should correctly create rental period content', async function () {
      expect.assertions(1)

      const content = await rentalPeriodAdapter.makeContent()

      expect(content).toEqual({
        "rentalPeriod": "с 12.06.2025 по 12.09.2025"
      })
    });

  })


});
