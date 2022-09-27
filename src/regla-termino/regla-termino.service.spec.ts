import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ReglaTerminoService } from './regla-termino.service';

describe('ReglaTerminoService', () => {
  let service: ReglaTerminoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ReglaTerminoService],
    }).compile();

    service = module.get<ReglaTerminoService>(ReglaTerminoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
