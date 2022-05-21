import {INestApplication} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {ContractsController} from "../contracts.controller";
import {ContractsGatewayModule} from "../contracts-gateway.module";
import {ContractsService} from "../contracts.service";
import {ContractsServiceMock} from "./mocks/contracts.service.mock";
import {ConfigModule} from "@nestjs/config";

describe(ContractsController, () => {
    let app: INestApplication;
    let controller: ContractsController;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
              ConfigModule.forRoot({isGlobal: true}),
              ContractsGatewayModule,
            ],
            providers: [{
              provide: ContractsService,
              useClass: ContractsServiceMock
            }],
        }).compile();

        app = moduleFixture.createNestApplication();

        controller = moduleFixture.get<ContractsController>(ContractsController)
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be defined', function () {
        expect.assertions(1)
        expect(controller).toBeDefined()
    });


});
