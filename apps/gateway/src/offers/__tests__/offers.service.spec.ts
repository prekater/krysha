import {INestApplication} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {OffersService} from "../offers.service";
import {
  ADD_OFFER_COMMAND,
  ClientProxyTCP,
  GET_OFFER_BY_ID_QUERY
} from "@bigdeal/messaging";
import {ClientTCPMock, proxy} from "@bigdeal/test-utils";

describe(OffersService, () => {
  let app: INestApplication;
  let svc: OffersService;
  let client: ClientProxyTCP;
  const successResponse = {result: true}

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        OffersService,
        {provide: ClientProxyTCP, useClass: ClientTCPMock}

      ],
      controllers: []
    }).compile();

    app = moduleFixture.createNestApplication();
    svc = moduleFixture.get<OffersService>(OffersService)
    client = moduleFixture.get<ClientProxyTCP>(ClientProxyTCP)

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    proxy.send.mockClear()
  })
  it('should be defined', function () {
    expect.assertions(2)
    expect(svc).toBeDefined()
    expect(client).toBeDefined()
  });

  it('should correctly add offer', async function () {

    expect.assertions(1)
    const mockPayload = {
      ID: "",
      address: undefined,
      authorId: "",
      options: [],
      payment: undefined,
      meta: {
        propertyType: undefined,
      },
      terms: [],
      type: undefined
    }
    jest.spyOn(proxy, 'send').mockImplementation(() => ({
      toPromise: () => Promise.resolve(successResponse)
    }))

    await svc.addOffer(mockPayload)

    expect(proxy.send).toHaveBeenCalledWith(ADD_OFFER_COMMAND, mockPayload)
  });

  it('should correctly get offer', async function () {

    expect.assertions(1)
    const ID = '1231231'
    jest.spyOn(proxy, 'send').mockImplementation(() => ({
      toPromise: () => Promise.resolve(successResponse)
    }))

    await svc.getById(ID)

    expect(proxy.send).toHaveBeenCalledWith(GET_OFFER_BY_ID_QUERY, {ID})
  });


});
