import { Controller, UseInterceptors, Get, Param, Post, Body, Put, HttpCode, Delete } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ReglaDto } from '../regla/regla.dto';
import { ReglaEntity } from '../regla/regla.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { AreaReglaService } from './area-regla.service';

@Controller('areas')
@UseInterceptors(BusinessErrorsInterceptor)
export class AreaReglaController {
    constructor(private readonly areaReglaService: AreaReglaService){}

    @Post(':areaId/reglas/:reglaId')
    async addReglaProduct(@Param('areaId') areaId: string, @Param('reglaId') reglaId: string){
    return await this.areaReglaService.addReglaToArea(areaId, reglaId);
    }

    @Get(':areaId/reglas/:reglaId')
    async findReglaByAreaIdReglaId(@Param('areaId') areaId: string, @Param('reglaId') reglaId: string){
    return await this.areaReglaService.findReglaByAreaIdReglaId(areaId, reglaId);
    }

    @Get(':areaId/reglas')
    async findReglasByAreaId(@Param('areaId') areaId: string){
    return await this.areaReglaService.findReglasByAreaId(areaId);
    }

    @Put(':areaId/reglas')
    async associateReglasArea(@Body() reglasDto: ReglaDto[], @Param('areaId') areaId: string){
    const reglas = plainToInstance(ReglaEntity, reglasDto)
    return await this.areaReglaService.associateReglasArea(areaId, reglas);
    }

    @Delete(':areaId/reglas/:reglaId')
    @HttpCode(204)
    async deleteReglaArea(@Param('areaId') areaId: string, @Param('reglaId') reglaId: string){
    return await this.areaReglaService.deleteReglaArea(areaId, reglaId);
    }
}