import { HttpService } from '@nestjs/axios';
import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { ProductorDto } from '../dto/productor.dto';
import { ProductorUpdateDto } from '../dto/productorUpdate.dto';

@Injectable()
/**TODOS LOS SERVICIOS GENERADOS EN ESTE APARTADO DEBEN SER CONECTADOS A MICROSERVICIOS.  */
export class ProductorService {
  private readonly logger = new Logger(ProductorService.name);
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

  async findById(id: number) {
    const url: string =
      (this.configService.get<string>('MICRO_PRODUCTOR_FINDBYID') || '') + `/${id}`;
    const { data } = await firstValueFrom(
      this.httpService.get<ProductorDto>(url, this.requestConfig).pipe(
        catchError((error: AxiosError) => {
          if (error.response) this.logger.error(error.response.data);
          throw new ConflictException('Servicio con errores');
        }),
      ),
    );
    if (!data) {
      throw new NotFoundException('No se encontraron datos');
    }
    return data;
  }

  //OBTENER TODOS LOS DATOS
  async findAll(): Promise<ProductorDto[]> {
    const url: string =
      this.configService.get<string>('MICRO_PRODUCTOR_FINDALL') || '';
    const { data } = await firstValueFrom(
      this.httpService.get<ProductorDto[]>(url, this.requestConfig).pipe(
        catchError((error: AxiosError) => {
          if (error.response) {
            this.logger.error(error.response.data);
          }
          throw new ConflictException('Servicio con errores');
        }),
      ),
    );
    if (data.length <= 0) {
      throw new NotFoundException('No se encontraron datos');
    }
    return data;
  }

  // CREA UN REGISTRO
  async create(body: ProductorDto) {
    const url = this.configService.get<string>('MICRO_PRODUCTOR_CREATE') || '';
    const { data } = await firstValueFrom(
      this.httpService.post<ProductorDto>(url, body, this.requestConfig).pipe(
        catchError((error: AxiosError) => {
          if (error.response) this.logger.error(error.response.data);
          throw new ConflictException('Servicio con errores');
        }),
      ),
    );
    return data;
  }

  // ACTUALIZA UN REGISTRO EN BASE A SU ID
  async update(id: number, body: ProductorUpdateDto) {
    const url = (this.configService.get<string>('MICRO_PRODUCTOR_UPDATE') || '') + `/${id}`;
    const { data } = await firstValueFrom(
      this.httpService.put<ProductorDto>(url, body, this.requestConfig).pipe(
        catchError((error: AxiosError) => {
          if (error.response) this.logger.error(error.response.data);
          throw new ConflictException('Servicio con errores');
        }),
      ),
    );
    return data;
  }

  //OBTENER TODOS LOS DATOS PAGINADOS
  async paginate(queryParams?: string): Promise<ProductorDto[]> {
    const baseUrl: string =
      this.configService.get<string>('MICRO_PRODUCTOR_PAGINATE') || '';
    const url = `${baseUrl}?${queryParams}`;

    const { data } = await firstValueFrom(
      this.httpService.get<ProductorDto[]>(url, this.requestConfig).pipe(
        catchError((error: AxiosError) => {
          if (error.response) this.logger.error(error.response.data);
          throw new ConflictException('Servicio con errores');
        }),
      ),
    );
    return data;
  }
}
