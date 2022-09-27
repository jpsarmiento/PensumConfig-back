import { Test, TestingModule } from '@nestjs/testing';
import { TerminoCursoService } from './termino-curso.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('TerminoCursoService', () => {
  let service: TerminoCursoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [TerminoCursoService],
    }).compile();

    service = module.get<TerminoCursoService>(TerminoCursoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
