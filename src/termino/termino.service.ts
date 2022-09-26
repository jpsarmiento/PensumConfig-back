import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { TerminoEntity } from './termino.entity';

@Injectable()
export class TerminoService {

    constructor(
        @InjectRepository(TerminoEntity)
        private readonly terminoRepository: Repository<TerminoEntity>
    ){}

    async findAll(): Promise<TerminoEntity[]> {
        return await this.terminoRepository.find({ relations: ["regla","cursos"] });
    }

    async findOne(id: string): Promise<TerminoEntity> {
        const termino: TerminoEntity = await this.terminoRepository.findOne({where: {id}, relations: ["regla","cursos"] } );
        if (!termino)
          throw new BusinessLogicException("No se encontro el termino con el id dado", BusinessError.NOT_FOUND);
   
        return termino;
    }

    async create(termino: TerminoEntity): Promise<TerminoEntity> {
        return await this.terminoRepository.save(termino);
    }

    async update(id: string, termino: TerminoEntity): Promise<TerminoEntity> {
        const persistedtermino: TerminoEntity = await this.terminoRepository.findOne({where:{id}});
        if (!persistedtermino)
          throw new BusinessLogicException("No se encontro el termino con el id dado", BusinessError.NOT_FOUND);
          
        return await this.terminoRepository.save({...persistedtermino, ...termino,});
    }

    async delete(id: string) {
        const termino: TerminoEntity = await this.terminoRepository.findOne({where:{id}});
        if (!termino)
          throw new BusinessLogicException("No se encontro el termino con el id dado", BusinessError.NOT_FOUND);
     
        await this.terminoRepository.remove(termino);
    }
}