import { Test, TestingModule } from '@nestjs/testing';
import { TechstackService } from './techstack.service';

describe('TechstackService', () => {
  let service: TechstackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TechstackService],
    }).compile();

    service = module.get<TechstackService>(TechstackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
