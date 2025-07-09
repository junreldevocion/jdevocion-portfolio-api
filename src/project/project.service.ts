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

  async create(
    createProjectDto: CreateProjectDto & { imageUrl: string },
    userId: number,
  ): Promise<Project> {
    const techEntities = await Promise.all(
      createProjectDto.techStacks.map(async ({ name }) => {
        let tech = await this.techStackRepo.findOne({
          where: { name },
        });
        if (!tech) {
          tech = this.techStackRepo.create({ name });
          tech = await this.techStackRepo.save(tech);
        }
        return tech;
      }),
    );

    const project = this.projectRepo.create({
      ...createProjectDto,
      techStacks: techEntities,
      user: { id: userId },
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
    dto: UpdateProjectDto,
    userId: number,
  ): Promise<Project> {
    const project = await this.projectRepo.findOne({
      where: { id, user: { id: userId } },
      relations: ['techStacks'],
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    if (dto.techStacks) {
      const resolveTechstacks = await Promise.all(
        dto.techStacks.map(async ({ name }) => {
          const existing = await this.techStackRepo.findOne({
            where: { name },
          });

          return (
            existing ??
            this.techStackRepo.save(this.techStackRepo.create({ name }))
          );
        }),
      );

      project.techStacks = resolveTechstacks;
    }
    Object.assign(project, dto);
    return this.projectRepo.save(project);
  }

  async remove(id: number, userId: number): Promise<{ message: string }> {
    const result = await this.projectRepo.findOne({
      where: { id, user: { id: userId } },
    });
    if (!result) {
      throw new NotFoundException('Project not found or not owned by the user');
    }

    await this.projectRepo.remove(result);

    return { message: 'Project successfully deleted' };
  }
}
