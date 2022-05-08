import {INestApplication} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {MongooseModule} from "@nestjs/mongoose";
import {ClientProxy, ClientsModule, MicroserviceOptions, Transport} from "@nestjs/microservices";
import {CommandBus, CqrsModule} from "@nestjs/cqrs";
import {MockCommandBus} from "@bigdeal/test-utils";
import {AddContractController} from "../controllers/add-contract.controller";
import {Infra} from "@bigdeal/infra";

describe(AddContractController, () => {
  let app: INestApplication;
  let controller: AddContractController;
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


  // insert offer to db and check mapping


  // check incorrect mapping if not exists offer/option








});
