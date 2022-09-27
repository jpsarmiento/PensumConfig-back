import { Test, TestingModule } from '@nestjs/testing';
import { AreaReglaService } from './area-regla.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('AreaReglaService', () => {
  let service: AreaReglaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AreaReglaService],
    }).compile();

    service = module.get<AreaReglaService>(AreaReglaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
