import {Exporter} from "../interfaces/exporter.abstract";
import {Domain} from "@bigdeal/domain";
import * as PDFKit from 'pdfkit'
import * as getStream from 'get-stream'
import {WriteStream} from "fs";
import * as MemoryStream from 'memorystream'



export class PdfExporter extends Exporter{


  private async prepareContent(document: typeof PDFKit) {
    document.text('Hello, World!')
  }

  async createDocumentFromContract(contract: Domain.Contract): Promise<WriteStream> {
    const document = new PDFKit()
    const memoryStream = new MemoryStream()

    document.pipe(memoryStream)
    await this.prepareContent(document)

    document.end()

    return memoryStream;
  }

}
