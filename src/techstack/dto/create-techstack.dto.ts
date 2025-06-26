import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateTechstackDto {
  @IsString()
  @Expose()
  name: string;
}
