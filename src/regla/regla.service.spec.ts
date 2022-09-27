import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ReglaEntity } from './regla.entity';
import { ReglaService } from './regla.service';

describe('ReglaService', () => {
 let service: ReglaService;
 let repository: Repository<ReglaEntity>;

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [ReglaService],
   }).compile();

   service = module.get<ReglaService>(ReglaService);
   repository = module.get<Repository<ReglaEntity>>(getRepositoryToken(ReglaEntity));
 });
  
 it('should be defined', () => {
   expect(service).toBeDefined();
 });

});
