import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';
import { Techstack } from 'src/techstack/entities/techstack.entity';

export class CreateEmploymentHistoryDto {
  @IsString()
  company: string;

  @IsString()
  position: string;

  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsBoolean()
  isCurrent: boolean;

  @IsArray()
  @IsString({ each: true })
  techStacks: Techstack[];
}
