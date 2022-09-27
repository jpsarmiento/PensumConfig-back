import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { TerminoEntity } from './termino.entity';
import { TerminoService } from './termino.service';

describe('TerminoService', () => {
 let service: TerminoService;
 let repository: Repository<TerminoEntity>;

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [TerminoService],
   }).compile();

   service = module.get<TerminoService>(TerminoService);
   repository = module.get<Repository<TerminoEntity>>(getRepositoryToken(TerminoEntity));
 });
  
 it('should be defined', () => {
   expect(service).toBeDefined();
 });

});
