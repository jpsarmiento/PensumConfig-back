import { Test, TestingModule } from '@nestjs/testing';
import { ReglaService } from './regla.service';

describe('ReglaService', () => {
  let service: ReglaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReglaService],
    }).compile();

    service = module.get<ReglaService>(ReglaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
