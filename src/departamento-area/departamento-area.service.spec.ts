/* eslint-disable */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DepartamentoAreaService } from './departamento-area.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { DepartamentoEntity } from '../departamento/departamento.entity';
import { AreaEntity } from '../area/area.entity';
import { faker } from '@faker-js/faker';

describe('DepartamentoAreaService', () => {
  let service: DepartamentoAreaService;
  let departamentoRepository: Repository<DepartamentoEntity>;
  let areaRepository: Repository<AreaEntity>;
  let departamento: DepartamentoEntity;
  let areasList : AreaEntity[];

  const seedDatabase = async () => {
    areaRepository.clear();
    departamentoRepository.clear();
 
    areasList = [];
    for(let i = 0; i < 5; i++){
      const area: AreaEntity = await areaRepository.save({
        nombre: "Area nombre",
        creditos: faker.datatype.number({min: 1, max: 10}),
        prioridad: "Alta"})
        areasList.push(area);
  }

    departamento = await departamentoRepository.save({
    nombre: "Departamento nombre",
    areas: areasList});
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [DepartamentoAreaService],
    }).compile();

    service = module.get<DepartamentoAreaService>(DepartamentoAreaService);
    departamentoRepository = module.get<Repository<DepartamentoEntity>>(getRepositoryToken(DepartamentoEntity));
    areaRepository = module.get<Repository<AreaEntity>>(getRepositoryToken(AreaEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addAreaDepartamento should add a area to a departamento', async () => {
    const newArea: AreaEntity = await areaRepository.save({
      nombre: "Area nombre",
      creditos: faker.datatype.number({min: 1, max: 10}),
      prioridad: "Alta"})

    const newDepartamento: DepartamentoEntity = await departamentoRepository.save({
      nombre: "Departamento nombre"});

   const result: DepartamentoEntity = await service.addAreaToDepartamento(newDepartamento.id, newArea.id);
   expect(result.areas.length).toBe(1);
   expect(result.areas[0]).not.toBeNull();
   expect(result.areas[0].nombre).toBe(newArea.nombre)
   expect(result.areas[0].creditos).toBe(newArea.creditos)
   expect(result.areas[0].prioridad).toBe(newArea.prioridad)
  });

  it('addAreaDepartamento should thrown exception for an invalid area', async () => {
    const newDepartamento: DepartamentoEntity = await departamentoRepository.save({
      nombre: "Departamento X"});
 
    await expect(() => service.addAreaToDepartamento(newDepartamento.id, "0")).rejects.toHaveProperty("message", 'No se encontro el area con el id dado');
  });

  it('addAreaDepartamento should throw an exception for an invalid departamento', async () => {
    const newArea: AreaEntity = await areaRepository.save({
      nombre: "Area nombre",
      creditos: faker.datatype.number({min: 1, max: 10}),
      prioridad: "Alta"})
 
    await expect(() => service.addAreaToDepartamento("0", newArea.id)).rejects.toHaveProperty("message", 'No se encontro el departamento con el id dado');
  });

  it('findAreaByDepartamentoIdAreaId should return area by departamento', async () => {
    const area: AreaEntity = areasList[0];
    const storedArea: AreaEntity = await service.findAreaByDepartamentoIdAreaId(departamento.id, area.id, )
    expect(storedArea).not.toBeNull();
    expect(storedArea.nombre).toBe(area.nombre);
    expect(storedArea.prioridad).toBe(area.prioridad);
    expect(storedArea.creditos).toBe(area.creditos);
  });

  it('findAreaByDepartamentoIdAreaId should throw an exception for an invalid area', async () => {
    await expect(()=> service.findAreaByDepartamentoIdAreaId(departamento.id, "0")).rejects.toHaveProperty("message", 'No se encontro el area con el id dado');
  });

  it('findAreaByDepartamentoIdAreaId should throw an exception for an invalid departamento', async () => {
    const area: AreaEntity = areasList[0];
    await expect(()=> service.findAreaByDepartamentoIdAreaId("0", area.id)).rejects.toHaveProperty("message", 'No se encontro el departamento con el id dado');
  });

  it('findAreaByDepartamentoIdAreaId should throw an exception for a area not associated to a departamento', async () => {
    const newArea: AreaEntity = await areaRepository.save({
      nombre: "Area nombre",
      creditos: faker.datatype.number({min: 1, max: 10}),
      prioridad: "Alta"})
 
    await expect(()=> service.findAreaByDepartamentoIdAreaId(departamento.id, newArea.id)).rejects.toHaveProperty("message", 'El area con el id dado no esta asociado al departamento');
  });

  it('findAreasByDepartamentoId should return areas by departamento', async ()=>{
    const areas: AreaEntity[] = await service.findAreasByDepartamentoId(departamento.id);
    expect(areas.length).toBe(5)
  });

  it('findAreasByDepartamentoId should throw an exception for an invalid departamento', async () => {
    await expect(()=> service.findAreasByDepartamentoId("0")).rejects.toHaveProperty("message", 'No se encontro el departamento con el id dado');
  });

  it('associateAreasDepartamento should update areas list for a departamento', async () => {
    const newArea: AreaEntity = await areaRepository.save({
      nombre: "Area nombre",
      creditos: faker.datatype.number({min: 1, max: 10}),
      prioridad: "Alta"})
 
    const updatedDepartamento: DepartamentoEntity = await service.associateAreasDepartamento(departamento.id, [newArea]);
    expect(updatedDepartamento.areas.length).toBe(1);
    expect(updatedDepartamento.areas[0].nombre).toBe(newArea.nombre);
    expect(updatedDepartamento.areas[0].creditos).toBe(newArea.creditos);
    expect(updatedDepartamento.areas[0].prioridad).toBe(newArea.prioridad);
  });

  it('associateAreasDepartamento should throw an exception for an invalid departamento', async () => {
    const newArea: AreaEntity = await areaRepository.save({
      nombre: "Area nombre",
      creditos: faker.datatype.number({min: 1, max: 10}),
      prioridad: "Alta"})
 
 
    await expect(()=> service.associateAreasDepartamento("0", [newArea])).rejects.toHaveProperty("message", 'No se encontro el departamento con el id dado');
  });

  it('associateAreasDepartamento should throw an exception for an invalid area', async () => {
    const newArea: AreaEntity = areasList[0];
    newArea.id = "0";
 
    await expect(()=> service.associateAreasDepartamento(departamento.id, [newArea])).rejects.toHaveProperty("message", 'No se encontro el area con el id dado');
  });

  it('deleteAreaToDepartamento should remove a area from a departamento', async () => {
    const area: AreaEntity = areasList[0];
   
    await service.deleteAreaDepartamento(departamento.id, area.id);
 
    const storedDepartamento: DepartamentoEntity = await departamentoRepository.findOne({where: {id: departamento.id}, relations: ["areas"]});
    const deletedArea: AreaEntity = storedDepartamento.areas.find(a => a.id === area.id);
 
    expect(deletedArea).toBeUndefined();
  });

  it('deleteAreaToDepartamento should thrown an exception for an invalid area', async () => {
    await expect(()=> service.deleteAreaDepartamento(departamento.id, "0")).rejects.toHaveProperty("message", 'No se encontro el area con el id dado');
  });

  it('deleteAreaToDepartamento should thrown an exception for an invalid departamento', async () => {
    const area: AreaEntity = areasList[0];
    await expect(()=> service.deleteAreaDepartamento("0", area.id)).rejects.toHaveProperty("message", 'No se encontro el departamento con el id dado');
  });

  it('deleteAreaToDepartamento should thrown an exception for a non asocciated area', async () => {
    const newArea: AreaEntity = await areaRepository.save({
      nombre: "Area nombre",
      creditos: faker.datatype.number({min: 1, max: 10}),
      prioridad: "Alta"})
 
    await expect(()=> service.deleteAreaDepartamento(departamento.id, newArea.id)).rejects.toHaveProperty("message", 'El area con el id dado no esta asociado al departamento');
  });
});
