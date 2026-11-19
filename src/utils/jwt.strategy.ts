import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
interface JwtPayload {
  env: string;
  apliId: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const JWT_KEY = '6i77P@__';
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_KEY,
    });
  }

  validate(payload: JwtPayload) {
    if (payload.env != this.configService.get<string>('ENV')) {
      throw new UnauthorizedException();
    } else {
      if (
        !payload ||
        payload.apliId !== Number(this.configService.get<string>('ID_APP'))
      ) {
        throw new UnauthorizedException();
      }
    }
    return payload;
  }
}
