import { ApiProperty } from '@nestjs/swagger';

export class PecuariaDto {
  @ApiProperty({
    title: 'id',
    description: 'Identificador secuencial de la tabla',
  })
  pec_id: number;

  @ApiProperty({
    title: 'Bovinos',
    description: 'Indica presencia de bovinos',
  })
  pec_bovinos: boolean;

  @ApiProperty({
    title: 'Porcinos',
    description: 'Indica presencia de porcinos',
  })
  pec_porcinos: boolean;

  @ApiProperty({
    title: 'Aves',
    description: 'Indica presencia de aves',
  })
  pec_aves: boolean;

  @ApiProperty({
    title: 'Otras especies',
    description: 'Indica presencia de otras especies pecuarias',
  })
  pec_otras_especies: boolean;

  @ApiProperty({
    title: 'Fuente',
    description: 'Fuente de origen del registro pecuario',
  })
  pec_fuente: string;

  @ApiProperty({
    title: 'Numero cedula',
    description: 'Número de cédula del productor',
  })
  pec_numero_cedula: string;

  @ApiProperty({
    title: 'Reg usu',
    description: '',
  })
  pec_reg_usu: number;

  @ApiProperty({
    title: 'Reg fecha',
    description: '',
  })
  pec_reg_fecha: Date = new Date();

  @ApiProperty({
    title: 'Act usu',
    description: '',
  })
  pec_act_usu: number;

  @ApiProperty({
    title: 'Act fecha',
    description: '',
  })
  pec_act_fecha: Date = new Date();

  @ApiProperty({
    title: 'Estado',
    description: '',
  })
  pec_estado: number;

  @ApiProperty({
    title: 'Eliminado',
    description: '',
  })
  pec_eliminado: boolean;
}
