import { Exclude, Expose, Type } from 'class-transformer';
import { IsArray, IsString, IsUrl, ValidateNested } from 'class-validator';
import { CreateTechstackDto } from 'src/techstack/dto/create-techstack.dto';

@Exclude()
export class CreateProjectDto {
  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @IsUrl()
  githubUrl: string;

  @Expose()
  @IsUrl()
  liveDemoUrl: string;

  @Expose()
  @IsUrl()
  imageUrl: string;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTechstackDto)
  techStacks: CreateTechstackDto[];
}
