import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Techstack } from 'src/techstack/entities/techstack.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
    @InjectRepository(Techstack)
    private techStackRepo: Repository<Techstack>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const techEntities = await Promise.all(
      createProjectDto.techStacks.map(async (name) => {
        const techStack = await this.techStackRepo.findOne({ where: { name } });
        if (!techStack) {
          throw new NotFoundException('Techstack not found');
        }
        return techStack || this.techStackRepo.create({ name });
      }),
    );

    const project = this.projectRepo.create({
      ...createProjectDto,
      techStacks: techEntities,
    });
    return this.projectRepo.save(project);
  }

  findAll(): Promise<Project[]> {
    return this.projectRepo.find();
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectRepo.findOneBy({ id });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.findOne(id);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    Object.assign(project, updateProjectDto);
    return this.projectRepo.save(project);
  }

  async remove(id: number): Promise<void> {
    const result = await this.projectRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Project not found');
    }
  }
}
