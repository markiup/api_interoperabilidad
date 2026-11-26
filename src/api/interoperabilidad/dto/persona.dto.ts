import { ApiProperty } from '@nestjs/swagger';

export class PersonaDto {
  @ApiProperty({
    title: 'id',
    description: 'Identificador secuencial de la tabla',
  })
  per_id: number;

  @ApiProperty({
    title: 'Numero cedula',
    description:
      'Número de cédula o identificación del productor recuperado de las fuentes',
  })
  per_numero_cedula: string;

  @ApiProperty({
    title: 'Tipo persona',
    description: 'Tipo de persona',
  })
  per_tipo_persona: string;

  @ApiProperty({
    title: 'Fecha actualizacion',
    description: 'Fecha de actualización de datos en la fuente',
  })
  per_fecha_actualizacion: Date;

  @ApiProperty({
    title: 'Telefono fijo',
    description: 'Teléfono fijo del productor',
  })
  per_telefono_fijo: string;

  @ApiProperty({
    title: 'Telefono celular',
    description: 'Teléfono celular del productor',
  })
  per_telefono_celular: string;

  @ApiProperty({
    title: 'Telefono celular info',
    description: 'Información adicional del teléfono celular',
  })
  per_telefono_celular_info: string;

  @ApiProperty({
    title: 'Correo electronico',
    description: 'Correo electrónico del productor',
  })
  per_correo_electronico: string;

  @ApiProperty({
    title: 'Fuente',
    description: 'Fuente de origen del registro de la persona',
  })
  per_fuente: string;

  @ApiProperty({
    title: 'Reg usu',
    description: '',
  })
  per_reg_usu: number;

  @ApiProperty({
    title: 'Reg fecha',
    description: '',
  })
  per_reg_fecha: Date = new Date();

  @ApiProperty({
    title: 'Act usu',
    description: '',
  })
  per_act_usu: number;

  @ApiProperty({
    title: 'Act fecha',
    description: '',
  })
  per_act_fecha: Date = new Date();

  @ApiProperty({
    title: 'Estado',
    description: '',
  })
  per_estado: number;

  @ApiProperty({
    title: 'Eliminado',
    description: '',
  })
  per_eliminado: boolean;
}
