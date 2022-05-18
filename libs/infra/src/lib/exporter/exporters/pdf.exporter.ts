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
import * as PDFTable from 'voilab-pdf-table'

export class PdfExporter extends Exporter {

  private writeLine(document: typeof PDFKit, text: string, options: TextOptions = {}) {

    document.font(`${__dirname}/../fonts/arial.ttf`)
    document.text(text, options)

  }

  private writeHeader(document, text: string) {
    document.font(`${__dirname}/../fonts/arial-bold.ttf`)
    document.text(text, {align: 'center'})
  }

  private addPassportTable(document: typeof PDFKit) {

    document.font(`${__dirname}/../fonts/arial.ttf`)
    const table = new PDFTable(document, {
      bottomMargin: 30,
      bottomTop: 30
    });

    table
      // set defaults to your columns
      .setColumnsDefaults({
        headerBorder: 'B',
        align: 'right'
      })
      .addColumns([
        {
          id: 'landlord',
          header: 'Наймодатель',
          align: 'left',
          width: 200
        },
        {
          id: 'employer',
          header: 'Наниматель',
          align: 'left',
          width: 200

        },
      ])

    table.addBody([
      {employer: 'Петров Петр Петрович', landlord: 'Иванов Иван Иванович'},
      {employer: 'Паспорт: 4646474848', landlord: 'Паспорт: 4646474848'},
      {employer: 'Выдан: кем-то', landlord: 'Выдан: кем-то, но другим'},
      {
        employer: 'Зарегистрирован по адресу: г. Москва, улица свободы, дом 56',
        landlord: 'Зарегистрирован по адресу:  г. Москва, улица свободы, дом 56'
      },
      {employer: 'Подпись: ________', landlord: 'Подпись: __________'}
    ]);

  }

  private async getContentParts(contract: Domain.Contract, language: Language) {
    const [
      termContent,
      addressContent,
      contractMetaContent,
      optionContent,
      paymentContent,
      rentalPeriodContent
    ] = await Promise.all(
      [TermAdapter, AddressAdapter, ContractMetaAdapter, OptionAdapter, PaymentAdapter, RentalPeriodAdapter]
        .map(Adapter => new Adapter(contract, language).makeContent())
    )

    return {
      terms: termContent,
      address: addressContent,
      meta: contractMetaContent,
      options: optionContent,
      payments: paymentContent,
      rentalPeriod: rentalPeriodContent
    }
  }

