import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Techstack } from './entities/techstack.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTechstackDto } from './dto/create-techstack.dto';
import { UpdateTechstackDto } from './dto/update-techstack.dto';

@Injectable()
export class TechstackService {
  constructor(
    @InjectRepository(Techstack)
    private techStackRepo: Repository<Techstack>,
  ) {}

  async create(dto: CreateTechstackDto, userId: number): Promise<Techstack> {
    const exists = await this.techStackRepo.findOne({
      where: { name: dto.name },
    });
    if (exists) {
      throw new ConflictException('Tech stack already exist!');
    }

    const stack = this.techStackRepo.create({
      ...dto,
      createdBy: { id: userId },
    });
    return this.techStackRepo.save(stack);
  }

  findAll(): Promise<Techstack[]> {
    return this.techStackRepo.find();
  }

  async findOne(id: number): Promise<Techstack> {
    const techStack = await this.techStackRepo.findOneBy({ id });
    if (!techStack) {
      throw new NotFoundException('Techstack not found');
    }
    return techStack;
  }

  async update(
    id: number,
    techStackDto: UpdateTechstackDto,
    userId: number,
  ): Promise<Techstack> {
    const techStack = await this.techStackRepo.findOne({
      where: { id, createdBy: { id: userId } },
    });
    if (!techStack) {
      throw new NotFoundException('Techstack not found');
    }
    Object.assign(techStack, techStackDto);
    return this.techStackRepo.save(techStack);
  }

  async remove(id: number, userId: number): Promise<{ message: string }> {
    const result = await this.techStackRepo.findOne({
      where: { id, createdBy: { id: userId } },
    });
    if (!result) {
      throw new NotFoundException('Techstack not found or not owned by user');
    }

    await this.techStackRepo.remove(result);

    return { message: 'Techstach successfully deleted!' };
  }
}
