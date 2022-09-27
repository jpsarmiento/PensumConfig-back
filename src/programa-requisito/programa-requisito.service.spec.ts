import { Test, TestingModule } from '@nestjs/testing';
import { ProgramaRequisitoService } from './programa-requisito.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('ProgramaRequisitoService', () => {
  let service: ProgramaRequisitoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProgramaRequisitoService],
    }).compile();

    service = module.get<ProgramaRequisitoService>(ProgramaRequisitoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
