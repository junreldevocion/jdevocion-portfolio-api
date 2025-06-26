import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from './project/project.module';
import { ConfigModule } from '@nestjs/config';
import { TechstackModule } from './techstack/techstack.module';
import { DatabaseConfigService } from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes it available everywhere
    }),
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [DatabaseConfigService],
      useClass: DatabaseConfigService,
    }),
    ProjectModule,
    TechstackModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseConfigService],
})
export class AppModule {}
