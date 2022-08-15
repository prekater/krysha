import * as HelloSign from "hellosign-sdk";
import {ConfigService} from "@nestjs/config";
import * as fs from "fs";

export class HelloSignProvider {

  private readonly api: HelloSign;
  private config: ConfigService;
  private readonly signatureRequestDefaults = Object.freeze({
    test_mode: 1,
    title: 'NDA with Acme Co.',
    subject: 'The NDA we talked about',
    message: 'Please sign this NDA and then we can discuss more.',
    signers: [
      {
        email_address: 'kontaktAK@Yandex.ru',
        name: 'Alex1'
      },
      {
        email_address: 'kontaktAK@Yandex.ru',
        name: 'Alex2'
      }
    ],
    form_fields_per_document:
      [
        [
          {
            api_id: 'signature_page_1_user_1',
            name: '',
            type: 'signature',
            x: 100,
            y: 600,
            width: 100,
            height: 16,
            required: true,
            signer: 0,
            page: 1

          },
          {
            api_id: 'signature_page_1_user_2',
            name: '',
            type: 'signature',
            x: 500,
            y: 600,
            width: 100,
            height: 16,
            required: true,
            signer: 1,
            page: 1

          },
          // {
          //   name: 'date_page_2_user_1',
          //   type: 'date_signed',
          //   x: 100,
          //   y: 320,
          //   width: 100,
          //   height: 16,
          //   required: true,
          //   signer: 0,
          //   page: 2
          // },
          // {
          //   name: '',
          //   type: 'signature',
          //   x: 250,
          //   y: 300,
          //   width: 100,
          //   height: 16,
          //   required: true,
          //   signer: 1,
          //   page: 3
          // },
          // {
          //   name: '',
          //   type: 'date_signed',
          //   x: 250,
          //   y: 320,
          //   width: 100,
          //   height: 16,
          //   required: true,
          //   signer: 1,
          //   page: 4
          // }

        ]]
  })

  constructor() {
    this.config = new ConfigService()
    this.api = new HelloSign({
      key: this.config.get<string>('HELLOSIGN_API_KEY')
    })
  }


  async sign(pathToFile: string) {

    console.log(pathToFile)
    // @ts-ignore
    const test = await this.api.signatureRequest.send(
      {
        ...this.signatureRequestDefaults,
        // @ts-ignore
        files: [pathToFile],

      }
    )


    console.log(test)

  }

}
