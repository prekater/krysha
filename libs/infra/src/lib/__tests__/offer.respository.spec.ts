import {INestApplication} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {MongooseModule} from "@nestjs/mongoose";
import {OfferRepository} from "../repositories/offer.repository";
import {OfferPersistenceModule} from "../modules/offer-persistence.module";
import * as mongoose from "mongoose";
import {makeOffer, OfferProps, PropertyType} from "@bigdeal/domain";
import {Mappers} from "@bigdeal/mappers";

describe(OfferRepository, () => {
  let app: INestApplication;
  let repo: OfferRepository;


  const clearDB = async () => await repo['offers'].deleteMany({})
  const insertOfferIntoDB = async (defaults: Partial<OfferProps> = {}) => {

    const offer = makeOffer()
    Object.assign(offer['props'], defaults)
    const persistenceOffer = Mappers.Offer.fromDomainModelToPersistenceModel(offer)
    await repo['offers'].create(persistenceOffer)

    return offer;
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
        OfferPersistenceModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    repo = moduleFixture.get<OfferRepository>(OfferRepository)

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
      const offer = makeOffer()

      await repo.persist(offer)

      const offerFromDb = await repo['offers'].findOne({ID: offer.ID}).lean().exec()

      const offerFromDbToDomainModel = Mappers.Offer.fromPersistenceModelToDomainModel(offerFromDb)

      expect(offerFromDbToDomainModel).toEqual(offer)
    });

    it('should update if exists', async function () {

      expect.assertions(1)

      const createdOffer = await insertOfferIntoDB()

      createdOffer['props'].propertyType = PropertyType.TWO_ROOM

      await repo.persist(createdOffer)

      const offerFromDb = await repo['offers'].findOne({ID: createdOffer.ID}).lean().exec()

      const offerFromDbToDomainModel = Mappers.Offer.fromPersistenceModelToDomainModel(offerFromDb)

      expect(offerFromDbToDomainModel).toEqual(createdOffer)

    });
  })

  describe('Queries', () => {

    it('should get by id', async function () {

      expect.assertions(1)

      const createdOffer = await insertOfferIntoDB()

      const offerFromDb = await repo.getById(createdOffer.ID)

      expect(offerFromDb).toEqual(createdOffer)

    });


    it('should get all by author id', async function () {
      expect.assertions(2)

      const createdOffer1 = await insertOfferIntoDB()
      const createdOffer2 = await insertOfferIntoDB({authorId: createdOffer1.authorId})

      const offersFromDb = await repo.getAllByAuthorId(createdOffer1.authorId)


      expect(offersFromDb).toHaveLength(2)
      expect(offersFromDb).toEqual(expect.arrayContaining([createdOffer1,createdOffer2]))

    });
  })


});
