import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmploymentHistoryDto } from './dto/create-employment-history.dto';
import { UpdateEmploymentHistoryDto } from './dto/update-employment-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmploymentHistory } from './entities/employment-history.entity';
import { Repository } from 'typeorm';
import { Techstack } from 'src/techstack/entities/techstack.entity';
import { UserService } from 'src/user/user.service';
import { EmploymentResponseHistoryDto } from './dto/employment-response-history.dto';
import { toEmploymentResponseDto } from './utils/employment-mapper';

@Injectable()
export class EmploymentHistoryService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(EmploymentHistory)
    private employmentRepo: Repository<EmploymentHistory>,
    @InjectRepository(Techstack)
    private techStackRepo: Repository<Techstack>,
  ) {}

  async create(dto: CreateEmploymentHistoryDto, userId: number) {
    const user = await this.userService.findById(userId);
    const techEntities = await Promise.all(
      dto.techstacks.map(async ({ name }) => {
        const existing = await this.techStackRepo.findOne({ where: { name } });

        return (
          existing ||
          this.techStackRepo.save(
            this.techStackRepo.create({ name, createdBy: user }),
          )
        );
      }),
    );

    const employment = this.employmentRepo.create({
      ...dto,
      user: { id: userId },
      techstacks: techEntities,
    });

    return this.employmentRepo.save(employment);
  }

  findAll(): Promise<EmploymentHistory[]> {
    return this.employmentRepo.find();
  }

  async findOne(id: number): Promise<EmploymentHistory> {
    const result = await this.employmentRepo.findOneBy({ id });
    if (!result) {
      throw new NotFoundException('History not fouond');
    }
    return result;
  }

  async update(
    id: number,
    dto: UpdateEmploymentHistoryDto,
    userId: number,
  ): Promise<EmploymentHistory> {
    const history = await this.employmentRepo.findOne({
      where: { id, user: { id: userId } },
      relations: ['techstacks'],
    });

    if (!history) {
      throw new NotFoundException('Employment history not found');
    }

    Object.assign(history, dto);

    if (dto.techstacks) {
      const resolveTechstacks = await Promise.all(
        dto.techstacks.map(async ({ name }) => {
          const existing = await this.techStackRepo.findOne({
            where: { name },
          });

          return (
            existing ??
            this.techStackRepo.save(this.techStackRepo.create({ name }))
          );
        }),
      );

      history.techstacks = resolveTechstacks;
    }

    return this.employmentRepo.save(history);
  }

  async remove(id: number, userId: number): Promise<{ message: string }> {
    const history = await this.employmentRepo.findOne({
      where: { id, user: { id: userId } },
    });

    if (!history) {
      throw new NotFoundException(
        'Employment history not found or not owned by user',
      );
    }

    await this.employmentRepo.remove(history);
    return { message: 'Employment history deleted successfully' };
  }

  async findAllWithRelations(): Promise<EmploymentResponseHistoryDto[]> {
    const histories = await this.employmentRepo.find({
      relations: ['techstacks', 'user'],
    });

    return histories.map((h) => toEmploymentResponseDto(h));
  }
}
