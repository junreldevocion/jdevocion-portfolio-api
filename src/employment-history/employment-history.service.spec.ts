import { Test, TestingModule } from '@nestjs/testing';
import { EmploymentHistoryService } from './employment-history.service';
import { Repository } from 'typeorm';
import { EmploymentHistory } from './entities/employment-history.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateEmploymentHistoryDto } from './dto/create-employment-history.dto';
import { User } from 'src/user/entities/user.entity';
import { Techstack } from '../techstack/entities/techstack.entity';

function createMockTechstack(name: string): Techstack {
  return {
    id: Math.floor(Math.random() * 100),
    name,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: { id: 1 } as User,
    projects: [],
  };
}

describe('EmploymentHistoryService', () => {
  let service: EmploymentHistoryService;
  let repo: jest.Mocked<Repository<EmploymentHistory>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmploymentHistoryService,
        {
          provide: getRepositoryToken(EmploymentHistory),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          } as Partial<jest.Mocked<Repository<EmploymentHistory>>>,
        },
      ],
    }).compile();

    service = module.get<EmploymentHistoryService>(EmploymentHistoryService);
    repo = module.get(getRepositoryToken(EmploymentHistory));
  });

  it('it should create a history', async () => {
    const dto: CreateEmploymentHistoryDto = {
      company: 'OpenAI',
      position: 'Senior Dev',
      startDate: '2020-01-01',
      endDate: '',
      isCurrent: true,
      description: 'Building LLMs',
      techstacks: [createMockTechstack('nestjs')],
    };
    const mockEntity = {
      id: 1,
      ...dto,
      user: { id: 1 } as User,
      techstacks: dto.techstacks.map((ts) => createMockTechstack(ts.name)),
    };

    repo.create.mockReturnValue(mockEntity);
    repo.save.mockResolvedValue(mockEntity);
    const result = await service.create(dto, 1);
    expect(repo.create).toHaveBeenCalledWith({
      ...dto,
      user: { id: 1 },
    });
    expect(repo.save).toHaveBeenCalledWith(mockEntity);
    expect(result).toEqual(mockEntity);
  });
});
