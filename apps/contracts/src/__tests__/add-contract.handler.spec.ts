import {INestApplication} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {CommandBus, CqrsModule,} from "@nestjs/cqrs";
import {makeContract, MockContractsRepository} from "@bigdeal/test-utils";
import {Infra} from "@bigdeal/infra";
import {CommandHandlers} from "../handlers";
import {AddContractHandler} from "../handlers/add-contract.handler";
import {AddContractCommand} from "../commands/add-contract.command";

describe(AddContractHandler, () => {
  let app: INestApplication;

  let repo: Infra.ContractRepository;

  let commandBus: CommandBus;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CqrsModule,
      ],
      providers: [
        ...CommandHandlers,
        {
          provide: Infra.ContractRepository,
          useClass: MockContractsRepository
        }
      ],
      controllers: []
    }).compile();

    app = moduleFixture.createNestApplication();

    commandBus = moduleFixture.get<CommandBus>(CommandBus);

    commandBus.register(CommandHandlers)

    repo = moduleFixture.get<Infra.ContractRepository>(Infra.ContractRepository)

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', function () {
    expect.assertions(1)

    expect(app).toBeDefined()
  });

  it('should correctly handle add contract command', async function () {
    expect.assertions(2)

    jest.spyOn(repo, 'persist').mockResolvedValue({result: true})
    const contract = makeContract()
    const {result} = await commandBus.execute(new AddContractCommand(contract))


    expect(repo.persist).toHaveBeenCalledWith(contract)
    expect(result).toBeTruthy()
  });


});
