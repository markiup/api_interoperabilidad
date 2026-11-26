import { Controller, Get, Param, UseFilters, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/utils/http-exception.filter';
import { InteroperabilidadService } from '../services/interoperabilidad.service';



@ApiTags('Api Persona Ficha')
//@ApiBearerAuth()
//@UseGuards(AuthGuard('jwt'))
@Controller('interoperabilidad')
@UseFilters(new HttpExceptionFilter())
export class InteroperabilidadController {
    constructor(private interoperabilidadService: InteroperabilidadService) {}

    @ApiOperation({ summary: 'Ficha de persona con datos',
        description: 'Obtiene la ficha de una persona a partir de su identificación con los datos de interoperabilidad'
     })
    @Get('/persona/:identificacion')
    async getPersona(@Param('identificacion') identificacion: string) {
        return await this.interoperabilidadService.findDataPersonaByIdentificacion(identificacion);
    }
}