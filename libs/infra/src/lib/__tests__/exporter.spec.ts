import {INestApplication} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {Exporter} from "../exporter/interfaces/exporter.abstract";

describe(Exporter, () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [],
            controllers: []
        }).compile();

        app = moduleFixture.createNestApplication();

        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be defined', function () {
        expect.assertions(1)
        expect(true).toBeDefined()
    });


});
