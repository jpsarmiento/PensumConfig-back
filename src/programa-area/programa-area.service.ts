/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramaEntity } from '../programa/programa.entity';
import { Repository } from 'typeorm';
import { AreaEntity } from '../area/area.entity';
import {
    BusinessError,
    BusinessLogicException,
  } from '../shared/errors/business-errors';

@Injectable()
export class ProgramaAreaService {
  constructor(
       @InjectRepository(ProgramaEntity)
       private readonly programaRepository: Repository<ProgramaEntity>,
   
       @InjectRepository(AreaEntity)
       private readonly areaRepository: Repository<AreaEntity>
   ) {}


   async addAreaToPrograma(programaId: string, areaId: string): Promise<ProgramaEntity> {
    const area: AreaEntity = await this.areaRepository.findOne({where: {id: areaId}});
    if (!area)
      throw new BusinessLogicException('No se encontro el area con el id dado', BusinessError.NOT_FOUND);
  
    const programa: ProgramaEntity = await this.programaRepository.findOne({where: {id: programaId}, relations: ["areas"]})
    if (!programa)
      throw new BusinessLogicException('No se encontro el programa con el id dado', BusinessError.NOT_FOUND);

    programa.areas = [...programa.areas, area];
    return await this.programaRepository.save(programa);
  }

async findAreaByProgramaIdAreaId(programaId: string, areaId: string): Promise<AreaEntity> {
    const area: AreaEntity = await this.areaRepository.findOne({where: {id: areaId}});
    if (!area)
      throw new BusinessLogicException('No se encontro el area con el id dado', BusinessError.NOT_FOUND)
   
    const programa: ProgramaEntity = await this.programaRepository.findOne({where: {id: programaId}, relations: ["areas"]});
    if (!programa)
      throw new BusinessLogicException('No se encontro el programa con el id dado', BusinessError.NOT_FOUND)

    const areaPrograma: AreaEntity = programa.areas.find(e => e.id === area.id);

    if (!areaPrograma)
      throw new BusinessLogicException('El area con el id dado no esta asociado al programa', BusinessError.PRECONDITION_FAILED)

    return areaPrograma;
}

async findAreasByProgramaId(programaId: string): Promise<AreaEntity[]> {
    const programa: ProgramaEntity = await this.programaRepository.findOne({where: {id: programaId}, relations: ["areas","areas.reglas", "areas.reglas.terminos", "areas.reglas.examenes", "areas.reglas.terminos.cursos"]});
    if (!programa)
      throw new BusinessLogicException('No se encontro el programa con el id dado', BusinessError.NOT_FOUND)
   
    return programa.areas;
}

async associateAreasPrograma(programaId: string, areas: AreaEntity[]): Promise<ProgramaEntity> {
    const programa: ProgramaEntity = await this.programaRepository.findOne({where: {id: programaId}, relations: ["areas"]});
    if (!programa)
      throw new BusinessLogicException('No se encontro el programa con el id dado', BusinessError.NOT_FOUND)

    for (let i = 0; i < areas.length; i++) {
      const area: AreaEntity = await this.areaRepository.findOne({where: {id: areas[i].id}});
      if (!area)
        throw new BusinessLogicException("No se encontro el area con el id dado", BusinessError.NOT_FOUND)
    }
    programa.areas = areas;
    return await this.programaRepository.save(programa);
}

async deleteAreaPrograma(programaId: string, areaId: string){
    const area: AreaEntity = await this.areaRepository.findOne({where: {id: areaId}});
    if (!area)
      throw new BusinessLogicException("No se encontro el area con el id dado", BusinessError.NOT_FOUND)

    const programa: ProgramaEntity = await this.programaRepository.findOne({where: {id: programaId}, relations: ["areas"]});
    if (!programa)
      throw new BusinessLogicException('No se encontro el programa con el id dado', BusinessError.NOT_FOUND)

    const areaPrograma: AreaEntity = programa.areas.find(e => e.id === area.id);

    if (!areaPrograma)
        throw new BusinessLogicException('El area con el id dado no esta asociado al programa', BusinessError.PRECONDITION_FAILED)

    programa.areas = programa.areas.filter(e => e.id !== areaId);
    await this.programaRepository.save(programa);
}  
}
