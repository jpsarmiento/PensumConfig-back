/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { DepartamentoEntity } from './departamento.entity';

var deptos =    ['Centro de Estudios en Periodismo', 'Antropologia',
                'Arquitectura', 'Arte', 'Ciencia Politica', 'Ciencias Biologicas',
                'Diseño','Filosofia','Fisica','Geociencias','Historia','Historia del Arte',
                'Humanidades y Literatura','Ingenieria Biomedica','Ingenieria Civil y Ambiental',
                'Ingenieria de Sistemas y Computacion','Ingenieria Electrica y Electronica',
                'Ingenieria Industrial','Ingenieria Mecanica','Ingenieria Quimica y de Alimentos',
                'Lenguas y Cultura','Matematicas','Musica','Psicologia','Quimica'
            ]

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

    async findNombre(nombre: string):Promise<DepartamentoEntity[]> {
        return await this.departamentoRepository.find({where: {nombre: nombre}});
    }

    async create(departamento: DepartamentoEntity): Promise<DepartamentoEntity> {
        if((await this.findNombre(departamento.nombre)).length != 0) {
            throw new BusinessLogicException(
                'Ya existe un departamento con este nombre', BusinessError.PRECONDITION_FAILED
            )
        }
        if(!deptos.includes(departamento.nombre)) {
            throw new BusinessLogicException(
                'El nombre del departamento debe ser el nombre de un departamento de la universidad', BusinessError.PRECONDITION_FAILED
            )
        }
        return await this.departamentoRepository.save(departamento);
    }

    async update(id: string, departamento: DepartamentoEntity): Promise<DepartamentoEntity> {
        const persistedDepartamento: DepartamentoEntity = await this.departamentoRepository.findOne({where:{id}});
        if (!persistedDepartamento)
          throw new BusinessLogicException("No se encontro el departamento con el id dado", BusinessError.NOT_FOUND);
         
        if(persistedDepartamento.nombre != departamento.nombre) {
            if((await this.findNombre(departamento.nombre)).length != 0) {
                throw new BusinessLogicException(
                    'Ya existe un departamento con este nombre', BusinessError.PRECONDITION_FAILED
                )
            }
            if(!deptos.includes(departamento.nombre)) {
                throw new BusinessLogicException(
                    'El nombre del departamento debe ser el nombre de un departamento de la universidad', BusinessError.PRECONDITION_FAILED
                )
            }
        }
        return await this.departamentoRepository.save({...persistedDepartamento, ...departamento,});
    }

    async delete(id: string) {
        const departamento: DepartamentoEntity = await this.departamentoRepository.findOne({where:{id}});
        if (!departamento)
          throw new BusinessLogicException("No se encontro el departamento con el id dado", BusinessError.NOT_FOUND);
     
        await this.departamentoRepository.remove(departamento);
    }
}