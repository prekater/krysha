import {Transport} from "../interfaces/transport.abstract";
import {Stream} from "stream";
import * as fs from 'fs'
import {HelloSignTransportFactory} from "../factories/hellosign.transport.factory";
import {HelloSignProvider} from "../providers/hellosign.provider";
import {mkdtemp} from 'node:fs/promises';
import * as os from 'os'
import * as path from "path";
import {Logger} from "@nestjs/common";
import {Application} from "@bigdeal/application";

export class HelloSignTransport extends Transport {

  private readonly provider: HelloSignProvider;

  private readonly logger = new Logger(HelloSignTransport.name)

  constructor() {
    super();
    this.provider = HelloSignTransportFactory.make()
  }

  private async downloadFromStream(stream: Stream) {
    const result = await new Promise<Stream>(r => {

      stream.on('finish', () => {
        r(stream)
      })
    })


    return result;
  }

  private async saveFileToTmpDir(stream: Stream): Promise<string> {

    return await  new Promise(async (resolve, reject) =>  {

      try {
        const tmpDir = await mkdtemp(path.join(os.tmpdir(), 'tmp-'));
        const filePath = `${tmpDir}/output.pdf`
        const writeStream = stream.pipe(fs.createWriteStream(filePath))

        writeStream.on('finish', () => {
          resolve(filePath)
        })
      } catch (err) {
        this.logger.error(err);
        reject(null);
      }
    })

  }

  async deliver(stream: Stream): Promise<Stream> {

    const streamedFile = await this.downloadFromStream(stream)

    // const buffer = await Application.FileTransportAdapter.fromStreamToBuffer(streamedFile)
    const pathToFile = await this.saveFileToTmpDir(streamedFile)

    // await this.provider.sign(buffer.toString('base64'))
    await this.provider.sign(pathToFile)

    return streamedFile;
  }


}
