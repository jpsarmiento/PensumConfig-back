import { Injectable } from '@nestjs/common';
import { ProgramaEntity } from '../programa/programa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequisitoEntity } from '../requisito/requisito.entity';

@Injectable()
export class ProgramaRequisitoService {

    constructor(
        @InjectRepository(ProgramaEntity)
        private readonly programaRepository: Repository<ProgramaEntity>,
    
        @InjectRepository(RequisitoEntity)
        private readonly requisitoRepository: Repository<RequisitoEntity>
    ) {}
}
