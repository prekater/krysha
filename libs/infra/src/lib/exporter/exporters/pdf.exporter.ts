import {Exporter} from "../interfaces/exporter.abstract";
import {Domain} from "@bigdeal/domain";
import * as PDFKit from 'pdfkit'
import * as MemoryStream from 'memorystream'
import {Stream} from "stream";
import {TermAdapter} from "../adapters/term.adapter";
import {Language} from "@bigdeal/common";


export class PdfExporter extends Exporter{


  async createDocumentFromContract(contract: Domain.Contract, language: Language = Language.RU): Promise<Stream> {
    const memoryStream = new MemoryStream()
    const contentAdapter = new TermAdapter(contract, language)
    const document = new PDFKit()
    document.pipe(memoryStream)

    document.font(`${__dirname}/../fonts/arial.ttf`)
    // document.text(await contentAdapter.prepareTermContent())

    // await this.prepareContent(document, contract)

    document.end()

    return memoryStream;
  }

}
