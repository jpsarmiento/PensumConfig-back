/* eslint-disable */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReglaExamenService } from './regla-examen.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ReglaEntity } from '../regla/regla.entity';
import { ExamenEntity } from '../examen/examen.entity';
import { faker } from '@faker-js/faker';

describe('ReglaExamenService', () => {
  let service: ReglaExamenService;
  let reglaRepository: Repository<ReglaEntity>;
  let examenRepository: Repository<ExamenEntity>;
  let regla: ReglaEntity;
  let examenesList : ExamenEntity[];

  const seedDatabase = async () => {
    examenRepository.clear();
    reglaRepository.clear();
 
    examenesList = [];
    for(let i = 0; i < 5; i++){
      const examen: ExamenEntity = await examenRepository.save({
        nombre: "Examen nombre",
        min_nota: faker.datatype.number({min: 1, max: 5})})
        examenesList.push(examen);
  }

    regla = await reglaRepository.save({
      nombre: "Regla nombre",
      semestre_inicio: 201802,
      semestre_vigencia: 203001,
      creditos: faker.datatype.number({min: 1, max: 5}),
      examenes: examenesList});
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ReglaExamenService],
    }).compile();

    service = module.get<ReglaExamenService>(ReglaExamenService);
    reglaRepository = module.get<Repository<ReglaEntity>>(getRepositoryToken(ReglaEntity));
    examenRepository = module.get<Repository<ExamenEntity>>(getRepositoryToken(ExamenEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addExamenRegla should add a examen to a regla', async () => {
    const newExamen: ExamenEntity = await examenRepository.save({
      nombre: "Examen nombre",
      min_nota: faker.datatype.number({min: 1, max: 5})})

    const newRegla: ReglaEntity = await reglaRepository.save({
      nombre: "Regla nombre",
      tipo: "Pregrado",
      semestre_inicio: 201502,
      semestre_vigencia: 203001,
      creditos: faker.datatype.number({min: 1, max: 5})});

   const result: ReglaEntity = await service.addExamenToRegla(newRegla.id, newExamen.id);
   expect(result.examenes.length).toBe(1);
   expect(result.examenes[0]).not.toBeNull();
   expect(result.examenes[0].nombre).toBe(newExamen.nombre)
   expect(result.examenes[0].min_nota).toBe(newExamen.min_nota)
  });

  it('addExamenRegla should thrown exception for an invalid examen', async () => {
    const newRegla: ReglaEntity = await reglaRepository.save({
      nombre: "Regla X",
      semestre_inicio: 201802,
      semestre_vigencia: 203001,
      creditos: faker.datatype.number({min: 1, max: 5})})
 
    await expect(() => service.addExamenToRegla(newRegla.id, "0")).rejects.toHaveProperty("message", 'No se encontro el examen con el id dado');
  });

  it('addExamenRegla should throw an exception for an invalid regla', async () => {
    const newExamen: ExamenEntity = await examenRepository.save({
      nombre: "Examen X",
      min_nota: faker.datatype.number({min: 1, max: 5})})
 
    await expect(() => service.addExamenToRegla("0", newExamen.id)).rejects.toHaveProperty("message", 'No se encontro la regla con el id dado');
  });

  it('findExamenByReglaIdExamenId should return examen by regla', async () => {
    const examen: ExamenEntity = examenesList[0];
    const storedExamen: ExamenEntity = await service.findExamenByReglaIdExamenId(regla.id, examen.id, )
    expect(storedExamen).not.toBeNull();
    expect(storedExamen.nombre).toBe(examen.nombre);
    expect(storedExamen.min_nota).toBe(examen.min_nota);
  });

  it('findExamenByReglaIdExamenId should throw an exception for an invalid examen', async () => {
    await expect(()=> service.findExamenByReglaIdExamenId(regla.id, "0")).rejects.toHaveProperty("message", 'No se encontro el examen con el id dado');
  });

  it('findExamenByReglaIdExamenId should throw an exception for an invalid regla', async () => {
    const examen: ExamenEntity = examenesList[0];
    await expect(()=> service.findExamenByReglaIdExamenId("0", examen.id)).rejects.toHaveProperty("message", 'No se encontro la regla con el id dado');
  });

  it('findExamenByReglaIdExamenId should throw an exception for a examen not associated to a regla', async () => {
    const newExamen: ExamenEntity = await examenRepository.save({
      nombre: "Examen nombre",
      min_nota: faker.datatype.number({min: 1, max: 5})})
 
    await expect(()=> service.findExamenByReglaIdExamenId(regla.id, newExamen.id)).rejects.toHaveProperty("message", 'El examen con el id dado no esta asociado a la regla');
  });

  it('findExamensByReglaId should return examenes by regla', async ()=>{
    const examenes: ExamenEntity[] = await service.findExamenesByReglaId(regla.id);
    expect(examenes.length).toBe(5)
  });

  it('findExamensByReglaId should throw an exception for an invalid regla', async () => {
    await expect(()=> service.findExamenesByReglaId("0")).rejects.toHaveProperty("message", 'No se encontro la regla con el id dado');
  });

  it('associateExamensRegla should update examenes list for a regla', async () => {
    const newExamen: ExamenEntity = await examenRepository.save({
      nombre: "Examen nombre",
      min_nota: faker.datatype.number({min: 1, max: 5})})
 
    const updatedRegla: ReglaEntity = await service.associateExamenesRegla(regla.id, [newExamen]);
    expect(updatedRegla.examenes.length).toBe(1);
    expect(updatedRegla.examenes[0].nombre).toBe(newExamen.nombre);
    expect(updatedRegla.examenes[0].min_nota).toBe(newExamen.min_nota);
  });

  it('associateExamensRegla should throw an exception for an invalid regla', async () => {
    const newExamen: ExamenEntity = await examenRepository.save({
      nombre: "Examen nombre",
      min_nota: faker.datatype.number({min: 1, max: 5})})
 
    await expect(()=> service.associateExamenesRegla("0", [newExamen])).rejects.toHaveProperty("message", 'No se encontro la regla con el id dado');
  });

  it('associateExamensRegla should throw an exception for an invalid examen', async () => {
    const newExamen: ExamenEntity = examenesList[0];
    newExamen.id = "0";
 
    await expect(()=> service.associateExamenesRegla(regla.id, [newExamen])).rejects.toHaveProperty("message", 'No se encontro el examen con el id dado');
  });

  it('deleteExamenToRegla should remove a examen from a regla', async () => {
    const examen: ExamenEntity = examenesList[0];
   
    await service.deleteExamenRegla(regla.id, examen.id);
 
    const storedRegla: ReglaEntity = await reglaRepository.findOne({where: {id: regla.id}, relations: ["examenes"]});
    const deletedExamen: ExamenEntity = storedRegla.examenes.find(a => a.id === examen.id);
 
    expect(deletedExamen).toBeUndefined();
  });

  it('deleteExamenToRegla should thrown an exception for an invalid examen', async () => {
    await expect(()=> service.deleteExamenRegla(regla.id, "0")).rejects.toHaveProperty("message", 'No se encontro el examen con el id dado');
  });

  it('deleteExamenToRegla should thrown an exception for an invalid regla', async () => {
    const examen: ExamenEntity = examenesList[0];
    await expect(()=> service.deleteExamenRegla("0", examen.id)).rejects.toHaveProperty("message", 'No se encontro la regla con el id dado');
  });

  it('deleteExamenToRegla should thrown an exception for a non asocciated examen', async () => {
    const newExamen: ExamenEntity = await examenRepository.save({
      nombre: "Examen nombre",
      min_nota: faker.datatype.number({min: 1, max: 5})})
 
    await expect(()=> service.deleteExamenRegla(regla.id, newExamen.id)).rejects.toHaveProperty("message", 'El examen con el id dado no esta asociado a la regla');
  });
});
