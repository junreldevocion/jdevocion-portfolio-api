import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateTechstackDto {
  @Expose()
  @IsString()
  name: string;
}
