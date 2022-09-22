import {INestApplication} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {ContractsService} from "../contracts.service";
import {
  CREATE_CONTRACT_COMMAND,
  ClientProxyTCP,
  EXPORT_CONTRACT_QUERY,
  GET_CONTRACT_BY_ID_QUERY
} from "@bigdeal/messaging";
import {ClientTCPMock, proxy} from "@bigdeal/test-utils";
import {Domain} from "@bigdeal/domain";

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

  it.skip('should correctly add contract', async function () {

    expect.assertions(1)
    const mockPayload = {landlord: "", offerId: "", rentalEnd: "", rentalStart: "", renter: "", termId: "", depositOption: Domain.DepositCollectOptionType.CONCLUSION,  paymentStartOption: Domain.PaymentStart.START_OF_RENT,
      paymentTypeOption: Domain.PaymentType.TWO_PAYMENTS}
    jest.spyOn(proxy, 'send').mockImplementation(() => ({
      toPromise: () => Promise.resolve(successResponse)
    }))

    await svc.createContract(mockPayload)

    expect(proxy.send).toHaveBeenCalledWith(CREATE_CONTRACT_COMMAND, mockPayload)
  });

  it.skip('should correctly export contract', async function () {

    expect.assertions(1)
    const ID = '1231231'
    jest.spyOn(proxy, 'send').mockImplementation(() => ({
      toPromise: () => Promise.resolve({data: '12313121'})
    }))


    await svc.exportContract({
      contractId: ID, employer: {fullname: 'a', email: 'kontaktak@Yandex,ru'}, landlord: {fullname: 'b', email: 'kontaktak@Yandex,ru'},

    })

    expect(proxy.send).toHaveBeenCalledWith(EXPORT_CONTRACT_QUERY, {contractId: ID})
  });


});
