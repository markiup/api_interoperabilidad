import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { HealthModule } from './system/health/health.module';
import { ProductorModule } from './api/productor/productor.module';
import { JwtStrategy } from './utils/jwt.strategy';
import { HttpExceptionFilter } from './utils/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.des.env',
    }),
    JwtModule.register({
      secret: '6i77P@__',
      signOptions: { expiresIn: '60d' },
    }),
    ProductorModule,
    HealthModule,
  ],
  controllers: [],
  providers: [
    JwtStrategy,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
