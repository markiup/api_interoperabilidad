import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { InteroperabilidadModule } from './api/interoperabilidad/interoperabilidad.module';
import { ProductorModule } from './api/productor/productor.module';
import { HealthModule } from './system/health/health.module';
import { HttpExceptionFilter } from './utils/http-exception.filter';
import { JwtStrategy } from './utils/jwt.strategy';

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
    InteroperabilidadModule,
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
