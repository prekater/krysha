import {INestApplication} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {MongooseModule} from "@nestjs/mongoose";
import {Mappers} from "@bigdeal/mappers";
import {makeContract} from "@bigdeal/test-utils";
import {Domain} from "@bigdeal/domain";
import * as mongoose from "mongoose";
import {ContractPersistenceModule} from "../modules/contract-persistence.module";
import {ContractRepository} from "../repositories/contract.repository";

describe(ContractRepository, () => {
  let app: INestApplication;
  let repo: ContractRepository;


  const clearDB = async () => await repo['contracts'].deleteMany({})
  const insertContractIntoDB = async (defaults: Partial<Domain.ContractProps> = {}) => {

    const contract = makeContract()
    Object.assign(contract['props'], defaults)
    const persistenceContract = Mappers.Contract.fromDomainModelToPersistenceModel(contract)
    await repo['contracts'].create(persistenceContract)

    return contract;
  }

  mongoose.set('debug', process.env.NODE_ENV === 'test');

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
        ContractPersistenceModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    repo = moduleFixture.get<ContractRepository>(ContractRepository)

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {

    await clearDB()
  })

  it('should be defined', function () {
    expect.assertions(2)
    expect(app).toBeDefined()
    expect(repo).toBeDefined()
  });

  describe('Commands', () => {
    it('should create if not exists', async function () {

      expect.assertions(1)
      const contract = makeContract()

      await repo.persist(contract)

      const contractFromDb = await repo['contracts'].findOne({ID: contract.ID}).lean().exec()

      const contractFromDbToDomainModel = Mappers.Contract.fromObjectToDomainModel(contractFromDb)

      expect(contractFromDbToDomainModel).toEqual(contract)
    });

    it('should update if exists', async function () {

      expect.assertions(1)

      const createdContract = await insertContractIntoDB()

      createdContract['props'].propertyType = Domain.PropertyType.TWO_ROOM

      await repo.persist(createdContract)

      const contractFromDb = await repo['contracts'].findOne({ID: createdContract.ID}).lean().exec()

      const contractFromDbToDomainModel = Mappers.Contract.fromObjectToDomainModel(contractFromDb)

      expect(contractFromDbToDomainModel).toEqual(createdContract)

    });
  })

  describe('Queries', () => {

    it('should get by id', async function () {

      expect.assertions(1)

      const createdContract = await insertContractIntoDB()

      const contractFromDb = await repo.getById(createdContract.ID.toString())

      expect(contractFromDb).toEqual(createdContract)

    });


    it('should get all by author id', async function () {
      expect.assertions(2)

      const createdContract1 = await insertContractIntoDB()
      const createdContract2 = await insertContractIntoDB({authorId: createdContract1.authorId})

      const contractsFromDb = await repo.getAllByAuthorId(createdContract1.authorId)


      expect(contractsFromDb).toHaveLength(2)
      expect(contractsFromDb).toEqual(expect.arrayContaining([createdContract1,createdContract2]))

    });
  })


});
