import { Controller, UseInterceptors, Get, Param, Post, Body, Put, HttpCode, Delete } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { AreaService } from './area.service';
import { plainToInstance } from 'class-transformer';
import { AreaEntity } from './area.entity';
import { AreaDto } from './area.dto';

@Controller('areas')
@UseInterceptors(BusinessErrorsInterceptor)
export class AreaController {

    constructor(private readonly areaService: AreaService) {}

    
    @Get()
    async findAll() {
        return await this.areaService.findAll();
    }

    @Get(':areaId')
    async findOne(@Param('areaId') areaId: string) {
        return await this.areaService.findOne(areaId);
    }

    @Post()
    async create(@Body() areaDto: AreaDto) {
    const area: AreaEntity = plainToInstance(AreaEntity, areaDto);
    return await this.areaService.create(area);
    }

    @Put(':areaId')
    async update(@Param('areaId') areaId: string, @Body() areaDto: AreaDto) {
    const area: AreaEntity = plainToInstance(AreaEntity, areaDto);
    return await this.areaService.update(areaId, area);
    }

    @Delete(':areaId')
    @HttpCode(204)
    async delete(@Param('areaId') areaId: string) {
      return await this.areaService.delete(areaId);
    }
}
