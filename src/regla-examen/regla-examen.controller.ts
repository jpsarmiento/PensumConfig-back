/* eslint-disable */
import { Controller, UseInterceptors, Get, Param, Post, Body, Put, HttpCode, Delete, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ExamenDto } from '../examen/examen.dto';
import { ExamenEntity } from '../examen/examen.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ReglaExamenService } from './regla-examen.service';

@Controller('reglas')
@UseInterceptors(BusinessErrorsInterceptor)
export class ReglaExamenController {
    constructor(private readonly reglaExamenService: ReglaExamenService){}

    @UseGuards(JwtAuthGuard)
    @Post(':reglaId/examenes/:examenId')
    async addExamenProduct(@Param('reglaId') reglaId: string, @Param('examenId') examenId: string){
    return await this.reglaExamenService.addExamenToRegla(reglaId, examenId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':reglaId/examenes/:examenId')
    async findExamenByReglaIdExamenId(@Param('reglaId') reglaId: string, @Param('examenId') examenId: string){
    return await this.reglaExamenService.findExamenByReglaIdExamenId(reglaId, examenId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':reglaId/examenes')
    async findExamensByReglaId(@Param('reglaId') reglaId: string){
    return await this.reglaExamenService.findExamenesByReglaId(reglaId);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':reglaId/examenes')
    async associateExamensRegla(@Body() examensDto: ExamenDto[], @Param('reglaId') reglaId: string){
    const examens = plainToInstance(ExamenEntity, examensDto)
    return await this.reglaExamenService.associateExamenesRegla(reglaId, examens);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':reglaId/examenes/:examenId')
    @HttpCode(204)
    async deleteExamenRegla(@Param('reglaId') reglaId: string, @Param('examenId') examenId: string){
    return await this.reglaExamenService.deleteExamenRegla(reglaId, examenId);
    }
}