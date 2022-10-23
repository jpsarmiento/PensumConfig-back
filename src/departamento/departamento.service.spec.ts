/* eslint-disable */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { DepartamentoEntity } from './departamento.entity';
import { DepartamentoService } from './departamento.service';

describe('DepartamentoService', () => {
  let service: DepartamentoService;
  let repository: Repository<DepartamentoEntity>;
  let departamentosList = []

  const seedDatabase = async () => {
   repository.clear();
   departamentosList = [];
   for(let i = 0; i < 5; i++){
       const departamento: DepartamentoEntity = await repository.save({
       nombre: "Departamento X"})
       departamentosList.push(departamento);
   }
 }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [DepartamentoService],
    }).compile();

    service = module.get<DepartamentoService>(DepartamentoService);
    repository = module.get<Repository<DepartamentoEntity>>(getRepositoryToken(DepartamentoEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('findAll should return all departamentos', async () => {
    const departamentos: DepartamentoEntity[] = await service.findAll();
    expect(departamentos).not.toBeNull();
    expect(departamentos).toHaveLength(departamentosList.length);
  });
  
  it('findOne should return a departamento by id', async () => {
    const storedDepartamento: DepartamentoEntity =departamentosList[0];
    const departamento: DepartamentoEntity = await service.findOne(storedDepartamento.id);
    expect(departamento).not.toBeNull();
    expect(departamento.nombre).toEqual(storedDepartamento.nombre)
  });
  
  it('findOne should throw an exception for an invalid departamento', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", 'No se encontro el departamento con el id dado')
  });
  
  it('create should return a new departamento', async () => {
    const departamento: DepartamentoEntity = {
      id: "",
      nombre: "Musica",
      cursos: null,
      areas: null
    }
  
    const newDepartamento: DepartamentoEntity = await service.create(departamento);
    expect(newDepartamento).not.toBeNull();
  
    const storedDepartamento: DepartamentoEntity = await repository.findOne({where: {id: newDepartamento.id}})
    expect(storedDepartamento).not.toBeNull();
    expect(storedDepartamento.nombre).toEqual(newDepartamento.nombre)
  });
  
  it('update should modify a departamento', async () => {
    const departamento: DepartamentoEntity = departamentosList[0];
    departamento.nombre = "Antropologia";
    const updatedDepartamento: DepartamentoEntity = await service.update(departamento.id, departamento);
    expect(updatedDepartamento).not.toBeNull();
    const storedDepartamento: DepartamentoEntity = await repository.findOne({ where: { id: departamento.id } })
    expect(storedDepartamento).not.toBeNull();
    expect(storedDepartamento.nombre).toEqual(departamento.nombre)
  });
  
  it('update should throw an exception for an invalid departamento', async () => {
    let departamento: DepartamentoEntity = departamentosList[0];
    departamento = {
      ...departamento, nombre: "Diseño"
    }
    await expect(() => service.update("0", departamento)).rejects.toHaveProperty("message", 'No se encontro el departamento con el id dado')
  });
  
  it('delete should remove a product', async () => {
    const departamento: DepartamentoEntity = departamentosList[0];
    await service.delete(departamento.id);
     const deletedDepartamento: DepartamentoEntity = await repository.findOne({ where: { id: departamento.id } })
    expect(deletedDepartamento).toBeNull();
  });
  
  it('delete should throw an exception for an invalid product', async () => {
    const departamento: DepartamentoEntity = departamentosList[0];
    await service.delete(departamento.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", 'No se encontro el departamento con el id dado')
  });
});