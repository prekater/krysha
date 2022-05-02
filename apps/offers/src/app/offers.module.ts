import { Module } from '@nestjs/common';

import { AppController } from './controllers/add-offer.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class OffersModule {}
