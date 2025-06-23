import { Module } from '@nestjs/common';
import { TechstackService } from './techstack.service';
import { TechstackController } from './techstack.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Techstack } from './entities/techstack.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Techstack])],
  providers: [TechstackService],
  controllers: [TechstackController],
})
export class TechstackModule {}
