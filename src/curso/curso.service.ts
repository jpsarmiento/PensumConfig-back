import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { CursoEntity } from './curso.entity';

@Injectable()
export class CursoService {

    constructor(
        @InjectRepository(CursoEntity)
        private readonly cursoRepository: Repository<CursoEntity>
    ){}

    async findAll(): Promise<CursoEntity[]> {
        return await this.cursoRepository.find({ relations: ["terminos"] });
    }

    async findOne(id: string): Promise<CursoEntity> {
        const curso: CursoEntity = await this.cursoRepository.findOne({where: {id}, relations: ["terminos"] } );
        if (!curso)
          throw new BusinessLogicException("No se encontro el curso con el id dado", BusinessError.NOT_FOUND);
   
        return curso;
    }

    async create(curso: CursoEntity): Promise<CursoEntity> {
        if(curso.depto.length != 4) {
                throw new BusinessLogicException(
                    'El departamento del curso debe ser la sigla del departamento con 4 caracteres de longitud', BusinessError.PRECONDITION_FAILED
                )
        }
        if(curso.codigo < 1000 || curso.codigo > 9999) {
                throw new BusinessLogicException(
                    'El codigo del curso debe ser un numero de cuatro digitos entre el 1000 y el 9999', BusinessError.PRECONDITION_FAILED
                )
        }
        if(curso.creditos < 0) {
                throw new BusinessLogicException(
                    'El numero de creditos del curso no puede ser un numero negativo', BusinessError.PRECONDITION_FAILED
                )
        }
        return await this.cursoRepository.save(curso);
    }

    async update(id: string, curso: CursoEntity): Promise<CursoEntity> {
        const persistedcurso: CursoEntity = await this.cursoRepository.findOne({where:{id}});
        if (!persistedcurso)
          throw new BusinessLogicException("No se encontro el curso con el id dado", BusinessError.NOT_FOUND);
        
        if(curso.depto.length != 4) {
            throw new BusinessLogicException(
                'El departamento del curso debe ser la sigla del departamento con 4 caracteres de longitud', BusinessError.PRECONDITION_FAILED
            )
        }
        if(curso.codigo < 1000 || curso.codigo > 9999) {
            throw new BusinessLogicException(
                'El codigo del curso debe ser un numero de cuatro digitos entre el 1000 y el 9999', BusinessError.PRECONDITION_FAILED
            )
        }
        if(curso.creditos < 0) {
            throw new BusinessLogicException(
                'El numero de creditos del curso no puede ser un numero negativo', BusinessError.PRECONDITION_FAILED
            )
        }      
        return await this.cursoRepository.save({...persistedcurso, ...curso,});
    }

    async delete(id: string) {
        const curso: CursoEntity = await this.cursoRepository.findOne({where:{id}});
        if (!curso)
          throw new BusinessLogicException("No se encontro el curso con el id dado", BusinessError.NOT_FOUND);
     
        await this.cursoRepository.remove(curso);
    }
}