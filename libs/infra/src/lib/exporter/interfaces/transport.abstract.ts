import {Stream} from "stream";
import {Domain} from "@bigdeal/domain";

export abstract class Transport {

  abstract deliver(stream: Stream, contract?: Domain.Contract)
}
