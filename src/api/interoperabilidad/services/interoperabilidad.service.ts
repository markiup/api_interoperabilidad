import { HttpService } from '@nestjs/axios';
import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { firstValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InteroperabilidadDto } from '../dto/interoperabilidad.dto';
import { PersonaDto } from '../dto/persona.dto';
import { CultivoDto } from '../dto/cultivo.dto';
import { ExtensionDto } from '../dto/extension.dto';
import { PecuariaDto } from '../dto/pecuario.dto';
import { UbicacionDto } from '../dto/ubicacion.dto';
import { Utils } from '../utils/utils';

@Injectable()
export class InteroperabilidadService {
  private readonly logger = new Logger(InteroperabilidadService.name);
  requestConfig: AxiosRequestConfig;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.requestConfig = {
      headers: {
        'X-Api-Key': this.configService.get<string>('API_KEY_PROD', ''),
      },
    };
  }

  /**
   * Obtiene los datos de interoperabilidad de una persona a partir de su identificación
   * @param identificacion Identificación de la persona a buscar
   * @returns Datos de interoperabilidad de la persona
   */
  async findDataPersonaByIdentificacion(identificacion: string) {
    // Cargar las URLs de los microservicios desde la configuración
    const microPersonaApi: string =
      (this.configService.get<string>('MICRO_PERSONA_FINDBY_CED') || '') +
      `/${identificacion}`;
    const microCultivoApi: string =
      (this.configService.get<string>('MICRO_CULTIVO_FINDBY_CED') || '') +
      `/${identificacion}`;
    const microExtensionApi: string =
      (this.configService.get<string>('MICRO_EXTENSION_FINDBY_CED') || '') +
      `/${identificacion}`;
    const microPecuarioApi: string =
      (this.configService.get<string>('MICRO_PECUARIO_FINDBY_CED') || '') +
      `/${identificacion}`;
    const microUbicacionApi: string =
      (this.configService.get<string>('MICRO_UBICACION_FINDBY_CED') || '') +
      `/${identificacion}`;

    // Recupera los datos desde micro
    const personaData = await firstValueFrom(
      this.httpService
        .get<PersonaDto[]>(microPersonaApi, this.requestConfig)
        .pipe(
          catchError((error: AxiosError) => {
            if (error.response) this.logger.error(error.response.data);
            throw new ConflictException('Servicio con errores');
          }),
        ),
    );

    // Valida si existe la persona antes de consultar los demás microservicios
    if (!personaData?.data || personaData.data.length === 0) {
      throw new ConflictException(
        'No se encontró la persona por identificación ' + identificacion,
      );
    }

    const persona: PersonaDto[] = personaData.data;

    const cultivoData = await firstValueFrom(
      this.httpService
        .get<CultivoDto[]>(microCultivoApi, this.requestConfig)
        .pipe(
          catchError((error: AxiosError) => {
            if (error.response) this.logger.error(error.response.data);
            throw new ConflictException('Servicio con errores');
          }),
        ),
    );
    const cultivo: CultivoDto[] = cultivoData?.data || [];

    const extensionData = await firstValueFrom(
      this.httpService
        .get<ExtensionDto[]>(microExtensionApi, this.requestConfig)
        .pipe(
          catchError((error: AxiosError) => {
            if (error.response) this.logger.error(error.response.data);
            throw new ConflictException('Servicio con errores');
          }),
        ),
    );
    const extension: ExtensionDto[] = extensionData?.data || [];

    const pecuarioData = await firstValueFrom(
      this.httpService
        .get<PecuariaDto[]>(microPecuarioApi, this.requestConfig)
        .pipe(
          catchError((error: AxiosError) => {
            if (error.response) this.logger.error(error.response.data);
            throw new ConflictException('Servicio con errores');
          }),
        ),
    );
    const pecuario: PecuariaDto[] = pecuarioData?.data || [];

    const ubicacionData = await firstValueFrom(
      this.httpService
        .get<UbicacionDto[]>(microUbicacionApi, this.requestConfig)
        .pipe(
          catchError((error: AxiosError) => {
            if (error.response) this.logger.error(error.response.data);
            throw new ConflictException('Servicio con errores');
          }),
        ),
    );
    const ubicacion: UbicacionDto[] = ubicacionData?.data || [];

    // Genera el objeto de respuesta
    const response = new InteroperabilidadDto();

    // Productor
    response.productor = persona.map((p) => ({
      identificacion: p.per_numero_cedula,
      tipo: p.per_tipo_persona,
      fechaUltimaActualizacion: p.per_fecha_actualizacion,
      fechaCarga: p.per_reg_fecha,
      fuente: p.per_fuente,
    }));

    // Contacto
    response.contacto = persona
      .filter(
        (p) =>
          p.per_telefono_fijo ||
          p.per_telefono_celular ||
          p.per_correo_electronico,
      )
      .map((p) => ({
        telefono: p.per_telefono_fijo,
        celular: p.per_telefono_celular,
        email: p.per_correo_electronico,
        fuente: p.per_fuente,
      }));

    // Ubicación
    response.ubicacion =
      ubicacion.length > 0
        ? {
            provincia: ubicacion[0].ubi_provincia_registro,
            canton: ubicacion[0].ubi_canton_registro,
            parroquia: ubicacion[0].ubi_parroquia_registro,
            fuente: ubicacion[0].ubi_fuente,
          }
        : {
            provincia: '',
            canton: '',
            parroquia: '',
            fuente: '',
          };

    // Residencia
    response.residencia =
      ubicacion.length > 0
        ? {
            provincia: ubicacion[0].ubi_provincia_residencia,
            canton: ubicacion[0].ubi_canton_residencia,
            parroquia: ubicacion[0].ubi_parroquia_residencia,
            distancia: Number(ubicacion[0].ubi_distancia_domicilio) || 0,
            fuente: ubicacion[0].ubi_fuente,
          }
        : {
            provincia: '',
            canton: '',
            parroquia: '',
            distancia: 0,
            fuente: '',
          };

    // Cultivos AFC-RENAGRO
    response.cultivoRubro = cultivo
      .filter((c) => c.cul_fuente !== 'INFOCAMPO')
      .map((c) => ({
        nombre: c.cul_nombre,
        superficie: Number(c.cul_superficie) || 0,
        unidad: Utils.getNombreUnidad(c.cul_unidad),
        asociado: c.cul_asociacion,
        forma: c.cul_forma,
        ferti_quimico: c.cul_ferti_quim,
        ferti_organico: c.cul_ferti_orga,
        ctrl_plagas_quimico: c.cul_plag_quim,
        ctrl_plagas_organico: c.cul_plag_orga,
        fuente: c.cul_fuente,
      }));

    response.cultivoRubroInfocampo = cultivo
      .filter((c) => c.cul_fuente === 'INFOCAMPO')
      .map((c) => ({
        nombre: c.cul_nombre,
        superficie: Number(c.cul_superficie) || 0,
        unidad: Utils.getNombreUnidad(c.cul_unidad),
        fuente: c.cul_fuente,
      }));

    // Actividad Pecuaria
    response.pecuarios = [];

    pecuario.forEach((p) => {
      if (p.pec_bovinos != null) {
        response.pecuarios.push({
          nombre: 'Bovinos',
          existe: p.pec_bovinos,
          fuente: p.pec_fuente,
        });
      }

      if (p.pec_porcinos != null) {
        response.pecuarios.push({
          nombre: 'Porcinos',
          existe: p.pec_porcinos,
          fuente: p.pec_fuente,
        });
      }

      if (p.pec_aves != null) {
        response.pecuarios.push({
          nombre: 'Aves',
          existe: p.pec_aves,
          fuente: p.pec_fuente,
        });
      }

      if (p.pec_otras_especies != null) {
        response.pecuarios.push({
          nombre: 'Otras especies',
          existe: p.pec_otras_especies,
          fuente: p.pec_fuente,
        });
      }
    });

    // Asociatividad
    response.asociatividad = extension
      .filter((e) => e.ext_asociacion_nombre)
      .map((e) => ({
        nombre: e.ext_asociacion_nombre,
        fuente: e.ext_fuente,
      }));

    // Existencia agropecuaria
    response.existenciaAgropecuaria = extension
      .filter((e) => e.ext_servicio_recibido)
      .map((e) => ({
        nombreExtencion: e.ext_servicio_recibido,
        institucion: e.ext_institucion,
        fuente: e.ext_fuente,
        fechaLevantamiento: e.ext_fecha_inicio || e.ext_reg_fecha,
      }));

    // Riego
    const cultivoRiego =
      cultivo.find((c) => c.cul_rie_acceso != null) || cultivo[0];

    response.accesoRiego = cultivoRiego
      ? Boolean(cultivoRiego.cul_rie_acceso)
      : false;

    response.fuenteAgua = cultivoRiego?.cul_rie_fuente_agua || '';
    response.sistemaRiego = cultivoRiego?.cul_rie_sistema || '';

    // Cultivos y actividades
    response.totalCultivos = cultivo.length;

    response.actividadPecuaria = response.pecuarios.some(
      (p) => p.existe === true,
    );

    response.asociado = response.asociatividad.length > 0;
    response.riego = response.accesoRiego;

    // Trazabilidad
    response.trazabilidad = persona.map((p) => ({
      fuente: p.per_fuente,
      fechaCarga: p.per_reg_fecha,
      estado: 'REGISTRADO',
    }));

    // Fin de mapeo de respuesta
    return response;
  }
}
