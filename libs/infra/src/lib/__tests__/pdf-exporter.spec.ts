import {INestApplication} from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing';
import {PdfExporter} from "../exporter/exporters/pdf.exporter";
import {LocalFilesystemTransport} from "../exporter/transport/local-filesystem.transport";
import {Exporter} from "../exporter/interfaces/exporter.abstract";
import {Transport} from "../exporter/interfaces/transport.abstract";
import * as fs from 'fs'
import {makeContract} from "@bigdeal/test-utils";

describe(PdfExporter, () => {
  let app: INestApplication;

  let exporter: Exporter;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        {
          provide: Exporter,
          useClass: PdfExporter
        },
        {
          provide: Transport,
          useClass: LocalFilesystemTransport
        }
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    exporter = moduleFixture.get<Exporter>(Exporter)
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });


  it('should be defined', function () {
    expect.assertions(1)
    expect(exporter).toBeDefined()
  });

  it('should correctly export data to file', async function () {

    expect.assertions(1)

    const path = __dirname + '/output.pdf'
    const contract = makeContract()

    console.log(contract)
    console.time()
    await exporter.export(contract)

    console.timeEnd()
    const file = fs.readFileSync(path)

    expect(file).toBeDefined()

    // fs.unlinkSync(path)
  });


});
