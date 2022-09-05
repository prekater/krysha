import * as HelloSign from "hellosign-sdk";
import {ConfigService} from "@nestjs/config";
import {Domain} from "@bigdeal/domain";

export class HelloSignProvider {

  private readonly api: HelloSign;
  private config: ConfigService;
  private readonly signatureRequestDefaults = Object.freeze({
    test_mode: 1,
    title: 'Договор аренды',
    subject: 'Договор аренды',
    message: 'Пожалуйста, подпишите договор',
  })

  constructor() {
    this.config = new ConfigService()
    this.api = new HelloSign({
      key: this.config.get<string>('HELLOSIGN_API_KEY')
    })
  }


  async sign(pathToFile: string, users: Domain.Contract['users']) {

    // @ts-ignore
    const test = await this.api.signatureRequest.send(
      {
        ...this.signatureRequestDefaults,
        // @ts-ignore
        files: [pathToFile],
        use_text_tags: 1,
        hide_text_tags: 1,
        signers: [
          {
            email_address: users.landlord.email.toString(),
            name: users.landlord.fullname
          },
          {
            email_address: users.employer.email.toString(),
            name: users.employer.fullname
          }
        ],
      }
    )


    console.log(test)

    return test;

  }

}
