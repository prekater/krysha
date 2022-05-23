import {Transport} from "../interfaces/transport.abstract";
import {Stream} from "stream";
import * as fs from 'fs'

export class StreamTransport extends Transport{
  async deliver(stream: Stream): Promise<Stream> {
    const result = await new Promise<Stream>( r => {

      stream.on('finish', () => {
        r(stream)
      } )
    })
    
    return result;
  }

}
