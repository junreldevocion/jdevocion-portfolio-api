import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(techStackDto: CreateTechstackDto): Promise<Techstack> {
    const techStack = this.techStackRepo.create(techStackDto);
    return this.techStackRepo.save(techStack);
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
  ): Promise<Techstack> {
    const techStack = await this.findOne(id);
    if (!techStack) {
      throw new NotFoundException('Techstack not found');
    }
    Object.assign(techStack, { techStackDto });
    return this.techStackRepo.save(techStack);
  }

  async remove(id: number): Promise<void> {
    const result = await this.techStackRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Techstack not found');
    }
  }
}
