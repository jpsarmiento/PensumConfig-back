import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgramaRequisitoService } from './programa-requisito.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ProgramaEntity } from '../programa/programa.entity';
import { RequisitoEntity } from '../requisito/requisito.entity';
import { faker } from '@faker-js/faker';

describe('ProgramaRequisitoService', () => {
  let service: ProgramaRequisitoService;
  let programaRepository: Repository<ProgramaEntity>;
  let requisitoRepository: Repository<RequisitoEntity>;
  let programa: ProgramaEntity;
  let requisitosList : RequisitoEntity[];

  const seedDatabase = async () => {
    requisitoRepository.clear();
    programaRepository.clear();
 
    requisitosList = [];
    for(let i = 0; i < 5; i++){
      const requisito: RequisitoEntity = await requisitoRepository.save({
        nombre: "Tipo Epsilon",
        descripcion: "desc"})
        requisitosList.push(requisito);
  }

    programa = await programaRepository.save({
    nombre: "Programa nombre",
    tipo: "Pregrado",
    min_gpa: faker.datatype.number({min: 1, max: 5}),
    requisitos: requisitosList});
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProgramaRequisitoService],
    }).compile();

    service = module.get<ProgramaRequisitoService>(ProgramaRequisitoService);
    programaRepository = module.get<Repository<ProgramaEntity>>(getRepositoryToken(ProgramaEntity));
    requisitoRepository = module.get<Repository<RequisitoEntity>>(getRepositoryToken(RequisitoEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addRequisitoPrograma should add a requisito to a programa', async () => {
    const newRequisito: RequisitoEntity = await requisitoRepository.save({
      nombre: "Tipo Epsilon",
      descripcion: "desc"});

    const newPrograma: ProgramaEntity = await programaRepository.save({
      nombre: "Programa nombre",
      tipo: "Pregrado",
      min_gpa: faker.datatype.number({min: 1, max: 5})});

   const result: ProgramaEntity = await service.addRequisitoToPrograma(newPrograma.id, newRequisito.id);
   expect(result.requisitos.length).toBe(1);
   expect(result.requisitos[0]).not.toBeNull();
   expect(result.requisitos[0].nombre).toBe(newRequisito.nombre)
   expect(result.requisitos[0].descripcion).toBe(newRequisito.descripcion)
  });

  it('addRequisitoPrograma should thrown exception for an invalid requisito', async () => {
    const newPrograma: ProgramaEntity = await programaRepository.save({
      nombre: "Programa X",
      tipo: "Pregrado",
      min_gpa: faker.datatype.number({min: 1, max: 5})});
 
    await expect(() => service.addRequisitoToPrograma(newPrograma.id, "0")).rejects.toHaveProperty("message", 'No se encontro el requisito con el id dado');
  });

  it('addRequisitoPrograma should throw an exception for an invalid programa', async () => {
    const newRequisito: RequisitoEntity = await requisitoRepository.save({
      nombre: "Tipo E",
      descripcion: "desc"});
 
    await expect(() => service.addRequisitoToPrograma("0", newRequisito.id)).rejects.toHaveProperty("message", 'No se encontro el programa con el id dado');
  });

  it('findRequisitoByProgramaIdRequisitoId should return requisito by programa', async () => {
    const requisito: RequisitoEntity = requisitosList[0];
    const storedRequisito: RequisitoEntity = await service.findRequisitoByProgramaIdRequisitoId(programa.id, requisito.id, )
    expect(storedRequisito).not.toBeNull();
    expect(storedRequisito.nombre).toBe(requisito.nombre);
    expect(storedRequisito.descripcion).toBe(requisito.descripcion);
  });

  it('findRequisitoByProgramaIdRequisitoId should throw an exception for an invalid requisito', async () => {
    await expect(()=> service.findRequisitoByProgramaIdRequisitoId(programa.id, "0")).rejects.toHaveProperty("message", 'No se encontro el requisito con el id dado');
  });

  it('findRequisitoByProgramaIdRequisitoId should throw an exception for an invalid programa', async () => {
    const requisito: RequisitoEntity = requisitosList[0];
    await expect(()=> service.findRequisitoByProgramaIdRequisitoId("0", requisito.id)).rejects.toHaveProperty("message", 'No se encontro el programa con el id dado');
  });

  it('findRequisitoByProgramaIdRequisitoId should throw an exception for a requisito not associated to a programa', async () => {
    const newRequisito: RequisitoEntity = await requisitoRepository.save({
      nombre: "Tipo E",
      descripcion: "desc"});
 
    await expect(()=> service.findRequisitoByProgramaIdRequisitoId(programa.id, newRequisito.id)).rejects.toHaveProperty("message", 'El requisito con el id dado no esta asociado al programa');
  });

  it('findRequisitosByProgramaId should return requisitos by programa', async ()=>{
    const requisitos: RequisitoEntity[] = await service.findRequisitosByProgramaId(programa.id);
    expect(requisitos.length).toBe(5)
  });

  it('findRequisitosByProgramaId should throw an exception for an invalid programa', async () => {
    await expect(()=> service.findRequisitosByProgramaId("0")).rejects.toHaveProperty("message", 'No se encontro el programa con el id dado');
  });

  it('associateRequisitosPrograma should update requisitos list for a programa', async () => {
    const newRequisito: RequisitoEntity = await requisitoRepository.save({
      nombre: "Saber Pro",
      descripcion: "desc"});
 
    const updatedPrograma: ProgramaEntity = await service.associateRequisitosPrograma(programa.id, [newRequisito]);
    expect(updatedPrograma.requisitos.length).toBe(1);
    expect(updatedPrograma.requisitos[0].nombre).toBe(newRequisito.nombre);
    expect(updatedPrograma.requisitos[0].descripcion).toBe(newRequisito.descripcion);
  });

  it('associateRequisitosPrograma should throw an exception for an invalid programa', async () => {
    const newRequisito: RequisitoEntity = await requisitoRepository.save({
      nombre: "Saber Pro",
      descripcion: "desc"});
 
    await expect(()=> service.associateRequisitosPrograma("0", [newRequisito])).rejects.toHaveProperty("message", 'No se encontro el programa con el id dado');
  });

  it('associateRequisitosPrograma should throw an exception for an invalid requisito', async () => {
    const newRequisito: RequisitoEntity = requisitosList[0];
    newRequisito.id = "0";
 
    await expect(()=> service.associateRequisitosPrograma(programa.id, [newRequisito])).rejects.toHaveProperty("message", 'No se encontro el requisito con el id dado');
  });

  it('deleteRequisitoToPrograma should remove a requisito from a programa', async () => {
    const requisito: RequisitoEntity = requisitosList[0];
   
    await service.deleteRequisitoPrograma(programa.id, requisito.id);
 
    const storedPrograma: ProgramaEntity = await programaRepository.findOne({where: {id: programa.id}, relations: ["requisitos"]});
    const deletedRequisito: RequisitoEntity = storedPrograma.requisitos.find(a => a.id === requisito.id);
 
    expect(deletedRequisito).toBeUndefined();
  });

  it('deleteRequisitoToPrograma should thrown an exception for an invalid requisito', async () => {
    await expect(()=> service.deleteRequisitoPrograma(programa.id, "0")).rejects.toHaveProperty("message", 'No se encontro el requisito con el id dado');
  });

  it('deleteRequisitoToPrograma should thrown an exception for an invalid programa', async () => {
    const requisito: RequisitoEntity = requisitosList[0];
    await expect(()=> service.deleteRequisitoPrograma("0", requisito.id)).rejects.toHaveProperty("message", 'No se encontro el programa con el id dado');
  });

  it('deleteRequisitoToPrograma should thrown an exception for a non asocciated requisito', async () => {
    const newRequisito: RequisitoEntity = await requisitoRepository.save({
      nombre: "Saber Pro",
      descripcion: "desc"});
 
    await expect(()=> service.deleteRequisitoPrograma(programa.id, newRequisito.id)).rejects.toHaveProperty("message", 'El requisito con el id dado no esta asociado al programa');
  });
});
