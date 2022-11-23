/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { ILike, Repository } from 'typeorm';
import { CursoEntity } from './curso.entity';

var letras =    ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

@Injectable()
export class CursoService {

    constructor(
        @InjectRepository(CursoEntity)
        private readonly cursoRepository: Repository<CursoEntity>
    ){}

    async findAll(query: string): Promise<CursoEntity[]> {
        if(!query)
            return await this.cursoRepository.find({ order: { sigla: "ASC", codigo: "ASC" }, relations: ["terminos"], take: 24 });

        return await (await this.cursoRepository.findBy({ sigla: ILike(`%${query}%`)})).sort((obj1, obj2)=> {
            if (obj1.sigla > obj2.sigla)
                return 1;
            if (obj1.sigla < obj2.sigla)
                return -1;
            if (obj1.codigo > obj2.codigo)
                return 1;
            return -1
        });
    }

    async findOne(id: string): Promise<CursoEntity> {
        const curso: CursoEntity = await this.cursoRepository.findOne({where: {id}, relations: ["terminos"] } );
        if (!curso)
          throw new BusinessLogicException("No se encontro el curso con el id dado", BusinessError.NOT_FOUND);
   
        return curso;
    }

    async findCodigoSigla(sigla: string, codigo: string):Promise<CursoEntity[]> {
        return await this.cursoRepository.find({where: {sigla: sigla, codigo: codigo}});
    }

    async create(curso: CursoEntity): Promise<CursoEntity> {
        try {
            if((await this.findCodigoSigla(curso.sigla, curso.codigo)).length != 0) {
                throw new BusinessLogicException(
                    'Ya existe un curso con esta sigla y codigo', BusinessError.PRECONDITION_FAILED
                )
            }
            if(curso.codigo.length < 4 ||!(Number(curso.codigo.slice(0,4))>=0) || (curso.codigo.length ==5 && !letras.includes(curso.codigo.charAt(4))) ) {
                throw new BusinessLogicException(
                    'El codigo del curso debe ser un numero de cuatro digitos o cuatro dígitos con una letra', BusinessError.PRECONDITION_FAILED
                )
            }
            if(curso.creditos < 0) {
                    throw new BusinessLogicException(
                        'El numero de creditos del curso no puede ser un numero negativo', BusinessError.PRECONDITION_FAILED
                    )
            }
            return await this.cursoRepository.save(curso);
        }
        catch (err){
            throw new BusinessLogicException(
                'Error creando el curso, revise las sigla y el departamento', BusinessError.PRECONDITION_FAILED
            )
        }
        
    }

    async update(id: string, curso: CursoEntity): Promise<CursoEntity> {
        try {
            const persistedcurso: CursoEntity = await this.cursoRepository.findOne({where:{id}});
            if (!persistedcurso)
              throw new BusinessLogicException("No se encontro el curso con el id dado", BusinessError.NOT_FOUND);
    
            if(persistedcurso.sigla != curso.sigla || persistedcurso.codigo != curso.codigo) {
                if((await this.findCodigoSigla(curso.sigla, curso.codigo)).length != 0) {
                    throw new BusinessLogicException(
                        'Ya existe un curso con esta sigla y codigo', BusinessError.PRECONDITION_FAILED
                    )
                }
                if(curso.codigo.length < 4 ||!(Number(curso.codigo.slice(0,4))>=0) || (curso.codigo.length ==5 && !(letras.includes(curso.codigo.charAt(4)))) ) {
                    throw new BusinessLogicException(
                        'El codigo del curso debe ser un numero de cuatro digitos o cuatro dígitos con una letra', BusinessError.PRECONDITION_FAILED
                    )
                }
            }
            if(curso.creditos < 0) {
                throw new BusinessLogicException(
                    'El numero de creditos del curso no puede ser un numero negativo', BusinessError.PRECONDITION_FAILED
                )
            }      
            return await this.cursoRepository.save({...persistedcurso, ...curso,});
        }

        catch (err) {
            throw new BusinessLogicException(
                'Error creando el curso, revise las sigla y el departamento', BusinessError.PRECONDITION_FAILED
            )
        }
        
    }

    async delete(id: string) {
        const curso: CursoEntity = await this.cursoRepository.findOne({where:{id}});
        if (!curso)
          throw new BusinessLogicException("No se encontro el curso con el id dado", BusinessError.NOT_FOUND);
     
        await this.cursoRepository.remove(curso);
    }
}