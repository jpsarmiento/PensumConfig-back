/* eslint-disable prettier/prettier */
import { Controller, UseInterceptors, Get, Param, Post, Body, Put, HttpCode, Delete } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { TerminoDto } from '../termino/termino.dto';
import { TerminoEntity } from '../termino/termino.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ReglaTerminoService } from './regla-termino.service';

@Controller('reglas')
@UseInterceptors(BusinessErrorsInterceptor)
export class ReglaTerminoController {
    constructor(private readonly reglaTerminoService: ReglaTerminoService){}

    @Post(':reglaId/terminos/:terminoId')
    async addTerminoProduct(@Param('reglaId') reglaId: string, @Param('terminoId') terminoId: string){
    return await this.reglaTerminoService.addTerminoToRegla(reglaId, terminoId);
    }

    @Get(':reglaId/terminos/:terminoId')
    async findTerminoByReglaIdTerminoId(@Param('reglaId') reglaId: string, @Param('terminoId') terminoId: string){
    return await this.reglaTerminoService.findTerminoByReglaIdTerminoId(reglaId, terminoId);
    }

    @Get(':reglaId/terminos')
    async findTerminosByReglaId(@Param('reglaId') reglaId: string){
    return await this.reglaTerminoService.findTerminosByReglaId(reglaId);
    }

    @Put(':reglaId/terminos')
    async associateTerminosRegla(@Body() terminosDto: TerminoDto[], @Param('reglaId') reglaId: string){
    const terminos = plainToInstance(TerminoEntity, terminosDto)
    return await this.reglaTerminoService.associateTerminosRegla(reglaId, terminos);
    }

    @Delete(':reglaId/terminos/:terminoId')
    @HttpCode(204)
    async deleteTerminoRegla(@Param('reglaId') reglaId: string, @Param('terminoId') terminoId: string){
    return await this.reglaTerminoService.deleteTerminoRegla(reglaId, terminoId);
    }
}