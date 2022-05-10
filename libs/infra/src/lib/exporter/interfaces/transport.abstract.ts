import {Stream} from "stream";

export abstract class Transport {

  abstract deliver(stream: Stream)
}
