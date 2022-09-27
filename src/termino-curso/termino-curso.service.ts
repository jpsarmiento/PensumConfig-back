import { Injectable } from '@nestjs/common';
import { TerminoEntity } from '../termino/termino.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CursoEntity } from '../curso/curso.entity';

@Injectable()
export class TerminoCursoService {

    constructor(
        @InjectRepository(TerminoEntity)
        private readonly terminoRepository: Repository<TerminoEntity>,
    
        @InjectRepository(CursoEntity)
        private readonly cursoRepository: Repository<CursoEntity>
    ) {}
}
