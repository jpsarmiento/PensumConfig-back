/* eslint-disable */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ExamenEntity } from './examen.entity';
import { ExamenService } from './examen.service';
import { faker } from '@faker-js/faker';

describe('ExamenService', () => {
  let service: ExamenService;
  let repository: Repository<ExamenEntity>;
  let examenesList = []

  const seedDatabase = async () => {
   repository.clear();
   examenesList = [];
   for(let i = 0; i < 5; i++){
       const examen: ExamenEntity = await repository.save({
       nombre: "Examen nombre",
       min_nota: faker.datatype.number({min: 1, max: 5})})
       examenesList.push(examen);
   }
 }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ExamenService],
    }).compile();

    service = module.get<ExamenService>(ExamenService);
    repository = module.get<Repository<ExamenEntity>>(getRepositoryToken(ExamenEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('findAll should return all examenes', async () => {
    const examenes: ExamenEntity[] = await service.findAll(null);
    expect(examenes).not.toBeNull();
    expect(examenes).toHaveLength(examenesList.length);
  });
  
  it('findOne should return a examen by id', async () => {
    const storedExamen: ExamenEntity =examenesList[0];
    const examen: ExamenEntity = await service.findOne(storedExamen.id);
    expect(examen).not.toBeNull();
    expect(examen.nombre).toEqual(storedExamen.nombre)
    expect(examen.min_nota).toEqual(storedExamen.min_nota)
  });
  
  it('findOne should throw an exception for an invalid examen', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", 'No se encontro el examen con el id dado')
  });
  
  it('create should return a new examen', async () => {
    const examen: ExamenEntity = {
      id: "",
      nombre: "Examen X",
      min_nota: faker.datatype.number({min: 1, max: 5}),
      regla: null
    }
  
    const newExamen: ExamenEntity = await service.create(examen);
    expect(newExamen).not.toBeNull();
  
    const storedExamen: ExamenEntity = await repository.findOne({where: {id: newExamen.id}})
    expect(storedExamen).not.toBeNull();
    expect(storedExamen.nombre).toEqual(newExamen.nombre)
    expect(storedExamen.min_nota).toEqual(newExamen.min_nota)
  });

  it('create examen without precondition should return error', async () => {
    const examen: ExamenEntity = {
      id: "",
      nombre: "Examen X",
      min_nota: -5,
      regla: null
    }
    await expect(() => service.create(examen)).rejects.toHaveProperty("message", 'La nota minima para aprobar el examen no puede ser un numero negativo')
  });
  
  it('update should modify a examen', async () => {
    const examen: ExamenEntity = examenesList[0];
    examen.nombre = "New name";
    examen.min_nota = 4;
    const updatedExamen: ExamenEntity = await service.update(examen.id, examen);
    expect(updatedExamen).not.toBeNull();
    const storedExamen: ExamenEntity = await repository.findOne({ where: { id: examen.id } })
    expect(storedExamen).not.toBeNull();
    expect(storedExamen.nombre).toEqual(examen.nombre)
    expect(examen.min_nota).toEqual(storedExamen.min_nota)
  });
  
  it('update should throw an exception for an invalid examen', async () => {
    let examen: ExamenEntity = examenesList[0];
    examen = {
      ...examen, nombre: "New name", min_nota: 4
    }
    await expect(() => service.update("0", examen)).rejects.toHaveProperty("message", 'No se encontro el examen con el id dado')
  });
  
  it('delete should remove a product', async () => {
    const examen: ExamenEntity = examenesList[0];
    await service.delete(examen.id);
    const deletedExamen: ExamenEntity = await repository.findOne({ where: { id: examen.id } })
    expect(deletedExamen).toBeNull();
  });
  
  it('delete should throw an exception for an invalid product', async () => {
    const examen: ExamenEntity = examenesList[0];
    await service.delete(examen.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", 'No se encontro el examen con el id dado')
  });
});