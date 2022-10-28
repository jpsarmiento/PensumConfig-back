/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { ILike, Repository } from 'typeorm';
import { AreaEntity } from './area.entity';

@Injectable()
export class AreaService {

    constructor(
        @InjectRepository(AreaEntity)
        private readonly areaRepository: Repository<AreaEntity>
    ){}

    async findAll(query: string): Promise<AreaEntity[]> {
        if(!query)
            return await this.areaRepository.find({ order: { nombre: "ASC"}, relations: ["programas", "reglas"], take: 24 });

        return await (await this.areaRepository.findBy({ nombre: ILike(`%${query}%`)})).sort((obj1, obj2)=> {
            if (obj1.nombre > obj2.nombre)
                return 1;
            if (obj1.nombre < obj2.nombre)
                return -1;
            return 0;
        });
    }

    async findOne(id: string): Promise<AreaEntity> {
        const area: AreaEntity = await this.areaRepository.findOne({where: {id}, relations: ["programas","reglas"] } );
        if (!area)
          throw new BusinessLogicException("No se encontro el area con el id dado", BusinessError.NOT_FOUND);
   
        return area;
    }

    async create(area: AreaEntity): Promise<AreaEntity> {
        if(area.prioridad != 'Muy alta' && area.prioridad != 'Alta' && area.prioridad != 'Media' && area.prioridad != 'Baja') {
                throw new BusinessLogicException(
                    'La prioridad del area debe ser Muy alta, Alta, Media o Baja', BusinessError.PRECONDITION_FAILED
                )
        }
        if(area.creditos < 0) {
            throw new BusinessLogicException(
                'El numero de creditos del area no puede ser un numero negativo', BusinessError.PRECONDITION_FAILED
            )
        }
        return await this.areaRepository.save(area);
    }

    async update(id: string, area: AreaEntity): Promise<AreaEntity> {
        const persistedarea: AreaEntity = await this.areaRepository.findOne({where:{id}});
        if (!persistedarea)
          throw new BusinessLogicException("No se encontro el area con el id dado", BusinessError.NOT_FOUND);
        
        if(area.prioridad != 'Muy alta' && area.prioridad != 'Alta' && area.prioridad != 'Media' && area.prioridad != 'Baja') {
            throw new BusinessLogicException(
                'La prioridad del area debe ser Muy alta, Alta, Media o Baja', BusinessError.PRECONDITION_FAILED
            )
        }
        if(area.creditos < 0) {
            throw new BusinessLogicException(
                'El numero de creditos del area no puede ser un numero negativo', BusinessError.PRECONDITION_FAILED
            )
        }      
        return await this.areaRepository.save({...persistedarea, ...area,});
    }

    async delete(id: string) {
        const area: AreaEntity = await this.areaRepository.findOne({where:{id}});
        if (!area)
          throw new BusinessLogicException("No se encontro el area con el id dado", BusinessError.NOT_FOUND);
     
        await this.areaRepository.remove(area);
    }
}