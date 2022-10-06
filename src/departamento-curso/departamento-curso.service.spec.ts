import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DepartamentoCursoService } from './departamento-curso.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { DepartamentoEntity } from '../departamento/departamento.entity';
import { CursoEntity } from '../curso/curso.entity';
import { faker } from '@faker-js/faker';

describe('DepartamentoCursoService', () => {
  let service: DepartamentoCursoService;
  let departamentoRepository: Repository<DepartamentoEntity>;
  let cursoRepository: Repository<CursoEntity>;
  let departamento: DepartamentoEntity;
  let cursosList : CursoEntity[];

  const seedDatabase = async () => {
    cursoRepository.clear();
    departamentoRepository.clear();
 
    cursosList = [];
    for(let i = 0; i < 5; i++){
      const curso: CursoEntity = await cursoRepository.save({
       nombre: "Curso nombre",
       sigla: "ISIS",
       codigo: faker.datatype.number({min: 1001, max: 9999}),
       creditos: faker.datatype.number({min: 1, max: 10}),
       es_epsilon: false,
       es_tipo_e: false})
        cursosList.push(curso);
  }

    departamento = await departamentoRepository.save({
    nombre: "Departamento nombre",
    cursos: cursosList});
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [DepartamentoCursoService],
    }).compile();

    service = module.get<DepartamentoCursoService>(DepartamentoCursoService);
    departamentoRepository = module.get<Repository<DepartamentoEntity>>(getRepositoryToken(DepartamentoEntity));
    cursoRepository = module.get<Repository<CursoEntity>>(getRepositoryToken(CursoEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addCursoDepartamento should add a curso to a departamento', async () => {
    const newCurso: CursoEntity = await cursoRepository.save({
      nombre: "Curso nombre",
       sigla: "MINE",
       codigo: faker.datatype.number({min: 1001, max: 9999}),
       creditos: faker.datatype.number({min: 1, max: 10}),
       es_epsilon: false,
       es_tipo_e: false})

    const newDepartamento: DepartamentoEntity = await departamentoRepository.save({
      nombre: "Departamento nombre"});

   const result: DepartamentoEntity = await service.addCursoToDepartamento(newDepartamento.id, newCurso.id);
   expect(result.cursos.length).toBe(1);
   expect(result.cursos[0]).not.toBeNull();
   expect(result.cursos[0].nombre).toBe(newCurso.nombre)
   expect(result.cursos[0].creditos).toBe(newCurso.creditos)
   expect(result.cursos[0].codigo).toBe(newCurso.codigo)
   expect(result.cursos[0].sigla).toBe(newCurso.sigla)
  });

  it('addCursoDepartamento should thrown exception for an invalid curso', async () => {
    const newDepartamento: DepartamentoEntity = await departamentoRepository.save({
      nombre: "Departamento X"});
 
    await expect(() => service.addCursoToDepartamento(newDepartamento.id, "0")).rejects.toHaveProperty("message", 'No se encontro el curso con el id dado');
  });

  it('addCursoDepartamento should throw an exception for an invalid departamento', async () => {
    const newCurso: CursoEntity = await cursoRepository.save({
      nombre: "Curso nombre",
       sigla: "ISIS",
       codigo: faker.datatype.number({min: 1001, max: 9999}),
       creditos: faker.datatype.number({min: 1, max: 10}),
       es_epsilon: false,
       es_tipo_e: false})
 
    await expect(() => service.addCursoToDepartamento("0", newCurso.id)).rejects.toHaveProperty("message", 'No se encontro el departamento con el id dado');
  });

  it('findCursoByDepartamentoIdCursoId should return curso by departamento', async () => {
    const curso: CursoEntity = cursosList[0];
    const storedCurso: CursoEntity = await service.findCursoByDepartamentoIdCursoId(departamento.id, curso.id, )
    expect(storedCurso).not.toBeNull();
    expect(storedCurso.nombre).toBe(curso.nombre);
    expect(storedCurso.codigo).toBe(curso.codigo);
    expect(storedCurso.creditos).toBe(curso.creditos);
    expect(storedCurso.sigla).toBe(curso.sigla);
  });

  it('findCursoByDepartamentoIdCursoId should throw an exception for an invalid curso', async () => {
    await expect(()=> service.findCursoByDepartamentoIdCursoId(departamento.id, "0")).rejects.toHaveProperty("message", 'No se encontro el curso con el id dado');
  });

  it('findCursoByDepartamentoIdCursoId should throw an exception for an invalid departamento', async () => {
    const curso: CursoEntity = cursosList[0];
    await expect(()=> service.findCursoByDepartamentoIdCursoId("0", curso.id)).rejects.toHaveProperty("message", 'No se encontro el departamento con el id dado');
  });

  it('findCursoByDepartamentoIdCursoId should throw an exception for a curso not associated to a departamento', async () => {
    const newCurso: CursoEntity = await cursoRepository.save({
       nombre: "Curso nombre",
       sigla: "ISIS",
       codigo: faker.datatype.number({min: 1001, max: 9999}),
       creditos: faker.datatype.number({min: 1, max: 10}),
       es_epsilon: false,
       es_tipo_e: false})
 
    await expect(()=> service.findCursoByDepartamentoIdCursoId(departamento.id, newCurso.id)).rejects.toHaveProperty("message", 'El curso con el id dado no esta asociado al departamento');
  });

  it('findCursosByDepartamentoId should return cursos by departamento', async ()=>{
    const cursos: CursoEntity[] = await service.findCursosByDepartamentoId(departamento.id);
    expect(cursos.length).toBe(5)
  });

  it('findCursosByDepartamentoId should throw an exception for an invalid departamento', async () => {
    await expect(()=> service.findCursosByDepartamentoId("0")).rejects.toHaveProperty("message", 'No se encontro el departamento con el id dado');
  });

  it('associateCursosDepartamento should update cursos list for a departamento', async () => {
    const newCurso: CursoEntity = await cursoRepository.save({
      nombre: "Curso nombre",
       sigla: "MISW",
       codigo: faker.datatype.number({min: 1001, max: 9999}),
       creditos: faker.datatype.number({min: 1, max: 10}),
       es_epsilon: false,
       es_tipo_e: false})
 
    const updatedDepartamento: DepartamentoEntity = await service.associateCursosDepartamento(departamento.id, [newCurso]);
    expect(updatedDepartamento.cursos.length).toBe(1);
    expect(updatedDepartamento.cursos[0].nombre).toBe(newCurso.nombre);
    expect(updatedDepartamento.cursos[0].creditos).toBe(newCurso.creditos);
    expect(updatedDepartamento.cursos[0].codigo).toBe(newCurso.codigo);
    expect(updatedDepartamento.cursos[0].sigla).toBe(newCurso.sigla);
  });

  it('associateCursosDepartamento should throw an exception for an invalid departamento', async () => {
    const newCurso: CursoEntity = await cursoRepository.save({
      nombre: "Curso nombre",
       sigla: "ISIS",
       codigo: faker.datatype.number({min: 1001, max: 9999}),
       creditos: faker.datatype.number({min: 1, max: 10}),
       es_epsilon: false,
       es_tipo_e: false})
 
 
    await expect(()=> service.associateCursosDepartamento("0", [newCurso])).rejects.toHaveProperty("message", 'No se encontro el departamento con el id dado');
  });

  it('associateCursosDepartamento should throw an exception for an invalid curso', async () => {
    const newCurso: CursoEntity = cursosList[0];
    newCurso.id = "0";
 
    await expect(()=> service.associateCursosDepartamento(departamento.id, [newCurso])).rejects.toHaveProperty("message", 'No se encontro el curso con el id dado');
  });

  it('deleteCursoToDepartamento should remove a curso from a departamento', async () => {
    const curso: CursoEntity = cursosList[0];
   
    await service.deleteCursoDepartamento(departamento.id, curso.id);
 
    const storedDepartamento: DepartamentoEntity = await departamentoRepository.findOne({where: {id: departamento.id}, relations: ["cursos"]});
    const deletedCurso: CursoEntity = storedDepartamento.cursos.find(a => a.id === curso.id);
 
    expect(deletedCurso).toBeUndefined();
  });

  it('deleteCursoToDepartamento should thrown an exception for an invalid curso', async () => {
    await expect(()=> service.deleteCursoDepartamento(departamento.id, "0")).rejects.toHaveProperty("message", 'No se encontro el curso con el id dado');
  });

  it('deleteCursoToDepartamento should thrown an exception for an invalid departamento', async () => {
    const curso: CursoEntity = cursosList[0];
    await expect(()=> service.deleteCursoDepartamento("0", curso.id)).rejects.toHaveProperty("message", 'No se encontro el departamento con el id dado');
  });

  it('deleteCursoToDepartamento should thrown an exception for a non asocciated curso', async () => {
    const newCurso: CursoEntity = await cursoRepository.save({
      nombre: "Curso nombre",
       sigla: "ISIS",
       codigo: faker.datatype.number({min: 1001, max: 9999}),
       creditos: faker.datatype.number({min: 1, max: 10}),
       es_epsilon: false,
       es_tipo_e: false})
 
    await expect(()=> service.deleteCursoDepartamento(departamento.id, newCurso.id)).rejects.toHaveProperty("message", 'El curso con el id dado no esta asociado al departamento');
  });
});
