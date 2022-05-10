import {WriteStream} from "fs";

export abstract class Transport {

  abstract deliver(stream: WriteStream)
}
