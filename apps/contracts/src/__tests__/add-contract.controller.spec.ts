import {INestApplication, NotFoundException} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {MongooseModule} from "@nestjs/mongoose";
import {ClientProxy, ClientsModule, MicroserviceOptions, Transport} from "@nestjs/microservices";
import {CommandBus, CqrsModule} from "@nestjs/cqrs";
import {makeOffer, MockCommandBus} from "@bigdeal/test-utils";
import {AddContractController} from "../controllers/add-contract.controller";
import {Infra} from "@bigdeal/infra";
import {AddContractDto} from "../dto/add-contract.dto";
import {CONVERT_OFFER_COMMAND} from "@bigdeal/messaging";
import {AddContractCommand} from "../commands/add-contract.command";
import {Domain} from "@bigdeal/domain";
jest.mock("../commands/add-contract.command")


describe(AddContractController, () => {
  let app: INestApplication;
  let controller: AddContractController;
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
      controllers: [AddContractController]
    }).compile();


    app = moduleFixture.createNestApplication();

    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.TCP,
      options: {
        port: 3000,
      }
    }, {inheritAppConfig: true})

    controller = moduleFixture.get<AddContractController>(AddContractController)

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
    AddContractCommand.mockClear()
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

    const dto: AddContractDto = {
      offerId: offer.ID.toString(),
      termId: offer.terms[0].ID.toString()
    }
    jest.spyOn(repo, 'getById').mockResolvedValue(offer)
    jest.spyOn(controller['commandBus'], 'execute').mockResolvedValue({result: true})

    await client.send(
      CONVERT_OFFER_COMMAND,
      dto
    ).toPromise();

    expect(controller['commandBus'].execute).toHaveBeenCalledWith(expect.any(AddContractCommand))
    expect(AddContractCommand).toHaveBeenCalledWith(expect.any(Domain.Contract))

  });

  //todo: add exception filter and format error and check format
  it('should throw not found exception', async function () {

    expect.assertions(2)
    const dto: AddContractDto = {
      offerId: 'wfwefwfwfwfwf',
      termId: '123'
    }


    jest.spyOn(repo, 'getById').mockResolvedValue(null)
    jest.spyOn(controller['commandBus'], 'execute').mockClear()

    try {
      await client.send(
        CONVERT_OFFER_COMMAND,
        dto
      ).toPromise();
    } catch (e) {
      expect(controller['commandBus'].execute).not.toHaveBeenCalled()
      expect(AddContractCommand).not.toHaveBeenCalled()
    }

  });

  it('should throw bad request exception', async function () {

    expect.assertions(2)
    const offer = makeOffer()

    const dto: AddContractDto = {
      offerId: offer.ID.toString(),
      termId: 'wefwefwfwffwe'
    }

    jest.spyOn(repo, 'getById').mockResolvedValue(offer)
    jest.spyOn(controller['commandBus'], 'execute').mockClear()

    try {
      await client.send(
        CONVERT_OFFER_COMMAND,
        dto
      ).toPromise();

    }
    catch (e) {
      expect(controller['commandBus'].execute).not.toHaveBeenCalled()
      expect(AddContractCommand).not.toHaveBeenCalled()
    }


  });

});
