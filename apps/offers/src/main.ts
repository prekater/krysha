
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {OffersModule} from "./offers.module";


async function bootstrap() {
  const app = await NestFactory.create(OffersModule);
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(`🚀 Application is running`);

}

bootstrap();
