import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { AreaEntity } from './area.entity';
import { AreaService } from './area.service';

describe('AreaService', () => {
 let service: AreaService;
 let repository: Repository<AreaEntity>;

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [AreaService],
   }).compile();

   service = module.get<AreaService>(AreaService);
   repository = module.get<Repository<AreaEntity>>(getRepositoryToken(AreaEntity));
 });
  
 it('should be defined', () => {
   expect(service).toBeDefined();
 });

});
