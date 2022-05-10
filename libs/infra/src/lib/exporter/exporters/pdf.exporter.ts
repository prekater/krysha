import {Exporter} from "../interfaces/exporter.abstract";
import {Domain} from "@bigdeal/domain";
import * as PDFKit from 'pdfkit'
import * as MemoryStream from 'memorystream'
import { Stream } from "stream";



export class PdfExporter extends Exporter{


  private async prepareContent(document: typeof PDFKit, contract: Domain.Contract) {

    document
      .font(`${__dirname}/../arial.ttf`)
      .text(contract.term.toString(), )
    // document.text(contract.options.)
    // document.text('Hello, World!')
  }

  async createDocumentFromContract(contract: Domain.Contract): Promise<Stream> {
    const document = new PDFKit()

    const memoryStream = new MemoryStream()

    document.pipe(memoryStream)
    await this.prepareContent(document, contract)

    document.end()

    return memoryStream;
  }

}
