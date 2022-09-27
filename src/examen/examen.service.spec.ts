import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ExamenEntity } from './examen.entity';
import { ExamenService } from './examen.service';

describe('ExamenService', () => {
 let service: ExamenService;
 let repository: Repository<ExamenEntity>;

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [ExamenService],
   }).compile();

   service = module.get<ExamenService>(ExamenService);
   repository = module.get<Repository<ExamenEntity>>(getRepositoryToken(ExamenEntity));
 });
  
 it('should be defined', () => {
   expect(service).toBeDefined();
 });

});