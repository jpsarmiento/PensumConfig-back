import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { TerminoEntity } from './termino.entity';
import { TerminoService } from './termino.service';
import { faker } from '@faker-js/faker';

describe('TerminoService', () => {
  let service: TerminoService;
  let repository: Repository<TerminoEntity>;
  let terminosList = []

  const seedDatabase = async () => {
   repository.clear();
   terminosList = [];
   for(let i = 0; i < 5; i++){
       const termino: TerminoEntity = await repository.save({})
       terminosList.push(termino);
   }
 }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [TerminoService],
    }).compile();

    service = module.get<TerminoService>(TerminoService);
    repository = module.get<Repository<TerminoEntity>>(getRepositoryToken(TerminoEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('findAll should return all terminos', async () => {
    const terminos: TerminoEntity[] = await service.findAll();
    expect(terminos).not.toBeNull();
    expect(terminos).toHaveLength(terminosList.length);
  });
  
  it('findOne should return a termino by id', async () => {
    const storedTermino: TerminoEntity =terminosList[0];
    const termino: TerminoEntity = await service.findOne(storedTermino.id);
    expect(termino).not.toBeNull();
  });
  
  it('findOne should throw an exception for an invalid termino', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", 'No se encontro el termino con el id dado')
  });
  
  it('create should return a new termino', async () => {
    const termino: TerminoEntity = {
      id: "",
      cursos: null,
      regla: null
    }
  
    const newTermino: TerminoEntity = await service.create(termino);
    expect(newTermino).not.toBeNull();
  
    const storedTermino: TerminoEntity = await repository.findOne({where: {id: newTermino.id}})
    expect(storedTermino).not.toBeNull();
  });
  
  it('update should modify a termino', async () => {
    const termino: TerminoEntity = terminosList[0];
    const updatedTermino: TerminoEntity = await service.update(termino.id, termino);
    expect(updatedTermino).not.toBeNull();
    const storedTermino: TerminoEntity = await repository.findOne({ where: { id: termino.id } })
    expect(storedTermino).not.toBeNull();
  });
  
  it('update should throw an exception for an invalid termino', async () => {
    let termino: TerminoEntity = terminosList[0];
    termino = {
      ...termino, 
    }
    await expect(() => service.update("0", termino)).rejects.toHaveProperty("message", 'No se encontro el termino con el id dado')
  });
  
  it('delete should remove a product', async () => {
    const termino: TerminoEntity = terminosList[0];
    await service.delete(termino.id);
     const deletedTermino: TerminoEntity = await repository.findOne({ where: { id: termino.id } })
    expect(deletedTermino).toBeNull();
  });
  
  it('delete should throw an exception for an invalid product', async () => {
    const termino: TerminoEntity = terminosList[0];
    await service.delete(termino.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", 'No se encontro el termino con el id dado')
  });


});