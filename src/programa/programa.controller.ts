/* eslint-disable */
import { Controller, UseInterceptors, Get, Param, Post, Body, Put, HttpCode, Delete, Query, UseGuards } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ProgramaService } from './programa.service';
import { plainToInstance } from 'class-transformer';
import { ProgramaEntity } from './programa.entity';
import { ProgramaDto } from './programa.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('programas')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProgramaController {

    constructor(private readonly programaService: ProgramaService) {}

    
    @Get()
    async findAll() {
        return await this.programaService.findAll(null);
    }

    @Get(':programaId')
    async findOne(@Param('programaId') programaId: string) {
        return await this.programaService.findOne(programaId);
    }
    
    @Get('findByFilter/param?')
    async findByFilter(@Query('query') nombre: string): Promise<ProgramaEntity[]> {
    return await this.programaService.findAll(nombre);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() programaDto: ProgramaDto) {
    const programa: ProgramaEntity = plainToInstance(ProgramaEntity, programaDto);
    return await this.programaService.create(programa);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':programaId')
    async update(@Param('programaId') programaId: string, @Body() programaDto: ProgramaDto) {
    const programa: ProgramaEntity = plainToInstance(ProgramaEntity, programaDto);
    return await this.programaService.update(programaId, programa);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':programaId')
    @HttpCode(204)
    async delete(@Param('programaId') programaId: string) {
      return await this.programaService.delete(programaId);
    }
}
