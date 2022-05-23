import {INestApplication} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {Transport} from "@nestjs/microservices";
import {injectEnv, offerObjectMock} from "@bigdeal/test-utils";
import * as request from 'supertest'
import {AppModule} from "../../../gateway/src/app.module";
import {OffersModule} from "../../../offers/src/offers.module";
import {ContractsModule} from "../../../contracts/src/contracts.module";
import {v4 as uuid} from 'uuid';
import {Infra} from "@bigdeal/infra";
import {Application} from "@bigdeal/application";

describe('Application e2e', () => {
  let gateway: INestApplication;


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

    it('should correctly get offer', async function () {

      expect.assertions(1)
      const payload = {...offerObjectMock, ID: uuid()}

      await repo['offers'].create(payload)

      await request(gateway.getHttpServer())
        .get(`/api/offers/${payload.ID}`)
        .send(payload)
        .set('Accept', 'application/json')
        .expect(res => {

          expect(res.body).toEqual(payload)
        });
    });

    it('should correctly add offer', async function () {

      expect.assertions(2)

      const payload = {...offerObjectMock, ID: uuid()}
      await request(gateway.getHttpServer())
        .post(`/api/offers`)
        .send(payload)
        .set('Accept', 'application/json')
        .expect(res => {

          expect(res.body).toEqual({
            result: true,
            resourceId: payload.ID
          })
        });

      const dbResult = await repo.getById(payload.ID)

      expect(dbResult).toBeDefined()
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


    it('should correctly export contract', async function () {
      expect.assertions(2)

      const ID = uuid()
      let createdID;

      await offersRepo['offers'].create({...offerObjectMock, ID})
      const payload: Application.CreateContractDto = {
        landlord: "Иванов Иван Иванович",
        renter: "Петров Петр Петрович",
        offerId: ID,
        termId: offerObjectMock.terms[0].ID,
        rentalStart: '12.06.2022',
        rentalEnd: '12.09.2022'
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

  })


});
