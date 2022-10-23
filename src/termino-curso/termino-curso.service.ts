/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TerminoEntity } from '../termino/termino.entity';
import { Repository } from 'typeorm';
import { CursoEntity } from '../curso/curso.entity';
import {
    BusinessError,
    BusinessLogicException,
  } from '../shared/errors/business-errors';

@Injectable()
export class TerminoCursoService {
  constructor(
       @InjectRepository(TerminoEntity)
       private readonly terminoRepository: Repository<TerminoEntity>,
   
       @InjectRepository(CursoEntity)
       private readonly cursoRepository: Repository<CursoEntity>
   ) {}


   async addCursoToTermino(terminoId: string, cursoId: string): Promise<TerminoEntity> {
    const curso: CursoEntity = await this.cursoRepository.findOne({where: {id: cursoId}});
    if (!curso)
      throw new BusinessLogicException('No se encontro el curso con el id dado', BusinessError.NOT_FOUND);
  
    const termino: TerminoEntity = await this.terminoRepository.findOne({where: {id: terminoId}, relations: ["cursos"]})
    if (!termino)
      throw new BusinessLogicException('No se encontro el termino con el id dado', BusinessError.NOT_FOUND);

    termino.cursos = [...termino.cursos, curso];
    return await this.terminoRepository.save(termino);
  }

async findCursoByTerminoIdCursoId(terminoId: string, cursoId: string): Promise<CursoEntity> {
    const curso: CursoEntity = await this.cursoRepository.findOne({where: {id: cursoId}});
    if (!curso)
      throw new BusinessLogicException('No se encontro el curso con el id dado', BusinessError.NOT_FOUND)
   
    const termino: TerminoEntity = await this.terminoRepository.findOne({where: {id: terminoId}, relations: ["cursos"]});
    if (!termino)
      throw new BusinessLogicException('No se encontro el termino con el id dado', BusinessError.NOT_FOUND)

    const cursoTermino: CursoEntity = termino.cursos.find(e => e.id === curso.id);

    if (!cursoTermino)
      throw new BusinessLogicException('El curso con el id dado no esta asociado al termino', BusinessError.PRECONDITION_FAILED)

    return cursoTermino;
}

async findCursosByTerminoId(terminoId: string): Promise<CursoEntity[]> {
    const termino: TerminoEntity = await this.terminoRepository.findOne({where: {id: terminoId}, relations: ["cursos"]});
    if (!termino)
      throw new BusinessLogicException('No se encontro el termino con el id dado', BusinessError.NOT_FOUND)
   
    return termino.cursos;
}

async associateCursosTermino(terminoId: string, cursos: CursoEntity[]): Promise<TerminoEntity> {
    const termino: TerminoEntity = await this.terminoRepository.findOne({where: {id: terminoId}, relations: ["cursos"]});
    if (!termino)
      throw new BusinessLogicException('No se encontro el termino con el id dado', BusinessError.NOT_FOUND)

    for (let i = 0; i < cursos.length; i++) {
      const curso: CursoEntity = await this.cursoRepository.findOne({where: {id: cursos[i].id}});
      if (!curso)
        throw new BusinessLogicException("No se encontro el curso con el id dado", BusinessError.NOT_FOUND)
    }
    termino.cursos = cursos;
    return await this.terminoRepository.save(termino);
}

async deleteCursoTermino(terminoId: string, cursoId: string){
    const curso: CursoEntity = await this.cursoRepository.findOne({where: {id: cursoId}});
    if (!curso)
      throw new BusinessLogicException("No se encontro el curso con el id dado", BusinessError.NOT_FOUND)

    const termino: TerminoEntity = await this.terminoRepository.findOne({where: {id: terminoId}, relations: ["cursos"]});
    if (!termino)
      throw new BusinessLogicException('No se encontro el termino con el id dado', BusinessError.NOT_FOUND)

    const cursoTermino: CursoEntity = termino.cursos.find(e => e.id === curso.id);

    if (!cursoTermino)
        throw new BusinessLogicException('El curso con el id dado no esta asociado al termino', BusinessError.PRECONDITION_FAILED)

    termino.cursos = termino.cursos.filter(e => e.id !== cursoId);
    await this.terminoRepository.save(termino);
}  
}
