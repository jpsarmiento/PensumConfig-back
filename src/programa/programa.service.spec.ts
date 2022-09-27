import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ProgramaEntity } from './programa.entity';
import { ProgramaService } from './programa.service';

describe('ProgramaService', () => {
 let service: ProgramaService;
 let repository: Repository<ProgramaEntity>;

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [ProgramaService],
   }).compile();

   service = module.get<ProgramaService>(ProgramaService);
   repository = module.get<Repository<ProgramaEntity>>(getRepositoryToken(ProgramaEntity));
 });
  
 it('should be defined', () => {
   expect(service).toBeDefined();
 });

});
