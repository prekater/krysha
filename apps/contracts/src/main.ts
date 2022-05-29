import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {ContractsModule} from "./contracts.module";
import {Transport} from "@nestjs/microservices";


async function bootstrap() {
  const app = await NestFactory.createMicroservice(ContractsModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.CONTRACTS_MICROSERVICE_HOST,
      port: process.env.PORT
    },
  });

  await app.listen();
  Logger.log(`🚀 Contracts app is running`);
}

bootstrap();
