import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { DepartamentoEntity } from './departamento.entity';

@Injectable()
export class DepartamentoService {

    constructor(
        @InjectRepository(DepartamentoEntity)
        private readonly departamentoRepository: Repository<DepartamentoEntity>
    ){}

    async findAll(): Promise<DepartamentoEntity[]> {
        return await this.departamentoRepository.find({ relations: ["areas", "cursos"] });
    }

    async findOne(id: string): Promise<DepartamentoEntity> {
        const departamento: DepartamentoEntity = await this.departamentoRepository.findOne({where: {id}, relations: ["areas", "cursos"] } );
        if (!departamento)
          throw new BusinessLogicException("No se encontro el departamento con el id dado", BusinessError.NOT_FOUND);
   
        return departamento;
    }

    async create(departamento: DepartamentoEntity): Promise<DepartamentoEntity> {
        return await this.departamentoRepository.save(departamento);
    }

    async update(id: string, departamento: DepartamentoEntity): Promise<DepartamentoEntity> {
        const persistedDepartamento: DepartamentoEntity = await this.departamentoRepository.findOne({where:{id}});
        if (!persistedDepartamento)
          throw new BusinessLogicException("No se encontro el departamento con el id dado", BusinessError.NOT_FOUND);
         
        return await this.departamentoRepository.save({...persistedDepartamento, ...departamento,});
    }

    async delete(id: string) {
        const departamento: DepartamentoEntity = await this.departamentoRepository.findOne({where:{id}});
        if (!departamento)
          throw new BusinessLogicException("No se encontro el departamento con el id dado", BusinessError.NOT_FOUND);
     
        await this.departamentoRepository.remove(departamento);
    }
}