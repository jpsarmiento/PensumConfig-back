/* eslint-disable */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { RequisitoEntity } from './requisito.entity';
import { RequisitoService } from './requisito.service';
import { faker } from '@faker-js/faker';

describe('RequisitoService', () => {
  let service: RequisitoService;
  let repository: Repository<RequisitoEntity>;
  let requisitosList = []

  const seedDatabase = async () => {
   repository.clear();
   requisitosList = [];
   for(let i = 0; i < 5; i++){
       const requisito: RequisitoEntity = await repository.save({
       nombre: "Tipo Epsilon",
       descripcion: "desc"})
       requisitosList.push(requisito);
   }
 }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [RequisitoService],
    }).compile();

    service = module.get<RequisitoService>(RequisitoService);
    repository = module.get<Repository<RequisitoEntity>>(getRepositoryToken(RequisitoEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('findAll should return all requisitos', async () => {
    const requisitos: RequisitoEntity[] = await service.findAll(null);
    expect(requisitos).not.toBeNull();
    expect(requisitos).toHaveLength(requisitosList.length);
  });
  
  it('findOne should return a requisito by id', async () => {
    const storedRequisito: RequisitoEntity =requisitosList[0];
    const requisito: RequisitoEntity = await service.findOne(storedRequisito.id);
    expect(requisito).not.toBeNull();
    expect(requisito.nombre).toEqual(storedRequisito.nombre)
    expect(requisito.descripcion).toEqual(storedRequisito.descripcion)
  });
  
  it('findOne should throw an exception for an invalid requisito', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", 'No se encontro el requisito con el id dado')
  });
  
  it('create should return a new requisito', async () => {
    const requisito: RequisitoEntity = {
      id: "",
      nombre: "Tipo E 1",
      descripcion: "descripcion",
      programas: null
    }
  
    const newRequisito: RequisitoEntity = await service.create(requisito);
    expect(newRequisito).not.toBeNull();
  
    const storedRequisito: RequisitoEntity = await repository.findOne({where: {id: newRequisito.id}})
    expect(storedRequisito).not.toBeNull();
    expect(storedRequisito.nombre).toEqual(newRequisito.nombre)
    expect(storedRequisito.descripcion).toEqual(newRequisito.descripcion)
  });
  
  it('update should modify a requisito', async () => {
    const requisito: RequisitoEntity = requisitosList[0];
    requisito.nombre = "Lengua extranjera";
    const updatedRequisito: RequisitoEntity = await service.update(requisito.id, requisito);
    expect(updatedRequisito).not.toBeNull();
    const storedRequisito: RequisitoEntity = await repository.findOne({ where: { id: requisito.id } })
    expect(storedRequisito).not.toBeNull();
    expect(storedRequisito.nombre).toEqual(requisito.nombre)
  });
  
  it('delete should remove a product', async () => {
    const requisito: RequisitoEntity = requisitosList[0];
    await service.delete(requisito.id);
     const deletedRequisito: RequisitoEntity = await repository.findOne({ where: { id: requisito.id } })
    expect(deletedRequisito).toBeNull();
  });
  
  it('delete should throw an exception for an invalid product', async () => {
    const requisito: RequisitoEntity = requisitosList[0];
    await service.delete(requisito.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", 'No se encontro el requisito con el id dado')
  });
});