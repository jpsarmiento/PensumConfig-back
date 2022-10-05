import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { DepartamentoEntity } from './departamento.entity';
import { DepartamentoService } from './departamento.service';

describe('DepartamentoService', () => {
 let service: DepartamentoService;
 let repository: Repository<DepartamentoEntity>;

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [DepartamentoService],
   }).compile();

   service = module.get<DepartamentoService>(DepartamentoService);
   repository = module.get<Repository<DepartamentoEntity>>(getRepositoryToken(DepartamentoEntity));
 });
  
 it('should be defined', () => {
   expect(service).toBeDefined();
 });

});
