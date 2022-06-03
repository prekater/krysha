import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {OffersModule} from "./offers.module";
import {Transport} from "@nestjs/microservices";


async function bootstrap() {
  const app = await NestFactory.createMicroservice(OffersModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.OFFERS_MICROSERVICE_HOST,
      port: process.env.PORT
    },
  });
  await app.listen();
  Logger.log(`🚀 Offers app is running`);

}

bootstrap();
