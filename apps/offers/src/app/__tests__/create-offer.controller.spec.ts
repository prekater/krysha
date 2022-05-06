import {INestApplication} from '@nestjs/common';
import {ClientProxy, ClientsModule, MicroserviceOptions, Transport} from "@nestjs/microservices";
import {CommandBus, CqrsModule} from "@nestjs/cqrs";
import {Test, TestingModule} from '@nestjs/testing';
import {AddOfferController} from "../controllers/add-offer.controller";
import {ADD_OFFER_COMMAND} from "@bigdeal/messaging";
import {offerObjectMock, OfferType} from "@bigdeal/domain";
import {MockCommandBus} from "@bigdeal/test-utils";
import {Mappers} from "@bigdeal/mappers";
import {AddOfferCommand} from "../commands/add-offer.command";
jest.mock("../commands/add-offer.command")

describe(AddOfferController, () => {
  let app: INestApplication;
  let controller: AddOfferController;
  let client: ClientProxy;


  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: 'Client',
            transport: Transport.TCP,
            options: {
              port: 3000
            }
          },
        ]),
        CqrsModule
      ],

      providers: [
        {provide: CommandBus, useClass: MockCommandBus}
      ],
      controllers: [AddOfferController]
    }).compile();

    app = moduleFixture.createNestApplication();

    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.TCP,
      options: {
        port: 3000,
      }
    }, {inheritAppConfig: true})

    controller = moduleFixture.get<AddOfferController>(AddOfferController)

    client = app.get('Client');

    await app.startAllMicroservices();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', function () {
    expect.assertions(3)

    expect(app).toBeDefined()
    expect(controller).toBeDefined()
    expect(client).toBeDefined()
  });

  it('should throw exception if not correct data presented', async function () {

    expect.assertions(1)
    const { options, ...brokenOffer} = offerObjectMock

    try {
      await client.send(
        ADD_OFFER_COMMAND,
        brokenOffer
      ).toPromise();

    }
    catch (e) {
      expect(controller['commandBus'].execute).not.toHaveBeenCalled()
    }
  });
  it('should correctly map payload to domain model and call proper command', async function () {

    expect.assertions(2)
    const offerToCreate = {...offerObjectMock, type: OfferType.PUBLISHED}

    const domainOffer = Mappers.Offer.fromObjectToDomainModel(offerObjectMock)
    await client.send(
      ADD_OFFER_COMMAND,
      offerToCreate
    ).toPromise();


    expect(controller['commandBus'].execute).toHaveBeenCalledWith(expect.any(AddOfferCommand))
    expect(AddOfferCommand).toHaveBeenCalledWith(domainOffer)
  });


});
