import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateTechstackDto } from 'src/techstack/dto/create-techstack.dto';

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
  @ValidateNested({ each: true })
  @Type(() => CreateTechstackDto)
  techstacks: CreateTechstackDto[];
}
