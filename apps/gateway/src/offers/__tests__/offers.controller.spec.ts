import {INestApplication} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {OffersServiceMock} from "./mocks/offers.service.mock";
import {ConfigModule} from "@nestjs/config";
import * as request from 'supertest'
import { offerObjectMock} from "@bigdeal/test-utils";
import {OffersService} from "../offers.service";
import {OffersGatewayModule} from "../offers-gateway.module";
import {OffersController} from "../offers.controller";


describe(OffersController, () => {
  let app: INestApplication;
  let controller: OffersController;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({isGlobal: true}),
        OffersGatewayModule,
      ],
      providers: [
        {
          provide: OffersService,
          useClass: OffersServiceMock
        }
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    controller = moduleFixture.get<OffersController>(OffersController)
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', function () {
    expect.assertions(1)
    expect(controller).toBeDefined()
  });


  it('should correctly find offer by id', async function () {

    expect.assertions(2)

    jest.spyOn(controller['offersService'], 'getById').mockResolvedValue(offerObjectMock)

    const id = '1231213'
    await request(app.getHttpServer())
      .get(`/api/offers/${id}`)
      // .send({id: 'john'})
      .set('Accept', 'application/json')
      .expect(res => {
        expect(controller['offersService'].getById).toHaveBeenCalledWith(id)
        expect(res.body).toEqual(offerObjectMock)
      });
  });



  it('should correctly add offer', async function () {
    expect.assertions(2)
    const successResponse = {result: true}

    jest.spyOn(controller['offersService'], 'addOffer').mockResolvedValue(successResponse)

    await request(app.getHttpServer())
      .post(`/api/offers`)
      .send(offerObjectMock)
      .set('Accept', 'application/json')
      .expect(res => {
        expect(controller['offersService'].addOffer).toHaveBeenCalledWith(offerObjectMock)
        expect(res.body).toEqual(successResponse)
      });
  });


});
