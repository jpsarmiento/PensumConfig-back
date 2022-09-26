import { Test, TestingModule } from '@nestjs/testing';
import { TerminoService } from './termino.service';

describe('TerminoService', () => {
  let service: TerminoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TerminoService],
    }).compile();

    service = module.get<TerminoService>(TerminoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
