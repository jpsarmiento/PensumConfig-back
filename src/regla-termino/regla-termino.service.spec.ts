import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReglaTerminoService } from './regla-termino.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ReglaEntity } from '../regla/regla.entity';
import { TerminoEntity } from '../termino/termino.entity';
import { faker } from '@faker-js/faker';

describe('ReglaTerminoService', () => {
  let service: ReglaTerminoService;
  let reglaRepository: Repository<ReglaEntity>;
  let terminoRepository: Repository<TerminoEntity>;
  let regla: ReglaEntity;
  let terminosList : TerminoEntity[];

  const seedDatabase = async () => {
    terminoRepository.clear();
    reglaRepository.clear();
 
    terminosList = [];
    for(let i = 0; i < 5; i++){
      const termino: TerminoEntity = await terminoRepository.save({})
        terminosList.push(termino);
  }

    regla = await reglaRepository.save({
      nombre: "Regla nombre",
      semestre_inicio: 201802,
      semestre_vigencia: 203001,
      creditos: faker.datatype.number({min: 1, max: 5}),
      terminos: terminosList});
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ReglaTerminoService],
    }).compile();

    service = module.get<ReglaTerminoService>(ReglaTerminoService);
    reglaRepository = module.get<Repository<ReglaEntity>>(getRepositoryToken(ReglaEntity));
    terminoRepository = module.get<Repository<TerminoEntity>>(getRepositoryToken(TerminoEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addTerminoRegla should add a termino to a regla', async () => {
    const newTermino: TerminoEntity = await terminoRepository.save({})

    const newRegla: ReglaEntity = await reglaRepository.save({
      nombre: "Regla nombre",
      tipo: "Pregrado",
      semestre_inicio: 201502,
      semestre_vigencia: 202001,
      creditos: faker.datatype.number({min: 1, max: 5})});

   const result: ReglaEntity = await service.addTerminoToRegla(newRegla.id, newTermino.id);
   expect(result.terminos.length).toBe(1);
   expect(result.terminos[0]).not.toBeNull();
  });

  it('addTerminoRegla should throw exception for an invalid termino', async () => {
    const newRegla: ReglaEntity = await reglaRepository.save({
      nombre: "Regla X",
      semestre_inicio: 201802,
      semestre_vigencia: 203001,
      creditos: faker.datatype.number({min: 1, max: 5})})
 
    await expect(() => service.addTerminoToRegla(newRegla.id, "0")).rejects.toHaveProperty("message", 'No se encontro el termino con el id dado');
  });

  it('addTerminoRegla should throw an exception for an invalid regla', async () => {
    const newTermino: TerminoEntity = await terminoRepository.save({})
 
    await expect(() => service.addTerminoToRegla("0", newTermino.id)).rejects.toHaveProperty("message", 'No se encontro la regla con el id dado');
  });

  it('findTerminoByReglaIdTerminoId should return termino by regla', async () => {
    const termino: TerminoEntity = terminosList[0];
    const storedTermino: TerminoEntity = await service.findTerminoByReglaIdTerminoId(regla.id, termino.id, )
    expect(storedTermino).not.toBeNull();
  });

  it('findTerminoByReglaIdTerminoId should throw an exception for an invalid termino', async () => {
    await expect(()=> service.findTerminoByReglaIdTerminoId(regla.id, "0")).rejects.toHaveProperty("message", 'No se encontro el termino con el id dado');
  });

  it('findTerminoByReglaIdTerminoId should throw an exception for an invalid regla', async () => {
    const termino: TerminoEntity = terminosList[0];
    await expect(()=> service.findTerminoByReglaIdTerminoId("0", termino.id)).rejects.toHaveProperty("message", 'No se encontro la regla con el id dado');
  });

  it('findTerminoByReglaIdTerminoId should throw an exception for a termino not associated to a regla', async () => {
    const newTermino: TerminoEntity = await terminoRepository.save({})
 
    await expect(()=> service.findTerminoByReglaIdTerminoId(regla.id, newTermino.id)).rejects.toHaveProperty("message", 'El termino con el id dado no esta asociado a la regla');
  });

  it('findTerminosByReglaId should return terminos by regla', async ()=>{
    const terminos: TerminoEntity[] = await service.findTerminosByReglaId(regla.id);
    expect(terminos.length).toBe(5)
  });

  it('findTerminosByReglaId should throw an exception for an invalid regla', async () => {
    await expect(()=> service.findTerminosByReglaId("0")).rejects.toHaveProperty("message", 'No se encontro la regla con el id dado');
  });

  it('associateTerminosRegla should update terminos list for a regla', async () => {
    const newTermino: TerminoEntity = await terminoRepository.save({})
 
    const updatedRegla: ReglaEntity = await service.associateTerminosRegla(regla.id, [newTermino]);
    expect(updatedRegla.terminos.length).toBe(1);
  });

  it('associateTerminosRegla should throw an exception for an invalid regla', async () => {
    const newTermino: TerminoEntity = await terminoRepository.save({})
 
    await expect(()=> service.associateTerminosRegla("0", [newTermino])).rejects.toHaveProperty("message", 'No se encontro la regla con el id dado');
  });

  it('associateTerminosRegla should throw an exception for an invalid termino', async () => {
    const newTermino: TerminoEntity = terminosList[0];
    newTermino.id = "0";
 
    await expect(()=> service.associateTerminosRegla(regla.id, [newTermino])).rejects.toHaveProperty("message", 'No se encontro el termino con el id dado');
  });

  it('deleteTerminoToRegla should remove a termino from a regla', async () => {
    const termino: TerminoEntity = terminosList[0];
   
    await service.deleteTerminoRegla(regla.id, termino.id);
 
    const storedRegla: ReglaEntity = await reglaRepository.findOne({where: {id: regla.id}, relations: ["terminos"]});
    const deletedTermino: TerminoEntity = storedRegla.terminos.find(a => a.id === termino.id);
 
    expect(deletedTermino).toBeUndefined();
  });

  it('deleteTerminoToRegla should thrown an exception for an invalid termino', async () => {
    await expect(()=> service.deleteTerminoRegla(regla.id, "0")).rejects.toHaveProperty("message", 'No se encontro el termino con el id dado');
  });

  it('deleteTerminoToRegla should thrown an exception for an invalid regla', async () => {
    const termino: TerminoEntity = terminosList[0];
    await expect(()=> service.deleteTerminoRegla("0", termino.id)).rejects.toHaveProperty("message", 'No se encontro la regla con el id dado');
  });

  it('deleteTerminoToRegla should thrown an exception for a non asocciated termino', async () => {
    const newTermino: TerminoEntity = await terminoRepository.save({})
 
    await expect(()=> service.deleteTerminoRegla(regla.id, newTermino.id)).rejects.toHaveProperty("message", 'El termino con el id dado no esta asociado a la regla');
  });
});
