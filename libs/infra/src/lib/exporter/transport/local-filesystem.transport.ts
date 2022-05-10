import {Transport} from "../interfaces/transport.abstract";
import {Stream} from "stream";
import * as fs from 'fs'

export class LocalFilesystemTransport extends Transport{
  async deliver(stream: Stream): Promise<void> {
    await new Promise( r => {

      stream.on('finish', () => {
        r(stream)
      } )

      stream.pipe(fs.createWriteStream(__dirname + '/../../__tests__/output.pdf'))
    })


  }

}
