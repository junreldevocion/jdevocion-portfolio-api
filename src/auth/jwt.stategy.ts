import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    const jwtSecret = config.get<string>('JWT_SECRET');
    if (typeof jwtSecret !== 'string' || !jwtSecret.trim()) {
      throw new Error(
        '[JwtStrategy] Missing or invalid JWT_SECRET in environment configuration.',
      );
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
  }

  validate(payload: JwtPayload) {
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role,
    };
  }
}
