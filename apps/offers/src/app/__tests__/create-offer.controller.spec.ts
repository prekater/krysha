import {INestApplication} from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";
import {Test, TestingModule} from '@nestjs/testing';
import {AddOfferController} from "../controllers/add-offer.controller";

describe(AddOfferController, () => {
    let app: INestApplication;
    let controller: AddOfferController;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
          imports: [CqrsModule],

          providers: [],
            controllers: [AddOfferController]
        }).compile();

        app = moduleFixture.createNestApplication();
        controller = moduleFixture.get<AddOfferController>(AddOfferController)

        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be defined', function () {
        expect.assertions(2)
        expect(app).toBeDefined()
        expect(controller).toBeDefined()
    });


});
