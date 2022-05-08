import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {ContractsModule} from "./contracts.module";


async function bootstrap() {
  const app = await NestFactory.create(ContractsModule);
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(`🚀 Application is running`);
}

bootstrap();
