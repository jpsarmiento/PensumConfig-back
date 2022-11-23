/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AreaEntity } from '../area/area.entity';
import { Repository } from 'typeorm';
import { ReglaEntity } from '../regla/regla.entity';
import {
    BusinessError,
    BusinessLogicException,
  } from '../shared/errors/business-errors';

@Injectable()
export class AreaReglaService {
  constructor(
       @InjectRepository(AreaEntity)
       private readonly areaRepository: Repository<AreaEntity>,
   
       @InjectRepository(ReglaEntity)
       private readonly reglaRepository: Repository<ReglaEntity>
   ) {}


   async addReglaToArea(areaId: string, reglaId: string): Promise<AreaEntity> {
    const regla: ReglaEntity = await this.reglaRepository.findOne({where: {id: reglaId}});
    if (!regla)
      throw new BusinessLogicException('No se encontro la regla con el id dado', BusinessError.NOT_FOUND);
  
    const area: AreaEntity = await this.areaRepository.findOne({where: {id: areaId}, relations: ["reglas"]})
    if (!area)
      throw new BusinessLogicException('No se encontro el area con el id dado', BusinessError.NOT_FOUND);

    area.reglas = [...area.reglas, regla];
    return await this.areaRepository.save(area);
  }

async findReglaByAreaIdReglaId(areaId: string, reglaId: string): Promise<ReglaEntity> {
    const regla: ReglaEntity = await this.reglaRepository.findOne({where: {id: reglaId}});
    if (!regla)
      throw new BusinessLogicException('No se encontro la regla con el id dado', BusinessError.NOT_FOUND)
   
    const area: AreaEntity = await this.areaRepository.findOne({where: {id: areaId}, relations: ["reglas"]});
    if (!area)
      throw new BusinessLogicException('No se encontro el area con el id dado', BusinessError.NOT_FOUND)

    const reglaArea: ReglaEntity = area.reglas.find(e => e.id === regla.id);

    if (!reglaArea)
      throw new BusinessLogicException('La regla con el id dado no esta asociada al area', BusinessError.PRECONDITION_FAILED)

    return reglaArea;
}

async findReglasByAreaId(areaId: string): Promise<ReglaEntity[]> {
    const area: AreaEntity = await this.areaRepository.findOne({where: {id: areaId}, relations: ["reglas"]});
    if (!area)
      throw new BusinessLogicException('No se encontro el area con el id dado', BusinessError.NOT_FOUND)
   
    return area.reglas.sort(this.compare);
}

  compare(a: ReglaEntity ,b: ReglaEntity) {
    if ( a.nombre < b.nombre ){
      return -1;
    }
    if ( a.nombre > b.nombre ){
      return 1;
    }
    return 0;
  }

async associateReglasArea(areaId: string, reglas: ReglaEntity[]): Promise<AreaEntity> {
    const area: AreaEntity = await this.areaRepository.findOne({where: {id: areaId}, relations: ["reglas"]});
    if (!area)
      throw new BusinessLogicException('No se encontro el area con el id dado', BusinessError.NOT_FOUND)

    for (let i = 0; i < reglas.length; i++) {
      const regla: ReglaEntity = await this.reglaRepository.findOne({where: {id: reglas[i].id}});
      if (!regla)
        throw new BusinessLogicException("No se encontro la regla con el id dado", BusinessError.NOT_FOUND)
    }
    area.reglas = reglas;
    return await this.areaRepository.save(area);
}

async deleteReglaArea(areaId: string, reglaId: string){
    const regla: ReglaEntity = await this.reglaRepository.findOne({where: {id: reglaId}});
    if (!regla)
      throw new BusinessLogicException("No se encontro la regla con el id dado", BusinessError.NOT_FOUND)

    const area: AreaEntity = await this.areaRepository.findOne({where: {id: areaId}, relations: ["reglas"]});
    if (!area)
      throw new BusinessLogicException('No se encontro el area con el id dado', BusinessError.NOT_FOUND)

    const reglaArea: ReglaEntity = area.reglas.find(e => e.id === regla.id);

    if (!reglaArea)
        throw new BusinessLogicException('La regla con el id dado no esta asociada al area', BusinessError.PRECONDITION_FAILED)

    area.reglas = area.reglas.filter(e => e.id !== reglaId);
    await this.areaRepository.save(area);
}  
}
