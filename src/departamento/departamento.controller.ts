/* eslint-disable */
import { Controller, UseInterceptors, Get, Param, Post, Body, Put, HttpCode, Delete, Query } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { DepartamentoService } from './departamento.service';
import { plainToInstance } from 'class-transformer';
import { DepartamentoEntity } from './departamento.entity';
import { DepartamentoDto } from './departamento.dto';

@Controller('departamentos')
@UseInterceptors(BusinessErrorsInterceptor)
export class DepartamentoController {

    constructor(private readonly departamentoService: DepartamentoService) {}

    
    @Get()
    async findAll() {
        return await this.departamentoService.findAll(null);
    }

    @Get(':departamentoId')
    async findOne(@Param('departamentoId') departamentoId: string) {
        return await this.departamentoService.findOne(departamentoId);
    }

    @Get('findByFilter/param?')
    async findByFilter(@Query('query') nombre: string): Promise<DepartamentoEntity[]> {
    return await this.departamentoService.findAll(nombre);
    }

    @Post()
    async create(@Body() departamentoDto: DepartamentoDto) {
    const departamento: DepartamentoEntity = plainToInstance(DepartamentoEntity, departamentoDto);
    return await this.departamentoService.create(departamento);
    }

    @Put(':departamentoId')
    async update(@Param('departamentoId') departamentoId: string, @Body() departamentoDto: DepartamentoDto) {
    const departamento: DepartamentoEntity = plainToInstance(DepartamentoEntity, departamentoDto);
    return await this.departamentoService.update(departamentoId, departamento);
    }

    @Delete(':departamentoId')
    @HttpCode(204)
    async delete(@Param('departamentoId') departamentoId: string) {
      return await this.departamentoService.delete(departamentoId);
    }
}
