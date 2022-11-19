/* eslint-disable */
import { Controller, UseInterceptors, Get, Param, Post, Body, Put, HttpCode, Delete, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CursoDto } from '../curso/curso.dto';
import { CursoEntity } from '../curso/curso.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { TerminoCursoService } from './termino-curso.service';

@Controller('terminos')
@UseInterceptors(BusinessErrorsInterceptor)
export class TerminoCursoController {
    constructor(private readonly terminoCursoService: TerminoCursoService){}

    @UseGuards(JwtAuthGuard)
    @Post(':terminoId/cursos/:cursoId')
    async addCursoTermino(@Param('terminoId') terminoId: string, @Param('cursoId') cursoId: string){
    return await this.terminoCursoService.addCursoToTermino(terminoId, cursoId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':terminoId/cursos/:cursoId')
    async findCursoByTerminoIdCursoId(@Param('terminoId') terminoId: string, @Param('cursoId') cursoId: string){
    return await this.terminoCursoService.findCursoByTerminoIdCursoId(terminoId, cursoId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':terminoId/cursos')
    async findCursosByTerminoId(@Param('terminoId') terminoId: string){
    return await this.terminoCursoService.findCursosByTerminoId(terminoId);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':terminoId/cursos')
    async associateCursosTermino(@Body() cursosDto: CursoDto[], @Param('terminoId') terminoId: string){
    const cursos = plainToInstance(CursoEntity, cursosDto)
    return await this.terminoCursoService.associateCursosTermino(terminoId, cursos);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':terminoId/cursos/:cursoId')
    @HttpCode(204)
    async deleteCursoTermino(@Param('terminoId') terminoId: string, @Param('cursoId') cursoId: string){
    return await this.terminoCursoService.deleteCursoTermino(terminoId, cursoId);
    }
}