import { ApiProperty } from '@nestjs/swagger';

export class ExtensionDto {
  @ApiProperty({
    title: 'id',
    description: 'Identificador secuencial de la tabla',
  })
  ext_id: number;

  @ApiProperty({
    title: 'Servicio recibido',
    description: 'Servicio de extensión agrícola recibido',
  })
  ext_servicio_recibido: string;

  @ApiProperty({
    title: 'Institucion',
    description: 'Institución que impartió el servicio de extensión',
  })
  ext_institucion: string;

  @ApiProperty({
    title: 'Fecha inicio',
    description: 'Fecha de inicio del servicio de extensión',
  })
  ext_fecha_inicio: Date;

  @ApiProperty({
    title: 'Fuente',
    description: 'Fuente de origen del registro',
  })
  ext_fuente: string;

  @ApiProperty({
    title: 'Numero cedula',
    description: 'Número de cédula del productor',
  })
  ext_numero_cedula: string;

  @ApiProperty({
    title: 'Asociacion nombre',
    description: 'Nombre de la asociación o cooperativa a la que pertenece',
  })
  ext_asociacion_nombre: string;

  @ApiProperty({
    title: 'Reg usu',
    description: '',
  })
  ext_reg_usu: number;

  @ApiProperty({
    title: 'Reg fecha',
    description: '',
  })
  ext_reg_fecha: Date = new Date();

  @ApiProperty({
    title: 'Act usu',
    description: '',
  })
  ext_act_usu: number;

  @ApiProperty({
    title: 'Act fecha',
    description: '',
  })
  ext_act_fecha: Date = new Date();

  @ApiProperty({
    title: 'Estado',
    description: '',
  })
  ext_estado: number;

  @ApiProperty({
    title: 'Eliminado',
    description: '',
  })
  ext_eliminado: boolean;
}
