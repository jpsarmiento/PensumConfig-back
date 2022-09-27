import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { CursoEntity } from './curso.entity';
import { CursoService } from './curso.service';

describe('CursoService', () => {
 let service: CursoService;
 let repository: Repository<CursoEntity>;

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [CursoService],
   }).compile();

   service = module.get<CursoService>(CursoService);
   repository = module.get<Repository<CursoEntity>>(getRepositoryToken(CursoEntity));
 });
  
 it('should be defined', () => {
   expect(service).toBeDefined();
 });

});
