import {INestApplication} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {Transport} from "@nestjs/microservices";
import {injectEnv, makeContract} from "@bigdeal/test-utils";
import {Infra} from "@bigdeal/infra";
import {Application} from "@bigdeal/application";
import * as request from 'supertest'
import {v4 as uuid} from 'uuid';
import * as pdfParser from 'pdf-parse'
import {AppModule} from "../../../gateway/src/app.module";
import {OffersModule} from "../../../offers/src/offers.module";
import {ContractsModule} from "../../../contracts/src/contracts.module";
import {createOfferPayload1} from "./mocks/create-offer-payload";
import {Domain} from "@bigdeal/domain";

describe('Application e2e', () => {
  let gateway: INestApplication;

  process.env.OFFERS_MICROSERVICE_HOST = 'localhost'
  process.env.CONTRACTS_MICROSERVICE_HOST = 'localhost'

  beforeAll(async () => {

    injectEnv()
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [],
      controllers: []
    }).compile();

    gateway = moduleFixture.createNestApplication();

    await gateway.init();
  });

  afterAll(async () => {
    await gateway.close();
  });

  it('should be defined', function () {
    expect.assertions(1)
    expect(gateway).toBeDefined()
  });


  describe('Offers integration', () => {

    let offersMicroservice;

    let repo: Infra.OfferRepository;

    beforeAll(async () => {

      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [OffersModule],
        providers: [],
        controllers: []
      }).compile();

      offersMicroservice = moduleFixture.createNestApplication();
      offersMicroservice.connectMicroservice({
        transport: Transport.TCP,
        options: {
          port: 3001,
        }
      }, {inheritAppConfig: true})


      await offersMicroservice.startAllMicroservices();

      await offersMicroservice.init();

      repo = moduleFixture.get<Infra.OfferRepository>(Infra.OfferRepository)
    })
    afterAll(async () => {
      await offersMicroservice.close();
    });

    beforeEach(async () => {
      await repo['offers'].deleteMany({})
    })

    it('should be defined', function () {
      expect.assertions(2)
      expect(offersMicroservice).toBeDefined()
      expect(repo).toBeDefined()
    });

    it('should correctly add offer', async function () {

      expect.assertions(2)

      let resourceId;

      await request(gateway.getHttpServer())
        .post(`/api/offers`)
        .send(createOfferPayload1)
        .set('Accept', 'application/json')
        .expect(res => {

          expect(res.body).toEqual({
            result: true,
            resourceId: expect.any(String)
          })
          resourceId = res.body.resourceId
        });
      await request(gateway.getHttpServer())
        .get(`/api/offers/${resourceId}`)
        .set('Accept', 'application/json')
        .expect(res => {
          expect(res.body).toEqual(
            {
              "ID": expect.any(String),
              "payment": {
                "paymentStartOptions": [{
                  "type": "START_OF_RENT",
                  "isEnabled": true
                }, {"type": "START_OF_MONTH", "isEnabled": true}],
                "paymentTypeOptions": [{
                  "type": "TWO_PAYMENTS",
                  "priceAffect": 2000,
                  "isEnabled": true
                }, {"type": "ONE_PAYMENT", "priceAffect": 0, "isEnabled": true}],
                "penalty": null
              },
              "paymentContent": {
                "paymentTypeOnePayment": "Одним платежом",
                "paymentTypeTwoPayments": "Двумя платежами за дополнительные 2000 рублей в месяц к сумме аренды",
                "paymentType": "Тип оплаты: Двумя платежами",
                "penalty": "В случае задержки оплаты оплата не взимается",
                "paymentRules": "оплата за первый месяц найма в полном объеме"
              },
              "address": {"house": "д. 56", "flat": "кв. 222", "street": "улица Свободы", "city": "г. Москва"},
              "meta": {"propertyType": "Тип жилья: Однокомнатная"},
              "options": [{"title": "Электричество", "isEnabled": false}, {
                "title": "Кондиционер",
                "isEnabled": true
              }, {"title": "Телевизор", "isEnabled": true}, {"title": "Интернет", "isEnabled": false}],
              "optionsContent": {"title": "Опции: ", "option": "кондиционер; телевизор"},
              "termsContent": [{
                "title": "Условия аренды",
                "periodUnit": "дней",
                "rentalPeriod": "Период аренды: __1__ (от 1 до 3) дней",
                "pricePerMonth": "100000 рублей",
                "deposit": "100000 рублей",
                "depositCollectType": "При заезде: Без депозита, каждый месяц стоит дороже на 10000 рублей",
                "depositCollectTypeOptions": [{
                  "type": "ABSENT_WITH_EXTRA_CHARGE",
                  "priceAffect": "10000",
                  "isEnabled": true,
                  "label": "При заезде: Без депозита, каждый месяц стоит дороже на 10000 рублей"
                }, {
                  "type": "PARTIAL",
                  "priceAffect": "2000",
                  "isEnabled": true,
                  "label": "При заезде: депозит частями: 2 раза в месяц"
                }],
                "depositReturnType": "В случае разрыва контракта: Стоимость месяца пересчитывается",
                "depositReturnPeriod": "в течение 0 календарных undefined",
                "terminationRules": "найм на период 3 месяцев и менее по 145000 рублей в месяц; найм на период 6 месяцев и менее по 150000 рублей в месяц",
                "ID": "4578b396-cd7a-4e2c-8c1e-ac83eb1d030d"
              }, {
                "title": "Условия аренды",
                "periodUnit": "месяцев",
                "rentalPeriod": "Период аренды: __3__ (от 3 до 6) месяцев",
                "pricePerMonth": "90000 рублей",
                "deposit": "100000 рублей",
                "depositCollectType": "При заезде: депозит частями: 2 раза в месяц",
                "depositCollectTypeOptions": [{
                  "type": "ABSENT_WITH_EXTRA_CHARGE",
                  "priceAffect": 0,
                  "isEnabled": false,
                  "label": "При заезде: Без депозита, каждый месяц стоит дороже на 0 рублей"
                }, {
                  "type": "PARTIAL",
                  "priceAffect": "2000",
                  "isEnabled": true,
                  "label": "При заезде: депозит частями: 2 раза в месяц"
                }],
                "depositReturnType": "В случае разрыва контракта: Стоимость месяца пересчитывается",
                "depositReturnPeriod": "в течение 0 календарных undefined",
                "terminationRules": "найм на период 3 месяцев и менее по 160000 рублей в месяц; найм на период 6 месяцев и менее по 140000 рублей в месяц; найм на период 9 месяцев и менее по 120000 рублей в месяц",
                "ID": "0aef4f7b-eb11-418c-8224-bb78b448f4df"
              }, {
                "title": "Условия аренды",
                "periodUnit": "месяцев",
                "rentalPeriod": "Период аренды: __6__ (от 6 до 12) месяцев",
                "pricePerMonth": "90000 рублей",
                "deposit": "100000 рублей",
                "depositCollectType": "При заезде: Оплата депозита сразу",
                "depositCollectTypeOptions": [{
                  "type": "ABSENT_WITH_EXTRA_CHARGE",
                  "priceAffect": 0,
                  "isEnabled": false,
                  "label": "При заезде: Без депозита, каждый месяц стоит дороже на 0 рублей"
                }, {
                  "type": "PARTIAL",
                  "priceAffect": 0,
                  "isEnabled": false,
                  "label": "При заезде: депозит частями: 2 раза в месяц"
                }],
                "depositReturnType": "В случае разрыва контракта: Стоимость месяца пересчитывается",
                "depositReturnPeriod": "в течение 0 календарных undefined",
                "terminationRules": "найм на период 6 месяцев и менее по 110000 рублей в месяц",
                "ID": "e46775d9-58f2-4ca1-9ab9-65e6754939c0"
              }],
              "terms": [{
                "deposit": {
                  "returnPeriod": 0,
                  "isEnabled": true,
                  "returnPeriodUnit": "",
                  "value": 100000,
                  "returnType": "RECALCULATE_PRICE",
                  "collectOptions": [{
                    "type": "ABSENT_WITH_EXTRA_CHARGE",
                    "priceAffect": "10000",
                    "isEnabled": true
                  }, {"type": "PARTIAL", "priceAffect": "2000", "isEnabled": true}]
                },
                "periodFrom": 1,
                "periodTo": 3,
                "periodUnit": "days",
                "price": 100000,
                "priceUnit": "RUB",
                "terminationRules": [{
                  "props": {
                    "currency": "RUB",
                    "period": 3,
                    "periodUnit": "months",
                    "value": 145000
                  }
                }, {"props": {"currency": "RUB", "period": 6, "periodUnit": "months", "value": 150000}}],
                "ID": "4578b396-cd7a-4e2c-8c1e-ac83eb1d030d"
              }, {
                "deposit": {
                  "returnPeriod": 0,
                  "isEnabled": true,
                  "returnPeriodUnit": "",
                  "value": 100000,
                  "returnType": "RECALCULATE_PRICE",
                  "collectOptions": [{
                    "type": "ABSENT_WITH_EXTRA_CHARGE",
                    "priceAffect": 0,
                    "isEnabled": false
                  }, {"type": "PARTIAL", "priceAffect": "2000", "isEnabled": true}]
                },
                "periodFrom": 3,
                "periodTo": 6,
                "periodUnit": "months",
                "price": 90000,
                "priceUnit": "RUB",
                "terminationRules": [{
                  "props": {
                    "currency": "RUB",
                    "period": 3,
                    "periodUnit": "months",
                    "value": 160000
                  }
                }, {
                  "props": {
                    "currency": "RUB",
                    "period": 6,
                    "periodUnit": "months",
                    "value": 140000
                  }
                }, {"props": {"currency": "RUB", "period": 9, "periodUnit": "months", "value": 120000}}],
                "ID": "0aef4f7b-eb11-418c-8224-bb78b448f4df"
              }, {
                "deposit": {
                  "returnPeriod": 0,
                  "isEnabled": true,
                  "returnPeriodUnit": "",
                  "value": 100000,
                  "returnType": "RECALCULATE_PRICE",
                  "collectOptions": [{
                    "type": "ABSENT_WITH_EXTRA_CHARGE",
                    "priceAffect": 0,
                    "isEnabled": false
                  }, {"type": "PARTIAL", "priceAffect": 0, "isEnabled": false}]
                },
                "periodFrom": 6,
                "periodTo": 12,
                "periodUnit": "months",
                "price": 90000,
                "priceUnit": "RUB",
                "terminationRules": [{
                  "props": {
                    "currency": "RUB",
                    "period": 6,
                    "periodUnit": "months",
                    "value": 110000
                  }
                }],
                "ID": "e46775d9-58f2-4ca1-9ab9-65e6754939c0"
              }]
            }
          )
        });

      // const dbResult = await repo.getById(resourceId)
      //
      // expect(dbResult).toBeDefined()
    });

  })

  describe('Contracts integration', () => {

    let contractsMicroservice;
    let repo: Infra.ContractRepository;
    let offersRepo: Infra.OfferRepository;

    beforeAll(async () => {

      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [ContractsModule],
        providers: [],
        controllers: []
      }).compile();

      contractsMicroservice = moduleFixture.createNestApplication();
      contractsMicroservice.connectMicroservice({
        transport: Transport.TCP,
        options: {
          port: 3002,
        }
      }, {inheritAppConfig: true})


      await contractsMicroservice.startAllMicroservices();

      await contractsMicroservice.init();

      repo = moduleFixture.get<Infra.ContractRepository>(Infra.ContractRepository)
      offersRepo = moduleFixture.get<Infra.OfferRepository>(Infra.OfferRepository)
    })

    afterAll(async () => {
      await contractsMicroservice.close()
    })


    beforeEach(async () => {
      await repo['contracts'].deleteMany({})
    })

    it('should be defined', function () {
      expect.assertions(3)
      expect(contractsMicroservice).toBeDefined()
      expect(repo).toBeDefined()
      expect(offersRepo).toBeDefined()
    });


    it('should correctly create contract', async function () {
      expect.assertions(2)

      const ID = uuid()
      let createdID;

      await offersRepo['offers'].create({...createOfferPayload1, ID})
      const payload: Application.CreateContractDto = {
        landlord: "Иванов Иван Иванович",
        renter: "Петров Петр Петрович",
        offerId: ID,
        termId: createOfferPayload1.terms[0].ID,
        depositOption: Domain.DepositCollectOptionType.CONCLUSION,
        paymentStartOption: Domain.PaymentStart.START_OF_RENT,
        paymentTypeOption: Domain.PaymentType.TWO_PAYMENTS,
        rentalEnd: "23.07.2022",
        rentalStart: "20.07.2022",
      }

      await request(gateway.getHttpServer())
        .post(`/api/contracts`)
        .send(payload)
        .set('Accept', 'application/json')
        .expect(res => {

          expect(res.body).toEqual({result: true, resourceId: expect.any(String)})
          createdID = res.body.resourceId
        });

      const dbResult = await repo.getById(createdID)

      expect(dbResult).toBeDefined()
    });

    it('should correctly export contract', async function () {
      expect.assertions(1)

      const contract = makeContract()

      let buffer;
      await repo.persist(contract)

      await request(gateway.getHttpServer())
        .get(`/api/contracts/${contract.ID.toString()}/export`)
        .expect(200)
        .expect('content-type', 'application/pdf')
        .expect(res => {
          expect(res.body).toBeInstanceOf(Buffer)

          buffer = res.body
        })
      const data = await pdfParser(buffer)

      console.log(data, buffer)


    });


  })


});
