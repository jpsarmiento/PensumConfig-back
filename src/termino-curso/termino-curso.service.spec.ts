/* eslint-disable */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TerminoCursoService } from './termino-curso.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { TerminoEntity } from '../termino/termino.entity';
import { CursoEntity } from '../curso/curso.entity';
import { faker } from '@faker-js/faker';

describe('TerminoCursoService', () => {
  let service: TerminoCursoService;
  let terminoRepository: Repository<TerminoEntity>;
  let cursoRepository: Repository<CursoEntity>;
  let termino: TerminoEntity;
  let cursosList : CursoEntity[];

  const seedDatabase = async () => {
    cursoRepository.clear();
    terminoRepository.clear();
 
    cursosList = [];
    for(let i = 0; i < 5; i++){
      const curso: CursoEntity = await cursoRepository.save({
       nombre: "Curso nombre",
       sigla: "ISIS",
       codigo: ""+faker.datatype.number({min: 1001, max: 7000}),
       departamento:"ISIS",
       creditos: faker.datatype.number({min: 1, max: 10}),
       es_epsilon: false,
       es_tipo_e: false})
        cursosList.push(curso);
  }

    termino = await terminoRepository.save({
    cursos: cursosList});
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [TerminoCursoService],
    }).compile();

    service = module.get<TerminoCursoService>(TerminoCursoService);
    terminoRepository = module.get<Repository<TerminoEntity>>(getRepositoryToken(TerminoEntity));
    cursoRepository = module.get<Repository<CursoEntity>>(getRepositoryToken(CursoEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addCursoTermino should add a curso to a termino', async () => {
    const newCurso: CursoEntity = await cursoRepository.save({
      nombre: "Curso nombre",
       sigla: "MINE",
       codigo: ""+faker.datatype.number({min: 1001, max: 7000}),
       creditos: faker.datatype.number({min: 1, max: 10}),
       departamento: "ISIS",
       es_epsilon: false,
       es_tipo_e: false})

    const newTermino: TerminoEntity = await terminoRepository.save({});

   const result: TerminoEntity = await service.addCursoToTermino(newTermino.id, newCurso.id);
   expect(result.cursos.length).toBe(1);
   expect(result.cursos[0]).not.toBeNull();
   expect(result.cursos[0].nombre).toBe(newCurso.nombre)
   expect(result.cursos[0].creditos).toBe(newCurso.creditos)
   expect(result.cursos[0].codigo).toBe(newCurso.codigo)
   expect(result.cursos[0].sigla).toBe(newCurso.sigla)
  });

  it('addCursoTermino should thrown exception for an invalid curso', async () => {
    const newTermino: TerminoEntity = await terminoRepository.save({});
 
    await expect(() => service.addCursoToTermino(newTermino.id, "0")).rejects.toHaveProperty("message", 'No se encontro el curso con el id dado');
  });

  it('addCursoTermino should throw an exception for an invalid termino', async () => {
    const newCurso: CursoEntity = await cursoRepository.save({
      nombre: "Curso nombre",
       sigla: "ISIS",
       codigo: ""+faker.datatype.number({min: 1001, max: 7000}),
       creditos: faker.datatype.number({min: 1, max: 10}),
       departamento: "ISIS",
       es_epsilon: false,
       es_tipo_e: false})
 
    await expect(() => service.addCursoToTermino("0", newCurso.id)).rejects.toHaveProperty("message", 'No se encontro el termino con el id dado');
  });

  it('findCursoByTerminoIdCursoId should return curso by termino', async () => {
    const curso: CursoEntity = cursosList[0];
    const storedCurso: CursoEntity = await service.findCursoByTerminoIdCursoId(termino.id, curso.id, )
    expect(storedCurso).not.toBeNull();
    expect(storedCurso.nombre).toBe(curso.nombre);
    expect(storedCurso.codigo).toBe(curso.codigo);
    expect(storedCurso.creditos).toBe(curso.creditos);
    expect(storedCurso.sigla).toBe(curso.sigla);
  });

  it('findCursoByTerminoIdCursoId should throw an exception for an invalid curso', async () => {
    await expect(()=> service.findCursoByTerminoIdCursoId(termino.id, "0")).rejects.toHaveProperty("message", 'No se encontro el curso con el id dado');
  });

  it('findCursoByTerminoIdCursoId should throw an exception for an invalid termino', async () => {
    const curso: CursoEntity = cursosList[0];
    await expect(()=> service.findCursoByTerminoIdCursoId("0", curso.id)).rejects.toHaveProperty("message", 'No se encontro el termino con el id dado');
  });

  it('findCursoByTerminoIdCursoId should throw an exception for a curso not associated to a termino', async () => {
    const newCurso: CursoEntity = await cursoRepository.save({
       nombre: "Curso nombre",
       sigla: "ISIS",
       codigo: ""+faker.datatype.number({min: 1001, max: 9999}),
       creditos: faker.datatype.number({min: 1, max: 10}),
       departamento: "ISIS",
       es_epsilon: false,
       es_tipo_e: false})
 
    await expect(()=> service.findCursoByTerminoIdCursoId(termino.id, newCurso.id)).rejects.toHaveProperty("message", 'El curso con el id dado no esta asociado al termino');
  });

  it('findCursosByTerminoId should return cursos by termino', async ()=>{
    const cursos: CursoEntity[] = await service.findCursosByTerminoId(termino.id);
    expect(cursos.length).toBe(5)
  });

  it('findCursosByTerminoId should throw an exception for an invalid termino', async () => {
    await expect(()=> service.findCursosByTerminoId("0")).rejects.toHaveProperty("message", 'No se encontro el termino con el id dado');
  });

  it('associateCursosTermino should update cursos list for a termino', async () => {
    const newCurso: CursoEntity = await cursoRepository.save({
      nombre: "Curso nombre",
       sigla: "MISW",
       codigo: ""+faker.datatype.number({min: 1001, max: 7000}),
       creditos: faker.datatype.number({min: 1, max: 10}),
       departamento: "ISIS",
       es_epsilon: false,
       es_tipo_e: false})
 
    const updatedTermino: TerminoEntity = await service.associateCursosTermino(termino.id, [newCurso]);
    expect(updatedTermino.cursos.length).toBe(1);
    expect(updatedTermino.cursos[0].nombre).toBe(newCurso.nombre);
    expect(updatedTermino.cursos[0].creditos).toBe(newCurso.creditos);
    expect(updatedTermino.cursos[0].codigo).toBe(newCurso.codigo);
    expect(updatedTermino.cursos[0].sigla).toBe(newCurso.sigla);
  });

  it('associateCursosTermino should throw an exception for an invalid termino', async () => {
    const newCurso: CursoEntity = await cursoRepository.save({
      nombre: "Curso nombre",
       sigla: "ISIS",
       codigo: ""+faker.datatype.number({min: 1001, max: 7000}),
       creditos: faker.datatype.number({min: 1, max: 10}),
       departamento: "ISIS",
       es_epsilon: false,
       es_tipo_e: false})
 
 
    await expect(()=> service.associateCursosTermino("0", [newCurso])).rejects.toHaveProperty("message", 'No se encontro el termino con el id dado');
  });

  it('associateCursosTermino should throw an exception for an invalid curso', async () => {
    const newCurso: CursoEntity = cursosList[0];
    newCurso.id = "0";
 
    await expect(()=> service.associateCursosTermino(termino.id, [newCurso])).rejects.toHaveProperty("message", 'No se encontro el curso con el id dado');
  });

  it('deleteCursoToTermino should remove a curso from a termino', async () => {
    const curso: CursoEntity = cursosList[0];
   
    await service.deleteCursoTermino(termino.id, curso.id);
 
    const storedTermino: TerminoEntity = await terminoRepository.findOne({where: {id: termino.id}, relations: ["cursos"]});
    const deletedCurso: CursoEntity = storedTermino.cursos.find(a => a.id === curso.id);
 
    expect(deletedCurso).toBeUndefined();
  });

  it('deleteCursoToTermino should thrown an exception for an invalid curso', async () => {
    await expect(()=> service.deleteCursoTermino(termino.id, "0")).rejects.toHaveProperty("message", 'No se encontro el curso con el id dado');
  });

  it('deleteCursoToTermino should thrown an exception for an invalid termino', async () => {
    const curso: CursoEntity = cursosList[0];
    await expect(()=> service.deleteCursoTermino("0", curso.id)).rejects.toHaveProperty("message", 'No se encontro el termino con el id dado');
  });

  it('deleteCursoToTermino should thrown an exception for a non asocciated curso', async () => {
    const newCurso: CursoEntity = await cursoRepository.save({
      nombre: "Curso nombre",
       sigla: "ISIS",
       codigo: ""+faker.datatype.number({min: 1001, max: 9999}),
       creditos: faker.datatype.number({min: 1, max: 10}),
       departamento: "ISIS",
       es_epsilon: false,
       es_tipo_e: false})
 
    await expect(()=> service.deleteCursoTermino(termino.id, newCurso.id)).rejects.toHaveProperty("message", 'El curso con el id dado no esta asociado al termino');
  });
});
