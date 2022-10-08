import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReglaEntity } from '../regla/regla.entity';
import { Repository } from 'typeorm';
import { TerminoEntity } from '../termino/termino.entity';
import {
    BusinessError,
    BusinessLogicException,
  } from '../shared/errors/business-errors';

@Injectable()
export class ReglaTerminoService {
  constructor(
       @InjectRepository(ReglaEntity)
       private readonly reglaRepository: Repository<ReglaEntity>,
   
       @InjectRepository(TerminoEntity)
       private readonly terminoRepository: Repository<TerminoEntity>
   ) {}


   async addTerminoToRegla(reglaId: string, terminoId: string): Promise<ReglaEntity> {
    const termino: TerminoEntity = await this.terminoRepository.findOne({where: {id: terminoId}});
    if (!termino)
      throw new BusinessLogicException('No se encontro el termino con el id dado', BusinessError.NOT_FOUND);
  
    const regla: ReglaEntity = await this.reglaRepository.findOne({where: {id: reglaId}, relations: ["terminos"]})
    if (!regla)
      throw new BusinessLogicException('No se encontro la regla con el id dado', BusinessError.NOT_FOUND);

    regla.terminos = [...regla.terminos, termino];
    return await this.reglaRepository.save(regla);
  }

async findTerminoByReglaIdTerminoId(reglaId: string, terminoId: string): Promise<TerminoEntity> {
    const termino: TerminoEntity = await this.terminoRepository.findOne({where: {id: terminoId}});
    if (!termino)
      throw new BusinessLogicException('No se encontro el termino con el id dado', BusinessError.NOT_FOUND)
   
    const regla: ReglaEntity = await this.reglaRepository.findOne({where: {id: reglaId}, relations: ["terminos"]});
    if (!regla)
      throw new BusinessLogicException('No se encontro la regla con el id dado', BusinessError.NOT_FOUND)

    const terminoRegla: TerminoEntity = regla.terminos.find(e => e.id === termino.id);

    if (!terminoRegla)
      throw new BusinessLogicException('El termino con el id dado no esta asociado a la regla', BusinessError.PRECONDITION_FAILED)

    return terminoRegla;
}

async findTerminosByReglaId(reglaId: string): Promise<TerminoEntity[]> {
    const regla: ReglaEntity = await this.reglaRepository.findOne({where: {id: reglaId}, relations: ["terminos"]});
    if (!regla)
      throw new BusinessLogicException('No se encontro la regla con el id dado', BusinessError.NOT_FOUND)
   
    return regla.terminos;
}

async associateTerminosRegla(reglaId: string, terminos: TerminoEntity[]): Promise<ReglaEntity> {
    const regla: ReglaEntity = await this.reglaRepository.findOne({where: {id: reglaId}, relations: ["terminos"]});
    if (!regla)
      throw new BusinessLogicException('No se encontro la regla con el id dado', BusinessError.NOT_FOUND)

    for (let i = 0; i < terminos.length; i++) {
      const termino: TerminoEntity = await this.terminoRepository.findOne({where: {id: terminos[i].id}});
      if (!termino)
        throw new BusinessLogicException("No se encontro el termino con el id dado", BusinessError.NOT_FOUND)
    }
    regla.terminos = terminos;
    return await this.reglaRepository.save(regla);
}

async deleteTerminoRegla(reglaId: string, terminoId: string){
    const termino: TerminoEntity = await this.terminoRepository.findOne({where: {id: terminoId}});
    if (!termino)
      throw new BusinessLogicException("No se encontro el termino con el id dado", BusinessError.NOT_FOUND)

    const regla: ReglaEntity = await this.reglaRepository.findOne({where: {id: reglaId}, relations: ["terminos"]});
    if (!regla)
      throw new BusinessLogicException('No se encontro la regla con el id dado', BusinessError.NOT_FOUND)

    const terminoRegla: TerminoEntity = regla.terminos.find(e => e.id === termino.id);

    if (!terminoRegla)
        throw new BusinessLogicException('El termino con el id dado no esta asociado a la regla', BusinessError.PRECONDITION_FAILED)

    regla.terminos = regla.terminos.filter(e => e.id !== terminoId);
    await this.reglaRepository.save(regla);
}  
}
