import { Injectable } from '@nestjs/common';
import { AreaEntity } from '../area/area.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReglaEntity } from '../regla/regla.entity';

@Injectable()
export class AreaReglaService {

    constructor(
        @InjectRepository(AreaEntity)
        private readonly areaRepository: Repository<AreaEntity>,
    
        @InjectRepository(ReglaEntity)
        private readonly reglaRepository: Repository<ReglaEntity>
    ) {}
}
