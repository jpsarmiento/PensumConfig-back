/* eslint-disable */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ProgramaEntity } from './programa.entity';
import { ProgramaService } from './programa.service';
import { faker } from '@faker-js/faker';

describe('ProgramaService', () => {
  let service: ProgramaService;
  let repository: Repository<ProgramaEntity>;
  let programasList = []

  const seedDatabase = async () => {
   repository.clear();
   programasList = [];
   for(let i = 0; i < 5; i++){
       const programa: ProgramaEntity = await repository.save({
       nombre: "Programa nombre",
       tipo: "Pregrado",
       min_gpa: faker.datatype.number({min: 1, max: 5})})
       programasList.push(programa);
   }
 }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProgramaService],
    }).compile();

    service = module.get<ProgramaService>(ProgramaService);
    repository = module.get<Repository<ProgramaEntity>>(getRepositoryToken(ProgramaEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('findAll should return all programas', async () => {
    const programas: ProgramaEntity[] = await service.findAll();
    expect(programas).not.toBeNull();
    expect(programas).toHaveLength(programasList.length);
  });
  
  it('findOne should return a programa by id', async () => {
    const storedPrograma: ProgramaEntity =programasList[0];
    const programa: ProgramaEntity = await service.findOne(storedPrograma.id);
    expect(programa).not.toBeNull();
    expect(programa.nombre).toEqual(storedPrograma.nombre)
    expect(programa.tipo).toEqual(storedPrograma.tipo)
    expect(programa.min_gpa).toEqual(storedPrograma.min_gpa)
  });
  
  it('findOne should throw an exception for an invalid programa', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", 'No se encontro el programa con el id dado')
  });
  
  it('create should return a new programa', async () => {
    const programa: ProgramaEntity = {
      id: "",
      nombre: "Programa Y",
      tipo: "Posgrado",
      min_gpa: faker.datatype.number({min: 1, max: 5}),
      requisitos: null,
      areas: null
    }
  
    const newPrograma: ProgramaEntity = await service.create(programa);
    expect(newPrograma).not.toBeNull();
  
    const storedPrograma: ProgramaEntity = await repository.findOne({where: {id: newPrograma.id}})
    expect(storedPrograma).not.toBeNull();
    expect(storedPrograma.nombre).toEqual(newPrograma.nombre)
    expect(storedPrograma.tipo).toEqual(newPrograma.tipo)
    expect(newPrograma.min_gpa).toEqual(storedPrograma.min_gpa)
  });

  it('create programa without precondition should return error', async () => {
    const programa: ProgramaEntity = {
      id: "",
      nombre: "Programa Y",
      tipo: "Maestria",
      min_gpa: faker.datatype.number({min: 1, max: 5}),
      requisitos: null,
      areas: null
    }
    await expect(() => service.create(programa)).rejects.toHaveProperty("message", 'El tipo del programa debe ser Pegrado o Posgrado')
  });
  
  it('update should modify a programa', async () => {
    const programa: ProgramaEntity = programasList[0];
    programa.nombre = "New name";
    programa.tipo = "Posgrado";
    const updatedPrograma: ProgramaEntity = await service.update(programa.id, programa);
    expect(updatedPrograma).not.toBeNull();
    const storedPrograma: ProgramaEntity = await repository.findOne({ where: { id: programa.id } })
    expect(storedPrograma).not.toBeNull();
    expect(storedPrograma.nombre).toEqual(programa.nombre)
    expect(programa.tipo).toEqual(storedPrograma.tipo)
  });
  
  it('update should throw an exception for an invalid programa', async () => {
    let programa: ProgramaEntity = programasList[0];
    programa = {
      ...programa, nombre: "New name", tipo: "Pregrado"
    }
    await expect(() => service.update("0", programa)).rejects.toHaveProperty("message", 'No se encontro el programa con el id dado')
  });
  
  it('delete should remove a product', async () => {
    const programa: ProgramaEntity = programasList[0];
    await service.delete(programa.id);
     const deletedPrograma: ProgramaEntity = await repository.findOne({ where: { id: programa.id } })
    expect(deletedPrograma).toBeNull();
  });
  
  it('delete should throw an exception for an invalid product', async () => {
    const programa: ProgramaEntity = programasList[0];
    await service.delete(programa.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", 'No se encontro el programa con el id dado')
  });


});