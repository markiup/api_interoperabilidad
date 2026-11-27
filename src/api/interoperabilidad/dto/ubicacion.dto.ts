import { ApiProperty } from '@nestjs/swagger';

export class UbicacionDto {
  @ApiProperty({
    title: 'id',
    description: 'Identificador secuencial de la tabla',
  })
  ubi_id: number;

  @ApiProperty({
    title: 'Bol id',
    description:
      'Identificador de la boleta o terreno asociado al productor en la fuente',
  })
  ubi_bol_id: number;

  @ApiProperty({
    title: 'Provincia registro',
    description: 'Provincia de registro del terreno o boleta',
  })
  ubi_provincia_registro: string;

  @ApiProperty({
    title: 'Canton registro',
    description: 'Cantón de registro del terreno o boleta',
  })
  ubi_canton_registro: string;

  @ApiProperty({
    title: 'Parroquia registro',
    description: 'Parroquia de registro del terreno o boleta',
  })
  ubi_parroquia_registro: string;

  @ApiProperty({
    title: 'Provincia residencia',
    description: 'Provincia de residencia del productor',
  })
  ubi_provincia_residencia: string;

  @ApiProperty({
    title: 'Canton residencia',
    description: 'Cantón de residencia del productor',
  })
  ubi_canton_residencia: string;

  @ApiProperty({
    title: 'Parroquia residencia',
    description: 'Parroquia de residencia del productor',
  })
  ubi_parroquia_residencia: string;

  @ApiProperty({
    title: 'Distancia domicilio',
    description: 'Distancia al domicilio',
  })
  ubi_distancia_domicilio: number;

  @ApiProperty({
    title: 'Fuente',
    description: 'Fuente de origen del registro de ubicación',
  })
  ubi_fuente: string;

  @ApiProperty({
    title: 'Numero cedula',
    description: 'Número de cédula del productor',
  })
  ubi_numero_cedula: string;

  @ApiProperty({
    title: 'Reg usu',
    description: '',
  })
  ubi_reg_usu: number;

  @ApiProperty({
    title: 'Reg fecha',
    description: '',
  })
  ubi_reg_fecha: Date = new Date();

  @ApiProperty({
    title: 'Act usu',
    description: '',
  })
  ubi_act_usu: number;

  @ApiProperty({
    title: 'Act fecha',
    description: '',
  })
  ubi_act_fecha: Date = new Date();

  @ApiProperty({
    title: 'Estado',
    description: '',
  })
  ubi_estado: number;

  @ApiProperty({
    title: 'Eliminado',
    description: '',
  })
  ubi_eliminado: boolean;
}
