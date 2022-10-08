import { Controller, UseInterceptors, Get, Param, Post, Body, Put, HttpCode, Delete } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ExamenDto } from '../examen/examen.dto';
import { ExamenEntity } from '../examen/examen.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ReglaExamenService } from './regla-examen.service';

@Controller('reglas')
@UseInterceptors(BusinessErrorsInterceptor)
export class ReglaExamenController {
    constructor(private readonly reglaExamenService: ReglaExamenService){}

    @Post(':reglaId/examens/:examenId')
    async addExamenProduct(@Param('reglaId') reglaId: string, @Param('examenId') examenId: string){
    return await this.reglaExamenService.addExamenToRegla(reglaId, examenId);
    }

    @Get(':reglaId/examens/:examenId')
    async findExamenByReglaIdExamenId(@Param('reglaId') reglaId: string, @Param('examenId') examenId: string){
    return await this.reglaExamenService.findExamenByReglaIdExamenId(reglaId, examenId);
    }

    @Get(':reglaId/examens')
    async findExamensByReglaId(@Param('reglaId') reglaId: string){
    return await this.reglaExamenService.findExamenesByReglaId(reglaId);
    }

    @Put(':reglaId/examens')
    async associateExamensRegla(@Body() examensDto: ExamenDto[], @Param('reglaId') reglaId: string){
    const examens = plainToInstance(ExamenEntity, examensDto)
    return await this.reglaExamenService.associateExamenesRegla(reglaId, examens);
    }

    @Delete(':reglaId/examens/:examenId')
    @HttpCode(204)
    async deleteExamenRegla(@Param('reglaId') reglaId: string, @Param('examenId') examenId: string){
    return await this.reglaExamenService.deleteExamenRegla(reglaId, examenId);
    }
}