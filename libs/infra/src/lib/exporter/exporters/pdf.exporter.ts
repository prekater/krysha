import {Domain} from "@bigdeal/domain";
import {Language} from "@bigdeal/common";
import * as PDFKit from 'pdfkit'
import * as MemoryStream from 'memorystream'
import {Stream} from "stream";
import * as moment from "moment";
import TextOptions = PDFKit.Mixins.TextOptions;
import * as PDFTable from 'voilab-pdf-table'
import {Exporter} from "../interfaces/exporter.abstract";

export class PdfExporter extends Exporter {


  static INDENT = 10
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

  get tab() {
    return '\u0020'
  }

  async createDocumentFromContract(contract: Domain.Contract, language: Language = Language.RU): Promise<Stream> {
    const memoryStream = new MemoryStream()

    const contentParts = await this.getContentParts(contract, language)

    const document = new PDFKit()
    document.pipe(memoryStream)

    document.fontSize(9)

    this.writeHeader(document, 'Договор № ______________________ аренды жилого помещения')

    // @ts-ignore
    this.writeLine(document, `г. ${contract.address.city} ` + moment().format('DD.MM.YYYY'), {align: "left"})
    this.writeLine(document, 'Гражданин РФ,______________________, именуемый(-ая) в дальнейшем "Арендодатель", с одной стороны, и гражданин РФ _________________________, именуемый в дальнейшем "Арендатор", вместе именуемые в дальнейшем "Стороны", заключили настоящий Договор о нижеследующем:')

    this.writeHeader(document, '1. Предмет договора')

    this.writeLine(document, `1.1. Арендодатель передает, а Арендатор принимает за определенную плату в пользование жилое помещение - ${contentParts.meta.propertyType}, с кадастровым номером _____________, расположенную по адресу: ${contentParts.address.city} ${contentParts.address.street}  ${contentParts.address.house}  ${contentParts.address.flat} (далее - жилое помещение, Помещение)`)
    this.writeLine(document, `1.2. Жилое помещение может быть использовано только для проживания граждан.`)
    this.writeLine(document, `1.3. Срок аренды устанавливается на ${contract.duration} ${contentParts.terms.periodUnit} c ${contentParts.rentalPeriod.rentalPeriod}`)
    this.writeLine(document, `1.4. Жилое помещение принадлежит Арендодателю, что подтверждается выпиской из ЕГРН.`)
    this.writeLine(document, `1.5. Перечень имущества, находящегося в жилом помещении и передаваемого вместе с жилым помещением, приводится в Акте приема-передачи (Приложение № 2).`)
    this.writeLine(document, `1.6. Арендодатель гарантирует, что жилое помещение не обременено правами третьих лиц, не находится под арестом, не является предметом судебных споров, находится в пригодном для проживания состоянии.`)

    this.writeHeader(document, '2. Обязанности Сторон')

    this.writeLine(document, '2.1. Арендодатель обязуется:')
    this.writeLine(document, `2.1.1. Незамедлительно предоставить Арендатору по Акту приема-передачи жилое помещение, указанное в п. 1.1 настоящего Договора.`, {indent: PdfExporter.INDENT})
    this.writeLine(document, `2.1.2. Обеспечить свободный доступ Арендатора в жилое помещение.`, {indent: PdfExporter.INDENT})
    this.writeLine(document, `2.1.3. Осуществлять надлежащую эксплуатацию инженерных коммуникаций, которые относятся к сданному в аренду жилому помещению, предоставлять или обеспечивать предоставление Арендатору за плату необходимых коммунальных услуг, обеспечивать ремонт устройств для оказания коммунальных услуг, находящихся в жилом помещении.`, {indent: PdfExporter.INDENT})
    // this.writeLine(document, `2.5. Наймодатель оплачивает: ${contentParts.options.option}.`)
    this.writeLine(document, '2.2. Арендатор обязуется:')
    this.writeLine(document, '2.2.1. Использовать жилое помещение по назначению в соответствии с п. 1.2 настоящего Договора, а также с требованиями Жилищного кодекса Российской Федерации и действующего законодательства Российской Федерации.\n', {indent: PdfExporter.INDENT})
    this.writeLine(document, '2.2.2. Обеспечивать сохранность жилого помещения и поддерживать его в надлежащем состоянии.', {indent: PdfExporter.INDENT})
    this.writeLine(document, '2.2.3. Своевременно сообщать Арендодателю о выявленных неисправностях в жилом помещении.', {indent: PdfExporter.INDENT})
    this.writeLine(document, '2.2.4. Не производить перепланировку и переоборудование жилого помещения без согласия Арендодателя.', {indent: PdfExporter.INDENT})
    this.writeLine(document, '2.2.5. Допускать в дневное время, а при авариях и в ночное время, в арендуемое жилое помещение работников Арендодателя или самого Арендодателя, а также представителей предприятий по обслуживанию и ремонту жилья для проведения осмотра и ремонта конструкций и технических устройств жилого помещения.', {indent: PdfExporter.INDENT})
    this.writeLine(document, '2.2.6. Освободить арендуемое жилое помещение по истечении установленного в настоящем Договоре срока аренды.', {indent: PdfExporter.INDENT})
    this.writeLine(document, '2.2.7. Не производить текущий ремонт без согласования с Арендодателем.', {indent: PdfExporter.INDENT})
    this.writeLine(document, `2.2.8. Своевременно вносить арендную плату за жилое помещение в размере ${contract.price} ${contentParts.terms.pricePerMonth}. Арендная плата оплачивается путем перечисления на расчетный счет Арендодателя или иным не противоречащим закону способом, не позднее ${contract.paymentDate} числа оплачиваемого месяца. В стоимость арендной платы входит:  ${contentParts.options.included}.`, {indent: PdfExporter.INDENT})
    this.writeLine(document, `2.2.9. Своевременно оплачивать следующие коммунальные услуги и иные платежи по содержанию жилого помещения: ${contentParts.options.excluded}.`, { indent: PdfExporter.INDENT})
    this.writeLine(document, `2.2.10. ${contentParts.terms.depositContent}`)


    this.writeHeader(document, '3. Права и обязанности Нанимателя')

    this.writeLine(document, '3.1 Содержать помещение в порядке, предусмотренном санитарными, противопожарными и иными нормами установленными действующим законодательством РФ.')
    this.writeLine(document, '3.2. В случае нанесения ущерба наемному помещению и имуществу, находящемуся в нем, Наниматель обязуется возместить Наймодятелю причиненный ущерб.')

    this.writeHeader(document, '4. Порядок расчетов.')

    this.writeLine(document, `4.1. За наемное помещение Нанимателем уплачивается месячная оплата в размере ${contract.price} ${contentParts.terms.pricePerMonth} ${contract.paymentDate} числа каждого месяца.`)
    this.writeLine(document, `4.2. Размер оплаты остаётся неизменным в течение срока договора`)
    this.writeLine(document, `4.3. При подписании Договора Нанимателем вносится Наймодателю ${contentParts.payments.paymentRules}, а также залоговая сумма ${contentParts.terms.deposit}`)
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
