/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository, ILike } from 'typeorm';
import { ExamenEntity } from './examen.entity';

@Injectable()
export class ExamenService {

    constructor(
        @InjectRepository(ExamenEntity)
        private readonly examenRepository: Repository<ExamenEntity>
    ){}

    
    async findAll(query: string): Promise<ExamenEntity[]> {
        if(!query)
            return await this.examenRepository.find({ order: { nombre: "ASC"}, relations: ["regla"], take: 24 });

        return await (await this.examenRepository.findBy({ nombre: ILike(`%${query}%`)})).sort((obj1, obj2)=> {
            if (obj1.nombre > obj2.nombre)
                return 1;
            if (obj1.nombre < obj2.nombre)
                return -1;
            return 0;
        });
    }

    async findOne(id: string): Promise<ExamenEntity> {
        const examen: ExamenEntity = await this.examenRepository.findOne({where: {id}, relations: ["regla"] } );
        if (!examen)
          throw new BusinessLogicException("No se encontro el examen con el id dado", BusinessError.NOT_FOUND);
   
        return examen;
    }

    async create(examen: ExamenEntity): Promise<ExamenEntity> {
        if(examen.min_nota < 0.0) {
            throw new BusinessLogicException(
                'La nota minima para aprobar el examen no puede ser un numero negativo', BusinessError.PRECONDITION_FAILED
            )
        }
        return await this.examenRepository.save(examen);
    }

    async update(id: string, examen: ExamenEntity): Promise<ExamenEntity> {
        const persistedexamen: ExamenEntity = await this.examenRepository.findOne({where:{id}});
        if (!persistedexamen)
          throw new BusinessLogicException("No se encontro el examen con el id dado", BusinessError.NOT_FOUND);
        
        if(examen.min_nota < 0.0) {
            throw new BusinessLogicException(
                'La nota minima para aprobar el examen no puede ser un numero negativo', BusinessError.PRECONDITION_FAILED
            )
        }    
        return await this.examenRepository.save({...persistedexamen, ...examen,});
    }

    async delete(id: string) {
        const examen: ExamenEntity = await this.examenRepository.findOne({where:{id}});
        if (!examen)
          throw new BusinessLogicException("No se encontro el examen con el id dado", BusinessError.NOT_FOUND);
     
        await this.examenRepository.remove(examen);
    }
}