  async createDocumentFromContract(contract: Domain.Contract, language: Language = Language.RU): Promise<Stream> {
    const memoryStream = new MemoryStream()

    const contentParts = await this.getContentParts(contract, language)

    const document = new PDFKit()
    document.pipe(memoryStream)

    document.fontSize(9)

    this.writeHeader(document, 'ДОГОВОР НАЙМА ПОМЕЩЕНИЯ')

    this.writeLine(document, moment().format('DD.MM.YYYY'), {align: "right"})
    this.writeLine(document, 'Мы, нижеподписавшиеся, гражданин ______________________, именуемый в дальнейшем "Наймодателем", с одной стороны, и гражданин _________________________, именуемый в дальнейшем "Нанимателем", с другой стороны, заключили настоящий Договор о нижеследующем:')

    this.writeHeader(document, '1. Предмет договора')

    this.writeLine(document, `1.1. Наймодателем предоставляет, а Нанимателем получает во временное пользование помещение, расположенную по адресу: ${contentParts.address.city} ${contentParts.address.street}  ${contentParts.address.house}  ${contentParts.address.flat}`)
    this.writeLine(document, `1.2. Наймодателем предоставляет, а Нанимателем получает во временное пользование находящиеся в помещении предметы мебели и бытовую технику. `)
    this.writeLine(document, `1.3. ${contentParts.rentalPeriod.rentalPeriod}`)

    this.writeHeader(document, '2. Права и обязанности Наймодателя')

    this.writeLine(document, '2.1. Наймодатель подтверждает, что он получил согласие всех совершеннолетних лиц, зарегистрированных по данному адресу, или владеющих совместно с ним данной площадью, на сдачу данного помещения в аренду.')
    this.writeLine(document, '2.2. Наймодатель подтверждает, что на момент подписания настоящего Договора найма данное помещение не продано, не является предметом судебного спора, не находится под залогом, арестом, не сдана в найм. Дом на период найма помещения не подлежит сносу или капитальному ремонту с отселением. ')
    this.writeLine(document, '2.3. Наймодатель имеет право посещать Нанимателем только с предварительным уведомлением.')
    this.writeLine(document, '2.4. Наймодатель последствия аварий и повреждений, происшедших не по вине Арендатора, устраняет своими силами.')
    this.writeLine(document, `2.5. Наймодатель оплачивает: ${contentParts.options.option}.`)

    this.writeHeader(document, '3. Права и обязанности Нанимателя')

    this.writeLine(document, '3.1 Содержать помещение в порядке, предусмотренном санитарными, противопожарными и иными нормами установленными действующим законодательством РФ.')
    this.writeLine(document, '3.2. В случае нанесения ущерба наемному помещению и имуществу, находящемуся в нем, Наниматель обязуется возместить Наймодятелю причиненный ущерб.')

    this.writeHeader(document, '4. Порядок расчетов.')

    this.writeLine(document, `4.1. За наемное помещение Нанимателем уплачивается месячная оплата в размере ${contentParts.terms.pricePerMonth} ${contentParts.payments.paymentStart}.`)
    this.writeLine(document, `4.2. Размер оплаты остаётся неизменным в течение срока договора`)
    this.writeLine(document, `4.3. При подписании Договора Нанимателем вносится Наймодателю <????? Что это такое?>, а также залоговая сумма ${contentParts.terms.deposit}`)
    this.writeLine(document, `4.4. ${contentParts.payments.penalty}`)

    this.writeHeader(document, `5. Срок действия договора найма помещения, порядок изменения, расторжение договора.`)

    this.writeLine(document, `5.1. Настоящий договор вступает в силу с момента его подписания и действует в течение всего срока найми помещения.`)
    this.writeLine(document, `5.2. О предстоящем освобождении снимаемого помещения известить Наймодателя не менее чем за две недели.`)
    this.writeLine(document, `5.3. Изменения и дополнения к настоящему договору могут вноситься только по соглашению сторон путем подписания дополнительного соглашения, являющегося неотъемлемой частью настоящего договора найма помещения. `)
    this.writeLine(document, `5.4. Досрочное расторжение договора найма Наймодателем возможно в случаях, если Наниматель нарушил свои обязанности по настоящему договору найма помещения. `)
    this.writeLine(document, `5.5. В случае досрочного расторжения договора найма Нанимателем производится пересчет оплаты за период найма в соответствие со следующими условиями: ${contentParts.terms.terminationRules} .`)
    this.writeLine(document, `5.6. Залоговая сумма возвращается Нанимателю при выезде из помещения в течение ${contentParts.terms.depositReturnPeriod}  за вычетом задолженности по оплате, за вычетом задолженности по причине задержки оплаты, за вычетом компенсации за ущерб помещению или мебели.`)

    this.writeHeader(document, `6. Порядок рассмотрения споров.`)

    this.writeLine(document, `6.1. Все споры между сторонами, связанные с настоящим договором найма, решаются путем взаимных переговоров. `)
    this.writeLine(document, `6.2. В случае невозможности их разрешения переговорным путем они будут рассмотрены в соответствии с Законодательством РФ.`)

    document.addPage()
    this.writeHeader(document, `7. Паспортные данные сторон.`)

    for (let i = 0; i < 2; i++) this.writeLine(document, `\n`)

    this.addPassportTable(document)

    document.end()

    return memoryStream;
  }

}
