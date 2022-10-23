/* eslint-disable */
import { Controller, UseInterceptors, Get, Param, Post, Body, Put, HttpCode, Delete } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AreaDto } from '../area/area.dto';
import { AreaEntity } from '../area/area.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { DepartamentoAreaService } from './departamento-area.service';

@Controller('departamentos')
@UseInterceptors(BusinessErrorsInterceptor)
export class DepartamentoAreaController {
    constructor(private readonly departamentoAreaService: DepartamentoAreaService){}

    @Post(':departamentoId/areas/:areaId')
    async addAreaProduct(@Param('departamentoId') departamentoId: string, @Param('areaId') areaId: string){
    return await this.departamentoAreaService.addAreaToDepartamento(departamentoId, areaId);
    }

    @Get(':departamentoId/areas/:areaId')
    async findAreaByDepartamentoIdAreaId(@Param('departamentoId') departamentoId: string, @Param('areaId') areaId: string){
    return await this.departamentoAreaService.findAreaByDepartamentoIdAreaId(departamentoId, areaId);
    }

    @Get(':departamentoId/areas')
    async findAreasByDepartamentoId(@Param('departamentoId') departamentoId: string){
    return await this.departamentoAreaService.findAreasByDepartamentoId(departamentoId);
    }

    @Put(':departamentoId/areas')
    async associateAreasDepartamento(@Body() areasDto: AreaDto[], @Param('departamentoId') departamentoId: string){
    const areas = plainToInstance(AreaEntity, areasDto)
    return await this.departamentoAreaService.associateAreasDepartamento(departamentoId, areas);
    }

    @Delete(':departamentoId/areas/:areaId')
    @HttpCode(204)
    async deleteAreaDepartamento(@Param('departamentoId') departamentoId: string, @Param('areaId') areaId: string){
    return await this.departamentoAreaService.deleteAreaDepartamento(departamentoId, areaId);
    }
}