import { Test, TestingModule } from '@nestjs/testing';
import { EmploymentHistoryService } from './employment-history.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EmploymentHistory } from './entities/employment-history.entity';
import { Techstack } from '../techstack/entities/techstack.entity';
import { CreateEmploymentHistoryDto } from './dto/create-employment-history.dto';
import { User } from '../user/entities/user.entity';
import { UserService } from 'src/user/user.service';

describe('EmploymentHistoryService', () => {
  let service: EmploymentHistoryService;

  const mockRepo = {
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockUserService = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmploymentHistoryService,
        {
          provide: UserService,
          useValue: mockUserService, // Mock UserService
        },
        {
          provide: getRepositoryToken(EmploymentHistory),
          useValue: mockRepo, // Mock EmploymentHistoryRepository
        },
        {
          provide: getRepositoryToken(Techstack),
          useValue: {}, // Mock TechstackRepository
        },
      ],
    }).compile();

    service = module.get<EmploymentHistoryService>(EmploymentHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new employment history record', async () => {
    const dto: CreateEmploymentHistoryDto = {
      company: 'OpenAI',
      position: 'Dev',
      startDate: '2021-01-01',
      endDate: '2023-01-01',
      isCurrent: false,
      description: 'Worked on AI models',
      techstacks: [], // optional for this test
    };

    const mockUser = { id: 1 } as User;
    const mockEntity = { id: 10, ...dto, user: mockUser };

    mockUserService.findById.mockResolvedValue(mockUser);
    mockRepo.create.mockReturnValue(mockEntity);
    mockRepo.save.mockResolvedValue(mockEntity);

    const result = await service.create(dto, 1);

    expect(mockUserService.findById).toHaveBeenCalledWith(1);
    expect(mockRepo.create).toHaveBeenCalledWith({ ...dto, user: mockUser });
    expect(mockRepo.save).toHaveBeenCalledWith(mockEntity);
    expect(result).toEqual(mockEntity);
  });
});
