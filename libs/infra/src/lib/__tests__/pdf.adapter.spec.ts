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
        "depositContent": "Арендатор освобождается от обязательств внесения обеспечительного платежа при условии оплаты Арендодателю дополнительной комиссии на сумму «500» руб. в месяц вместе с ежемесячным платежом аренды, при этом гарантирует соответствующие выплаты Арендодателю в случае наступления обстоятельств, указанных в п. 2.2.11 настоящего Договора. В случае, если комиссия прекращает оплачиваться с момента прекращения выплаты комиссии Арендодатель обязан внести обеспечительный платеж в размере 100000 руб. в течение двух дней",
        title: 'Условия аренды',
        rentalPeriod: 'Период аренды: __1__ (от 1 до 3) месяцев',
        periodUnit: "месяцев",
        deposit: "100000 руб.",
        "terminationRules": "в размере 45000 руб. в месяцев при расторжении до 3 месяцев; в размере 50000 руб. в месяцев при расторжении до 6 месяцев",
        depositCollectType: "При заезде: Без депозита, каждый месяц стоит дороже на 10000 руб.",
        "pricePerMonth": "руб.",
        depositCollectTypeOptions: [
          {
            "isEnabled": true,
            "label": "При заезде: Без депозита, каждый месяц стоит дороже на 10000 руб.",
            "priceAffect": 10000,
            "type": "ABSENT_WITH_EXTRA_CHARGE",
          },
          {
            "isEnabled": false,
            "label": "При заезде: депозит частями: 2 раза в месяц",
            "priceAffect": 2000,
            "type": "PARTIAL",
          },
        ],
        depositReturnType: "В случае разрыва контракта: Депозит возвращается при уведомлении за 1 месяц",
        depositReturnPeriod: "в течение 2 календарных дней",

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
        "excluded": "электричество; вода; отопление",
        "included": "интернет",
        "title": "Опции: ",
      })

    });

    it('should correctly create payment content', async function () {

      expect.assertions(1)

      const content = await paymentAdapter.makeContent()

      expect(content).toEqual({
        "paymentTypeOnePayment": "Одним платежом",
        "paymentTypeTwoPayments": "Двумя платежами за дополнительные 2000 руб. в месяц к сумме аренды",
        "paymentType": "Тип оплаты: Двумя платежами",
        "penalty": "В случае задержки оплаты оплата не взимается",
        "paymentRules": "оплата за первый месяц найма в полном объеме",
      })

    });

    it('should correctly create property content', async function () {

      expect.assertions(1)

      const content = await metaAdapter.makeContent()

      expect(content).toEqual({
        "propertyType": "Однокомнатная квартира",
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
