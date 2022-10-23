/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartamentoEntity } from '../departamento/departamento.entity';
import { Repository } from 'typeorm';
import { CursoEntity } from '../curso/curso.entity';
import {
    BusinessError,
    BusinessLogicException,
  } from '../shared/errors/business-errors';

@Injectable()
export class DepartamentoCursoService {
  constructor(
       @InjectRepository(DepartamentoEntity)
       private readonly departamentoRepository: Repository<DepartamentoEntity>,
   
       @InjectRepository(CursoEntity)
       private readonly cursoRepository: Repository<CursoEntity>
   ) {}


   async addCursoToDepartamento(departamentoId: string, cursoId: string): Promise<DepartamentoEntity> {
    const curso: CursoEntity = await this.cursoRepository.findOne({where: {id: cursoId}});
    if (!curso)
      throw new BusinessLogicException('No se encontro el curso con el id dado', BusinessError.NOT_FOUND);
  
    const departamento: DepartamentoEntity = await this.departamentoRepository.findOne({where: {id: departamentoId}, relations: ["cursos"]})
    if (!departamento)
      throw new BusinessLogicException('No se encontro el departamento con el id dado', BusinessError.NOT_FOUND);

    departamento.cursos = [...departamento.cursos, curso];
    return await this.departamentoRepository.save(departamento);
  }

async findCursoByDepartamentoIdCursoId(departamentoId: string, cursoId: string): Promise<CursoEntity> {
    const curso: CursoEntity = await this.cursoRepository.findOne({where: {id: cursoId}});
    if (!curso)
      throw new BusinessLogicException('No se encontro el curso con el id dado', BusinessError.NOT_FOUND)
   
    const departamento: DepartamentoEntity = await this.departamentoRepository.findOne({where: {id: departamentoId}, relations: ["cursos"]});
    if (!departamento)
      throw new BusinessLogicException('No se encontro el departamento con el id dado', BusinessError.NOT_FOUND)

    const cursoDepartamento: CursoEntity = departamento.cursos.find(e => e.id === curso.id);

    if (!cursoDepartamento)
      throw new BusinessLogicException('El curso con el id dado no esta asociado al departamento', BusinessError.PRECONDITION_FAILED)

    return cursoDepartamento;
}

async findCursosByDepartamentoId(departamentoId: string): Promise<CursoEntity[]> {
    const departamento: DepartamentoEntity = await this.departamentoRepository.findOne({where: {id: departamentoId}, relations: ["cursos"]});
    if (!departamento)
      throw new BusinessLogicException('No se encontro el departamento con el id dado', BusinessError.NOT_FOUND)
   
    return departamento.cursos;
}

async associateCursosDepartamento(departamentoId: string, cursos: CursoEntity[]): Promise<DepartamentoEntity> {
    const departamento: DepartamentoEntity = await this.departamentoRepository.findOne({where: {id: departamentoId}, relations: ["cursos"]});
    if (!departamento)
      throw new BusinessLogicException('No se encontro el departamento con el id dado', BusinessError.NOT_FOUND)

    for (let i = 0; i < cursos.length; i++) {
      const curso: CursoEntity = await this.cursoRepository.findOne({where: {id: cursos[i].id}});
      if (!curso)
        throw new BusinessLogicException("No se encontro el curso con el id dado", BusinessError.NOT_FOUND)
    }
    departamento.cursos = cursos;
    return await this.departamentoRepository.save(departamento);
}

async deleteCursoDepartamento(departamentoId: string, cursoId: string){
    const curso: CursoEntity = await this.cursoRepository.findOne({where: {id: cursoId}});
    if (!curso)
      throw new BusinessLogicException("No se encontro el curso con el id dado", BusinessError.NOT_FOUND)

    const departamento: DepartamentoEntity = await this.departamentoRepository.findOne({where: {id: departamentoId}, relations: ["cursos"]});
    if (!departamento)
      throw new BusinessLogicException('No se encontro el departamento con el id dado', BusinessError.NOT_FOUND)

    const cursoDepartamento: CursoEntity = departamento.cursos.find(e => e.id === curso.id);

    if (!cursoDepartamento)
        throw new BusinessLogicException('El curso con el id dado no esta asociado al departamento', BusinessError.PRECONDITION_FAILED)

    departamento.cursos = departamento.cursos.filter(e => e.id !== cursoId);
    await this.departamentoRepository.save(departamento);
}  
}
