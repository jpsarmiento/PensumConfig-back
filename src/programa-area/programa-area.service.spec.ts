import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgramaAreaService } from './programa-area.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ProgramaEntity } from '../programa/programa.entity';
import { AreaEntity } from '../area/area.entity';
import { faker } from '@faker-js/faker';

describe('ProgramaAreaService', () => {
  let service: ProgramaAreaService;
  let programaRepository: Repository<ProgramaEntity>;
  let areaRepository: Repository<AreaEntity>;
  let programa: ProgramaEntity;
  let areasList : AreaEntity[];

  const seedDatabase = async () => {
    areaRepository.clear();
    programaRepository.clear();
 
    areasList = [];
    for(let i = 0; i < 5; i++){
      const area: AreaEntity = await areaRepository.save({
        nombre: "Area nombre",
        creditos: faker.datatype.number({min: 1, max: 10}),
        prioridad: "Alta"})
        areasList.push(area);
  }

    programa = await programaRepository.save({
    nombre: "Programa nombre",
    tipo: "Pregrado",
    min_gpa: faker.datatype.number({min: 1, max: 5}),
    areas: areasList});
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProgramaAreaService],
    }).compile();

    service = module.get<ProgramaAreaService>(ProgramaAreaService);
    programaRepository = module.get<Repository<ProgramaEntity>>(getRepositoryToken(ProgramaEntity));
    areaRepository = module.get<Repository<AreaEntity>>(getRepositoryToken(AreaEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addAreaPrograma should add a area to a programa', async () => {
    const newArea: AreaEntity = await areaRepository.save({
      nombre: "Area nombre",
      creditos: faker.datatype.number({min: 1, max: 10}),
      prioridad: "Alta"})

    const newPrograma: ProgramaEntity = await programaRepository.save({
      nombre: "Programa nombre",
      tipo: "Pregrado",
      min_gpa: faker.datatype.number({min: 1, max: 5})});

   const result: ProgramaEntity = await service.addAreaToPrograma(newPrograma.id, newArea.id);
   expect(result.areas.length).toBe(1);
   expect(result.areas[0]).not.toBeNull();
   expect(result.areas[0].nombre).toBe(newArea.nombre)
   expect(result.areas[0].creditos).toBe(newArea.creditos)
   expect(result.areas[0].prioridad).toBe(newArea.prioridad)
  });

  it('addAreaPrograma should thrown exception for an invalid area', async () => {
    const newPrograma: ProgramaEntity = await programaRepository.save({
      nombre: "Programa X",
      tipo: "Pregrado",
      min_gpa: faker.datatype.number({min: 1, max: 5})});
 
    await expect(() => service.addAreaToPrograma(newPrograma.id, "0")).rejects.toHaveProperty("message", 'No se encontro el area con el id dado');
  });

  it('addAreaPrograma should throw an exception for an invalid programa', async () => {
    const newArea: AreaEntity = await areaRepository.save({
      nombre: "Area nombre",
      creditos: faker.datatype.number({min: 1, max: 10}),
      prioridad: "Alta"})
 
    await expect(() => service.addAreaToPrograma("0", newArea.id)).rejects.toHaveProperty("message", 'No se encontro el programa con el id dado');
  });

  it('findAreaByProgramaIdAreaId should return area by programa', async () => {
    const area: AreaEntity = areasList[0];
    const storedArea: AreaEntity = await service.findAreaByProgramaIdAreaId(programa.id, area.id, )
    expect(storedArea).not.toBeNull();
    expect(storedArea.nombre).toBe(area.nombre);
    expect(storedArea.prioridad).toBe(area.prioridad);
    expect(storedArea.creditos).toBe(area.creditos);
  });

  it('findAreaByProgramaIdAreaId should throw an exception for an invalid area', async () => {
    await expect(()=> service.findAreaByProgramaIdAreaId(programa.id, "0")).rejects.toHaveProperty("message", 'No se encontro el area con el id dado');
  });

  it('findAreaByProgramaIdAreaId should throw an exception for an invalid programa', async () => {
    const area: AreaEntity = areasList[0];
    await expect(()=> service.findAreaByProgramaIdAreaId("0", area.id)).rejects.toHaveProperty("message", 'No se encontro el programa con el id dado');
  });

  it('findAreaByProgramaIdAreaId should throw an exception for a area not associated to a programa', async () => {
    const newArea: AreaEntity = await areaRepository.save({
      nombre: "Area nombre",
      creditos: faker.datatype.number({min: 1, max: 10}),
      prioridad: "Alta"})
 
    await expect(()=> service.findAreaByProgramaIdAreaId(programa.id, newArea.id)).rejects.toHaveProperty("message", 'El area con el id dado no esta asociado al programa');
  });

  it('findAreasByProgramaId should return areas by programa', async ()=>{
    const areas: AreaEntity[] = await service.findAreasByProgramaId(programa.id);
    expect(areas.length).toBe(5)
  });

  it('findAreasByProgramaId should throw an exception for an invalid programa', async () => {
    await expect(()=> service.findAreasByProgramaId("0")).rejects.toHaveProperty("message", 'No se encontro el programa con el id dado');
  });

  it('associateAreasPrograma should update areas list for a programa', async () => {
    const newArea: AreaEntity = await areaRepository.save({
      nombre: "Area nombre",
      creditos: faker.datatype.number({min: 1, max: 10}),
      prioridad: "Alta"})
 
    const updatedPrograma: ProgramaEntity = await service.associateAreasPrograma(programa.id, [newArea]);
    expect(updatedPrograma.areas.length).toBe(1);
    expect(updatedPrograma.areas[0].nombre).toBe(newArea.nombre);
    expect(updatedPrograma.areas[0].creditos).toBe(newArea.creditos);
    expect(updatedPrograma.areas[0].prioridad).toBe(newArea.prioridad);
  });

  it('associateAreasPrograma should throw an exception for an invalid programa', async () => {
    const newArea: AreaEntity = await areaRepository.save({
      nombre: "Area nombre",
      creditos: faker.datatype.number({min: 1, max: 10}),
      prioridad: "Alta"})
 
 
    await expect(()=> service.associateAreasPrograma("0", [newArea])).rejects.toHaveProperty("message", 'No se encontro el programa con el id dado');
  });

  it('associateAreasPrograma should throw an exception for an invalid area', async () => {
    const newArea: AreaEntity = areasList[0];
    newArea.id = "0";
 
    await expect(()=> service.associateAreasPrograma(programa.id, [newArea])).rejects.toHaveProperty("message", 'No se encontro el area con el id dado');
  });

  it('deleteAreaToPrograma should remove a area from a programa', async () => {
    const area: AreaEntity = areasList[0];
   
    await service.deleteAreaPrograma(programa.id, area.id);
 
    const storedPrograma: ProgramaEntity = await programaRepository.findOne({where: {id: programa.id}, relations: ["areas"]});
    const deletedArea: AreaEntity = storedPrograma.areas.find(a => a.id === area.id);
 
    expect(deletedArea).toBeUndefined();
  });

  it('deleteAreaToPrograma should thrown an exception for an invalid area', async () => {
    await expect(()=> service.deleteAreaPrograma(programa.id, "0")).rejects.toHaveProperty("message", 'No se encontro el area con el id dado');
  });

  it('deleteAreaToPrograma should thrown an exception for an invalid programa', async () => {
    const area: AreaEntity = areasList[0];
    await expect(()=> service.deleteAreaPrograma("0", area.id)).rejects.toHaveProperty("message", 'No se encontro el programa con el id dado');
  });

  it('deleteAreaToPrograma should thrown an exception for a non asocciated area', async () => {
    const newArea: AreaEntity = await areaRepository.save({
      nombre: "Area nombre",
      creditos: faker.datatype.number({min: 1, max: 10}),
      prioridad: "Alta"})
 
    await expect(()=> service.deleteAreaPrograma(programa.id, newArea.id)).rejects.toHaveProperty("message", 'El area con el id dado no esta asociado al programa');
  });
});
