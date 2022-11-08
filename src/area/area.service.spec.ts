/* eslint-disable */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { AreaEntity } from './area.entity';
import { AreaService } from './area.service';
import { faker } from '@faker-js/faker';

describe('AreaService', () => {
  let service: AreaService;
  let repository: Repository<AreaEntity>;
  let areasList = []

  const seedDatabase = async () => {
   repository.clear();
   areasList = [];
   for(let i = 0; i < 5; i++){
       const area: AreaEntity = await repository.save({
       nombre: "Area nombre",
       creditos: faker.datatype.number({min: 1, max: 10}),
       tipo: "Semestre",
       prioridad: "Alta"})
       areasList.push(area);
   }
 }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AreaService],
    }).compile();

    service = module.get<AreaService>(AreaService);
    repository = module.get<Repository<AreaEntity>>(getRepositoryToken(AreaEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('findAll should return all areas', async () => {
    const areas: AreaEntity[] = await service.findAll(null);
    expect(areas).not.toBeNull();
    expect(areas).toHaveLength(areasList.length);
  });
  
  it('findOne should return a area by id', async () => {
    const storedArea: AreaEntity =areasList[0];
    const area: AreaEntity = await service.findOne(storedArea.id);
    expect(area).not.toBeNull();
    expect(area.nombre).toEqual(storedArea.nombre)
    expect(area.creditos).toEqual(storedArea.creditos)
    expect(area.prioridad).toEqual(storedArea.prioridad)
  });
  
  it('findOne should throw an exception for an invalid area', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", 'No se encontro el area con el id dado')
  });
  
  it('create should return a new area', async () => {
    const area: AreaEntity = {
      id: "",
      nombre: faker.company.name(),
      creditos: faker.datatype.number({min: 1, max: 10}),
      prioridad: "Media",
      tipo: "Semestre",
      reglas: null,
      programas: null
    }
  
    const newArea: AreaEntity = await service.create(area);
    expect(newArea).not.toBeNull();
  
    const storedArea: AreaEntity = await repository.findOne({where: {id: newArea.id}})
    expect(storedArea).not.toBeNull();
    expect(storedArea.nombre).toEqual(newArea.nombre)
    expect(storedArea.creditos).toEqual(newArea.creditos)
    expect(storedArea.prioridad).toEqual(newArea.prioridad)
  });

  it('create area without precondition should return error', async () => {
    const area: AreaEntity = {
      id: "",
      nombre: faker.company.name(),
      creditos: faker.datatype.number({min: 1, max: 10}),
      prioridad: "Colombia",
      tipo: "Semestre",
      reglas: null,
      programas: null
    }

    await expect(() => service.create(area)).rejects.toHaveProperty("message", 'La prioridad del area debe ser Muy alta, Alta, Media o Baja')
  });
  
  it('update should modify a area', async () => {
    const area: AreaEntity = areasList[0];
    area.nombre = "New name";
    area.prioridad = "Baja";
    const updatedArea: AreaEntity = await service.update(area.id, area);
    expect(updatedArea).not.toBeNull();
    const storedArea: AreaEntity = await repository.findOne({ where: { id: area.id } })
    expect(storedArea).not.toBeNull();
    expect(storedArea.nombre).toEqual(area.nombre)
    expect(storedArea.prioridad).toEqual(area.prioridad)
  });
  
  it('update should throw an exception for an invalid area', async () => {
    let area: AreaEntity = areasList[0];
    area = {
      ...area, nombre: "New name", prioridad: "Baja"
    }
    await expect(() => service.update("0", area)).rejects.toHaveProperty("message", 'No se encontro el area con el id dado')
  });
  
  it('delete should remove a product', async () => {
    const area: AreaEntity = areasList[0];
    await service.delete(area.id);
     const deletedArea: AreaEntity = await repository.findOne({ where: { id: area.id } })
    expect(deletedArea).toBeNull();
  });
  
  it('delete should throw an exception for an invalid product', async () => {
    const area: AreaEntity = areasList[0];
    await service.delete(area.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", 'No se encontro el area con el id dado')
  });


});