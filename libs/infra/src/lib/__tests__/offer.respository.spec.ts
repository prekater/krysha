import {INestApplication} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {MongooseModule} from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import {OfferRepository} from "../repositories/offer.repository";
import {OfferPersistenceModule} from "../modules/offer-persistence.module";

describe(OfferRepository, () => {
  let app: INestApplication;
  let repo: OfferRepository;


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

  it('should be defined', function () {
    expect.assertions(2)
    expect(app).toBeDefined()
    expect(repo).toBeDefined()
  });


});
