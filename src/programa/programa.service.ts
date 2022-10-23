/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { ProgramaEntity } from './programa.entity';

@Injectable()
export class ProgramaService {

    constructor(
        @InjectRepository(ProgramaEntity)
        private readonly programaRepository: Repository<ProgramaEntity>
    ){}

    async findAll(): Promise<ProgramaEntity[]> {
        return await this.programaRepository.find({ relations: ["areas", "requisitos"] });
    }

    async findOne(id: string): Promise<ProgramaEntity> {
        const programa: ProgramaEntity = await this.programaRepository.findOne({where: {id}, relations: ["areas", "requisitos"] } );
        if (!programa)
          throw new BusinessLogicException("No se encontro el programa con el id dado", BusinessError.NOT_FOUND);
   
        return programa;
    }

    async create(programa: ProgramaEntity): Promise<ProgramaEntity> {
        if(programa.tipo != 'Pregrado' && programa.tipo != 'Posgrado') {
                throw new BusinessLogicException(
                    'El tipo del programa debe ser Pegrado o Posgrado', BusinessError.PRECONDITION_FAILED
                )
        }
        if(programa.min_gpa < 0.0 || programa.min_gpa > 5.0) {
            throw new BusinessLogicException(
                'El GPA minimo del programa debe ser un valor entre 0.0 y 5.0', BusinessError.PRECONDITION_FAILED
            )
        }
        return await this.programaRepository.save(programa);
    }

    async update(id: string, programa: ProgramaEntity): Promise<ProgramaEntity> {
        const persistedPrograma: ProgramaEntity = await this.programaRepository.findOne({where:{id}});
        if (!persistedPrograma)
          throw new BusinessLogicException("No se encontro el programa con el id dado", BusinessError.NOT_FOUND);
        
        if(programa.tipo != 'Pregrado' && programa.tipo != 'Posgrado') {
            throw new BusinessLogicException(
                'El tipo del programa debe ser Pegrado o Posgrado', BusinessError.PRECONDITION_FAILED
            )
        }
        if(programa.min_gpa < 0.0 || programa.min_gpa > 5.0) {
            throw new BusinessLogicException(
                'El GPA minimo del programa debe ser un valor entre 0.0 y 5.0', BusinessError.PRECONDITION_FAILED
            )
        }

        return await this.programaRepository.save({...persistedPrograma, ...programa,});
    }

    async delete(id: string) {
        const programa: ProgramaEntity = await this.programaRepository.findOne({where:{id}});
        if (!programa)
          throw new BusinessLogicException("No se encontro el programa con el id dado", BusinessError.NOT_FOUND);
     
        await this.programaRepository.remove(programa);
    }
}