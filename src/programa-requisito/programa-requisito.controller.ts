import { Controller, UseInterceptors, Get, Param, Post, Body, Put, HttpCode, Delete } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { RequisitoDto } from '../requisito/requisito.dto';
import { RequisitoEntity } from '../requisito/requisito.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ProgramaRequisitoService } from './programa-requisito.service';

@Controller('programas')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProgramaRequisitoController {
    constructor(private readonly programaRequisitoService: ProgramaRequisitoService){}

    @Post(':programaId/requisitos/:requisitoId')
    async addRequisitoProduct(@Param('programaId') programaId: string, @Param('requisitoId') requisitoId: string){
    return await this.programaRequisitoService.addRequisitoToPrograma(programaId, requisitoId);
    }

    @Get(':programaId/requisitos/:requisitoId')
    async findRequisitoByProgramaIdRequisitoId(@Param('programaId') programaId: string, @Param('requisitoId') requisitoId: string){
    return await this.programaRequisitoService.findRequisitoByProgramaIdRequisitoId(programaId, requisitoId);
    }

    @Get(':programaId/requisitos')
    async findRequisitosByProgramaId(@Param('programaId') programaId: string){
    return await this.programaRequisitoService.findRequisitosByProgramaId(programaId);
    }

    @Put(':programaId/requisitos')
    async associateRequisitosPrograma(@Body() requisitosDto: RequisitoDto[], @Param('programaId') programaId: string){
    const requisitos = plainToInstance(RequisitoEntity, requisitosDto)
    return await this.programaRequisitoService.associateRequisitosPrograma(programaId, requisitos);
    }

    @Delete(':programaId/requisitos/:requisitoId')
    @HttpCode(204)
    async deleteRequisitoPrograma(@Param('programaId') programaId: string, @Param('requisitoId') requisitoId: string){
    return await this.programaRequisitoService.deleteRequisitoPrograma(programaId, requisitoId);
    }
}