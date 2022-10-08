import { Controller, UseInterceptors, Get, Param, Post, Body, Put, HttpCode, Delete } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ExamenService } from './examen.service';
import { plainToInstance } from 'class-transformer';
import { ExamenEntity } from './examen.entity';
import { ExamenDto } from './examen.dto';

@Controller('examenes')
@UseInterceptors(BusinessErrorsInterceptor)
export class ExamenController {

    constructor(private readonly examenService: ExamenService) {}

    
    @Get()
    async findAll() {
        return await this.examenService.findAll();
    }

    @Get(':examenId')
    async findOne(@Param('examenId') examenId: string) {
        return await this.examenService.findOne(examenId);
    }

    @Post()
    async create(@Body() examenDto: ExamenDto) {
    const examen: ExamenEntity = plainToInstance(ExamenEntity, examenDto);
    return await this.examenService.create(examen);
    }

    @Put(':examenId')
    async update(@Param('examenId') examenId: string, @Body() examenDto: ExamenDto) {
    const examen: ExamenEntity = plainToInstance(ExamenEntity, examenDto);
    return await this.examenService.update(examenId, examen);
    }

    @Delete(':examenId')
    @HttpCode(204)
    async delete(@Param('examenId') examenId: string) {
      return await this.examenService.delete(examenId);
    }
}
