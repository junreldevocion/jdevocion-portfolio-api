import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Project } from './entities/project.entity';
import { Techstack } from 'src/techstack/entities/techstack.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Techstack])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
