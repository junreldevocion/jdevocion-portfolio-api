import { CreateTechstackDto } from 'src/techstack/dto/create-techstack.dto';

export class CreateProjectDto {
  title: string;
  description: string;
  githubUrl: string;
  liveDemoUrl: string;
  imageUrl: string;
  techStacks: CreateTechstackDto[];
}
