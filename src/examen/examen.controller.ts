/* eslint-disable */
import { Controller, UseInterceptors, Get, Param, Post, Body, Put, HttpCode, Delete, Query, UseGuards } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ExamenService } from './examen.service';
import { plainToInstance } from 'class-transformer';
import { ExamenEntity } from './examen.entity';
import { ExamenDto } from './examen.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('examenes')
@UseInterceptors(BusinessErrorsInterceptor)
export class ExamenController {

    constructor(private readonly examenService: ExamenService) {}

    
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return await this.examenService.findAll(null);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':examenId')
    async findOne(@Param('examenId') examenId: string) {
        return await this.examenService.findOne(examenId);
    }
    
    
    @UseGuards(JwtAuthGuard)
    @Get('findByFilter/param?')
    async findByFilter(@Query('query') nombre: string): Promise<ExamenEntity[]> {
    return await this.examenService.findAll(nombre);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() examenDto: ExamenDto) {
    const examen: ExamenEntity = plainToInstance(ExamenEntity, examenDto);
    return await this.examenService.create(examen);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':examenId')
    async update(@Param('examenId') examenId: string, @Body() examenDto: ExamenDto) {
    const examen: ExamenEntity = plainToInstance(ExamenEntity, examenDto);
    return await this.examenService.update(examenId, examen);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':examenId')
    @HttpCode(204)
    async delete(@Param('examenId') examenId: string) {
      return await this.examenService.delete(examenId);
    }
}
