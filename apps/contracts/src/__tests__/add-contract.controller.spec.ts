import {INestApplication} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {MongooseModule} from "@nestjs/mongoose";
import {ClientProxy, ClientsModule, MicroserviceOptions, Transport} from "@nestjs/microservices";
import {CommandBus, CqrsModule} from "@nestjs/cqrs";
import {Infra} from "@bigdeal/infra";
import {Domain} from "@bigdeal/domain";
import {CREATE_CONTRACT_COMMAND} from "@bigdeal/messaging";
import {makeOffer, MockCommandBus} from "@bigdeal/test-utils";

import {CreateContractDto} from "../../../../libs/application/src/lib/dto/create-contract.dto";
import {CreateContractCommand} from "../commands/create-contract.command";
import {CreateContractController} from "../controllers/create-contract.controller";
jest.mock("../commands/create-contract.command")

describe(CreateContractController, () => {

  let app: INestApplication;
  let controller: CreateContractController;
  let repo: Infra.OfferRepository;
  let client: ClientProxy;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(
          `${process.env.MONGO_URL}`,
          {
            autoIndex: true,
            autoCreate: true,
            useNewUrlParser: true,
          },
        ),
        ClientsModule.register([
          {
            name: 'Client',
            transport: Transport.TCP,
            options: {
              port: 3000
            }
          },
        ]),
        CqrsModule,
        Infra.OfferPersistenceModule
      ],

      providers: [
        {provide: CommandBus, useClass: MockCommandBus}
      ],
      controllers: [CreateContractController]
    }).compile();


    app = moduleFixture.createNestApplication();

    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.TCP,
      options: {
        port: 3000,
      }
    }, {inheritAppConfig: true})

    controller = moduleFixture.get<CreateContractController>(CreateContractController)

    repo = moduleFixture.get<Infra.OfferRepository>(Infra.OfferRepository)
    client = app.get('Client');

    await app.startAllMicroservices();

    await app.init();

  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    // @ts-ignore
    CreateContractCommand.mockClear()
  })

  it('should be defined', function () {
    expect.assertions(3)

    expect(app).toBeDefined()
    expect(controller).toBeDefined()
    expect(client).toBeDefined()
  });

  it('should correctly map dto to contract', async function () {


    expect.assertions(2)
    const offer = makeOffer()

    const dto: CreateContractDto = {
      landlord: "", renter: "",
      offerId: offer.ID.toString(),
      termId: offer.terms[0].ID.toString(),
      rentalStart: '12.06.2022',
      rentalEnd: '12.09.2022'
    }
    jest.spyOn(repo, 'getById').mockResolvedValue(offer)
    jest.spyOn(controller['commandBus'], 'execute').mockResolvedValue({result: true})

    await client.send(
      CREATE_CONTRACT_COMMAND,
      dto
    ).toPromise();

    expect(controller['commandBus'].execute).toHaveBeenCalledWith(expect.any(CreateContractCommand))
    expect(CreateContractCommand).toHaveBeenCalledWith(expect.any(Domain.Contract))

  });

  //todo: add exception filter and format error and check format
  it('should throw not found exception', async function () {

    expect.assertions(2)
    const dto: CreateContractDto = {
      landlord: "", renter: "",
      offerId: 'wfwefwfwfwfwf',
      termId: '123',
      rentalStart: '12.06.2022',
      rentalEnd: '12.09.2022'
    }


    jest.spyOn(repo, 'getById').mockResolvedValue(null)
    jest.spyOn(controller['commandBus'], 'execute').mockClear()

    try {
      await client.send(
        CREATE_CONTRACT_COMMAND,
        dto
      ).toPromise();
    } catch (e) {
      expect(controller['commandBus'].execute).not.toHaveBeenCalled()
      expect(CreateContractCommand).not.toHaveBeenCalled()
    }

  });

  it('should throw bad request exception', async function () {

    expect.assertions(2)
    const offer = makeOffer()

    const dto: CreateContractDto = {
      landlord: "", renter: "",
      offerId: offer.ID.toString(),
      termId: 'wefwefwfwffwe',
      rentalStart: '12.06.2022',
      rentalEnd: '12.09.2022'
    }

    jest.spyOn(repo, 'getById').mockResolvedValue(offer)
    jest.spyOn(controller['commandBus'], 'execute').mockClear()

    try {
      await client.send(
        CREATE_CONTRACT_COMMAND,
        dto
      ).toPromise();

    }
    catch (e) {
      expect(controller['commandBus'].execute).not.toHaveBeenCalled()
      expect(CreateContractCommand).not.toHaveBeenCalled()
    }

  });

});
