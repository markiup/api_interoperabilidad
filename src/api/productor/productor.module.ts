/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProductorService } from './services/productor.service';
import { ProductorController } from './controllers/productor.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [ProductorService],
  controllers: [ProductorController],
})
export class ProductorModule {}
