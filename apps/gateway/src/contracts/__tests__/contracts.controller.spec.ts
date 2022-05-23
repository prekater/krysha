import {INestApplication} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {ContractsController} from "../contracts.controller";
import {ContractsGatewayModule} from "../contracts-gateway.module";
import {ContractsService} from "../contracts.service";
import {ContractsServiceMock} from "./mocks/contracts.service.mock";
import {ConfigModule} from "@nestjs/config";
import * as request from 'supertest'
import {contractObjectMock} from "@bigdeal/test-utils";


describe(ContractsController, () => {
  let app: INestApplication;
  let controller: ContractsController;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({isGlobal: true}),
        ContractsGatewayModule,
      ],
      providers: [
        {
          provide: ContractsService,
          useClass: ContractsServiceMock
        }
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    controller = moduleFixture.get<ContractsController>(ContractsController)
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', function () {
    expect.assertions(1)
    expect(controller).toBeDefined()
  });


  it('should correctly find contract by id', async function () {

    expect.assertions(2)

    jest.spyOn(controller['contractsService'], 'getById').mockResolvedValue(contractObjectMock)

    const id = '1231213'
    await request(app.getHttpServer())
      .get(`/api/contracts/${id}`)
      // .send({id: 'john'})
      .set('Accept', 'application/json')
      .expect(res => {
        expect(controller['contractsService'].getById).toHaveBeenCalledWith(id)
        expect(res.body).toEqual(contractObjectMock)
      });
  });

  // it('should correctly export contract by id', async function () {
  //
  //   expect.assertions(2)
  //   const successResponse = {result: true}
  //
  //   jest.spyOn(controller['contractsService'], 'exportContract').mockResolvedValue(successResponse)
  //
  //   const id = '1231213'
  //   await request(app.getHttpServer())
  //     .get(`/api/contracts/${id}/export`)
  //     // .send({id: 'john'})
  //     .set('Accept', 'application/json')
  //     .expect(res => {
  //       expect(controller['contractsService'].exportContract).toHaveBeenCalledWith(id)
  //       expect(res.body).toEqual(successResponse)
  //     });
  // });

  it('should correctly add contract', async function () {
    expect.assertions(2)
    const successResponse = {result: true}

    jest.spyOn(controller['contractsService'], 'createContract').mockResolvedValue(successResponse)

    await request(app.getHttpServer())
      .post(`/api/contracts`)
      .send(contractObjectMock)
      .set('Accept', 'application/json')
      .expect(res => {
        expect(controller['contractsService'].createContract).toHaveBeenCalledWith(contractObjectMock)
        expect(res.body).toEqual(successResponse)
      });
  });


});
