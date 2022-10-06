import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AreaReglaService } from './area-regla.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { AreaEntity } from '../area/area.entity';
import { ReglaEntity } from '../regla/regla.entity';
import { faker } from '@faker-js/faker';

describe('AreaReglaService', () => {
  let service: AreaReglaService;
  let areaRepository: Repository<AreaEntity>;
  let reglaRepository: Repository<ReglaEntity>;
  let area: AreaEntity;
  let reglasList : ReglaEntity[];

  const seedDatabase = async () => {
    reglaRepository.clear();
    areaRepository.clear();
 
    reglasList = [];
    for(let i = 0; i < 5; i++){
      const regla: ReglaEntity = await reglaRepository.save({
      nombre: "Regla nombre",
      semestre_inicio: 201802,
      semestre_vigencia: 203001,
      creditos: faker.datatype.number({min: 1, max: 5})})
      reglasList.push(regla);
  }

    area = await areaRepository.save({
      nombre: "Area nombre",
      creditos: faker.datatype.number({min: 1, max: 10}),
      prioridad: "Alta",
      reglas: reglasList
    });
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AreaReglaService],
    }).compile();

    service = module.get<AreaReglaService>(AreaReglaService);
    areaRepository = module.get<Repository<AreaEntity>>(getRepositoryToken(AreaEntity));
    reglaRepository = module.get<Repository<ReglaEntity>>(getRepositoryToken(ReglaEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addReglaArea should add a regla to a area', async () => {
    const newRegla: ReglaEntity = await reglaRepository.save({
      nombre: "Regla nombre",
      semestre_inicio: 201802,
      semestre_vigencia: 203001,
      creditos: faker.datatype.number({min: 1, max: 5}),
    });

    const newArea: AreaEntity = await areaRepository.save({
      nombre: faker.company.name(),
      creditos: faker.datatype.number({min: 1, max: 10}),
      prioridad: "Media"
    })

   const result: AreaEntity = await service.addReglaToArea(newArea.id, newRegla.id);
   expect(result.reglas.length).toBe(1);
   expect(result.reglas[0]).not.toBeNull();
   expect(result.reglas[0].nombre).toBe(newRegla.nombre)
   expect(result.reglas[0].creditos).toBe(newRegla.creditos)
   expect(result.reglas[0].semestre_inicio).toBe(newRegla.semestre_inicio)
   expect(result.reglas[0].semestre_vigencia).toBe(newRegla.semestre_vigencia)
  });

  it('addReglaArea should thrown exception for an invalid regla', async () => {
    const newArea: AreaEntity = await areaRepository.save({
      nombre: faker.company.name(),
      creditos: faker.datatype.number({min: 1, max: 10}),
      prioridad: "Baja"
    })
 
    await expect(() => service.addReglaToArea(newArea.id, "0")).rejects.toHaveProperty("message", 'No se encontro la regla con el id dado');
  });

  it('addReglaArea should throw an exception for an invalid area', async () => {
    const newRegla: ReglaEntity = await reglaRepository.save({
      nombre: "Regla X",
      semestre_inicio: 201202,
      semestre_vigencia: 202001,
      creditos: faker.datatype.number({min: 1, max: 5}),
    });
 
    await expect(() => service.addReglaToArea("0", newRegla.id)).rejects.toHaveProperty("message", 'No se encontro el area con el id dado');
  });

  it('findReglaByAreaIdReglaId should return regla by area', async () => {
    const regla: ReglaEntity = reglasList[0];
    const storedRegla: ReglaEntity = await service.findReglaByAreaIdReglaId(area.id, regla.id, )
    expect(storedRegla).not.toBeNull();
    expect(storedRegla.nombre).toBe(regla.nombre);
    expect(storedRegla.creditos).toBe(regla.creditos);
    expect(storedRegla.semestre_inicio).toBe(regla.semestre_inicio);
    expect(storedRegla.semestre_vigencia).toBe(regla.semestre_vigencia);
  });

  it('findReglaByAreaIdReglaId should throw an exception for an invalid regla', async () => {
    await expect(()=> service.findReglaByAreaIdReglaId(area.id, "0")).rejects.toHaveProperty("message", 'No se encontro la regla con el id dado');
  });

  it('findReglaByAreaIdReglaId should throw an exception for an invalid area', async () => {
    const regla: ReglaEntity = reglasList[0];
    await expect(()=> service.findReglaByAreaIdReglaId("0", regla.id)).rejects.toHaveProperty("message", 'No se encontro el area con el id dado');
  });

  it('findReglaByAreaIdReglaId should throw an exception for a regla not associated to a area', async () => {
    const newRegla: ReglaEntity = await reglaRepository.save({
      nombre: "Regla nombre",
      semestre_inicio: 201502,
      semestre_vigencia: 201802,
      creditos: faker.datatype.number({min: 1, max: 5}),
    });
 
    await expect(()=> service.findReglaByAreaIdReglaId(area.id, newRegla.id)).rejects.toHaveProperty("message", 'La regla con el id dado no esta asociada al area');
  });

  it('findReglasByAreaId should return reglas by area', async ()=>{
    const reglas: ReglaEntity[] = await service.findReglasByAreaId(area.id);
    expect(reglas.length).toBe(5)
  });

  it('findReglasByAreaId should throw an exception for an invalid area', async () => {
    await expect(()=> service.findReglasByAreaId("0")).rejects.toHaveProperty("message", 'No se encontro el area con el id dado');
  });

  it('associateReglasArea should update reglas list for a area', async () => {
    const newRegla: ReglaEntity = await reglaRepository.save({
      nombre: "Regla Y",
      semestre_inicio: 202001,
      semestre_vigencia: 202501,
      creditos: faker.datatype.number({min: 1, max: 5}),
    });
 
    const updatedArea: AreaEntity = await service.associateReglasArea(area.id, [newRegla]);
    expect(updatedArea.reglas.length).toBe(1);
    expect(updatedArea.reglas[0].nombre).toBe(newRegla.nombre);
    expect(updatedArea.reglas[0].creditos).toBe(newRegla.creditos);
    expect(updatedArea.reglas[0].semestre_inicio).toBe(newRegla.semestre_inicio);
    expect(updatedArea.reglas[0].semestre_vigencia).toBe(newRegla.semestre_vigencia);
  });

  it('associateReglasArea should throw an exception for an invalid area', async () => {
    const newRegla: ReglaEntity = await reglaRepository.save({
      nombre: "Regla Y",
      semestre_inicio: 202001,
      semestre_vigencia: 202501,
      creditos: faker.datatype.number({min: 1, max: 5}),
    });
 
    await expect(()=> service.associateReglasArea("0", [newRegla])).rejects.toHaveProperty("message", 'No se encontro el area con el id dado');
  });

  it('associateReglasArea should throw an exception for an invalid regla', async () => {
    const newRegla: ReglaEntity = reglasList[0];
    newRegla.id = "0";
 
    await expect(()=> service.associateReglasArea(area.id, [newRegla])).rejects.toHaveProperty("message", 'No se encontro la regla con el id dado');
  });

  it('deleteReglaToArea should remove a regla from a area', async () => {
    const regla: ReglaEntity = reglasList[0];
   
    await service.deleteReglaArea(area.id, regla.id);
 
    const storedArea: AreaEntity = await areaRepository.findOne({where: {id: area.id}, relations: ["reglas"]});
    const deletedRegla: ReglaEntity = storedArea.reglas.find(a => a.id === regla.id);
 
    expect(deletedRegla).toBeUndefined();
  });

  it('deleteReglaToArea should thrown an exception for an invalid regla', async () => {
    await expect(()=> service.deleteReglaArea(area.id, "0")).rejects.toHaveProperty("message", 'No se encontro la regla con el id dado');
  });

  it('deleteReglaToArea should thrown an exception for an invalid area', async () => {
    const regla: ReglaEntity = reglasList[0];
    await expect(()=> service.deleteReglaArea("0", regla.id)).rejects.toHaveProperty("message", 'No se encontro el area con el id dado');
  });

  it('deleteReglaToArea should thrown an exception for a non asocciated regla', async () => {
    const newRegla: ReglaEntity = await reglaRepository.save({
      nombre: "Regla W",
      semestre_inicio: 201001,
      semestre_vigencia: 202501,
      creditos: faker.datatype.number({min: 1, max: 5}),
    });
 
    await expect(()=> service.deleteReglaArea(area.id, newRegla.id)).rejects.toHaveProperty("message", 'La regla con el id dado no esta asociada al area');
  });
});
