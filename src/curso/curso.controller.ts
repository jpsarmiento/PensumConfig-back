/* eslint-disable */
import { Controller, UseInterceptors, Get, Param, Post, Body, Put, HttpCode, Delete } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { CursoService } from './curso.service';
import { plainToInstance } from 'class-transformer';
import { CursoEntity } from './curso.entity';
import { CursoDto } from './curso.dto';

@Controller('cursos')
@UseInterceptors(BusinessErrorsInterceptor)
export class CursoController {

    constructor(private readonly cursoService: CursoService) {}

    
    @Get()
    async findAll() {
        return await this.cursoService.findAll();
    }

    @Get(':cursoId')
    async findOne(@Param('cursoId') cursoId: string) {
        return await this.cursoService.findOne(cursoId);
    }

    @Get('query')
    async findByQuery(@Param('query') query: string) {
        return await this.cursoService.findByQuery(query);
    }

    @Post()
    async create(@Body() cursoDto: CursoDto) {
    const curso: CursoEntity = plainToInstance(CursoEntity, cursoDto);
    return await this.cursoService.create(curso);
    }

    @Put(':cursoId')
    async update(@Param('cursoId') cursoId: string, @Body() cursoDto: CursoDto) {
    const curso: CursoEntity = plainToInstance(CursoEntity, cursoDto);
    return await this.cursoService.update(cursoId, curso);
    }

    @Delete(':cursoId')
    @HttpCode(204)
    async delete(@Param('cursoId') cursoId: string) {
      return await this.cursoService.delete(cursoId);
    }
}
