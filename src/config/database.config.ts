import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class DatabaseConfigService {
  constructor(private readonly config: ConfigService) {}
  getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.config.get<string>('DB_HOST'),
      port: +(this.config.get<string>('DB_PORT') || 3306),
      username: this.config.get<string>('DB_USER'),
      password: this.config.get<string>('DB_PASS'),
      database: this.config.get<string>('DB_NAME'),
      synchronize: true,
      autoLoadEntities: true,
    };
  }
}
