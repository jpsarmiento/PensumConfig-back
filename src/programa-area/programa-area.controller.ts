/* eslint-disable */
import { Controller, UseInterceptors, Get, Param, Post, Body, Put, HttpCode, Delete, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AreaDto } from '../area/area.dto';
import { AreaEntity } from '../area/area.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ProgramaAreaService } from './programa-area.service';

@Controller('programas')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProgramaAreaController {
    constructor(private readonly programaAreaService: ProgramaAreaService){}

    @UseGuards(JwtAuthGuard)
    @Post(':programaId/areas/:areaId')
    async addAreaProduct(@Param('programaId') programaId: string, @Param('areaId') areaId: string){
    return await this.programaAreaService.addAreaToPrograma(programaId, areaId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':programaId/areas/:areaId')
    async findAreaByProgramaIdAreaId(@Param('programaId') programaId: string, @Param('areaId') areaId: string){
    return await this.programaAreaService.findAreaByProgramaIdAreaId(programaId, areaId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':programaId/areas')
    async findAreasByProgramaId(@Param('programaId') programaId: string){
    return await this.programaAreaService.findAreasByProgramaId(programaId);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':programaId/areas')
    async associateAreasPrograma(@Body() areasDto: AreaDto[], @Param('programaId') programaId: string){
    const areas = plainToInstance(AreaEntity, areasDto)
    return await this.programaAreaService.associateAreasPrograma(programaId, areas);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':programaId/areas/:areaId')
    @HttpCode(204)
    async deleteAreaPrograma(@Param('programaId') programaId: string, @Param('areaId') areaId: string){
    return await this.programaAreaService.deleteAreaPrograma(programaId, areaId);
    }
}