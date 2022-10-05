import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ReglaEntity } from './regla.entity';
import { ReglaService } from './regla.service';
import { faker } from '@faker-js/faker';

describe('ReglaService', () => {
  let service: ReglaService;
  let repository: Repository<ReglaEntity>;
  let reglasList = []

  const seedDatabase = async () => {
   repository.clear();
   reglasList = [];
   for(let i = 0; i < 5; i++){
       const regla: ReglaEntity = await repository.save({
       nombre: "Regla nombre",
       semestre_inicio: 201802,
       semestre_vigencia: 203001,
       creditos: faker.datatype.number({min: 1, max: 5})})
       reglasList.push(regla);
   }
 }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ReglaService],
    }).compile();

    service = module.get<ReglaService>(ReglaService);
    repository = module.get<Repository<ReglaEntity>>(getRepositoryToken(ReglaEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('findAll should return all reglas', async () => {
    const reglas: ReglaEntity[] = await service.findAll();
    expect(reglas).not.toBeNull();
    expect(reglas).toHaveLength(reglasList.length);
  });
  
  it('findOne should return a regla by id', async () => {
    const storedRegla: ReglaEntity =reglasList[0];
    const regla: ReglaEntity = await service.findOne(storedRegla.id);
    expect(regla).not.toBeNull();
    expect(regla.nombre).toEqual(storedRegla.nombre)
    expect(regla.creditos).toEqual(storedRegla.creditos)
    expect(regla.semestre_inicio).toEqual(storedRegla.semestre_inicio)
    expect(regla.semestre_vigencia).toEqual(storedRegla.semestre_vigencia)
  });
  
  it('findOne should throw an exception for an invalid regla', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", 'No se encontro el regla con el id dado')
  });
  
  it('create should return a new regla', async () => {
    const regla: ReglaEntity = {
      id: "",
      nombre: "Regla nombre",
      semestre_inicio: 201802,
      semestre_vigencia: 203001,
      creditos: faker.datatype.number({min: 1, max: 5}),
      areas: null,
      terminos: null,
      examenes: null
    }
  
    const newRegla: ReglaEntity = await service.create(regla);
    expect(newRegla).not.toBeNull();
  
    const storedRegla: ReglaEntity = await repository.findOne({where: {id: newRegla.id}})
    expect(storedRegla).not.toBeNull();
    expect(storedRegla.nombre).toEqual(newRegla.nombre)
    expect(storedRegla.creditos).toEqual(newRegla.creditos)
    expect(newRegla.semestre_vigencia).toEqual(storedRegla.semestre_vigencia)
    expect(newRegla.semestre_inicio).toEqual(storedRegla.semestre_inicio)
  });

  it('create regla without precondition should return error', async () => {
    const regla: ReglaEntity = {
      id: "",
      nombre: "Regla nombre",
      semestre_inicio: 201802,
      semestre_vigencia: 999999,
      creditos: faker.datatype.number({min: 1, max: 5}),
      areas: null,
      terminos: null,
      examenes: null
    }
    await expect(() => service.create(regla)).rejects.toHaveProperty("message", 'El semestre de vigencia de la regla debe ser entre el semestre 2000-01 y el semestre 2050-02')
  });
  
  it('update should modify a regla', async () => {
    const regla: ReglaEntity = reglasList[0];
    regla.nombre = "New name";
    regla.semestre_vigencia = 202202;
    const updatedRegla: ReglaEntity = await service.update(regla.id, regla);
    expect(updatedRegla).not.toBeNull();
    const storedRegla: ReglaEntity = await repository.findOne({ where: { id: regla.id } })
    expect(storedRegla).not.toBeNull();
    expect(storedRegla.nombre).toEqual(regla.nombre)
    expect(storedRegla.semestre_vigencia).toEqual(regla.semestre_vigencia)
  });
  
  it('update should throw an exception for an invalid regla', async () => {
    let regla: ReglaEntity = reglasList[0];
    regla = {
      ...regla, nombre: "New name", semestre_vigencia: 202201
    }
    await expect(() => service.update("0", regla)).rejects.toHaveProperty("message", 'No se encontro el regla con el id dado')
  });
  
  it('delete should remove a product', async () => {
    const regla: ReglaEntity = reglasList[0];
    await service.delete(regla.id);
     const deletedRegla: ReglaEntity = await repository.findOne({ where: { id: regla.id } })
    expect(deletedRegla).toBeNull();
  });
  
  it('delete should throw an exception for an invalid product', async () => {
    const regla: ReglaEntity = reglasList[0];
    await service.delete(regla.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", 'No se encontro el regla con el id dado')
  });


});