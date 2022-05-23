import * as Stream from "stream";

export class FileTransportAdapter {

  static async fromStreamToBuffer(stream: Stream): Promise<Buffer> {
    const chunks = [];
    let buffer;
    await new Promise(r => {

      stream.on('data', function(d){ chunks.push(d); });
      stream.on('end', function(){
        buffer = Buffer.concat(chunks);
        r(1)
      })
    })
    return buffer;
  }

  static fromObjectToBuffer({data}: { data: Buffer }): Buffer {
    return Buffer.from(data)
  }
}
