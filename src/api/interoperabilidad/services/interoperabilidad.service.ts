import { HttpService } from '@nestjs/axios';
import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { firstValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InteroperabilidadDto } from '../dto/interoperabilidad.dto';
import { PersonaDto } from '../dto/persona.dto';

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
        const microPersonaApi:string = (this.configService.get<string>('MICRO_PERSONA_FINDBY_CED')||'')+ `/${identificacion}`;

        // Recupera los datos desde micro
        const personaData = await firstValueFrom(
          this.httpService.get<PersonaDto[]>(microPersonaApi,this.requestConfig).pipe(
            catchError((error:AxiosError) => {
                if(error.response) this.logger.error(error.response.data);
                 throw new ConflictException('Servicio con errores');
            })
          )
        );
        if(!personaData || !personaData.data) {
          throw new ConflictException('No se encontró la persona por identificación ' + identificacion);
        }

        const persona: PersonaDto[] = personaData.data;



        // Genera el objeto de respuesta
        var response = new InteroperabilidadDto();
        // Producctor
        response.productor = persona.map(p => ({
          identificacion: p.per_numero_cedula,
          tipo: p.per_tipo_persona,
          fechaUltimaActualizacion: p.per_fecha_actualizacion,
          fechaCarga: p.per_reg_fecha,
          fuente: p.per_fuente
        }));
        // Contacto
       response.contacto = persona
          .filter(p => p.per_telefono_fijo || p.per_telefono_celular || p.per_correo_electronico)
          .map(p => ({
            telefono: p.per_telefono_fijo,
            celular: p.per_telefono_celular,
            email: p.per_correo_electronico,
            fuente: p.per_fuente
          }));
        // Ubicacion
        response.ubicacion = {
          provincia: "Azuay",
          canton: "Cuenca",
          parroquia: "Ricaurte",
          fuente: "RENAGRO"
        };
        // Residencia
        response.residencia = {
          provincia: "Azuay",
          canton: "Cuenca",
          parroquia: "Ricaurte",
          distancia: 0,
          fuente: "RENAGRO"
        };
        // Cultivos y actividades
        response.totalCultivos = 0;
        response.actividadPecuaria=false;
        response.asociado = false;
        response.riego = false;
        // Cultivos AFC-RENAGRO
        response.cultivoRubro = [];
        response.cultivoRubroInfocampo = [];
        // Actividad Pecuaria
        response.pecuarios = [];
        // Asociatividad
        response.asociatividad = [];
        // Existencvia agropecuaria
        response.existenciaAgropecuaria = [];
        // Riego
        response.accesoRiego = false;
        response.fuenteAgua = '';
        response.sistemaRiego = '';

        // Trazabilidad

        response.trazabilidad = persona.map(p => ({
          fuente: p.per_fuente,
          fechaCarga: p.per_reg_fecha,
          estado: "REGISTRADO"
        }));

        // Fin de mapeo de respuesta
        return response;

      }
}