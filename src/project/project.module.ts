import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Project } from './entities/project.entity';
import { Techstack } from 'src/techstack/entities/techstack.entity';
import { S3Module } from 'src/shared/s3/s3.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Techstack]), S3Module],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
