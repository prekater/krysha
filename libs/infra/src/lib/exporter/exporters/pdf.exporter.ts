import {Exporter} from "../interfaces/exporter.abstract";
import {Domain} from "@bigdeal/domain";
import * as PDFKit from 'pdfkit'
import * as MemoryStream from 'memorystream'
import {Stream} from "stream";
import {TermAdapter} from "../adapters/term.adapter";
import {Language} from "@bigdeal/common";
import {AddressAdapter} from "../adapters/address.adapter";
import {ContractMetaAdapter} from "../adapters/contract-meta.adapter";
import {OptionAdapter} from "../adapters/option.adapter";
import {PaymentAdapter} from "../adapters/payment.adapter";
import {RentalPeriodAdapter} from "../adapters/rental-period.adapter";
import * as moment from "moment";
import TextOptions = PDFKit.Mixins.TextOptions;


export class PdfExporter extends Exporter {


  private writeLine(document: typeof PDFKit, text: string, options: TextOptions = {}) {

    document.font(`${__dirname}/../fonts/arial.ttf`)
    document.text(text, options)

  }

  private writeHeader(document, text: string) {
    document.font(`${__dirname}/../fonts/arial-bold.ttf`)
    document.text(text, {align: 'center'})
  }


  async createDocumentFromContract(contract: Domain.Contract, language: Language = Language.RU): Promise<Stream> {
    const memoryStream = new MemoryStream()

    const termContent = new TermAdapter(contract, language).makeContent()
    const addressContent = await new AddressAdapter(contract, language).makeContent()
    const contractMetaAdapter = new ContractMetaAdapter(contract, language)
    const optionAdapter = new OptionAdapter(contract, language)
    const paymentAdapter = new PaymentAdapter(contract, language)
    const rentalPeriodContent = await new RentalPeriodAdapter(contract, language).makeContent()

    console.log(rentalPeriodContent)


    const document = new PDFKit()
    document.pipe(memoryStream)

    document.fontSize(10)

    this.writeHeader(document, 'ДОГОВОР НАЙМА ПОМЕЩЕНИЯ')

    this.writeLine(document,moment().format('DD.MM.YYYY'), {align: "right"} )
    this.writeLine(document, 'Мы, нижеподписавшиеся, гражданин ______________________, именуемый в дальнейшем "Наймодателем", с одной стороны, и гражданин _________________________, именуемый в дальнейшем "Нанимателем", с другой стороны, заключили настоящий Договор о нижеследующем:')

    this.writeHeader(document, '1. Предмет договора' )

    this.writeLine(document, `1.1. Наймодателем предоставляет, а Нанимателем получает во временное пользование помещение, расположенную по адресу: ${addressContent.city} ${addressContent.street}  ${addressContent.house}  ${addressContent.flat}`)
    this.writeLine(document, `1.2. Наймодателем предоставляет, а Нанимателем получает во временное пользование находящиеся в помещении предметы мебели и бытовую технику. `)
    this.writeLine(document, `1.3. ${rentalPeriodContent.rentalPeriod}`)




    document.end()

    return memoryStream;
  }

}
