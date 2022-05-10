import {Transport} from "../interfaces/transport.abstract";
import {WriteStream} from "fs";

export class LocalFilesystemTransport extends Transport{
  async deliver(stream: WriteStream): Promise<any> {


  }

}
