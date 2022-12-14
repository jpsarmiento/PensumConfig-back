/* eslint-disable */
import { Controller, UseInterceptors, Get, Param, Query, Post, Body, Put, HttpCode, Delete, UseGuards } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { AreaService } from './area.service';
import { plainToInstance } from 'class-transformer';
import { AreaEntity } from './area.entity';
import { AreaDto } from './area.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('areas')
@UseInterceptors(BusinessErrorsInterceptor)
export class AreaController {

    constructor(private readonly areaService: AreaService) {}

    
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return await this.areaService.findAll(null);
    }

    
    @UseGuards(JwtAuthGuard)
    @Get(':areaId')
    async findOne(@Param('areaId') areaId: string) {
        return await this.areaService.findOne(areaId);
    }

    
    @UseGuards(JwtAuthGuard)
    @Get('findByFilter/param?')
    async findByFilter(@Query('query') nombre: string): Promise<AreaEntity[]> {
    return await this.areaService.findAll(nombre);
    }

    
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() areaDto: AreaDto) {
    const area: AreaEntity = plainToInstance(AreaEntity, areaDto);
    return await this.areaService.create(area);
    }

    
    @UseGuards(JwtAuthGuard)
    @Put(':areaId')
    async update(@Param('areaId') areaId: string, @Body() areaDto: AreaDto) {
    const area: AreaEntity = plainToInstance(AreaEntity, areaDto);
    return await this.areaService.update(areaId, area);
    }

    
    @UseGuards(JwtAuthGuard)
    @Delete(':areaId')
    @HttpCode(204)
    async delete(@Param('areaId') areaId: string) {
      return await this.areaService.delete(areaId);
    }
}
