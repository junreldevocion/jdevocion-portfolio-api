import { Expose, Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { CreateTechstackDto } from 'src/techstack/dto/create-techstack.dto';

export class RawCreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsString()
  githubUrl: string;

  @IsString()
  liveDemoUrl: string;

  @Expose()
  @Transform(({ value }: { value: string }) => {
    try {
      return JSON.parse(value) as CreateTechstackDto[];
    } catch {
      throw new Error('Invalid techStacks JSON');
    }
  })
  @IsArray()
  techStacks: CreateTechstackDto[];
}
