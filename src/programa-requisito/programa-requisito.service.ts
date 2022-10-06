import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramaEntity } from '../programa/programa.entity';
import { Repository } from 'typeorm';
import { RequisitoEntity } from '../requisito/requisito.entity';
import {
    BusinessError,
    BusinessLogicException,
  } from '../shared/errors/business-errors';

@Injectable()
export class ProgramaRequisitoService {
  constructor(
       @InjectRepository(ProgramaEntity)
       private readonly programaRepository: Repository<ProgramaEntity>,
   
       @InjectRepository(RequisitoEntity)
       private readonly requisitoRepository: Repository<RequisitoEntity>
   ) {}


   async addRequisitoToPrograma(programaId: string, requisitoId: string): Promise<ProgramaEntity> {
    const requisito: RequisitoEntity = await this.requisitoRepository.findOne({where: {id: requisitoId}});
    if (!requisito)
      throw new BusinessLogicException('No se encontro el requisito con el id dado', BusinessError.NOT_FOUND);
  
    const programa: ProgramaEntity = await this.programaRepository.findOne({where: {id: programaId}, relations: ["requisitos"]})
    if (!programa)
      throw new BusinessLogicException('No se encontro el programa con el id dado', BusinessError.NOT_FOUND);

    programa.requisitos = [...programa.requisitos, requisito];
    return await this.programaRepository.save(programa);
  }

async findRequisitoByProgramaIdRequisitoId(programaId: string, requisitoId: string): Promise<RequisitoEntity> {
    const requisito: RequisitoEntity = await this.requisitoRepository.findOne({where: {id: requisitoId}});
    if (!requisito)
      throw new BusinessLogicException('No se encontro el requisito con el id dado', BusinessError.NOT_FOUND)
   
    const programa: ProgramaEntity = await this.programaRepository.findOne({where: {id: programaId}, relations: ["requisitos"]});
    if (!programa)
      throw new BusinessLogicException('No se encontro el programa con el id dado', BusinessError.NOT_FOUND)

    const requisitoPrograma: RequisitoEntity = programa.requisitos.find(e => e.id === requisito.id);

    if (!requisitoPrograma)
      throw new BusinessLogicException('El requisito con el id dado no esta asociado al programa', BusinessError.PRECONDITION_FAILED)

    return requisitoPrograma;
}

async findRequisitosByProgramaId(programaId: string): Promise<RequisitoEntity[]> {
    const programa: ProgramaEntity = await this.programaRepository.findOne({where: {id: programaId}, relations: ["requisitos"]});
    if (!programa)
      throw new BusinessLogicException('No se encontro el programa con el id dado', BusinessError.NOT_FOUND)
   
    return programa.requisitos;
}

async associateRequisitosPrograma(programaId: string, requisitos: RequisitoEntity[]): Promise<ProgramaEntity> {
    const programa: ProgramaEntity = await this.programaRepository.findOne({where: {id: programaId}, relations: ["requisitos"]});
    if (!programa)
      throw new BusinessLogicException('No se encontro el programa con el id dado', BusinessError.NOT_FOUND)

    for (let i = 0; i < requisitos.length; i++) {
      const requisito: RequisitoEntity = await this.requisitoRepository.findOne({where: {id: requisitos[i].id}});
      if (!requisito)
        throw new BusinessLogicException("No se encontro el requisito con el id dado", BusinessError.NOT_FOUND)
    }
    programa.requisitos = requisitos;
    return await this.programaRepository.save(programa);
}

async deleteRequisitoPrograma(programaId: string, requisitoId: string){
    const requisito: RequisitoEntity = await this.requisitoRepository.findOne({where: {id: requisitoId}});
    if (!requisito)
      throw new BusinessLogicException("No se encontro el requisito con el id dado", BusinessError.NOT_FOUND)

    const programa: ProgramaEntity = await this.programaRepository.findOne({where: {id: programaId}, relations: ["requisitos"]});
    if (!programa)
      throw new BusinessLogicException('No se encontro el programa con el id dado', BusinessError.NOT_FOUND)

    const requisitoPrograma: RequisitoEntity = programa.requisitos.find(e => e.id === requisito.id);

    if (!requisitoPrograma)
        throw new BusinessLogicException('El requisito con el id dado no esta asociado al programa', BusinessError.PRECONDITION_FAILED)

    programa.requisitos = programa.requisitos.filter(e => e.id !== requisitoId);
    await this.programaRepository.save(programa);
}  
}
