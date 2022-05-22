import {INestApplication} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {AppModule} from "../../../gateway/src/app.module";
import {Transport} from "@nestjs/microservices";
import {OffersModule} from "../../../offers/src/offers.module";
import {ContractsModule} from "../../../contracts/src/contracts.module";

describe('Application e2e', () => {
  let gateway: INestApplication;

  beforeAll(async () => {
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

    beforeAll(async () => {

      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [OffersModule],
        providers: [],
        controllers: []
      }).compile();

      offersMicroservice = moduleFixture.createNestMicroservice({
        transport: Transport.TCP,
        port: 3001
      });

      await offersMicroservice.init();
    })
    afterAll(async () => {
      await offersMicroservice.close();
    });

    it('should be defined', function () {
      expect.assertions(1)
      expect(offersMicroservice).toBeDefined()
    });

    it('should correctly get offer', function () {

    });

    it('should correctly add offer', function () {

    });

  })

  describe('Contracts integration', () => {

    let contractsMicroservice;

    beforeAll(async () => {

      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [ContractsModule],
        providers: [],
        controllers: []
      }).compile();

      contractsMicroservice = moduleFixture.createNestMicroservice({
        transport: Transport.TCP,
        port: 3002
      });

      await contractsMicroservice.init();
    })

    afterAll(() => {
      contractsMicroservice.close()
    })

    it('should be defined', function () {
      expect.assertions(1)
      expect(contractsMicroservice).toBeDefined()
    });

    it('should correctly get contract', function () {

    });

    it('should correctly add contract', function () {

    });
    it('should correctly export contract', function () {

    });

  })


});
