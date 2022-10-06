import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartamentoEntity } from '../departamento/departamento.entity';
import { Repository } from 'typeorm';
import { AreaEntity } from '../area/area.entity';
import {
    BusinessError,
    BusinessLogicException,
  } from '../shared/errors/business-errors';

@Injectable()
export class DepartamentoAreaService {
  constructor(
       @InjectRepository(DepartamentoEntity)
       private readonly departamentoRepository: Repository<DepartamentoEntity>,
   
       @InjectRepository(AreaEntity)
       private readonly areaRepository: Repository<AreaEntity>
   ) {}


   async addAreaToDepartamento(departamentoId: string, areaId: string): Promise<DepartamentoEntity> {
    const area: AreaEntity = await this.areaRepository.findOne({where: {id: areaId}});
    if (!area)
      throw new BusinessLogicException('No se encontro el area con el id dado', BusinessError.NOT_FOUND);
  
    const departamento: DepartamentoEntity = await this.departamentoRepository.findOne({where: {id: departamentoId}, relations: ["areas"]})
    if (!departamento)
      throw new BusinessLogicException('No se encontro el departamento con el id dado', BusinessError.NOT_FOUND);

    departamento.areas = [...departamento.areas, area];
    return await this.departamentoRepository.save(departamento);
  }

async findAreaByDepartamentoIdAreaId(departamentoId: string, areaId: string): Promise<AreaEntity> {
    const area: AreaEntity = await this.areaRepository.findOne({where: {id: areaId}});
    if (!area)
      throw new BusinessLogicException('No se encontro el area con el id dado', BusinessError.NOT_FOUND)
   
    const departamento: DepartamentoEntity = await this.departamentoRepository.findOne({where: {id: departamentoId}, relations: ["areas"]});
    if (!departamento)
      throw new BusinessLogicException('No se encontro el departamento con el id dado', BusinessError.NOT_FOUND)

    const areaDepartamento: AreaEntity = departamento.areas.find(e => e.id === area.id);

    if (!areaDepartamento)
      throw new BusinessLogicException('El area con el id dado no esta asociado al departamento', BusinessError.PRECONDITION_FAILED)

    return areaDepartamento;
}

async findAreasByDepartamentoId(departamentoId: string): Promise<AreaEntity[]> {
    const departamento: DepartamentoEntity = await this.departamentoRepository.findOne({where: {id: departamentoId}, relations: ["areas"]});
    if (!departamento)
      throw new BusinessLogicException('No se encontro el departamento con el id dado', BusinessError.NOT_FOUND)
   
    return departamento.areas;
}

async associateAreasDepartamento(departamentoId: string, areas: AreaEntity[]): Promise<DepartamentoEntity> {
    const departamento: DepartamentoEntity = await this.departamentoRepository.findOne({where: {id: departamentoId}, relations: ["areas"]});
    if (!departamento)
      throw new BusinessLogicException('No se encontro el departamento con el id dado', BusinessError.NOT_FOUND)

    for (let i = 0; i < areas.length; i++) {
      const area: AreaEntity = await this.areaRepository.findOne({where: {id: areas[i].id}});
      if (!area)
        throw new BusinessLogicException("No se encontro el area con el id dado", BusinessError.NOT_FOUND)
    }
    departamento.areas = areas;
    return await this.departamentoRepository.save(departamento);
}

async deleteAreaDepartamento(departamentoId: string, areaId: string){
    const area: AreaEntity = await this.areaRepository.findOne({where: {id: areaId}});
    if (!area)
      throw new BusinessLogicException("No se encontro el area con el id dado", BusinessError.NOT_FOUND)

    const departamento: DepartamentoEntity = await this.departamentoRepository.findOne({where: {id: departamentoId}, relations: ["areas"]});
    if (!departamento)
      throw new BusinessLogicException('No se encontro el departamento con el id dado', BusinessError.NOT_FOUND)

    const areaDepartamento: AreaEntity = departamento.areas.find(e => e.id === area.id);

    if (!areaDepartamento)
        throw new BusinessLogicException('El area con el id dado no esta asociado al departamento', BusinessError.PRECONDITION_FAILED)

    departamento.areas = departamento.areas.filter(e => e.id !== areaId);
    await this.departamentoRepository.save(departamento);
}  
}
