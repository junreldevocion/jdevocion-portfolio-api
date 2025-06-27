import { Module } from '@nestjs/common';
import { EmploymentHistoryService } from './employment-history.service';
import { EmploymentHistoryController } from './employment-history.controller';

@Module({
  controllers: [EmploymentHistoryController],
  providers: [EmploymentHistoryService],
})
export class EmploymentHistoryModule {}
