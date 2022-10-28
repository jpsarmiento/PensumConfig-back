/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository, ILike } from 'typeorm';
import { RequisitoEntity } from './requisito.entity'; 

@Injectable()
export class RequisitoService {

    constructor(
        @InjectRepository(RequisitoEntity)
        private readonly requisitoRepository: Repository<RequisitoEntity>
    ){}

    async findAll(query: string): Promise<RequisitoEntity[]> {
        if(!query)
            return await this.requisitoRepository.find({ order: { nombre: "ASC"}, relations: ["programas"], take: 24 });

        return await (await this.requisitoRepository.findBy({ nombre: ILike(`%${query}%`)})).sort((obj1, obj2)=> {
            if (obj1.nombre > obj2.nombre)
                return 1;
            if (obj1.nombre < obj2.nombre)
                return -1;
            return 0;
        });
    }

    async findOne(id: string): Promise<RequisitoEntity> {
        const requisito: RequisitoEntity = await this.requisitoRepository.findOne({where: {id}, relations: ["programas"] } );
        if (!requisito)
          throw new BusinessLogicException("No se encontro el requisito con el id dado", BusinessError.NOT_FOUND);
   
        return requisito;
    }

    async create(requisito: RequisitoEntity): Promise<RequisitoEntity> {
        if(requisito.nombre != 'Tipo E 1' && requisito.nombre != 'Tipo E 2' && requisito.nombre != 'Tipo Epsilon' && requisito.nombre != 'Saber Pro' && requisito.nombre != 'Lectura inglés' && requisito.nombre != 'Lengua extranjera') {
                throw new BusinessLogicException(
                    'El nombre del requisito debe ser Tipo E 1, Tipo E 2, Tipo Epsilon, Saber Pro, Lectura inglés o Lengua extranjera', BusinessError.PRECONDITION_FAILED
                )
        }
        return await this.requisitoRepository.save(requisito);
    }

    async update(id: string, requisito: RequisitoEntity): Promise<RequisitoEntity> {
        const persistedrequisito: RequisitoEntity = await this.requisitoRepository.findOne({where:{id}});
        if (!persistedrequisito)
          throw new BusinessLogicException("No se encontro el requisito con el id dado", BusinessError.NOT_FOUND);
        
        if(requisito.nombre != 'Tipo E 1' && requisito.nombre != 'Tipo E 2' && requisito.nombre != 'Tipo Epsilon' && requisito.nombre != 'Saber Pro' && requisito.nombre != 'Lectura ingles' && requisito.nombre != 'Lengua extranjera') {
            throw new BusinessLogicException(
                    'El nombre del requisito debe ser Tipo E 1, Tipo E 2, Tipo Epsilon, Saber Pro, Lectura ingles o Lengua extranjera', BusinessError.PRECONDITION_FAILED
                )
        }
        return await this.requisitoRepository.save({...persistedrequisito, ...requisito,});
    }

    async delete(id: string) {
        const requisito: RequisitoEntity = await this.requisitoRepository.findOne({where:{id}});
        if (!requisito)
          throw new BusinessLogicException("No se encontro el requisito con el id dado", BusinessError.NOT_FOUND);
     
        await this.requisitoRepository.remove(requisito);
    }
}