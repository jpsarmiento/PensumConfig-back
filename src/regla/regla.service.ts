import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { ReglaEntity } from './regla.entity';

@Injectable()
export class ReglaService {

    constructor(
        @InjectRepository(ReglaEntity)
        private readonly reglaRepository: Repository<ReglaEntity>
    ){}

    async findAll(): Promise<ReglaEntity[]> {
        return await this.reglaRepository.find({ relations: ["examenes", "terminos","areas"] });
    }

    async findOne(id: string): Promise<ReglaEntity> {
        const regla: ReglaEntity = await this.reglaRepository.findOne({where: {id}, relations: ["examenes", "terminos","areas"] } );
        if (!regla)
          throw new BusinessLogicException("No se encontro el regla con el id dado", BusinessError.NOT_FOUND);
   
        return regla;
    }

    async create(regla: ReglaEntity): Promise<ReglaEntity> {
        if(regla.semestre_inicio < 200000 || regla.semestre_inicio > 205002) {
                throw new BusinessLogicException(
                    'El semestre de inicio de la regla debe ser entre el semestre 2000-01 y el semestre 2050-02', BusinessError.PRECONDITION_FAILED
                )
        }
        if(regla.semestre_vigencia < 200000 || regla.semestre_vigencia > 205002) {
                throw new BusinessLogicException(
                    'El semestre de vigencia de la regla debe ser entre el semestre 2000-01 y el semestre 2050-02', BusinessError.PRECONDITION_FAILED
                )
        }
        if(regla.creditos < 0) {
            throw new BusinessLogicException(
                'El numero de creditos del regla no puede ser un numero negativo', BusinessError.PRECONDITION_FAILED
            )
        }
        return await this.reglaRepository.save(regla);
    }

    async update(id: string, regla: ReglaEntity): Promise<ReglaEntity> {
        const persistedregla: ReglaEntity = await this.reglaRepository.findOne({where:{id}});
        if (!persistedregla)
          throw new BusinessLogicException("No se encontro el regla con el id dado", BusinessError.NOT_FOUND);
        
        if(regla.semestre_inicio < 200000 || regla.semestre_inicio > 205002) {
            throw new BusinessLogicException(
                'El semestre de inicio de la regla debe ser entre el semestre 2000-01 y el semestre 2050-02', BusinessError.PRECONDITION_FAILED
            )
        }
        if(regla.semestre_vigencia < 200000 || regla.semestre_vigencia > 205002) {
            throw new BusinessLogicException(
                'El semestre de vigencia de la regla debe ser entre el semestre 2000-01 y el semestre 2050-02', BusinessError.PRECONDITION_FAILED
            )
        }
        if(regla.creditos < 0) {
            throw new BusinessLogicException(
                'El numero de creditos del regla no puede ser un numero negativo', BusinessError.PRECONDITION_FAILED
            )
        }      
        return await this.reglaRepository.save({...persistedregla, ...regla,});
    }

    async delete(id: string) {
        const regla: ReglaEntity = await this.reglaRepository.findOne({where:{id}});
        if (!regla)
          throw new BusinessLogicException("No se encontro el regla con el id dado", BusinessError.NOT_FOUND);
     
        await this.reglaRepository.remove(regla);
    }
}