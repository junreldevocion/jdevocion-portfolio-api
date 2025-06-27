import { Module } from '@nestjs/common';
import { EmploymentHistoryService } from './employment-history.service';
import { EmploymentHistoryController } from './employment-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmploymentHistory } from './entities/employment-history.entity';
import { Techstack } from 'src/techstack/entities/techstack.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmploymentHistory, Techstack])],
  controllers: [EmploymentHistoryController],
  providers: [EmploymentHistoryService],
})
export class EmploymentHistoryModule {}
