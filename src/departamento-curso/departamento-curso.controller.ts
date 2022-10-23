/* eslint-disable */
import { Controller, UseInterceptors, Get, Param, Post, Body, Put, HttpCode, Delete } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CursoDto } from '../curso/curso.dto';
import { CursoEntity } from '../curso/curso.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { DepartamentoCursoService } from './departamento-curso.service';

@Controller('departamentos')
@UseInterceptors(BusinessErrorsInterceptor)
export class DepartamentoCursoController {
    constructor(private readonly departamentoCursoService: DepartamentoCursoService){}

    @Post(':departamentoId/cursos/:cursoId')
    async addCursoProduct(@Param('departamentoId') departamentoId: string, @Param('cursoId') cursoId: string){
    return await this.departamentoCursoService.addCursoToDepartamento(departamentoId, cursoId);
    }

    @Get(':departamentoId/cursos/:cursoId')
    async findCursoByDepartamentoIdCursoId(@Param('departamentoId') departamentoId: string, @Param('cursoId') cursoId: string){
    return await this.departamentoCursoService.findCursoByDepartamentoIdCursoId(departamentoId, cursoId);
    }

    @Get(':departamentoId/cursos')
    async findCursosByDepartamentoId(@Param('departamentoId') departamentoId: string){
    return await this.departamentoCursoService.findCursosByDepartamentoId(departamentoId);
    }

    @Put(':departamentoId/cursos')
    async associateCursosDepartamento(@Body() cursosDto: CursoDto[], @Param('departamentoId') departamentoId: string){
    const cursos = plainToInstance(CursoEntity, cursosDto)
    return await this.departamentoCursoService.associateCursosDepartamento(departamentoId, cursos);
    }

    @Delete(':departamentoId/cursos/:cursoId')
    @HttpCode(204)
    async deleteCursoDepartamento(@Param('departamentoId') departamentoId: string, @Param('cursoId') cursoId: string){
    return await this.departamentoCursoService.deleteCursoDepartamento(departamentoId, cursoId);
    }
}