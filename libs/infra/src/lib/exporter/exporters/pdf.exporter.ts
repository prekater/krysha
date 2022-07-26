import {Domain} from "@bigdeal/domain";
import {Language} from "@bigdeal/common";
import * as PDFKit from 'pdfkit'
import * as MemoryStream from 'memorystream'
import {Stream} from "stream";
import TextOptions = PDFKit.Mixins.TextOptions;
import * as PDFTable from 'voilab-pdf-table'
import {Exporter} from "../interfaces/exporter.abstract";

export class PdfExporter extends Exporter {


  static INDENT = 10

  static LINE_GAP = 10

  private writeLine(document: typeof PDFKit, text: string, options: TextOptions = {}) {

    document.font(`${__dirname}/../fonts/arial.ttf`)
    document.text(text, options)

  }

  private writeHeader(document, text: string) {
    document.text(' ', {align: 'center', lineGap: PdfExporter.LINE_GAP})
    document.font(`${__dirname}/../fonts/arial-bold.ttf`)
    document.text(text, {align: 'center', lineGap: PdfExporter.LINE_GAP})
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
          header: 'Арендодатель',
          align: 'left',
          width: 200
        },
        {
          id: 'employer',
          header: 'Арендатор',
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

    this.writeHeader(document, `Договор № ${contract.ID.toString()} аренды жилого помещения`, )

    // @ts-ignore
    this.writeLine(document, `г. ${contract.address.city} ` + contract.date, {align: "left", lineGap: PdfExporter.LINE_GAP})
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
    this.writeLine(document, `2.2.9. Своевременно оплачивать следующие коммунальные услуги и иные платежи по содержанию жилого помещения: ${contentParts.options.excluded}.`, {indent: PdfExporter.INDENT})
    this.writeLine(document, `2.2.10. ${contentParts.terms.depositContent}`)
    this.writeLine(document, `2.2.11. Соответствующая сумма удерживается Арендодателем из обеспечительного платежа или компенсируется Арендатором отдельной выплатой в следующих случаях: `)
    this.writeLine(document, '- в случае поломки или уничтожения имущества, указанного в Приложении №2 к настоящему Договору, исключительно по вине Арендатора и в объеме, предусмотренном стоимостью имущества, указанном в Приложении №2 к настоящему Договору;')
    this.writeLine(document, '- нарушения Арендатором условий настоящего Договора, включая условия досрочного прекращения в п.5.5;')
    this.writeLine(document, '- наличия финансового обременения на жилое помещение, возникшего по вине Арендатора.')
    this.writeLine(document, `2.2.12. При прекращении обеспеченного обязательства обеспечительный платеж подлежит возврату Арендатору с учетом пп. 2.2.11 Договора.`)
    this.writeLine(document, `2.2.13. По истечении срока действия настоящего Договора либо при досрочном его расторжении передать Арендодателю жилое помещение в течение одного календарного дня с момента прекращения действия или расторжения Договора в состоянии, пригодном для проживания, с учетом нормального износа по Акту возврата (Приложение №3).`)

    this.writeHeader(document, '3. Права Сторон')

    this.writeLine(document, `3.1. Арендодатель имеет право:`)
    this.writeLine(document, `3.1.1. Требовать от Арендатора содержать жилое помещение в технически исправном и надлежащем состоянии в соответствии с требованиями, предъявляемыми действующим законодательством Российской Федерации.`, {indent: PdfExporter.INDENT})
    this.writeLine(document, `3.1.2. Требовать от Арендатора своевременного внесения платы за аренду и оплаты согласованных платежей.`, {indent: PdfExporter.INDENT})
    this.writeLine(document, `3.1.3. Требовать от Арендатора, не предупредившего своевременно о заключении договора на новый срок, освобождения жилого помещения по истечении срока Договора аренды.`, {indent: PdfExporter.INDENT})

    this.writeLine(document, `3.2. Арендатор имеет право:`)
    // this.writeLine(document, '', { indent: PdfExporter.INDENT})
    this.writeLine(document, '3.2.1. Требовать от Арендодателя возместить произведенные с согласия Арендодателя неотделимые улучшения жилого помещения.', {indent: PdfExporter.INDENT})
    this.writeLine(document, '3.2.2. Арендатор имеет преимущественное право на продление или перезаключение настоящего Договора на новый срок.', {indent: PdfExporter.INDENT})

    this.writeHeader(document, '4. Ответственность Сторон')
    this.writeLine(document, '4.1. В случае неисполнения или ненадлежащего исполнения своих обязательств по настоящему Договору Стороны несут ответственность в соответствии с действующим законодательством Российской Федерации.')

    this.writeHeader(document, '5. Порядок изменения и расторжения Договора')

    this.writeLine(document, `5.1. По истечении срока настоящего Договора и выполнении всех его условий Арендатор, надлежащим образом исполнявший свои обязанности, имеет при прочих равных условиях преимущественное право на продление Договора. За 14 (четырнадцать) рабочих дней до истечения срока аренды по настоящему Договору Арендатор должен в письменном виде уведомить Арендодателя о намерении продлить срок Договора.`)
    this.writeLine(document, '5.2. Изменение условий Договора, его расторжение и прекращение допускаются по соглашению Сторон. Вносимые дополнения и изменения оформляются дополнительными соглашениями.')
    this.writeLine(document, '5.3. Договор аренды подлежит досрочному расторжению по требованию Арендодателя в следующих случаях:')
    this.writeLine(document, '5.3.1. Лица, проживающие в помещении, пользуются помещением с существенным нарушением условий настоящего Договора и действующего законодательства Российской Федерации или назначения жилого помещения либо с неоднократными нарушениями.', {indent: PdfExporter.INDENT})
    this.writeLine(document, '5.3.2. Лица, проживающие в помещении, умышленно ухудшают состояние жилого помещения.', {indent: PdfExporter.INDENT})
    this.writeLine(document, '5.3.3. Арендатор более двух раз подряд по истечении установленного Договором срока платежа не вносит арендную плату.', {indent: PdfExporter.INDENT})
    this.writeLine(document, '5.4. Арендодатель вправе требовать досрочного расторжения договора только после направления Арендатору письменного предупреждения о необходимости исполнения им обязательства в разумный срок.')
    if (contract.term.terminationRules.length) {
      this.writeLine(document, `5.5. В случае досрочного прекращения Договора по инициативе Арендатора, Арендодатель вправе возместить свои убытки, путем удержания суммы из обеспечительного платежа или требовать дополнительную выплату, с учетом пересчета стоимости ежемесячного платежа в сторону увеличения: ${contentParts.terms.terminationRules}`)
    } else {
      this.writeLine(document, '5.5. Арендодатель вправе удержать обеспечительный платеж, требовать сумму равной обеспечительного платежа или требовать сумму равной месячного платежа аренды в случае досрочного прекращения Договора по инициативе Арендатора.')
    }

    this.writeLine(document, `5.6. Договор аренды может быть расторгнут по требованию Арендатора в следующих случаях:`)

    this.writeLine(document, '5.6.1. Помещение в силу обстоятельств, за которые Арендатор не отвечает, окажется в состоянии, непригодном для использования.', {indent: PdfExporter.INDENT})
    this.writeLine(document, '5.6.2. Арендодатель не предоставляет Помещение в пользование Арендатору либо создает препятствия пользованию в соответствии с условиями Договора или назначением Помещения.', {indent: PdfExporter.INDENT})
    this.writeLine(document, '5.6.3. Помещение имеет препятствующие пользованию им недостатки, которые не были оговорены Арендодателем при заключении Договора, не были заранее известны Арендатору и не должны были быть обнаружены Арендатором во время осмотра при заключении Договора.', {indent: PdfExporter.INDENT})

    this.writeLine(document, `5.7. Стороны берут на себя обязательства принимать все меры к разрешению разногласий путем переговоров до полного урегулирования предмета разногласий.`)
    this.writeLine(document, `5.8. В случае невозможности достигнуть согласия путем переговоров Стороны разрешают разногласия путем обращения в суд общей юрисдикции в установленном законом порядке.`)

    this.writeHeader(document, '6. Порядок изменения и расторжения Договора.')

    this.writeLine(document, `6.1. Настоящий Договор аренды жилого помещения считается заключенным с момента его подписания Сторонами.`)
    this.writeLine(document, `6.2. Стороны признают юридическую силу документов, полученных по электронной почте и направленных соответственно с адреса электронной почты, указанного в разделе «Адреса и реквизиты сторон» настоящего Договора. При направлении документов по электронной почте удостоверение лица, подписывающего документы, с помощью электронной цифровой подписи не требуется.`)
    this.writeLine(document, '6.3. Настоящий Договор составлен в двух экземплярах, имеющих одинаковую юридическую силу, по одному экземпляру для каждой Стороны.')


    this.writeHeader(document, `7. Паспортные данные сторон.`)

    for (let i = 0; i < 2; i++) this.writeLine(document, `\n`)

    this.addPassportTable(document)

    document.addPage()

    document.end()

    return memoryStream;
  }

}
