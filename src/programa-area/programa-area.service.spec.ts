import { Test, TestingModule } from '@nestjs/testing';
import { ProgramaAreaService } from './programa-area.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('ProgramaAreaService', () => {
  let service: ProgramaAreaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProgramaAreaService],
    }).compile();

    service = module.get<ProgramaAreaService>(ProgramaAreaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
