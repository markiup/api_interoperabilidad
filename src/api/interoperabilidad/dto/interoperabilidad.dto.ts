export class InteroperabilidadDto {
 // Productor
 productor: Productor[];

 // Contacto
 contacto: Contacto[];

 // Ubicacion
 ubicacion: Ubicacion;
 residencia: Residencia;

 // Cultivos y actividades
 totalCultivos:number;
 actividadPecuaria:boolean;
 asociado:boolean;
 riego:boolean;

 // Cultivos y rubros RENAGRO-AFC
 cultivoRubro: CultivoRubro[];
 cultivoRubroInfocampo: CultivoRubroInfocampo[];

 // Actividad Pecuaria
 pecuarios: ActividadPecuaria[];

 // Asociatividad
 asociatividad: Asociatividad[];

 // Existencia Agropecuaria
 existenciaAgropecuaria: ExtencionAgropecuaria[];

 // Riego
 accesoRiego:boolean;
 fuenteAgua:string;
 sistemaRiego:string;

 // Trazabilidad
 trazabilidad: Trazabilidad[];
}

class Productor{
  identificacion:string;
  tipo:string;
  fechaUltimaActualizacion: Date;
  fechaCarga: Date;
  fuente:string;
}
class Contacto{
  telefono:string;
  celular:string;
  email:string;
  fuente:string;
}
class Ubicacion{
    provincia:string;
    canton:string;
    parroquia:string;
    fuente:string;
}
class Residencia{
    provincia:string;
    canton:string;
    parroquia:string;
    distancia:number;
    fuente:string;
}
class CultivoRubro{
    nombre:string;
    superficie:number;
    unidad:string;
    asociado:string;
    forma:string;
    ferti_quimico:boolean;
    ferti_organico:boolean;
    ctrl_plagas_quimico:boolean;
    ctrl_plagas_organico:boolean;
    fuente:string;
}
class CultivoRubroInfocampo{
    nombre:string;
    superficie:number;
    unidad:string;
    fuente:string;
}
class ActividadPecuaria{
    nombre:string;
    existe:boolean;
    fuente:string;
}
class Asociatividad{
    nombre:string;
    fuente:string;
}
class ExtencionAgropecuaria{
    nombreExtencion:string;
    institucion:string;
    fuente:string;
    fechaLevantamiento: Date;
}
class Trazabilidad{
    fuente:string;
    fechaCarga: Date;
    estado:string;
}

