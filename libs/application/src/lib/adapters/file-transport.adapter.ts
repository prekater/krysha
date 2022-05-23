import {Observable} from "rxjs";
import * as Stream from "stream";
import { rxToStream, streamToStringRx } from 'rxjs-stream';

export class FileTransportAdapter {


  static fromStreamToRxJs(stream: Stream): Observable<any> {
    return streamToStringRx(<NodeJS.ReadableStream>stream)
  }

  static fromRxJsToStream(rxjs: Observable<any>): Stream {
    return rxToStream(rxjs)
  }
}
