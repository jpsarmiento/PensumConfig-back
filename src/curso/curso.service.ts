import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { CursoEntity } from './curso.entity';

var siglas =    ['ADMI','AFIN','ANTR','ARQT','ARQU','ARTE','ARTI','AUTO','BCOM','BIOL',
                'CBCA','CBCC','CBCO','CBIO','CBPC','CHNA','CIDE','CISO','CONT','CPER','CPOL',
                'DADM','DCOM','DDER','DECA','DEIN','DEMP','DENI','DEPI','DEPO','DEPR','DERE',
                'DGGJ','DGIT','DISE','DISO','DLIT','DMIN','DPRO','DPUB','DPUC','ECON','EDUC',
                'EECO','EGOB','EINT','EMAT','EMBA','ENEG','EPAH','EPID','ESCR','ETRI','FARH',
                'FCIE','FILO','FISI','GEOC','GLOB','GPUB','HART','HDIG','HIST','IALI','IBIO',
                'ICYA','IDOC','IELE','IIND','IING','IMEC','IMER','INTL','IQUI','ISIS','LEGI',
                'LENG','LITE','MADM','MAIA','MART','MATE','MBAE','MBIO','MBIT','MCLA','MDER',
                'MDIS','MECA','MECU','MEDI','MFIN','MGAD','MGAP','MGEO','MGIT','MGLO','MGPA',
                'MGPD','MGPU','MHAR','MIFI','MIIA','MIID','MINE','MINT','MISO','MISW','MLIT',
                'MMER','MMUS','MPAZ','MPCU','MPER','MPET','MSCM','MSIN','MTRI','MTRM','MUSI',
                'PATO','PEDI','PMED','PSCL','PSIC','QUIM','SOCI','SPUB','STRA','VICE']

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

    async findCodigoSigla(sigla: string, codigo: number):Promise<CursoEntity[]> {
        return await this.cursoRepository.find({where: {sigla: sigla, codigo: codigo}});
    }

    async create(curso: CursoEntity): Promise<CursoEntity> {
        if((await this.findCodigoSigla(curso.sigla, curso.codigo)).length != 0) {
            throw new BusinessLogicException(
                'Ya existe un curso con esta sigla y codigo', BusinessError.PRECONDITION_FAILED
            )
        }
        if(!siglas.includes(curso.sigla)) {
                throw new BusinessLogicException(
                    'La sigla del curso debe ser la sigla de un departamento o programa de la universidad', BusinessError.PRECONDITION_FAILED
                )
        }
        if(curso.codigo < 1000 || curso.codigo > 7000) {
                throw new BusinessLogicException(
                    'El codigo del curso debe ser un numero de cuatro digitos entre el 1000 y el 7000', BusinessError.PRECONDITION_FAILED
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

        if(persistedcurso.sigla != curso.sigla || persistedcurso.codigo != curso.codigo) {
            if((await this.findCodigoSigla(curso.sigla, curso.codigo)).length != 0) {
                throw new BusinessLogicException(
                    'Ya existe un curso con esta sigla y codigo', BusinessError.PRECONDITION_FAILED
                )
            }
            if(!siglas.includes(curso.sigla)) {
                throw new BusinessLogicException(
                    'La sigla del curso debe ser la sigla de un departamento o programa de la universidad', BusinessError.PRECONDITION_FAILED
                )
            }
            if(curso.codigo < 1000 || curso.codigo > 7000) {
                throw new BusinessLogicException(
                    'El codigo del curso debe ser un numero de cuatro digitos entre el 1000 y el 7000', BusinessError.PRECONDITION_FAILED
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

    async delete(id: string) {
        const curso: CursoEntity = await this.cursoRepository.findOne({where:{id}});
        if (!curso)
          throw new BusinessLogicException("No se encontro el curso con el id dado", BusinessError.NOT_FOUND);
     
        await this.cursoRepository.remove(curso);
    }
}