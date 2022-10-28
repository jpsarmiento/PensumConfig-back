/* eslint-disable */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { CursoEntity } from './curso.entity';
import { CursoService } from './curso.service';
import { faker } from '@faker-js/faker';

describe('CursoService', () => {
  let service: CursoService;
  let repository: Repository<CursoEntity>;
  let cursosList = []

  const seedDatabase = async () => {
   repository.clear();
   cursosList = [];
   for(let i = 0; i < 5; i++){
       const curso: CursoEntity = await repository.save({
       nombre: "Curso nombre",
       sigla: "ISIS",
       codigo: ""+faker.datatype.number({min: 1001, max: 7000}),
       creditos: faker.datatype.number({min: 1, max: 10}),
       departamento: "ISIS",
       es_epsilon: false,
       es_tipo_e: false})
       cursosList.push(curso);
   }
 }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CursoService],
    }).compile();

    service = module.get<CursoService>(CursoService);
    repository = module.get<Repository<CursoEntity>>(getRepositoryToken(CursoEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('findAll should return all cursos', async () => {
    const cursos: CursoEntity[] = await service.findAll(null);
    expect(cursos).not.toBeNull();
    expect(cursos).toHaveLength(cursosList.length);
  });
  
  it('findOne should return a curso by id', async () => {
    const storedCurso: CursoEntity =cursosList[0];
    const curso: CursoEntity = await service.findOne(storedCurso.id);
    expect(curso).not.toBeNull();
    expect(curso.nombre).toEqual(storedCurso.nombre)
    expect(curso.creditos).toEqual(storedCurso.creditos)
    expect(curso.sigla).toEqual(storedCurso.sigla)
    expect(curso.codigo).toEqual(storedCurso.codigo)
  });
  
  it('findOne should throw an exception for an invalid curso', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", 'No se encontro el curso con el id dado')
  });
  
  it('create should return a new curso', async () => {
    const curso: CursoEntity = {
      id: "",
      nombre: "Curso X",
      sigla: "MINE",
      codigo: ""+faker.datatype.number({min: 1001, max: 7000}),
      creditos: faker.datatype.number({min: 1, max: 10}),
      es_epsilon: false,
      es_tipo_e: false,
      departamento: "ISIS",
      terminos: null
    }
  
    const newCurso: CursoEntity = await service.create(curso);
    expect(newCurso).not.toBeNull();
  
    const storedCurso: CursoEntity = await repository.findOne({where: {id: newCurso.id}})
    expect(storedCurso).not.toBeNull();
    expect(storedCurso.nombre).toEqual(newCurso.nombre)
    expect(storedCurso.creditos).toEqual(newCurso.creditos)
    expect(newCurso.sigla).toEqual(storedCurso.sigla)
    expect(newCurso.codigo).toEqual(storedCurso.codigo)
  });

  it('create curso without precondition should return error', async () => {
    const curso: CursoEntity = {
      id: "",
      nombre: "Curso X",
      sigla: "MINE",
      codigo: ""+12,
      creditos: faker.datatype.number({min: 1, max: 10}),
      es_epsilon: false,
      es_tipo_e: false,
      departamento: "ISIS",
      terminos: null
    }
    await expect(() => service.create(curso)).rejects.toHaveProperty("message", 'El codigo del curso debe ser un numero de cuatro digitos o cuatro dígitos con una letra')
  });
  
  it('update should modify a curso', async () => {
    const curso: CursoEntity = cursosList[0];
    curso.nombre = "New name";
    curso.sigla = "MISW";
    const updatedCurso: CursoEntity = await service.update(curso.id, curso);
    expect(updatedCurso).not.toBeNull();
    const storedCurso: CursoEntity = await repository.findOne({ where: { id: curso.id } })
    expect(storedCurso).not.toBeNull();
    expect(storedCurso.nombre).toEqual(curso.nombre)
    expect(curso.sigla).toEqual(storedCurso.sigla)
  });
  
  it('update should throw an exception for an invalid curso', async () => {
    let curso: CursoEntity = cursosList[0];
    curso = {
      ...curso, nombre: "New name", sigla: "MISW"
    }
    await expect(() => service.update("0", curso)).rejects.toHaveProperty("message", 'No se encontro el curso con el id dado')
  });
  
  it('delete should remove a product', async () => {
    const curso: CursoEntity = cursosList[0];
    await service.delete(curso.id);
     const deletedCurso: CursoEntity = await repository.findOne({ where: { id: curso.id } })
    expect(deletedCurso).toBeNull();
  });
  
  it('delete should throw an exception for an invalid product', async () => {
    const curso: CursoEntity = cursosList[0];
    await service.delete(curso.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", 'No se encontro el curso con el id dado')
  });


});