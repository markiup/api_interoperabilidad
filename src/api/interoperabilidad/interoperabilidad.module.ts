import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { InteroperabilidadController } from './controllers/interoperabilidad.controller';
import { InteroperabilidadService } from './services/interoperabilidad.service';

@Module({
    imports: [
        HttpModule.register({
          timeout: 5000,
          maxRedirects: 5,
        }),
      ],
    providers: [InteroperabilidadService],
    exports: [InteroperabilidadService],
    controllers: [InteroperabilidadController],
})
export class InteroperabilidadModule {}