/* eslint-disable */
import { Controller, UseInterceptors, Get, Param, Post, Body, Put, HttpCode, Delete } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';
import { RequisitoService } from './requisito.service';
import { RequisitoDto } from './requisito.dto';
import { RequisitoEntity } from './requisito.entity';

@Controller('requisitos')
@UseInterceptors(BusinessErrorsInterceptor)
export class RequisitoController {

    constructor(private readonly requisitoService: RequisitoService) {}

    
    @Get()
    async findAll() {
        return await this.requisitoService.findAll();
    }

    @Get(':requisitoId')
    async findOne(@Param('requisitoId') requisitoId: string) {
        return await this.requisitoService.findOne(requisitoId);
    }

    @Post()
    async create(@Body() requisitoDto: RequisitoDto) {
    const requisito: RequisitoEntity = plainToInstance(RequisitoEntity, requisitoDto);
    return await this.requisitoService.create(requisito);
    }

    @Put(':requisitoId')
    async update(@Param('requisitoId') requisitoId: string, @Body() requisitoDto: RequisitoDto) {
    const requisito: RequisitoEntity = plainToInstance(RequisitoEntity, requisitoDto);
    return await this.requisitoService.update(requisitoId, requisito);
    }

    @Delete(':requisitoId')
    @HttpCode(204)
    async delete(@Param('requisitoId') requisitoId: string) {
      return await this.requisitoService.delete(requisitoId);
    }
}
