import { Module } from '@nestjs/common';
import { EmploymentHistoryService } from './employment-history.service';
import { EmploymentHistoryController } from './employment-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmploymentHistory } from './entities/employment-history.entity';
import { Techstack } from 'src/techstack/entities/techstack.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmploymentHistory, Techstack]),
    UserModule,
  ],
  controllers: [EmploymentHistoryController],
  providers: [EmploymentHistoryService],
})
export class EmploymentHistoryModule {}
