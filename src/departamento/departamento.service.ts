/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DepartamentoEntity } from './departamento.entity';

@Injectable()
export class DepartamentoService {

    constructor(
        @InjectRepository(DepartamentoEntity)
        private readonly departamentoRepository: Repository<DepartamentoEntity>
    ){}

    async findAll(): Promise<DepartamentoEntity[]> {
        return await this.departamentoRepository.find();
    }
}