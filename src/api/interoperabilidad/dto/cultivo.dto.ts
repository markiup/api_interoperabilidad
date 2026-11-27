import { ApiProperty } from '@nestjs/swagger';

export class CultivoDto {
  @ApiProperty({
    title: 'id',
    description: 'Identificador secuencial de la tabla',
  })
  cul_id: number;

  @ApiProperty({
    title: 'Nombre',
    description: 'Nombre del cultivo',
  })
  cul_nombre: string;

  @ApiProperty({
    title: 'Superficie',
    description: 'Superficie del cultivo',
  })
  cul_superficie: number;

  @ApiProperty({
    title: 'Unidad',
    description: 'Unidad de medida de la superficie',
  })
  cul_unidad: string;

  @ApiProperty({
    title: 'Asociacion',
    description: 'Indica si el cultivo es solo o asociado',
  })
  cul_asociacion: string;

  @ApiProperty({
    title: 'Forma',
    description: 'Forma del cultivo',
  })
  cul_forma: string;

  @ApiProperty({
    title: 'Ferti orga',
    description: 'Uso de fertilizante orgánico',
  })
  cul_ferti_orga: boolean;

  @ApiProperty({
    title: 'Ferti quim',
    description: 'Uso de fertilizante químico',
  })
  cul_ferti_quim: boolean;

  @ApiProperty({
    title: 'Plag orga',
    description: 'Uso de plaguicida orgánico',
  })
  cul_plag_orga: boolean;

  @ApiProperty({
    title: 'Plag quim',
    description: 'Uso de plaguicida químico',
  })
  cul_plag_quim: boolean;

  @ApiProperty({
    title: 'Fuente',
    description: 'Fuente de origen del registro del cultivo',
  })
  cul_fuente: string;

  @ApiProperty({
    title: 'Rie fuente agua',
    description: 'Fuente de agua para riego',
  })
  cul_rie_fuente_agua: string;

  @ApiProperty({
    title: 'Rie sistema',
    description: 'Sistema de riego utilizado',
  })
  cul_rie_sistema: string;

  @ApiProperty({
    title: 'Numero cedula',
    description: 'Número de cédula del productor',
  })
  cul_numero_cedula: string;

  @ApiProperty({
    title: 'Riego',
    description: 'Tipo o detalle de riego',
  })
  cul_riego: string;

  @ApiProperty({
    title: 'Rie acceso',
    description: 'Indica si tiene acceso a riego',
  })
  cul_rie_acceso: boolean;

  @ApiProperty({
    title: 'Reg usu',
    description: '',
  })
  cul_reg_usu: number;

  @ApiProperty({
    title: 'Reg fecha',
    description: '',
  })
  cul_reg_fecha: Date = new Date();

  @ApiProperty({
    title: 'Act usu',
    description: '',
  })
  cul_act_usu: number;

  @ApiProperty({
    title: 'Act fecha',
    description: '',
  })
  cul_act_fecha: Date = new Date();

  @ApiProperty({
    title: 'Estado',
    description: '',
  })
  cul_estado: number;

  @ApiProperty({
    title: 'Eliminado',
    description: '',
  })
  cul_eliminado: boolean;
}
