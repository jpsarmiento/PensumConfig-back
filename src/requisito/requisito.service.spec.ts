import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { RequisitoEntity } from './requisito.entity';
import { RequisitoService } from './requisito.service';

describe('RequisitoService', () => {
 let service: RequisitoService;
 let repository: Repository<RequisitoEntity>;

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [RequisitoService],
   }).compile();

   service = module.get<RequisitoService>(RequisitoService);
   repository = module.get<Repository<RequisitoEntity>>(getRepositoryToken(RequisitoEntity));
 });
  
 it('should be defined', () => {
   expect(service).toBeDefined();
 });

});
