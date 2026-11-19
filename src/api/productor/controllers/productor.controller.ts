import { Controller, Get, UseGuards, Req, UseFilters, Post, Put, Param, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/utils/http-exception.filter';
import { ProductorService } from '../services/productor.service';
import { Request } from 'express';
import { QueryParams } from 'src/utils/query-param';
import { ProductorUpdateDto } from '../dto/productorUpdate.dto';
import { ProductorDto } from '../dto/productor.dto';

@ApiTags('Api Productor')
@Controller('api-template/v1/productor') //Solo se puede utilizar guion medio para separar palabras, no olvidar incluir la version del endpoint
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@UseFilters(new HttpExceptionFilter())
export class ProductorController {
  constructor(private apiProductorService: ProductorService) {}
  /************CRUD PARA APIS************/
  //BUSCAR TODOS LOS ITEMS

  @Get('/findById/:id')
  @ApiOperation({
    summary: 'Obtener un registro por su ID de un microservicio',
    description:
      'Conecta con uno o varios microservicios para obtener un registro utilizando su ID',
  })
  async findById(@Param('id') id: number) {
    /**Logica de negocio para APIS -  RETORNAR EL RESULTADO */ 
    return this.apiProductorService.findById(id);
  }

  @Get('/findAll')
  @ApiOperation({
    summary: 'Obtener todos los registros de un microservicio',
    description:
      'Conecta con uno o varios microservicios para obtener sus registross',
  })
  async findAll() {
    /**Logica de negocio para APIS -  RETORNAR EL RESULTADO */
    /**TODO:CODE HERE*/

    /***************************************************** */
    return this.apiProductorService.findAll();
  }

  @Post('/create')
  @ApiOperation({
    summary: 'Crear un nuevo registro en un microservicio',
    description: 'Conecta con uno o varios microservicios para crear un nuevo registro',
  })
  async create(@Body() body: ProductorDto) {
    /**Logica de negocio para APIS -  RETORNAR EL RESULTADO */
    return this.apiProductorService.create(body);
  }

  @Put('/update/:id')
  @ApiOperation({
    summary: 'Actualizar un registro en un microservicio',
    description: 'Conecta con uno o varios microservicios para actualizar un registro existente',
  })
  async update(@Param('id') id: number, @Body() body: ProductorUpdateDto) {
    /**Logica de negocio para APIS -  RETORNAR EL RESULTADO */
    return this.apiProductorService.update(id, body);
  }

  //BUSCAR TODOS LOS ITEMS
  @Get('/paginate/findAll')
  @ApiOperation({
    summary: 'Obtener todos los registros paginados de un microservicio',
    description: 'Conecta con uno o varios microservicios para obtener sus registros utilizando paginación',
  })
  async apaginate(@Req() req: Request) {
    /**
     * @INFO No es necesario modificar este endpoint.
     */
    const queryString = QueryParams.buildQueryString(req);
    return this.apiProductorService.paginate(queryString);
  }
}
