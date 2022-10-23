/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReglaEntity } from '../regla/regla.entity';
import { Repository } from 'typeorm';
import { ExamenEntity } from '../examen/examen.entity';
import {
    BusinessError,
    BusinessLogicException,
  } from '../shared/errors/business-errors';

@Injectable()
export class ReglaExamenService {
  constructor(
       @InjectRepository(ReglaEntity)
       private readonly reglaRepository: Repository<ReglaEntity>,
   
       @InjectRepository(ExamenEntity)
       private readonly examenRepository: Repository<ExamenEntity>
   ) {}


   async addExamenToRegla(reglaId: string, examenId: string): Promise<ReglaEntity> {
    const examen: ExamenEntity = await this.examenRepository.findOne({where: {id: examenId}});
    if (!examen)
      throw new BusinessLogicException('No se encontro el examen con el id dado', BusinessError.NOT_FOUND);
  
    const regla: ReglaEntity = await this.reglaRepository.findOne({where: {id: reglaId}, relations: ["examenes"]})
    if (!regla)
      throw new BusinessLogicException('No se encontro la regla con el id dado', BusinessError.NOT_FOUND);

    regla.examenes = [...regla.examenes, examen];
    return await this.reglaRepository.save(regla);
  }

async findExamenByReglaIdExamenId(reglaId: string, examenId: string): Promise<ExamenEntity> {
    const examen: ExamenEntity = await this.examenRepository.findOne({where: {id: examenId}});
    if (!examen)
      throw new BusinessLogicException('No se encontro el examen con el id dado', BusinessError.NOT_FOUND)
   
    const regla: ReglaEntity = await this.reglaRepository.findOne({where: {id: reglaId}, relations: ["examenes"]});
    if (!regla)
      throw new BusinessLogicException('No se encontro la regla con el id dado', BusinessError.NOT_FOUND)

    const examenRegla: ExamenEntity = regla.examenes.find(e => e.id === examen.id);

    if (!examenRegla)
      throw new BusinessLogicException('El examen con el id dado no esta asociado a la regla', BusinessError.PRECONDITION_FAILED)

    return examenRegla;
}

async findExamenesByReglaId(reglaId: string): Promise<ExamenEntity[]> {
    const regla: ReglaEntity = await this.reglaRepository.findOne({where: {id: reglaId}, relations: ["examenes"]});
    if (!regla)
      throw new BusinessLogicException('No se encontro la regla con el id dado', BusinessError.NOT_FOUND)
   
    return regla.examenes;
}

async associateExamenesRegla(reglaId: string, examenes: ExamenEntity[]): Promise<ReglaEntity> {
    const regla: ReglaEntity = await this.reglaRepository.findOne({where: {id: reglaId}, relations: ["examenes"]});
    if (!regla)
      throw new BusinessLogicException('No se encontro la regla con el id dado', BusinessError.NOT_FOUND)

    for (let i = 0; i < examenes.length; i++) {
      const examen: ExamenEntity = await this.examenRepository.findOne({where: {id: examenes[i].id}});
      if (!examen)
        throw new BusinessLogicException("No se encontro el examen con el id dado", BusinessError.NOT_FOUND)
    }
    regla.examenes = examenes;
    return await this.reglaRepository.save(regla);
}

async deleteExamenRegla(reglaId: string, examenId: string){
    const examen: ExamenEntity = await this.examenRepository.findOne({where: {id: examenId}});
    if (!examen)
      throw new BusinessLogicException("No se encontro el examen con el id dado", BusinessError.NOT_FOUND)

    const regla: ReglaEntity = await this.reglaRepository.findOne({where: {id: reglaId}, relations: ["examenes"]});
    if (!regla)
      throw new BusinessLogicException('No se encontro la regla con el id dado', BusinessError.NOT_FOUND)

    const examenRegla: ExamenEntity = regla.examenes.find(e => e.id === examen.id);

    if (!examenRegla)
        throw new BusinessLogicException('El examen con el id dado no esta asociado a la regla', BusinessError.PRECONDITION_FAILED)

    regla.examenes = regla.examenes.filter(e => e.id !== examenId);
    await this.reglaRepository.save(regla);
}  
}
