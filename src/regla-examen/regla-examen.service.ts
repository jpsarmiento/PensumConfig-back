import { Injectable } from '@nestjs/common';
import { ReglaEntity } from '../regla/regla.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExamenEntity } from '../examen/examen.entity';

@Injectable()
export class ReglaExamenService {

    constructor(
        @InjectRepository(ReglaEntity)
        private readonly reglaRepository: Repository<ReglaEntity>,
    
        @InjectRepository(ExamenEntity)
        private readonly examenRepository: Repository<ExamenEntity>
    ) {}
}
