import { Injectable } from '@nestjs/common';
import { ProgramaEntity } from '../programa/programa.entity';
import { AreaEntity } from '../area/area.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProgramaAreaService {

    constructor(
        @InjectRepository(ProgramaEntity)
        private readonly programaRepository: Repository<ProgramaEntity>,
    
        @InjectRepository(AreaEntity)
        private readonly areaRepository: Repository<AreaEntity>
    ) {}
}
