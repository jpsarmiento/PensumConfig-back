import { Injectable } from '@nestjs/common';
import { ReglaEntity } from '../regla/regla.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TerminoEntity } from '../termino/termino.entity';

@Injectable()
export class ReglaTerminoService {

    constructor(
        @InjectRepository(ReglaEntity)
        private readonly reglaRepository: Repository<ReglaEntity>,
    
        @InjectRepository(TerminoEntity)
        private readonly terminoRepository: Repository<TerminoEntity>
    ) {}
}
