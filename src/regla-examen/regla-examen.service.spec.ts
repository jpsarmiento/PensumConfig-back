import { Test, TestingModule } from '@nestjs/testing';
import { ReglaExamenService } from './regla-examen.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('ReglaExamenService', () => {
  let service: ReglaExamenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ReglaExamenService],
    }).compile();

    service = module.get<ReglaExamenService>(ReglaExamenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
