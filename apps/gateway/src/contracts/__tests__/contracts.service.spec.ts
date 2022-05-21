import {INestApplication} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {ContractsService} from "../contracts.service";
import {
  ADD_CONTRACT_COMMAND,
  ClientProxyTCP,
  EXPORT_CONTRACT_QUERY,
  GET_CONTRACT_BY_ID_QUERY
} from "@bigdeal/messaging";
import {ClientTCPMock, proxy} from "@bigdeal/test-utils";

describe(ContractsService, () => {
  let app: INestApplication;
  let svc: ContractsService;
  let client: ClientProxyTCP;
  const successResponse = {result: true}

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        ContractsService,
        {provide: ClientProxyTCP, useClass: ClientTCPMock}

      ],
      controllers: []
    }).compile();

    app = moduleFixture.createNestApplication();
    svc = moduleFixture.get<ContractsService>(ContractsService)
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

  it('should correctly add contract', async function () {

    expect.assertions(1)
    const mockPayload = {offerId: "", rentalEnd: "", rentalStart: "", termId: ""}
    jest.spyOn(proxy, 'send').mockImplementation(() => ({
      toPromise: () => Promise.resolve(successResponse)
    }))

    await svc.addContract(mockPayload)

    expect(proxy.send).toHaveBeenCalledWith(ADD_CONTRACT_COMMAND, mockPayload)
  });

  it('should correctly get contract', async function () {

    expect.assertions(1)
    const ID = '1231231'
    jest.spyOn(proxy, 'send').mockImplementation(() => ({
      toPromise: () => Promise.resolve(successResponse)
    }))

    await svc.getById(ID)

    expect(proxy.send).toHaveBeenCalledWith(GET_CONTRACT_BY_ID_QUERY, {ID})
  });

  it('should correctly export contract', async function () {

    expect.assertions(1)
    const ID = '1231231'
    jest.spyOn(proxy, 'send').mockImplementation(() => ({
      toPromise: () => Promise.resolve(successResponse)
    }))

    await svc.exportContract(ID)

    expect(proxy.send).toHaveBeenCalledWith(EXPORT_CONTRACT_QUERY, {ID})
  });


});