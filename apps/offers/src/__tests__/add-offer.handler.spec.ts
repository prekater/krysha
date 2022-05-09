import {INestApplication} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {CommandBus, CqrsModule,} from "@nestjs/cqrs";
import { makeOffer, MockOffersRepository} from "@bigdeal/test-utils";
import {Infra} from "@bigdeal/infra";
import {CommandHandlers} from "../handlers";
import {AddOfferHandler} from "../handlers/add-offer.handler";
import {AddOfferCommand} from "../commands/add-offer.command";

describe(AddOfferHandler, () => {
  let app: INestApplication;

  let repo: Infra.OfferRepository;

  let commandBus: CommandBus;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CqrsModule,
      ],
      providers: [
        ...CommandHandlers,
        {
          provide: Infra.OfferRepository,
          useClass: MockOffersRepository
        }
      ],
      controllers: []
    }).compile();

    app = moduleFixture.createNestApplication();

    commandBus = moduleFixture.get<CommandBus>(CommandBus);

    commandBus.register(CommandHandlers)

    repo = moduleFixture.get<Infra.OfferRepository>(Infra.OfferRepository)

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', function () {
    expect.assertions(1)

    expect(app).toBeDefined()
  });

  it('should correctly handle add offer command', async function () {
    expect.assertions(2)

    jest.spyOn(repo, 'persist').mockResolvedValue({result: true})
    const offer = makeOffer()
    const {result} = await commandBus.execute(new AddOfferCommand(offer))


    expect(repo.persist).toHaveBeenCalledWith(offer)
    expect(result).toBeTruthy()
  });


});
